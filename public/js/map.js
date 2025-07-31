document.addEventListener("DOMContentLoaded", () => {
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates,
        zoom: 9,
    });
    // console.log(coordinates)
     // Create a default Marker and add it to the map.
   const marker = new mapboxgl.Marker({color: 'red'})
   .setLngLat(coordinates)
   .addTo(map)
   .setPopup(
        new mapboxgl.Popup({offset: 25}).setHTML(
            `<h4>${listingLocation}</h4><p>Exact location will be provided after booking.</p>`
        )
    )
    .addTo(map);
})
