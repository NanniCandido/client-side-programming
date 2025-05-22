(function(){

    //create map in leaflet and tie it to the div called 'theMap'
    const map = L.map('theMap').setView([44.650627, -63.597140], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

   // L.marker([44.650690, -63.596537]).addTo(map)
   //     .bindPopup('This is a sample popup. You can put any html structure in this including extra bus data. You can also swap this icon out for a custom icon. A png file has been provided for you to use if you wish.')
   //     .openPopup();

    let markers = L.layerGroup().addTo(map); // Create a layer group to hold markers

        function fetchData() {
            fetch('https://prog2700.onrender.com/hrmbuses')
                .then(response => response.json())
                .then(data => {

                    // show the data just to check
                    console.log(data.entity);

                    // filter the bus routes from 1 to 10
                    const filteredData = data.entity.filter(bus => bus.vehicle.trip.routeId >= 1 && bus.vehicle.trip.routeId <= 10);
                    
                    // Clear previous markers
                    markers.clearLayers();
    
                    // configure the data into GeoJSON format
                    const geoJSONData = {
                        type: "FeatureCollection",                    
                        features: filteredData.map(bus => ({
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [bus.vehicle.position.longitude, bus.vehicle.position.latitude] 
                            },
                            properties: {
                                id: bus.id,
                                route: bus.vehicle.trip.routeId,
                                tripId: bus.vehicle.trip.tripId,
                                startDate: bus.vehicle.trip.startDate,
                                bearing: bus.vehicle.position.bearing
                            }
                        }))
                    };
    
                    // Add new markers from GeoJSON data
                    L.geoJSON(geoJSONData, {
                        pointToLayer: function (feature, latlng) {
                            return L.marker(latlng, {
                                icon: L.icon({
                                    iconUrl: 'bus.png', // Set custom bus icon
                                    iconSize: [30, 30], // Size of the icon
                                    iconAnchor: [20, 20] // Center point of the icon
                                }),
                                // Rotation angle based on bearing
                                rotationAngle: feature.properties.bearing                               
                            }).bindPopup(`Bus ID: ${feature.properties.id}<br>Route: ${feature.properties.route}<br>Trip Id: ${feature.properties.tripId}<br>Start Date: ${feature.properties.startDate}`);
                        }
                    }).addTo(markers);
                })
                .catch(error => console.error('Error fetching data:', error))
                .finally(() => {
                    // Schedule next fetch after 60 seconds
                    setTimeout(fetchData, 60000);
                });                ;
        }  
        fetchData(); // Initial fetch
    
})()