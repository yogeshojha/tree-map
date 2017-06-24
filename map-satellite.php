<!DOCTYPE html>
<html>

<?php
  include('includes/header.php');
?>
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
	  <a href='map-streets.html' class='icon marker button'>Streets</a>
</div>
</div>
  <div class='col12 clearfix'>
    <div id='map' class=''></div>    
  </div>
 
  <script src="build-satellite.js"></script>
</body>
</html>
