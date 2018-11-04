
mapboxgl.accessToken = 'pk.eyJ1IjoibGVuYWVtYXlhIiwiYSI6ImNpa3VhbXE5ZjAwMXB3eG00ajVyc2J6ZTIifQ.kmZ4yVcNrupl4H8EonM3aQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/lenaemaya/cjnwzrci100a32ro9ukssqg83',
  center: [37.62723840, 55.8291615], 
  zoom: 13,
  minZoom: 12
});



map.on('load', () => {
  map.addSource('exits', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/exits_vdnh.geojson",
  });

  map.addSource('iso_exits', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/isochrones_big.geojson",
    });

  map.addSource('ridership', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/ridership_small.geojson",
  });

  map.addSource('house', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/house_pop.geojson",
  });
  
  map.addSource('hole', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/isochrone_hole.geojson",
  });
  
  map.addSource('metro', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/metro_pass.geojson",
	});
    

  map.addLayer({
    id: 'hole3',
    type: 'fill',
    source: 'hole',
    layout: {
      visibility: "none",
    },
    paint: {
      'fill-color': '#F67280',
      'fill-opacity': 0.045,
      'fill-antialias': false
    }
  },'park-border-2');
    
  map.addLayer({
    id: 'population',
    type: 'fill',
    source: 'house',
    layout: {
      visibility: "none",
    },
    paint: {
      'fill-color':  [ 
                    "step", 
                    [ 
                        "get", 
                        "sumpopulat"
                    ], 
                    "#ffc34d", 
                    14, 
                    "#ff4916", 
                    35, 
                    "#de0032", 
                    73, 
                    "#a70070", 
                    135, 
                    "#630070"
                ]
    }
  },'park-border-2');


  
  
  map.addLayer({
    id: 'hole2',
    type: 'line',
    source: 'hole',
    layout: {
      visibility: "none",
      'line-join': 'round'
    },
    paint: {
      'line-color': '#F67280',
      'line-width': 3
      
    }
  },'park-border-2');




  map.addLayer({
    id: 'hole',
    type: 'line',
    source: 'hole',
    layout: {
      visibility: "none",
      'line-join': 'round'
    },
    paint: {
      'line-color': 'rgba(255,255,255,1)',
      'line-width': 0.5
    }
  },'park-border-2');

  map.addLayer({
    id: "ridership_budni",
    type: "circle",
    filter: [
    "all",
    [
      "in",
      "$type",
      "Polygon",
      "LineString",
      "Point"
    ],
    [
      "all",
      ["!in", "ridership", 0],
      ["in", "g_day", 0],
      ["in", "g_hour", -1]
    ]
  ],
    source: "ridership",
    layout: {
      visibility: "none",
    },
    paint: {
      'circle-color': "#7d7bf4",
      'circle-opacity': 0.75,
      'circle-radius': [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    [
      "interpolate",
      ["linear"],
      ["get", "ridership"],
      0,
      3,
      8079,
      25
    ],
    22,
    [
      "interpolate",
      ["linear"],
      ["get", "ridership"],
      0,
      6,
      8079,
      45
    ]
  ]
    }
  });
   
  map.addLayer({
    id: "ridership_ne_budni",
    type: "circle",
    filter: [
    "all",
    [
      "in",
      "$type",
      "Polygon",
      "LineString",
      "Point"
    ],
    [
      "all",
      ["!in", "ridership", 0],
      ["in", "g_day", 1],
      ["in", "g_hour", -1]
    ]
  ],
    source: "ridership",
    layout: {
      visibility: "none",
    },
    paint: {
      'circle-color': "#f47bb2",
      'circle-opacity': 0.75,
      'circle-radius': [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    [
      "interpolate",
      ["linear"],
      ["get", "ridership"],
      0,
      3,
      8079,
      25
    ],
    22,
    [
      "interpolate",
      ["linear"],
      ["get", "ridership"],
      0,
      6,
      8079,
      45
    ]
  ]
    }
  });

  map.addLayer({
    id: 'metro_pass',
    type: "circle",
    source: 'metro',
    layout: {
      visibility: "none",
    },
    paint: {
      'circle-color': "#F16660",
      'circle-opacity': 0.5,
      'circle-radius': [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    [
      "interpolate",
      ["linear"],
      ["get", "ridership"],
      389,
      4,
      60426,
      35
    ],
    22,
    [
      "interpolate",
      ["linear"],
      ["get", "ridership"],
      389,
      9,
      60426,
      55
    ]
  ]}
  }, 'metro');



