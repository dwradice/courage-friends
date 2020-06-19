const shelterLocation = JSON.parse(
  document.getElementById('map').dataset.location
);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZHdyYWRpY2UiLCJhIjoiY2tiaWhjNDN3MGJ3ZDJycGZ3NGoycXUycCJ9.E3qEN9ZGD913WsZqNDEp2g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dwradice/ckbmfabcm1cua1ipabumw18sw',
  center: shelterLocation.coordinates,
  zoom: 10,
  scrollZoom: false,
});

new mapboxgl.Marker({
  color: '#2e0152',
})
  .setLngLat(shelterLocation.coordinates)
  .addTo(map);

new mapboxgl.Popup({
  offset: 30,
  closeButton: false,
  closeOnClick: false,
  className: 'map-popup',
})
  .setLngLat(shelterLocation.coordinates)
  .setHTML(
    `<h4>${shelterLocation.address.split('. ')[0]}.</h4>
    <h4>${shelterLocation.address.split('. ')[1]}.</h4>`
  )
  .setMaxWidth('200px')
  .addTo(map);
