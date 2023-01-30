campgroundData = JSON.parse(campground);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campgroundData.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campgroundData.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campgroundData.title}</h3><p>${campgroundData.location}</p>`
            )
    )
    .addTo(map);