map.addLayer({
  id: "exits_1",
  type: "symbol",
  source: "exits",
  layout: {
    "icon-image": "exit-click-2",
    "icon-size": [
      "interpolate",
      ["linear"],
      ["zoom"],
      10,
      0.5,
      22,
      1
    ],
    "icon-rotate": [
      "match",
      ["get", "id"],
      [7],
      215,
      [2],
      0,
      [3],
      362,
      [4],
      30,
      [5],
      83,
      [6],
      86,
      [8],
      318,
      [9],
      297,
      [10],
      226,
      [11],
      12,
      [12],
      308,
      [13],
      320,
      [14],
      250,
      [1],
      14,
      0
    ]
  }, "filter": ["in", "id", ""]
});


map.addLayer({
  id: "iso_light-line",
  type: "line",
  source: "iso_exits",
  paint: {
    "line-color": [ 
        "match", 
        [ 
            "get", 
            "time"
        ], 
        12, 
        "#C06C84", 
        24, 
        "#F67280", 
        "#F8B195"
    ],
    "line-opacity": 0.6,
    "line-width": 0.5,
  },"filter": ["in", "id", ""] 
},'foursquare');

map.addLayer({
  id: "iso_light",
  type: "fill",
  source: "iso_exits",
  paint: {
    "fill-color": 
      [ 
        "match", 
        [ 
            "get", 
            "time"
        ], 
        12, 
        "#C06C84", 
        24, 
        "#F67280", 
        "#F8B195"
    ],
    "fill-opacity": 0.35,
      
  },"filter": ["in", "id", ""]
  },'foursquare');
});




map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['exits']});
        var filter = features.reduce(function(memo, feature) {
            memo.push(feature.properties.id);
            return memo;
        }, ['in', 'id']);
        map.setFilter("iso_light", filter);
        map.setFilter("iso_light-line", filter);
        map.setFilter("exits_1", filter);
});






toggleLayer('8', ['hole', 'hole2', 'hole3', 'population'], 'Население в 30минутной изохроне');
toggleLayer('4', ['ngpt-stops'], 'Остановки НГПТ');
toggleLayer('3', ['underground-parking', 'underground-parking-pattern','parking', 'parking-point-2', 'parking-line-symbol' ], 'Парковки');
toggleLayer('6',['ridership_budni'], 'Пассажиропоток в будни');
toggleLayer('7',['ridership_ne_budni'], 'Пассажиропоток в выходные');
toggleLayer('10',['metro_pass'], 'Пассажиропотоки метро');
toggleLayer('5',['foursquare'], 'Данные foursquare');
toggleLayer('9',['poi-all-1', 'poi-all-2'], 'POI');
toggleLayer('1', ['strava_all'], 'Спорт летом');
toggleLayer('2', ['strava_winter'], 'Спорт зимой');




 function toggleLayer(id, ids, name) {
        var button = document.createElement('a');
        button.textContent = name;
        //console.log(id);
        
        button.onclick = function (e) {

          for (layers in ids) {
            var visibility = map.getLayoutProperty(ids[layers], 'visibility');
            if (visibility === 'visible') {
              map.setLayoutProperty(ids[layers], 'visibility', 'none');
              this.className = '';
              
            } else {
              this.className = 'active';
              map.setLayoutProperty(ids[layers], 'visibility', 'visible');
              
            }
          }
        };
        var layers = document.getElementById('menu');
        layers.appendChild(button);
  };
 

map.on('click', 'poi-all-1', function (e) {
  var coordinates = e.features[0].geometry.coordinates.slice();
  var description = e.features[0].properties.type
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});

map.on('mouseenter', 'exits', function () {
  map.getCanvas().style.cursor = 'pointer';
});

   
map.on('mouseleave', 'exits', function () {
map.getCanvas().style.cursor = '';
});

map.on('mouseenter', 'poi-all-1', function () {
  map.getCanvas().style.cursor = 'pointer';
});

   
map.on('mouseleave', 'poi-all-1', function () {
map.getCanvas().style.cursor = '';
});

