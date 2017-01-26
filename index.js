var MapboxClient = require('mapbox/lib/services/datasets');
var dataset = 'ciydajj8h008m33qrmu9gch34';
var DATASETS_BASE = 'https://api.mapbox.com/datasets/v1/gubbilabs/' + dataset + '/';
var mapboxAccessDatasetToken = 'sk.eyJ1IjoiZ3ViYmlsYWJzIiwiYSI6ImNpeWRhb2Q0YTAwODUzMnFyZ3ZndDZubGIifQ.IB9WEb26TGWsMSV9n18Txg';
var mapbox = new MapboxClient(mapboxAccessDatasetToken);

var reviewer;
var treename;
var height;
var girth;
var canopywidth;
var confidence;

var _tmp = {};

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ViYmlsYWJzIiwiYSI6IndJUmJRVHMifQ.4IS56e-5f2uZBSc8soyrQA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/gubbilabs/cihmv3zoq006qbjkna9pr33ny', //stylesheet location
    center: [77.64, 12.98], // starting position
    zoom: 16, // starting zoom
    hash: true,
    attributionControl: false
});

var geolocate = map.addControl(new mapboxgl.Geolocate({
    position: 'bottom-right'
}));
map.addControl(new mapboxgl.Navigation());

map.addControl(new mapboxgl.GeolocateControl());

// Layer for review markers
var overlayDataSource = new mapboxgl.GeoJSONSource({
    data: {}
});

var overlayData = {
    'id': 'overlayData',
    'type': 'circle',
    'source': 'overlayDataSource',
    'interactive': true,
    'layout': {
        visibility: 'visible'
    },
    'paint': {
        'circle-radius': 15,
        'circle-color': '#5deb5e',
        'circle-blur': .9
    }
};

