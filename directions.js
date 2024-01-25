document.addEventListener('DOMContentLoaded', function () {
    // Set your Google Maps API key here
    const apiKey = 'AIzaSyDbKwgewOnR24Vd-5nzPUB67WkNm8PIkoc';
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    // Function to get directions from current location to destination
    function getDirections(currentLocation, destination, mode) {
        const request = {
            origin: currentLocation,
            destination: destination,
            travelMode: google.maps.TravelMode[mode],
        };

        directionsService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
                displayStepByStepDirections(result.routes[0].legs[0].steps);
            } else {
                console.error('Error in finding directions:', status);
            }
        });
    }

    // Function to display step-by-step directions
    function displayStepByStepDirections(steps) {
        const directionsElement = document.getElementById('directions');

        const stepsList = document.createElement('ol');
        steps.forEach(function (step) {
            const li = document.createElement('li');
            li.innerHTML = step.instructions;
            stepsList.appendChild(li);
        });

        directionsElement.appendChild(stepsList);
    }

    // Get current location from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const currentLocation = urlParams.get('currentLocation');
    const destination = urlParams.get('destination');
    const mode = urlParams.get('mode');

    if (currentLocation && destination && mode) {
        // Display directions if all parameters are present
        const directionsElement = document.getElementById('directions');
        
        // Call the function to get directions
        getDirections(currentLocation, destination, mode);
    } else {
        console.error('One or more parameters missing in the URL.');
    }
});
// directions.js

document.addEventListener('DOMContentLoaded', function () {
    // Your directions-related JavaScript logic goes here
    // For example, if you're displaying directions on this page,
    // you can retrieve directions data and update the UI.
    
    // Example: Displaying a sample direction
    const directionsElement = document.getElementById('directions-info');
    if (directionsElement) {
      const sampleDirections = 'Head northwest on Main St...'; // Replace with actual directions
      directionsElement.innerHTML = sampleDirections;
    } else {
      console.error('Directions info element not found.');
    }
  });
  // Add this function to toggle between light and dark themes
function toggleDarkTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
  }
  
  function toggleDarkTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Save the user's theme preference
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
  }
  
  // Check user's saved preference on page load
  document.addEventListener('DOMContentLoaded', function () {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    const body = document.body;
    if (isDarkTheme) {
      body.classList.add('dark-theme');
    }
  });
  