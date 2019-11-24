


//---------------------------------------------------------------------
//
//Función para poner el mapa e ir metiendole datos
//
//---------------------------------------------------------------------
function initMap() {


    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.4167754, lng: -3.7037901999999576},
      zoom: 6
    });
    let input = document.getElementById('searchInput');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //input.style.left="15px";
    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    //let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        let place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }
        marker.setIcon(({
            //url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        let address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div style="text-align:center;padding-right:12px;padding-bottom:12px"><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);

        //Location details
        /*
        for (let i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code'){
                document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] == 'country'){
                document.getElementById('country').innerHTML = place.address_components[i].long_name;
            }
        }*/
        document.getElementById('calle').parentNode.style.display="block";
        //document.getElementById('ciudad').parentNode.style.display="block";
        datos_localizacion[0]=place['name'];
        document.getElementById('calle').innerHTML = place['formatted_address'];
        datos_localizacion[1]=place.address_components[0].long_name;
        datos_localizacion[2]=place.address_components[1].long_name;
        //document.getElementById('ciudad').innerHTML = place.address_components[0].short_name;
      //    document.getElementsByClassName("ui-input-text")[2].style.display="hide";
        datos_localizacion[3]= place.geometry.location.lat();
        datos_localizacion[4]= place.geometry.location.lng();
        console.log(datos_localizacion);
    });
}

//---------------------------------------------------------------------
//
//Función para guardar las coordenadas
//
//---------------------------------------------------------------------

function guardar_localizacion(){

  console.log(latitud,longitud)

}
