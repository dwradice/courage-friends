const shelterLocation = JSON.parse(
  document.getElementById('map').dataset.location
);

mapboxgl.accessToken =
  'pk.eyJ1IjoiZHdyYWRpY2UiLCJhIjoiY2tiaWhjNDN3MGJ3ZDJycGZ3NGoycXUycCJ9.E3qEN9ZGD913WsZqNDEp2g';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dwradice/ckau5q3yt1eo51is1krajn3wn', // stylesheet location
  center: shelterLocation.coordinates,
  zoom: 10,
  scrollZoom: false,
});

new mapboxgl.Marker({
  color: '#2e0152',
})
  .setLngLat(shelterLocation.coordinates)
  .addTo(map);
