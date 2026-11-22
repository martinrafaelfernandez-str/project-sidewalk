
import { useState } from 'react'
import './App.css'
import IncidentMap from './components/IncidentMap'
import LocationPicker from './components/LocationPicker'

const initialReports = []

/*const initialReports = [
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
*/
function App() {
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [evidence, setEvidence] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const [coordinates, setCoordinates] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [reports, setReports] = useState(initialReports)
  const [showLocationPicker, setShowLocationPicker] = useState(false)

  function handleMapLocationSelect(selectedCoordinates) {
  setCoordinates(selectedCoordinates)

  setLocation(
    `${selectedCoordinates.latitude.toFixed(6)}, ${selectedCoordinates.longitude.toFixed(6)}`
  )
}

  function getCurrentLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.')
    return
  }


  setLocationLoading(true)

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      setCoordinates({
        latitude,
        longitude
      })

      setLocation(
        `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
      )

      setLocationLoading(false)
    },
    (error) => {
      console.error(error)
      alert('Unable to retrieve your location. Please enter it manually.')
      setLocationLoading(false)
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  )
}

  function handleSubmit(event) {
  event.preventDefault()

  const now = new Date()

  const newReport = {
    id: Date.now(),
    category,
    location,
    description,
    coordinates: coordinates
      ? [coordinates.latitude, coordinates.longitude]
      : null,
    status: 'Submitted',
    date: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    time: now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }),
    evidenceName: evidence ? evidence.name : null,
    evidenceUrl: evidence ? URL.createObjectURL(evidence) : null
  }

  setReports((previousReports) => [
    newReport,
    ...previousReports
  ])

  setSubmitted(true)

  console.log('New report:', newReport)
}

  return (
    <div className="app">

      <header className="navbar">
        <h2>SIDEWALK.</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#reports">Reports</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-button" href="#report-form">
          Report an Issue
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">
            COMMUNITY STREET REPORTING
          </p>

          <h1>
            Better Streets.<br />
            Safer Sidewalks.
          </h1>

          <p className="description">
            Help make our community safer by reporting
            blocked sidewalks, double parking, and other
            street obstructions.
          </p>

          <a className="primary-button" href="#report-form">
            Submit a Report
          </a>
        </section>

        <section className="report-section" id="report-form">
          <div className="report-container">

            <h2>Report a Street Issue</h2>

            <p>
              Help us identify problems affecting
              pedestrians in your community.
            </p>

            {submitted ? (
              <div className="success-message">
                <h3>Report Submitted!</h3>
                <p>
                  Your report has been received in this
                  demo. It has not been saved to a server.
                </p>
                <button
                  onClick={() => {
                    setCategory('')
                    setLocation('')
                    setDescription('')
                    setShowLocationPicker(false)
                    setSubmitted(false)
                    setEvidence(null)
                    setCoordinates(null)
                    setLocationLoading(false)
                  }}
                >
                  Submit Another Report
                  
                  
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                <label htmlFor="category">
                  Issue Category
                </label>

                <select
                  id="category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  required
                >
                  <option value="">Select an issue</option>
                  <option value="Double Parking">
                    Double Parking
                  </option>
                  <option value="Sidewalk Obstruction">
                    Sidewalk Obstruction
                  </option>
                  <option value="Unauthorized Street Occupation">
                    Unauthorized Street Occupation
                  </option>
                  <option value="Road and Sidewalk Damage">
                    Road and Sidewalk Damage
                  </option>
                </select>
                  
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={locationLoading}
                  >
                    {locationLoading ? 'Getting location...' : 'Use My Current Location'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowLocationPicker(!showLocationPicker)}
                  >
                    {showLocationPicker
                      ? 'Close Map'
                      : 'Select Location on Map'}
                  </button>
                <label htmlFor="location">
                  
                  {showLocationPicker && (
                <LocationPicker
                  selectedCoordinates={coordinates}
                  onSelect={handleMapLocationSelect}
                />
              )}

                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  placeholder="Enter street, landmark, or address"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value)
                    setCoordinates(null)
                  }}
                  required
                />

                {coordinates && (
                  <p>
                    GPS Coordinates: {coordinates.latitude.toFixed(6)},
                    {coordinates.longitude.toFixed(6)}
                  </p>
                )}

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Describe what you observed..."
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  required
                  rows="5"
                />

                <label htmlFor="evidence">
                  Evidence Photo (Optional)
                </label>

                <input
                  id="evidence"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(event) => {
                    const file = event.target.files[0]

                    if (file && file.size > 5 * 1024 * 1024) {
                      alert('Image must be 5 MB or smaller.')
                      event.target.value = ''
                      setEvidence(null)
                      return
                    }

                    setEvidence(file || null)
                  }}
                />

               {evidence && (
                <div className="evidence-preview">
                  <p>Selected photo: {evidence.name}</p>

                  <img
                    src={URL.createObjectURL(evidence)}
                    alt="Selected report evidence"
                  />
                </div>
              )}
                <button
                  type="submit"
                  className="primary-button"
                >
                  Submit Report
                </button>

              </form>
            )}

          </div>
        </section>

        <section className="map-section" id="reports">
          <h2>Community Incident Map</h2>

          <p>
            Explore reported street and sidewalk
            obstructions around your community.
          </p>

          <IncidentMap reports={reports} />
        </section>

        <section className="about" id="about">
          <h2>Every report makes a difference.</h2>
          <p>
            Together, we can help identify recurring
            street problems and improve pedestrian
            accessibility.
          </p>
        </section>
      </main>

      <footer>
        Project SIDEWALK © 2026
      </footer>

    </div>
  )
}

export default App
