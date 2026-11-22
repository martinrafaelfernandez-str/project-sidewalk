
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

const sampleReports = [
  {
    id: 1,
    category: 'Sidewalk Obstruction',
    location: 'Near Muñoz Market',
    coordinates: [14.6575, 121.0205],
    status: 'Under Review',
    description: 'Objects are blocking part of the pedestrian walkway.',
    date: 'November 22, 2026',
    time: '9:30 AM'
  },
  {
    id: 2,
    category: 'Double Parking',
    location: 'Near Roosevelt Avenue',
    coordinates: [14.6570, 121.0215],
    status: 'Submitted',
    description: 'A vehicle is occupying part of the roadside.',
    date: 'November 22, 2026',
    time: '10:15 AM'
  },
  {
    id: 3,
    category: 'Road and Sidewalk Damage',
    location: 'Near Congressional Avenue',
    coordinates: [14.6585, 121.0195],
    status: 'Verified',
    description: 'Damaged pavement may make walking difficult.',
    date: 'November 22, 2026',
    time: '11:00 AM'
  },
  {
    id: 4,
    category: 'Unauthorized Street Occupation',
    location: 'Near Muñoz Road',
    coordinates: [14.6565, 121.0190],
    status: 'Under Review',
    description: 'A portion of the public walkway appears to be occupied.',
    date: 'November 22, 2026',
    time: '1:20 PM'
  }
]

const categories = [
  'All Reports',
  'Double Parking',
  'Sidewalk Obstruction',
  'Unauthorized Street Occupation',
  'Road and Sidewalk Damage'
]

function IncidentMap() {
  const [selectedCategory, setSelectedCategory] =
    useState('All Reports')

  const filteredReports =
    selectedCategory === 'All Reports'
      ? sampleReports
      : sampleReports.filter(
          (report) => report.category === selectedCategory
        )

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
          Showing {filteredReports.length} of {sampleReports.length} reports
        </p>
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
