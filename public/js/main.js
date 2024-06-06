var map = L.map('map').setView([19.51132499810658, -99.12652589999172], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

var marker = L.marker([19.51132499810658, -99.12652589999172]).addTo(map);

marker.bindPopup("Nodo Principal UPIITA").openPopup();
//circle.bindPopup("I am a circle.");
//polygon.bindPopup("I am a polygon.");

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("La latitud y longitud es de: " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);