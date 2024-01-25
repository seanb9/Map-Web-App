let map;
let directionsService;
let directionsRenderer;
let currentLocationAutocomplete;
let destinationAutocomplete;

// Ensure that the initMap function is available globally
window.initMap = function () {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Set up autocomplete for current location
    const currentLocationInput = document.getElementById("currentLocation");
    currentLocationAutocomplete = new google.maps.places.Autocomplete(currentLocationInput);

    // Set up autocomplete for destination
    const destinationInput = document.getElementById("destination");
    destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
};

function useCurrentLocation(inputId) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const inputElement = document.getElementById(inputId);
                inputElement.value = `${position.coords.latitude}, ${position.coords.longitude}`;
            },
            (error) => {
                alert(`Error getting current location: ${error.message}`);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function findRoute() {
    const currentLocation = document.getElementById("currentLocation").value;
    const destination = document.getElementById("destination").value;
    const mode = document.getElementById("mode").value;

    if (!currentLocation || !destination) {
        alert("Please enter both current location and destination");
        return;
    }

    const request = {
        origin: currentLocation,
        destination: destination,
        travelMode: google.maps.TravelMode[mode],
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            displayRouteDuration(result.routes[0].legs[0].duration.text);
        } else if (status == google.maps.DirectionsStatus.NOT_FOUND) {
            alert("One or more locations could not be found.");
        } else if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
            alert("No route could be found between the current location and the destination.");
        } else {
            alert("Error in finding the route: " + status);
        }
    });
}

function displayRouteDuration(duration) {
    const durationElement = document.getElementById("duration");
    durationElement.textContent = `Estimated Duration: ${duration}`;
}

function viewDestinationInfo() {
    const destination = document.getElementById("destination").value;
    if (destination) {
        const url = `destination-info.html?destination=${encodeURIComponent(destination)}`;
        window.location.href = url;
    } else {
        alert("Please enter a destination before viewing information.");
    }
}

function clearMap() {
    document.getElementById("currentLocation").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("duration").textContent = "";

    // Clear the map and directions
    directionsRenderer.setMap(null);
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}
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
