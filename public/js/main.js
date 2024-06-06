// Creacion del mapa y asignacion de la ubicacion principal
var map = L.map('map').setView([19.51132499810658, -99.12652589999172], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Asignacion de marcadores
var marker = L.marker([19.51132499810658, -99.12652589999172]).addTo(map);

// Marcador en el nodo de la UPIITA
marker.bindPopup("Nodo Principal UPIITA").openPopup();

// Funcion para desplegar coordenadas al hacer click en el mapa
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Coordenadas: " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

// Funcion para actualizar el sidebar con los detalles del marcador
function updateSidebar(markerInfo) {
    var sidebar = document.getElementById('marker-details');
    sidebar.innerHTML = `
        <p><strong>Nombre:</strong> ${markerInfo.name}</p>
        <p><strong>Coordenadas:</strong> ${markerInfo.coords.lat}, ${markerInfo.coords.lng}</p>
    `;
}

// Evento de clic en el marcador para mostrar detalles en el sidebar
marker.on('click', function(e) {
    var markerInfo = {
        name: "Nodo Principal UPIITA",
        coords: e.latlng
    };
    updateSidebar(markerInfo);
});
