
import { useState } from 'react'
import './App.css'

function App() {
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [evidence, setEvidence] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()

    setSubmitted(true)

   console.log({
    category,
    location,
    description,
    evidence
  })
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
                    setSubmitted(false)
                  }}
                >
                  Submit Another Report
                  setEvidence(null)
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

                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  type="text"
                  placeholder="Enter street, landmark, or address"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                  required
                />

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
                  <p>Selected photo: {evidence.name}</p>
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

          <div className="map-placeholder">
            <p>Interactive Map Coming Soon</p>
          </div>
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
