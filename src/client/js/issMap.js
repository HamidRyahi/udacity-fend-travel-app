function makeMap(lat, lan) {
    const mymap = L.map('issMap').setView([0, 0], 0.5);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {
        attribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
    });

    tiles.addTo(mymap)

    const marker = L.marker([0, 0]).addTo(mymap);

    marker.setLatLng([lat, lan]);
}

export { makeMap }
