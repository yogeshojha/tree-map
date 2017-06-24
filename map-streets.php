<!DOCTYPE html>
<html>

<?php 
  include('includes/header.php');
?>
  
<body id="map">


      <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#">Open Tree Map Bengaluru</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li><a href='index.php' class='icon home'>Home</a></li>
      <li><a href='map-satellite.php' class='icon marker'>Satellite</a></li>
      </ul>
    </div>
  </div>
</nav>
  <script src="build-streets.js"></script>
</body>
</html>
