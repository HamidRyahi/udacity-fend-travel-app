const mymap = L.map('issMap').setView([0, 0], 1);
let marker = L.marker([0, 0]).addTo(mymap);


const mkmp = (lat, lan) => {

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {
        attribution,
    });

    tiles.addTo(mymap)

    marker.setLatLng([lat, lan]);
    mymap.setView([lat, lan], 8);



}
export { mkmp }
