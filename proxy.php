<?php
// Get the API key from a secure location (not directly in the code)
function getApiKey() {
    return 'AIzaSyDbKwgewOnR24Vd-5nzPUB67WkNm8PIkoc';
}

// Set the CORS header
header("Access-Control-Allow-Origin: *");

// Get the destination parameter from the query string
$destination = urlencode($_GET['destination']);

// Make the request to Google Places API
$apiUrlPlaceID = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={$destination}&inputtype=textquery&fields=place_id&key=" . getApiKey();
$response = file_get_contents($apiUrlPlaceID);

// Return the response
echo $response;
?>
