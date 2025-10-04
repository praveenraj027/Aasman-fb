import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const token = process.env.NEXT_PUBLIC_AQICN_TOKEN

  if (!token) {
    return NextResponse.json(
      { error: 'AQICN token not configured' },
      { status: 500 }
    )
  }

  try {
    let url: string
    
    if (lat && lng) {
      // Search by coordinates (gets nearest stations)
      url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${token}`
    } else {
      // Get all India stations
      url = `https://api.waqi.info/map/bounds/?latlng=6.5,68.0,37.5,97.5&token=${token}`
    }

    const response = await fetch(url, { 
      next: { revalidate: 300 } 
    })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()

    if (data.status !== 'ok') {
      throw new Error(data.data || 'API error')
    }

    return NextResponse.json(data)

  } catch (error) {
    console.error('AQICN search API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch station data' },
      { status: 500 }
    )
  }
}