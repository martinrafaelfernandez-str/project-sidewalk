
import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet'

import L from 'leaflet'

const categoryIcons = {
  'Double Parking': L.divIcon({
    className: 'category-marker marker-parking',
    html: '<span>🚗</span>',
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  }),

  'Sidewalk Obstruction': L.divIcon({
    className: 'category-marker marker-sidewalk',
    html: '<span>🚧</span>',
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  }),

  'Unauthorized Street Occupation': L.divIcon({
    className: 'category-marker marker-occupation',
    html: '<span>🏪</span>',
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  }),

  'Road and Sidewalk Damage': L.divIcon({
    className: 'category-marker marker-damage',
    html: '<span>⚠️</span>',
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  })
}

const categories = [
  'All Reports',
  'Double Parking',
  'Sidewalk Obstruction',
  'Unauthorized Street Occupation',
  'Road and Sidewalk Damage'
]

function IncidentMap({ reports }) {
  const [selectedCategory, setSelectedCategory] =
    useState('All Reports')

  const locatedReports = reports.filter(
  (report) =>
    Array.isArray(report.coordinates) &&
    report.coordinates.length === 2
)

const filteredReports =
  selectedCategory === 'All Reports'
    ? locatedReports
    : locatedReports.filter(
        (report) => report.category === selectedCategory
      )

const unlocatedCount = reports.length - locatedReports.length

  return (
    <div className="incident-map-container">

      <div className="map-filters">
        <h3>Filter Incidents</h3>

        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? 'filter-button active'
                  : 'filter-button'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="report-count">
            Showing {filteredReports.length} map pins
            ({reports.length} total reports)
            </p>

            {unlocatedCount > 0 && (
            <p className="report-count">
                {unlocatedCount} report(s) without map coordinates
            </p>
            )}
      </div>
    <div className="map-legend">
    
    <h3>Map Legend</h3>

    <div className="legend-items">
        <div className="legend-item">
        <span className="legend-marker marker-parking">🚗</span>
        <span>Double Parking</span>
        </div>

        <div className="legend-item">
        <span className="legend-marker marker-sidewalk">🚧</span>
        <span>Sidewalk Obstruction</span>
        </div>

        <div className="legend-item">
        <span className="legend-marker marker-occupation">🏪</span>
        <span>Unauthorized Street Occupation</span>
        </div>

        <div className="legend-item">
        <span className="legend-marker marker-damage">⚠️</span>
        <span>Road and Sidewalk Damage</span>
        </div>
    </div>
    
    </div>
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

         {filteredReports.map((report) => (
        
        <Marker
            key={report.id}
            position={report.coordinates}
            icon={categoryIcons[report.category]}
        >
            <Popup>
            <div className="report-popup">
                <h3>{report.category}</h3>

                <p><strong>Location:</strong> {report.location}</p>

                <p>{report.description}</p>

            {report.evidenceUrl && (
            <div className="popup-evidence">
                <img
                src={report.evidenceUrl}
                alt="Incident evidence"
                />
                <p>{report.evidenceName}</p>
            </div>
            )}

            <p>
            <strong>Status:</strong> {report.status}
            </p>

                <p>
                <strong>Reported:</strong> {report.date} at {report.time}
                </p>
            </div>
            </Popup>
        </Marker>
        ))}
        </MapContainer>
      </div>

    </div>
  )
}

export default IncidentMap
