
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  CircleMarker
} from 'react-leaflet'

const defaultCenter = [14.6575, 121.0205]

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng
      })
    }
  })

  return null
}

function LocationPicker({ selectedCoordinates, onSelect }) {
  const markerPosition = selectedCoordinates
    ? [
        selectedCoordinates.latitude,
        selectedCoordinates.longitude
      ]
    : null

  return (
    <div className="location-picker">
      <p>Click anywhere on the map to select the incident location.</p>

      <MapContainer
        center={markerPosition || defaultCenter}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '350px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onSelect={onSelect} />

        {markerPosition && (
          <CircleMarker
            center={markerPosition}
            radius={9}
            pathOptions={{
              color: '#ffffff',
              weight: 3,
              fillColor: '#236b48',
              fillOpacity: 1
            }}
          />
        )}
      </MapContainer>
    </div>
  )
}

export default LocationPicker
