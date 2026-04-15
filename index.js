// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Get DOM elements
const stateInput = document.getElementById('state-input')
const fetchButton = document.getElementById('fetch-alerts')
const alertsDisplay = document.getElementById('alerts-display')
const errorMessage = document.getElementById('error-message')

// Add event listener to button
fetchButton.addEventListener('click', handleFetchAlerts)

// Handle fetch alerts
async function handleFetchAlerts() {
  const stateAbbr = stateInput.value.trim()
  
  // Clear previous error
  errorMessage.textContent = ''
  errorMessage.classList.add('hidden')
  
  try {
    // Fetch alerts for the given state
    const response = await fetch(weatherApi + stateAbbr)
    const data = await response.json()
    
    // Display alerts
    displayAlerts(data)
    
    // Clear the input field
    stateInput.value = ''
  } catch (error) {
    // Display error message
    errorMessage.textContent = error.message
    errorMessage.classList.remove('hidden')
  }
}

// Display alerts in the DOM
function displayAlerts(data) {
  const alertCount = data.features.length
  
  // Clear previous alerts
  alertsDisplay.textContent = ''
  
  // Create summary
  const summary = document.createElement('p')
  summary.textContent = `Weather Alerts: ${alertCount}`
  alertsDisplay.appendChild(summary)
  
  // Display each alert headline
  data.features.forEach(feature => {
    const headline = document.createElement('p')
    headline.textContent = feature.properties.headline
    alertsDisplay.appendChild(headline)
  })
}