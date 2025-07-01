

let map,infoWindow;

async function initMap(lat, lng, zoom, Apikey) {

    const { Map } = await google.maps.importLibrary("maps");
//creiamo una mappa, passandole le coordinate per centrarla
    map = new Map(document.getElementById("map"), {
        center: {lat, lng},
        zoom,
        mapId: Apikey
    });

// creiamo una infowindow
    infoWindow = new google.maps.InfoWindow;

    return map;
}

function bindInfoWindow(marker, content) {
    google.maps.event.addListener(marker, "click", () => {
        infoWindow.setContent(content)
        infoWindow.open(map, marker);
    });
}


function getMap() {
    return map;
}

function resetMap(myCoords, zoom) {
    map.setZoom(zoom);
    map.setCenter({lat: myCoords.lat, lng: myCoords.lng});
}

function setMap (lat,lng,zoom) {
    map.setOptions({
        center: {lat,lng},
        zoom
    });

}


export { initMap, bindInfoWindow, getMap, resetMap, setMap };