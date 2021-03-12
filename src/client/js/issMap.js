


const mymap = L.map('issMap').setView([0, 0], 10);
let marker = L.marker([0, 0]).addTo(mymap);


const mkmp = (lat, lan) => {

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {
        attribution,
    });

    tiles.addTo(mymap)

    marker.setLatLng([lat, lan]);
    var latLngs = [marker.getLatLng()];
    var markerBounds = L.latLngBounds(latLngs);
    mymap.fitBounds(markerBounds);

}
export { mkmp }




// const mymap = L.map('issMap').setView([0, 0], 8);


// const mkmp = (lat, lan) => {
//     let marker = L.marker([0, 0]).addTo(mymap);

//     marker = L.marker([lat, lan]).addTo(mymap);

//     const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//     const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
//     const tiles = L.tileLayer(tileUrl, {
//         attribution,
//     });

//     tiles.addTo(mymap)

//     marker.setLatLng([lat, lan]);
//     var latLngs = [marker.getLatLng()];
//     var markerBounds = L.latLngBounds(latLngs);
//     mymap.fitBounds(markerBounds);
// }