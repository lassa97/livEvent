

  let map;
/*
  try{
    cordova.plugins.notification.local.schedule({
        title: 'My first notification',
        text: 'Thats pretty easy...',
        foreground: true
    },{ skipPermission: true });
  }catch( e){
    alert(e);
  }*/

  //---------------------------------------------------------------------------------------
  //
  //Función para ver a donde retrocedo
  //
  //---------------------------------------------------------------------------------------
  function retroceso_evento(){
    //console.log(window.history);
    //A ver como la puedo poner bien....
    window.history.back();
  }


  //---------------------------------------------------------------------------------------
  //
  //Funciones para coger identificadores
  //
  //---------------------------------------------------------------------------------------


  getids();

  function getids(){
    let url= document.URL;
    let variables1=url.split("?");
    let evento_id=variables1[1].split("=")[1].split("#")[0];
    montar_cabecera(evento_id);
    //montar_cuerpo(evento_id);
  }


  //---------------------------------------------------------------------------------------
  //
  //Constructores de los elementos de la página
  //
  //---------------------------------------------------------------------------------------

  function constructor_cabecera(Evento_nombre,room_name,date_event,image_event,evento_id){

      if(image_event==null || image_event=="" || image_event=="null"){
        image_event="img/cartel_defecto.jpeg";
      }else{
        image_event="https://livevent.es/"+image_event;
      }

      document.getElementById("Cartel_concierto").style.backgroundImage="url("+image_event+")";
      document.getElementById("fotografia_evento").src=image_event;

      let date= new Date(date_event);

      let  fecha=sacar_fecha(date_event,1);

      document.getElementById("Evento_nombre").textContent=Evento_nombre;
      document.getElementById("Sala_nombre").textContent=room_name;
      document.getElementById("Fecha_evento").textContent=fecha;

      let follow_evento=document.getElementsByClassName("navbar_eventos")[0];

      follow_evento.id=evento_id;
      follow_evento.addEventListener("click",provisional);


  }

  function provisional(){

    try{
    window.plugins.toast.showShortCenter('Opción en desarrollo', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert("Función no disponible aún.");
    }
  }


  function constructor_artista(artista_id,nombre_artista,imagen_artista){


    //¡¡Poner con el https las imagenes para que salgan bien!!

    if(imagen_artista===null){
      imagen_artista="img/artist_default0";
    }else{
      imagen_artista="https://livevent.es/"+imagen_artista;
    }

    imagen_artista="img/artist_default0";

    let elemento=document.createElement("li");
    let enlace=document.createElement("a");
    let nombre=document.createElement("h4");

    let imagen=document.createElement("img");
    imagen.classList.add("img-responsive");
    imagen.classList.add("center-block");
    imagen.classList.add("imagen-perfil");
    imagen.src=imagen_artista;

    nombre.textContent=nombre_artista;

    enlace.href="PerfilArtista.html?id="+artista_id;
    //enlace.href="perfil-artista.html?id"+artista_id;
    enlace.target="_top";
    enlace.append(imagen);
    enlace.append(nombre);

    elemento.append(enlace);

    $('#info_artista').append(elemento).listview("refresh");

  }



  function constructor_tickets(link_tickets){

    let objeto_tickets=document.getElementById("tickets_info");
    let datos_tickets=document.createElement("p");

    if(link_tickets===null){
      datos_tickets="Información no disponible.";
      objeto_tickets.append(datos_tickets);
    }else{


      let enlace_tickets=document.createElement("a");
      enlace_tickets.href=link_tickets;
      datos_tickets.textContent="Picha aquí"
      enlace_tickets.append(datos_tickets);
      objeto_tickets.append(enlace_tickets);
    }

  }

  function constructor_notificaciones(id_artista,id_evento,titulo_notificacion,imagen_notificacion,fecha_notificacion,id_notification){

    let lista_notificaciones=document.getElementById("lista_notificaciones");
    let notificacion=document.createElement("li");
    let notificacion_enlace=document.createElement("a");
    notificacion.classList.add("listview_no_border");

    notificacion_enlace.href="DatosNotificacion.html?notificacion="+id_notification+"&evento="+id_evento+"&artista="+id_artista;
    notificacion_enlace.target="_top";
    notificacion_enlace.classList.add("listview_no_side");




    let notificacion_titulo=document.createElement("h4");
    notificacion_titulo.textContent=titulo_notificacion;

    let notificacion_fecha=document.createElement("p");
    notificacion_fecha.textContent=fecha_notificacion;


    notificacion_enlace.append(notificacion_titulo);
    notificacion_enlace.append(notificacion_fecha);

    if(imagen_notificacion!=null){
      let notificacion_imagen=document.createElement("img");
      notificacion_imagen.src=imagen_notificacion;
      notificacion_enlace.append(notificacion_imagen);
    }

    notificacion.append(notificacion_enlace);
    $('#lista_notificaciones').append(notificacion).listview('refresh');

  }

  //---------------------------------------------------------------------------------------
  //
  //Funciones de AJAX para coger datos --> Tengo que sacar todos los datos de lo que se construye en la cabecera
  //
  //---------------------------------------------------------------------------------------

  //Necesito todos los PhPs de fermin

  function montar_cabecera(id){

    //event_data
    console.log(id);
    $.ajax({url: "http://livevent.es/api/v1/event_list.php?eventID="+id,
    success: function(result,status){
                //document.getElementById("Artista_nombre").textContent=JSON.stringify(result);
                let datos=JSON.parse(JSON.stringify(result));
                //console.log(JSON.stringify(datos));
                let datos_evento=datos['msg'];
                constructor_cabecera(datos_evento['description'],datos_evento['localization'],datos_evento['date'],datos_evento['image'],id);
                constructor_tickets(null);
                montar_notificaciones(datos_evento['artistID'],id);
                montar_artista(datos_evento['artistID']);
            },error: function(error){
                let reason_error=JSON.parse(JSON.stringify(error));
                if(reason_error['readyState']===0){
                  alert("No hay conexión a Internet");
                  //Hacer una página web de mantenimiento/No internet
                  //window.open()
                }
              }

  });



    //constructor_cabecera(datos_evento['artista'],datos_evento['sala'],datos_evento['fecha'],datos_evento['imagen'],datos_evento['artista_id'],datos_evento['evento_id']);


  }
  function montar_artista(id){
    console.log("va");
    $.ajax({url: "https://livevent.es/api/v1/artist_list.php?artistID="+id,
    success: function(result,status){
                //document.getElementById("Artista_nombre").textContent=JSON.stringify(result);
                let datos=JSON.parse(JSON.stringify(result));
                let datos_artista=datos['msg'];

                constructor_artista(id,datos_artista['name'],datos_artista['image']);

            },error: function(error){

                let reason_error=JSON.parse(JSON.stringify(error));
                console.log(reason_error);
                if(reason_error['readyState']===0){
                  alert("No hay conexión a Internet");
                  //Hacer una página web de mantenimiento/No internet
                  //window.open()
                }
              }


  });
}
  function montar_notificaciones(id_artista,id_evento){
    id_evento=parseInt(id_evento);
    id_artista=parseInt(id_artista);


    $.post("https://livevent.es/api/v1/notification_list.php",{
      artistID: id_artista,
      eventID:id_evento
    },function(result,status){
        //console.log(status);
        if(status==="success"){
          let datos=JSON.parse(JSON.stringify(result));
          let datos_notificaciones=datos['info']['notifications'];
          document.getElementById("NNotificaciones").textContent=datos_notificaciones.length;
          if(datos_notificaciones.length==0){
            let lista_notificaciones=document.getElementById("lista_notificaciones");
            let notificacion=document.createElement("li");
            //let notificacion_titulo=document.createElement("p");
            notificacion.textContent="No hay notificaciones aún.";
            notificacion.classList.add("listview_no_border");
            //notificacion.append(notificacion_titulo);

            $("#lista_notificaciones").append(notificacion).listview("refresh");

          }else{
            let contador_notificaciones=0;
            while(contador_notificaciones<(datos_notificaciones.length)){
              let datos_single=datos_notificaciones[contador_notificaciones];
              datos_single['notificationimage']=null;
              constructor_notificaciones(id_artista,id_evento,datos_single['title'],datos_single['notificationimage'],datos_single['description'],datos_single['notificationID']);
              contador_notificaciones++;

            }


          }
        }
    }
  );


  }

  //---------------------------------------------------------------------------------------
  //
  //Creacion del mapa de la pagina
  //
  //---------------------------------------------------------------------------------------

/*

function initMap() {


      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.4167754, lng: -3.7037901999999576},
        zoom: 17
      });

      changeMap(42.819115530741115,-1.6438795069210745);
      /*
      let marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
      });
      console.log("What");
      /*
      let input = document.getElementById('searchInput');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
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
          /*
          console.log(place['name']);

          document.getElementById('calle').parentNode.style.display="block";
          document.getElementById('ciudad').parentNode.style.display="block";
          document.getElementById('calle').innerHTML = place['name'];
          document.getElementById('ciudad').innerHTML = place.address_components[0].short_name;

          latitud= place.geometry.location.lat();
          longitud= place.geometry.location.lng();
      });

}



function changeMap(lat, lon) {
  let latlng = new google.maps.LatLng(lat,lon)
  map.setCenter(latlng);
  let marker = new google.maps.Marker({
    position: latlng,
    map: map,
    title: 'Hello World!'
  });
  marker.setIcon(({
      //url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
  }));

  let infowindow = new google.maps.InfoWindow();
  infowindow.setContent('<div><strong>' + document.getElementById("localizacion_local").textContent + '</strong><br>' + document.getElementById("localizacion_datos").childNodes[1].textContent+", "+document.getElementById("localizacion_datos").childNodes[3].textContent);
  infowindow.open(map, marker);


}
*/




//Codigo que me sobra


  /*
  if(datos_notificaciones=="[]"){
        let lista_notificaciones=document.getElementById("lista_notificaciones");
        let notificacion=document.createElement("li");
        let notificacion_titulo=document.createElement("h4");
        notificacion_titulo.textContent="No hay notificaciones";
        notificacion.append(notificacion_titulo);
        lista_notificaciones.append(notificacion);
  }else{
    let lista_notificaciones=document.getElementById("lista_notificaciones");
    if(lista_notificaciones.firstChild.textContent=="No hay notificaciones"){
      lista_notificaciones.remove(lista_notificaciones.firstChild);
    }else{
      let contador=0;
      while(contador<datos_notificaciones.length){

        let datos_notificacion=datos_notificaciones[contador];
        constructor_notificaciones(datos_notificacion['enlace'],datos_notificacion['titulo'],datos_notificacion['imagen'],datos_notificacion['fecha'])
        contador++;
      }
    }
  }
  */
