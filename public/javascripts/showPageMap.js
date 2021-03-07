mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/light-v10', // style URL
center: JSON.parse(campground).geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(JSON.parse(campground).geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<br/><h6>${JSON.parse(campground).title}</h6><p>${JSON.parse(campground).location}</p>`
        )
    )
    .addTo(map);