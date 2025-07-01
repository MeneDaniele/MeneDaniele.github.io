import {bindInfoWindow} from "./map.js";

let markers = [];
let markerClusterer = '';


async function addMarkers(map, stores) {
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

    stores.forEach(store => {
        const pin = new PinElement({
            background: "#FF0000",
            borderColor: "#FF0000",
            glyphColor: "#c12b2b",
        });


        const marker = new AdvancedMarkerElement({
            map,
            position: store.coords,
            content: pin.element,
            title: store.name
        });



        bindInfoWindow(marker, createMarkerDetails(store));
    markers.push(marker);})



    markerClusterer = new window.markerClusterer.MarkerClusterer({
        map,
        markers,
        algorithm: new window.markerClusterer.SuperClusterAlgorithm({
            gridSize: 50,
                    imagePath:
            "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",

        }),

    });

    }



function hideMarkers() {
    markers.map(marker => {
        marker.map = null;
    });
    if(markerClusterer) {
       markerClusterer.clearMarkers()
    }
}



function refreshMarkers(map, stores) {
    //nascondiamo i markers
    hideMarkers()
    //nuovo ciclo con marker filtrati
    let activeMarkers = markers.filter(marker => {
        let markerPosition = marker.position;
        let activeMarker = stores.find(store =>
        store.coords.lat === markerPosition.lat &&
        store.coords.lng === markerPosition.lng
        )
        if(activeMarker) {
            marker.map = map;
            return true;
        }
        return false
    })
        markerClusterer.addMarkers(activeMarkers);

}


function createMarkerDetails(store) {
    let content = `
        <div class="info-window">
            <h2>${store.name}</h2>
            <p>${store.address}</p>
            <p>${store.phone}</p>
            <p>${store.email}</p>
            <a href="https://www.google.com/maps?saddr=My+Location&daddr=${store.coords.lat},${store.coords.lng}" target="_blank">Directions</a>
        </div>`;
    return content;
}
export { addMarkers,refreshMarkers};