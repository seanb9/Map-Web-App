document.addEventListener('DOMContentLoaded', function () {
    // Set your Google Maps API key here
    const apiKey = 'API_Key';
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    // Function to get top 5 restaurants near the destination
    function getTopRestaurants(location) {
        const request = {
            location: location,
            radius: 5000,  // Search within 5 kilometers
            types: ['restaurant'],
            rankBy: google.maps.places.RankBy.PROMINENCE,
        };

        placesService.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                displayRestaurants(results);
            } else {
                console.error('Error fetching restaurant data:', status);
            }
        });
    }

    // Function to display the top 5 restaurants with ratings
    function displayRestaurants(results) {
        const restaurantList = document.getElementById('restaurantList');
        results.slice(0, 5).forEach(function (place) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${place.name}</strong> - Rating: ${place.rating}`;
            restaurantList.appendChild(li);
        });
    }

    // Get the destination location from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    if (destination) {
        // Display the destination name
        const destinationElement = document.getElementById('destinationName');
        destinationElement.textContent = `Top 5 Restaurants Near ${destination}`;

        // Get the destination location using the Places Autocomplete
        const request = {
            query: destination,
            fields: ['geometry'],
        };

        placesService.findPlaceFromQuery(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const destinationLocation = results[0].geometry.location;
                // Call the function to get top 5 restaurants near the destination
                getTopRestaurants(destinationLocation);
            } else {
                console.error('Error finding destination location:', status);
            }
        });
    } else {
        console.error('Destination parameter not found in the URL.');
    }
});
// destination-info.js

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the destination from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');
  
    // Display the destination information on the page
    const destinationElement = document.getElementById('destination-info');
    if (destinationElement) {
      destinationElement.textContent = `Destination Information for: ${destination}`;
    } else {
      console.error('Destination info element not found.');
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
  