// Map ready
map.on('style.load', function(e) {
    init();


    function init() {

        addGeolocationMarker();

        map.addSource('overlayDataSource', overlayDataSource);
        map.addLayer(overlayData);
        getOverlayFeatures();

        map.on('click', function(e) {

            // Add review marker
            var newOverlayFeature = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "coordinates": [

                    ],
                    "type": "Point"
                }
            };

            var clickedOverlayFeatures = map.queryRenderedFeatures([
                [e.point.x - 5, e.point.y - 5],
                [e.point.x + 5, e.point.y + 5]
            ], {
                layers: ['overlayData']
            });
            if (clickedOverlayFeatures.length) {
                overlayFeatureForm(clickedOverlayFeatures[0]);

            } else {
                overlayFeatureForm();
            }

            function overlayFeatureForm(feature) {
                var formOptions = "<div class='radio-pill pill pad1y clearfix'><input id='valid' type='radio' name='review' value='tree' checked='checked'><label for='tree' class='short button icon check fill-green'>tree</label><input id='sapling' type='radio' name='review' value='sapling'><label for='sapling' class='short button icon check fill-red'>sapling</label></div>";
				
				var formTreename = "<fieldset><label>Tree Name: <span id='treename' style='padding:5px;background-color:#eee'></span></label><input type='text' name='treename' placeholder='treename'></input></fieldset>"
				
				var formHeight = "<fieldset><label>Height: <span id='height' style='padding:5px;background-color:#eee'></span></label><input type='text' name='height' placeholder='height'></input></fieldset>"
				
				var formGirth = "<fieldset><label>Girth: <span id='girth' style='padding:5px;background-color:#eee'></span></label><input type='text' name='girth' placeholder='girth'></input></fieldset>"
				
				var formCanopywidth = "<fieldset><label>Canopy width: <span id='canopywidth' style='padding:5px;background-color:#eee'></span></label><input type='text' name='canopywidth' placeholder='canopywidth'></input></fieldset>"

                var formConfidence = "<div class='radio-pill pill pad1y clearfix'><input id='valid' type='radio' name='confidence' value='yes' checked='checked'><label for='yes' class='short button icon check fill-green'>Yes</label><input id='no' type='radio' name='review' value='no'><label for='no' class='short button icon check fill-red'>No</label></div>";
				
				var formReviewer = "<fieldset><label>Contributed by: <span id='reviewer' style='padding:5px;background-color:#eee'></span></label><input type='text' name='reviewer' placeholder='name'></input></fieldset>"
                var popupHTML = "<form>" + formOptions + formReviewer + "<a id='updateOverlayFeature' class='button col4' href='#'>Save</a><a id='deleteOverlayFeature' class='button quiet fr col4' href='#' style=''>Delete</a></form>";
                var popup = new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(popupHTML)
                    .addTo(map);

                // Show existing status if available
                if (feature) {
                    $("input[name=review][value=" + feature.properties["natural"] + "]").prop('checked', true);
					$("#reviewer").html(feature.properties["contributed_by"]);
                    
					$("#treename").html(feature.properties["treename"]);
                    
					newOverlayFeature = feature;
                    newOverlayFeature["id"] = feature.properties["id"];
                    console.log(feature);
                } else {
                    newOverlayFeature.geometry.coordinates = e.lngLat.toArray();
                }

                // Set reviewer name if previously saved
                if (reviewer) {
                    $("input[name=reviewer]").val(reviewer);
                }

                // Update dataset with feature status on clicking save
                document.getElementById("updateOverlayFeature").onclick = function() {
                    newOverlayFeature.properties["natural"] = $("input[name=review]:checked").val();

                    reviewer = $("input[name=reviewer]").val();
                    newOverlayFeature.properties["contributed_by"] = reviewer;
					
					treename = $("input[name=treename]").val();
                    newOverlayFeature.properties["treename"] = treename;
					
					height = $("input[name=height]").val();
                    newOverlayFeature.properties["height"] = height;
					
					girth = $("input[name=rgirth]").val();
                    newOverlayFeature.properties["girth"] = girth;
					
					canopywidth = $("input[name=canopywidth]").val();
                    newOverlayFeature.properties["canopywidth"] = canopywidth;

                    newOverlayFeature.properties["confidence"] = $("input[name=confidence]:checked").val();
					
                    popup.remove();
                    mapbox.insertFeature(newOverlayFeature, dataset, function(err, response) {
                        console.log(response);
                        overlayFeatureCollection.features = overlayFeatureCollection.features.concat(response);
                        overlayDataSource.setData(overlayFeatureCollection);
                    });
                };
                // Delete feature on clicking delete
                document.getElementById("deleteOverlayFeature").onclick = function() {
                    popup.remove();
                    mapbox.deleteFeature(newOverlayFeature["id"], dataset, function(err, response) {
                        console.log(response);
                    });
                };
            }

        });

    }


    // Get data from a Mapbox dataset
    var overlayFeatureCollection = {
        'type': 'FeatureCollection',
        'features': []
    };

    function getOverlayFeatures(startID) {

        var url = DATASETS_BASE + 'features';
        var params = {
            'access_token': mapboxAccessDatasetToken
        };

        // Begin with the last feature of previous request
        if (startID) {
            params.start = startID;
        }

        $.getJSON(url, params, function(data) {

            console.log(data);

            if (data.features.length) {
                data.features.forEach(function(feature) {
                    // Add dataset feature id as a property
                    feature.properties.id = feature.id;
                });
                overlayFeatureCollection.features = overlayFeatureCollection.features.concat(data.features);
                var lastFeatureID = data.features[data.features.length - 1].id;
                getOverlayFeatures(lastFeatureID);
                overlayDataSource.setData(overlayFeatureCollection);
            }
            overlayDataSource.setData(overlayFeatureCollection);
        });
    }

});

// Toggle visibility of a layer
function toggle(id) {
    var currentState = map.getLayoutProperty(id, 'visibility');
    var nextState = currentState === 'none' ? 'visible' : 'none';
    map.setLayoutProperty(id, 'visibility', nextState);
}

// Toggle a set of filters for a set of layers
function toggleLayerFilters(layerItems, filterItem) {

    for (var i in layerItems) {
        for (var j in toggleLayers[layerItems[i]].layers) {

            var existingFilter = map.getFilter(toggleLayers[layerItems[i]].layers[j]);

            // Construct and add the filters if none exist for the layers
            if (typeof existingFilter == 'undefined') {
                map.setFilter(toggleLayers[layerItems[i]].layers[j], toggleFilters[filterItem].filter);
            } else {
                // Not implemented
                var newFilter = mergeLayerFilters(existingFilter, toggleFilters[filterItem].filter);
                map.setFilter(toggleLayers[layerItems[i]].layers[j], newFilter);
                // console.log(newFilter);
            }

        }
    }
}

function addGeolocationMarker() {
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });

    // Listen for the `geocoder.input` event that is triggered when a user
    // makes a selection and add a marker that matches the result.
    geolocate.on('result', function(ev) {
        map.getSource('single-point').setData(ev.result.geometry);
    });
}
