import { NextResponse } from 'next/server'

// Major Indian cities with their AQICN station IDs
const INDIAN_STATIONS = [
  { id: 'Amaravati', name: 'Amaravati', lat: 16.5062, lng: 80.6480 },
  { id: 'Ahmedabad', name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
  { id: 'Bengaluru', name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { id: 'Chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { id: 'Delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { id: 'Gurugram', name: 'Gurugram', lat: 28.4595, lng: 77.0266 },
  { id: 'Hyderabad', name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { id: 'Kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { id: 'Mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { id: 'Pune', name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { id: 'Jaipur', name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { id: 'Lucknow', name: 'Lucknow', lat: 26.8467, lng: 80.9462 }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = process.env.NEXT_PUBLIC_AQICN_TOKEN

  if (!token) {
    return NextResponse.json(
      { error: 'AQICN token not configured' },
      { status: 500 }
    )
  }

  try {
    const cityData = searchParams.get('city')
    
    if (cityData) {
      // Fetch single city data
      const response = await fetch(
        `https://api.waqi.info/feed/${cityData}/?token=${token}`,
        { next: { revalidate: 300 } } // 5 minutes cache
      )
      
      if (!response.ok) throw new Error('API request failed')
      
      const data = await response.json()
      
      if (data.status === 'ok') {
        const city = INDIAN_STATIONS.find(s => s.id === cityData) || {
          name: cityData,
          lat: data.data.city.geo[0],
          lng: data.data.city.geo[1]
        }
        
        return NextResponse.json([formatCityData(data.data, city)])
      }
    } else {
      // Fetch data for all Indian cities
      const promises = INDIAN_STATIONS.map(async (station) => {
        try {
          const response = await fetch(
            `https://api.waqi.info/feed/${station.id}/?token=${token}`,
            { next: { revalidate: 300 } }
          )
          
          if (!response.ok) return null
          
          const data = await response.json()
          
          if (data.status === 'ok') {
            return formatCityData(data.data, station)
          }
          return null
        } catch (error) {
          console.error(`Error fetching ${station.name}:`, error)
          return null
        }
      })

      const results = await Promise.all(promises)
      const validResults = results.filter(city => city !== null)
      
      return NextResponse.json(validResults)
    }
  } catch (error) {
    console.error('AQICN API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch AQI data' },
      { status: 500 }
    )
  }
}

function formatCityData(data: any, station: any) {
  const aqi = data.aqi
  const iaqi = data.iaqi || {}
  
  return {
    id: station.id.toLowerCase(),
    city: station.name,
    lat: station.lat,
    lng: station.lng,
    pm25: iaqi.pm25?.v || 0,
    pm10: iaqi.pm10?.v || 0,
    aqi: aqi,
    level: getAQILevel(aqi),
    color: getAQIColorClass(aqi),
    temperature: iaqi.t?.v || null,
    humidity: iaqi.h?.v || null,
    pressure: iaqi.p?.v || null,
    windSpeed: iaqi.w?.v || null,
    station: data.city?.name || station.name,
    lastUpdated: data.time?.iso || new Date().toISOString(),
    dominantPollutant: data.dominentpol || 'pm25'
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