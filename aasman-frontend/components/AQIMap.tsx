"use client"

import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import L from "leaflet"

// Fix marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Station {
  id: string
  city: string
  lat: number
  lng: number
  pm25: number
  pm10: number
  aqi: number
  level: string
  color: string
  station: string
  lastUpdated: string
  dominantPollutant: string
}

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "#10B981" // green
  if (aqi <= 100) return "#F59E0B" // yellow
  if (aqi <= 150) return "#F97316" // orange
  if (aqi <= 200) return "#EF4444" // red
  if (aqi <= 300) return "#8B5CF6" // purple
  return "#7F1D1D" // maroon
}

const getAQILevelText = (aqi: number) => {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

const getAQIDescription = (aqi: number) => {
  if (aqi <= 50) return "Air quality is satisfactory"
  if (aqi <= 100) return "Air quality is acceptable"
  if (aqi <= 150) return "Members of sensitive groups may experience health effects"
  if (aqi <= 200) return "Everyone may begin to experience health effects"
  if (aqi <= 300) return "Health alert: everyone may experience more serious health effects"
  return "Health warning of emergency conditions"
}

// Create different sized markers based on AQI (more prominent for worse AQI)
const createCustomIcon = (aqi: number) => {
  const size = aqi > 200 ? 32 : aqi > 150 ? 28 : aqi > 100 ? 24 : 20
  const fontSize = aqi > 200 ? '12px' : aqi > 150 ? '11px' : aqi > 100 ? '10px' : '9px'
  
  return L.divIcon({
    html: `
      <div class="relative">
        <div class="rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-white" 
             style="width: ${size}px; height: ${size}px; background-color: ${getAQIColor(aqi)}; font-size: ${fontSize}">
          ${aqi}
        </div>
        <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
      </div>
    `,
    className: "aqi-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  })
}

// Map click handler to load nearby stations
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      onMapClick(lat, lng)
    },
  })
  return null
}

interface AQIMapProps {
  onStationClick?: (station: Station) => void
  selectedStation?: Station | null
}

export default function AQIMap({ onStationClick, selectedStation }: AQIMapProps) {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [totalStations, setTotalStations] = useState(0)
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.5937, 78.9629])

  // Load all India stations
  const fetchAllStations = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/aqi/all-stations')
      
      if (!response.ok) {
        throw new Error('Failed to fetch stations data')
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setStations(data.stations)
      setTotalStations(data.total)
      setLastUpdated(new Date().toLocaleTimeString())
      
    } catch (error) {
      console.error('Error fetching stations:', error)
      setError('Failed to load AQI stations data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Load stations near clicked location
  const fetchNearbyStations = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/aqi/search?lat=${lat}&lng=${lng}`)
      const data = await response.json()
      
      if (data.status === 'ok' && data.data) {
        // Handle single station response
        const stationData = data.data
        const newStation: Station = {
          id: stationData.idx?.toString() || `${lat}-${lng}`,
          city: stationData.city?.name || 'Unknown Location',
          lat: lat,
          lng: lng,
          pm25: stationData.iaqi?.pm25?.v || 0,
          pm10: stationData.iaqi?.pm10?.v || 0,
          aqi: parseInt(stationData.aqi) || 0,
          level: getAQILevelText(parseInt(stationData.aqi) || 0),
          color: getAQIColor(parseInt(stationData.aqi) || 0),
          station: stationData.city?.name || 'Unknown Station',
          lastUpdated: stationData.time?.iso || new Date().toISOString(),
          dominantPollutant: stationData.dominentpol || 'pm25'
        }
        
        // Add to existing stations (avoid duplicates)
        setStations(prev => {
          const exists = prev.find(s => s.id === newStation.id)
          if (!exists) {
            return [...prev, newStation]
          }
          return prev
        })
      }
    } catch (error) {
      console.error('Error fetching nearby station:', error)
    }
  }

  const handleMapClick = (lat: number, lng: number) => {
    fetchNearbyStations(lat, lng)
  }

  useEffect(() => {
    fetchAllStations()
    
    // Refresh data every 10 minutes
    const interval = setInterval(fetchAllStations, 10 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-card/30 rounded-lg border border-border/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading all AQI stations across India...</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a few seconds</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-card/30 rounded-lg border border-border/50">
        <div className="text-center">
          <div className="w-12 h-12 text-red-500 mx-auto mb-4">⚠️</div>
          <p className="text-red-500 mb-2">{error}</p>
          <button 
            onClick={fetchAllStations}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 z-[1000] bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm">
        <div className="flex items-center gap-4">
          <div>
            <span className="font-semibold">{totalStations}</span> stations
          </div>
          <div>
            Updated: <span className="font-semibold">{lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background/80 backdrop-blur-sm px-4 py-3 rounded-lg text-sm">
        <div className="font-semibold mb-2">AQI Levels</div>
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>USG (101-150)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Unhealthy (151-200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Very Unhealthy (201-300)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-900"></div>
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>

      {/* Data Source */}
      <div className="absolute top-4 right-4 z-[1000] bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
        📍 Data from AQICN.org
      </div>

      <MapContainer
        center={mapCenter}
        zoom={5}
        style={{ height: "600px", width: "100%", borderRadius: "12px" }}
        className="backdrop-blur-sm bg-card/30 border border-border/50"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
        />

        <MapClickHandler onMapClick={handleMapClick} />

        {/* Render ALL stations */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={createCustomIcon(station.aqi)}
            eventHandlers={{
              click: () => {
                onStationClick?.(station)
              },
            }}
          >
            <Popup>
              <div className="p-3 min-w-[280px]">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                  {station.city}
                  <span 
                    className="px-2 py-1 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: getAQIColor(station.aqi) }}
                  >
                    AQI {station.aqi} • {station.level}
                  </span>
                </h3>
                
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <span>PM2.5:</span>
                      <span className="font-medium">{station.pm25} μg/m³</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PM10:</span>
                      <span className="font-medium">{station.pm10} μg/m³</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                    <p className="font-medium">Health Impact:</p>
                    <p>{getAQIDescription(station.aqi)}</p>
                    <p className="mt-1 text-gray-600">
                      Station: {station.station}
                    </p>
                    <p className="text-gray-600">
                      Updated: {new Date(station.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => onStationClick?.(station)}
                    className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    View Detailed Analysis
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Highlight selected station */}
        {selectedStation && (
          <CircleMarker
            center={[selectedStation.lat, selectedStation.lng]}
            radius={40}
            pathOptions={{
              color: getAQIColor(selectedStation.aqi),
              fillColor: getAQIColor(selectedStation.aqi),
              fillOpacity: 0.1,
              weight: 4,
              dashArray: '8, 8'
            }}
          />
        )}
      </MapContainer>

      {/* Loading indicator for stations */}
      {stations.length > 0 && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
          🎯 Click anywhere to load more stations
        </div>
      )}
    </div>
  )
}