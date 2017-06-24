<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Open Tree Map - Bengaluru</title>
  <meta name="description" content="OpenStreetMap Bengaluru Tree Map">
  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
  <link rel='shortcut icon' href='http://www.gubbilabs.in/sites/default/files/nitobe_favicon_0_0.ico' type='image/x-icon'>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v1.0.0/mapbox-gl-geocoder.js'></script>
  <link rel='stylesheet' href='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v1.0.0/mapbox-gl-geocoder.css' type='text/css' />
  <link href="https://www.mapbox.com/base/latest/base.css" rel="stylesheet">
	<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.37.0/mapbox-gl.css' rel='stylesheet' />
</head>

<style type="text/css">
.mapname{
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  z-index: 6;
  margin: 20px;
  width: 30%;
}
.mapname h3 {
  font-size: 18px;
  line-height: 20px;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
#sidebar{
  background:rgba(40, 53, 61, 0.23);
}
.toggles {
  width: 320px;
}
.info {
  width: 320px;
  color: white;
}
.fill-darkblue-opaque {
  background-color: rgba(34, 59, 83, 0.4);
}
.button.stroke:hover {
  background-color: #3887be !important;
  color: rgb(255, 255, 255) !important;
}
.button.stroke {
  box-shadow: 0px 0px 0px 2px #223b53 inset !important;
  color: white;
}
.micro{
  font-weight: bold;
}
.mapboxgl-popup-close-button{
  font-size: x-large;
}
.mapboxgl-popup {
  width: auto;;
}
  
</style>
<body>
<!--[if lt IE 8]>
  <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<div class='mapname'>
<div class="dark">
  <h3 class='fancy' style="color:#fff;" >Open Tree Map - Bengaluru</h3>
</div>
<div class='pad1y left'>
	  <a href='index.html' class='icon home button'>Home</a> <br/><br/>
	  <a href='streets.html' class='icon marker button'>Streets</a>
</div>
</div>
  <div class='col12 clearfix'>
    <div id='map' class=''></div>    
  </div>
 
   <script>
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ViYmlsYWJzIiwiYSI6IndJUmJRVHMifQ.4IS56e-5f2uZBSc8soyrQA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/gubbilabs/ciydoyf7d00012sntubulqmeq', // stylesheet satellite
    center: [77.60, 12.98], // starting position
    zoom: 12, // starting zoom
    hash: true,
    attributionControl: false
});
	   var geolocate = map.addControl(new mapboxgl.Geolocate({
    position: 'bottom-right'
}));
map.addControl(new mapboxgl.Navigation());
</script>
</body>
</html>
