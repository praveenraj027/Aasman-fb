import { NextResponse } from 'next/server'

// India bounding box coordinates
const INDIA_BOUNDS = {
  north: 37.5,  // Kashmir
  south: 6.5,   // Kanyakumari
  west: 68.0,   // Gujarat
  east: 97.5    // Arunachal Pradesh
}

export async function GET() {
  const token = process.env.NEXT_PUBLIC_AQICN_TOKEN

  if (!token) {
    return NextResponse.json(
      { error: 'AQICN token not configured' },
      { status: 500 }
    )
  }

  try {
    // Get all stations within India bounds
    const response = await fetch(
      `https://api.waqi.info/map/bounds/?latlng=${INDIA_BOUNDS.south},${INDIA_BOUNDS.west},${INDIA_BOUNDS.north},${INDIA_BOUNDS.east}&token=${token}`,
      { next: { revalidate: 300 } } // 5 minutes cache
    )

    if (!response.ok) {
      throw new Error('Failed to fetch stations data')
    }

    const data = await response.json()

    if (data.status !== 'ok') {
      throw new Error(data.data || 'API error')
    }

    // Format all stations data
    const stations = data.data.map((station: any) => {
      const aqi = parseInt(station.aqi) || 0
      
      return {
        id: station.uid.toString(),
        city: station.station?.name || 'Unknown Station',
        lat: parseFloat(station.lat),
        lng: parseFloat(station.lon),
        pm25: station.pm25 ? parseFloat(station.pm25) : 0,
        pm10: station.pm10 ? parseFloat(station.pm10) : 0,
        aqi: aqi,
        level: getAQILevel(aqi),
        color: getAQIColorClass(aqi),
        station: station.station?.name || 'Unknown',
        lastUpdated: station.station?.time || new Date().toISOString(),
        dominantPollutant: station.dominentpol || 'pm25'
      }
    })

    // Filter out stations with no AQI data
    const validStations = stations.filter((station: any) => station.aqi > 0)

    return NextResponse.json({
      stations: validStations,
      total: validStations.length,
      bounds: INDIA_BOUNDS
    })

  } catch (error) {
    console.error('AQICN stations API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stations data' },
      { status: 500 }
    )
  }
}

function getAQILevel(aqi: number): string {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

function getAQIColorClass(aqi: number): string {
  if (aqi <= 50) return "bg-green-500"
  if (aqi <= 100) return "bg-yellow-500"
  if (aqi <= 150) return "bg-orange-500"
  if (aqi <= 200) return "bg-red-500"
  if (aqi <= 300) return "bg-purple-500"
  return "bg-red-900"
}