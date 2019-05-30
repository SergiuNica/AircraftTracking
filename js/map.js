mapboxgl.accessToken =
  "pk.eyJ1Ijoic2t5aGF3azExMSIsImEiOiJjanc2aHh1MjExN2puM3lvbXR3cnQ2azNsIn0.kDVQHMKTbDrEyAg7qX638w";

const geoIp =
  "https://api.ipgeolocation.io/ipgeo?apiKey=c5cf2ce7b84842edb900939c4065f4ca";

const geocodeURI = address => {
  return (
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    address +
    "&key=290988e010e04ca7a0691468f18b3ce1"
  );
};

let map = null;
let locInfo = null;
let loading = null;

const centerOnUser = async () => {
  if (map !== null) {
    let mapInfo = await fetch(geoIp);
    let mapInfoJSON = await mapInfo.json();

    let loc = [mapInfoJSON.longitude, mapInfoJSON.latitude];
    map.easeTo({
      center: loc
    });

    return mapInfoJSON;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  loading = document.getElementById("loading");

  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/skyhawk111/cjw6lsav93wm91cnw4ela3dy3",
    center: [2.3176, 48.8665],
    zoom: 15.0
  });

  document.getElementById("btnFindIt").addEventListener("click", async () => {
    let address = document.getElementById("txtAddress").value;
    address = address.trim();
    // console.log(address);
    if (address.length >= 3) {
      // console.log(geocodeURI(address));
      const data = await fetch(geocodeURI(address));
      const dataJson = await data.json();
      console.log(dataJson);
      if (dataJson.results.length >= 1) {
        const geo = dataJson.results[0].geometry;
        console.log(geo);
        map.easeTo({
          center: [geo.lng, geo.lat]
        });
      }
    }
  });



  document.getElementById("easeToToronto").addEventListener("click", async () => {
    loading.style.display = "block";

    // await fetch('http://localhost:9000/api')
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (servdata) {
    //     appendData(servdata);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

    const data = await fetch(geocodeURI("Toronto"));
    const dataJson = await data.json();
    // console.log(dataJson);
    //const toronto = dataJson.results[0].geometry;
    const torlat = dataJson;
    // for (var i = 193; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Toronto Airport: ' + data[192, 6] + ' and ' + data[192, 7];
    mainContainer.appendChild(div);
    //}

    loading.style.display = "none";
    map.easeTo({
      center: [toronto.lng, toronto.lat]
    });
  });

  document.getElementById("easeHome").addEventListener("click", async () => {
    if (locInfo === null) {
      locInfo = await centerOnUser();
    } else {
      map.easeTo({
        center: [locInfo.longitude, locInfo.latitude]
      });
    }
  });
  locInfo = await centerOnUser();

  let userMarker = new mapboxgl.Marker()
    .setLngLat([locInfo.longitude, locInfo.latitude])
    .setPopup(
      new mapboxgl.Popup({
        className: "here"
      }).setHTML(
        '<h1>you are here</h1><img src="' + locInfo.country_flag + '" />'
      )
    )
    .addTo(map)
    .togglePopup();
});