// Creacion del mapa y asignacion de la ubicacion principal
var map = L.map('map').setView([19.487479, -99.134408], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// Asignacion de marcadores (Nodos a tener en cuenta)
var markerUPIITA = L.marker([19.51132499810658, -99.12652589999172]).addTo(map)
var markerMetro = L.marker([19.487479, -99.134408]).addTo(map)
var markerRaza = L.marker([19.468806, -99.139929]).addTo(map)

// Marcador en los Nodos
markerMetro.bindPopup("Nodo Metro Lindavista").openPopup()
markerRaza.bindPopup("Nodo La Raza").openPopup()
markerUPIITA.bindPopup("Nodo UPIITA").openPopup()

// Definir el popup como una variable global para usarlo despues
var popup = L.popup()

// Funcion para desplegar coordenadas al hacer click en el mapa
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Coordenadas: " + e.latlng.toString())
        .openOn(map)
}
map.on('click', onMapClick)

// Funcion para actualizar el sidebar con los detalles del marcador
function updateSidebar(markerInfo, temperature) {
    var sidebar = document.getElementById('marker-details')
    sidebar.innerHTML = `
        <p><strong>Nombre:</strong> ${markerInfo.name}</p>
        <p><img class="imagenNodo" src="${markerInfo.imagen}" alt="${markerInfo.id}"/></p>
        <p><strong>Coordenadas:</strong> ${markerInfo.coords.lat}, ${markerInfo.coords.lng}</p>
        <p><strong>Temperatura:</strong> ${temperature} °C</p>
    `
}

// Funcion para obtener el clima
async function getWeather(lat, lng) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
    const data = await response.json()
    return data.current_weather.temperature
}

// Eventos de clic en los marcadores para mostrar detalles de los Nodos en el Sidebar
markerUPIITA.on('click', async function(e) {
    var markerUPIITAInfo = {
        id: "markerUPIITA",
        name: "Nodo UPIITA",
        imagen: "/images/upiita.jpg",
        coords: e.latlng
    }
    const temperature = await getWeather(e.latlng.lat, e.latlng.lng)
    updateSidebar(markerUPIITAInfo, temperature)
})

markerMetro.on('click', async function(e) {
    var markerMetroInfo = {
        id: "markerMetro",
        name: "Nodo Metro Lindavista",
        imagen: "/images/lindavista.jpeg",
        coords: e.latlng
    }
    const temperature = await getWeather(e.latlng.lat, e.latlng.lng)
    updateSidebar(markerMetroInfo, temperature)
})

markerRaza.on('click', async function(e) {
    var markerRazaInfo = {
        id: "markerRaza",
        name: "Nodo La Raza",
        imagen: "/images/raza.jpg",
        coords: e.latlng
    }
    const temperature = await getWeather(e.latlng.lat, e.latlng.lng)
    updateSidebar(markerRazaInfo, temperature)
})