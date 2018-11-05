
mapboxgl.accessToken = 'pk.eyJ1IjoibGVuYWVtYXlhIiwiYSI6ImNpa3VhbXE5ZjAwMXB3eG00ajVyc2J6ZTIifQ.kmZ4yVcNrupl4H8EonM3aQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/lenaemaya/cjnwzrci100a32ro9ukssqg83',
  center: [37.62723840, 55.8291615], 
  zoom: 13,
  minZoom: 9
});



map.on('load', () => {
  map.addSource('exits', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/exits_vdnh.geojson",
  });

  map.addSource('isochrones', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/isochrones_big.geojson",
  });

  // map.addSource('iso_24', {
  //   type: 'geojson',
  //   data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/isochrones_24.geojson",
  // });

  // map.addSource('iso_36', {
  //   type: 'geojson',
  //   data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/isochrones_36.geojson",
  // });

  map.addSource('ridership', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/ridership_small.geojson",
  });

  map.addSource('house', {
    type: 'geojson',
    data: "https://raw.githubusercontent.com/lena-emaya/vdnh_prototype/master/data/house_population.geojson",
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
      'fill-color': '#548FFF',
      'fill-opacity': 0.05,
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
                    11, 
                    "#ff4916", 
                    23, 
                    "#de0032", 
                    49, 
                    "#a70070", 
                    146, 
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
      'line-color': '#7AABFF',
      'line-width': 5,
      'line-blur': 2
    }
  },'park-border-2');

  map.addLayer({
    id: 'hole4',
    type: 'line',
    source: 'hole',
    layout: {
      visibility: "none",
      'line-join': 'round'
    },
    paint: {
      'line-color': '#548FFF',
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
      'line-width': 1,
      'line-dasharray': [1,1]
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
      "circle-color" : "#5D2BE3",
      "circle-opacity": 0.4,
      "circle-stroke-color" : "#5D2BE3",
      "circle-stroke-opacity": 0.5,
      "circle-stroke-width" : [ 
          "interpolate", 
          [ 
              "linear"
          ], 
          [ 
              "zoom"
          ], 
          10, 
          0.1, 
          14, 
          0.5
      ],
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
      "circle-color" : "#39E9F7",
      "circle-stroke-color" : "#39E9F7",
      "circle-stroke-opacity": 0.5,
      "circle-stroke-width" : [ 
          "interpolate", 
          [ 
              "linear"
          ], 
          [ 
              "zoom"
          ], 
          10, 
          0.2, 
          14, 
          0.7
      ],
      'circle-opacity': 0.6,
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
  id: "iso_line",
  type: "line",
  source: "isochrones",
  paint: {
    "line-color": [ 
        "match", 
        [ 
            "get", 
            "time"
        ], 
        12, 
        "#C91C33", 
        24, 
        "#FF5252", 
        "#FFAB38"
    ],
    "line-opacity": 0.5,
    "line-width": 1,
  },"filter": ["in", "id", ""] 
},'road-construction');

map.addLayer({
  id: "iso_36",
  type: "fill",
  source: "isochrones",
  paint: {
    "fill-color":[  
            "match", 
            [ 
                "get", 
                "time"
            ], 
            12, 
            "rgba(0,0,0,0)", 
            24, 
            "rgba(0,0,0,0)", 
            "#FFAB38"
        ],
    "fill-opacity": 0.35
  }, "filter": ["in", "id", ""]
},'road-construction');

map.addLayer({
  id: "iso_24",
  type: "fill",
  source: "isochrones",
  paint: {
    "fill-color":[  
            "match", 
            [ 
                "get", 
                "time"
            ], 
            12, 
            "rgba(0,0,0,0)", 
            24, 
            "#FF5252", 
            "rgba(0,0,0,0)"
        ],
    "fill-opacity": 0.35
  }, "filter": ["in", "id", ""]
},'road-construction');

map.addLayer({
  id: "iso_12",
  type: "fill",
  source: "isochrones",
  paint: {
    "fill-color":[  
        "match", 
        [ 
            "get", 
            "time"
        ], 
        12, 
        "#C91C33", 
        24, 
        "rgba(0,0,0,0)", 
        "rgba(0,0,0,0)"
      ],
    "fill-opacity": 0.35
  }, "filter": ["in", "id", ""]
},'road-construction');

});




map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['exits']});
  var filter = features.reduce(function(memo, feature) {
    memo.push(feature.properties.id);
    return memo;
  }, ['in', 'id']);
  map.setFilter("iso_12", filter);
  map.setFilter("iso_24", filter);
  map.setFilter("iso_36", filter);
  map.setFilter("iso_line", filter);
  map.setFilter("exits_1", filter);
 
});






toggleLayer('8', ['hole', 'hole2', 'hole3','hole4', 'population'], 'Население в 30минутной изохроне');
toggleLayer('4', ['ngpt-stops'], 'Остановки НГПТ');
toggleLayer('3', ['underground-parking', 'underground-parking-pattern','vdnh-parking', 'vdnh-parking-pattern','parking', 'parking-points', 'parking-centroids' ], 'Парковки');
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

  if (e.features[0].properties.name === undefined || e.features[0].properties.name === null) {
    var description =e.features[0].properties.type
  } else {
    var description =e.features[0].properties.name
  }
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