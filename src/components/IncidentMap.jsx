
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix default marker icons in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const sampleReports = [
  {
    id: 1,
    category: 'Sidewalk Obstruction',
    location: 'Near Muñoz Market',
    coordinates: [14.6575, 121.0205],
    status: 'Under Review'
  },
  {
    id: 2,
    category: 'Double Parking',
    location: 'Near Roosevelt Avenue',
    coordinates: [14.6570, 121.0215],
    status: 'Submitted'
  },
  {
    id: 3,
    category: 'Road and Sidewalk Damage',
    location: 'Near Congressional Avenue',
    coordinates: [14.6585, 121.0195],
    status: 'Verified'
  }
]

function IncidentMap() {
  return (
    <div className="incident-map">
      <MapContainer
        center={[14.6575, 121.0205]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '450px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sampleReports.map((report) => (
          <Marker
            key={report.id}
            position={report.coordinates}
            icon={defaultIcon}
          >
            <Popup>
              <strong>{report.category}</strong>
              <br />
              {report.location}
              <br />
              Status: {report.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default IncidentMap
