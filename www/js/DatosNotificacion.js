//---------------------------------------------------------------------------------------
//
//Funciones para coger identificadores
//
//---------------------------------------------------------------------------------------

getids();


function getids(){
  let url= document.URL;
  let notification_id=url.split("notificacion=")[1].split("&")[0];
  let event_id=url.split("evento=")[1].split("&")[0];
  let artist_id=url.split("artista=")[1];
  montar_notificacion(notification_id,event_id,artist_id);
}

//---------------------------------------------------------------------------------------
//
//Funciones de AJAX para coger datos
//
//---------------------------------------------------------------------------------------

function montar_notificacion(notification_id,event_id,artist_id){


  $.post("https://livevent.es/api/v1/notification_list.php",{
    notificationID: notification_id,
  },function(result,status){

    let datos=JSON.parse(JSON.stringify(result));
    let datos_notificacion=datos['msg'];

    constructor_pagina(datos_notificacion['title'],datos_notificacion['description'],datos_notificacion['image'],null,event_id);
    montar_artista(artist_id);
    //montar_artista(id_artista);
    //Esta funcion es comun con la de DatosEvento.js


  });
  //

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


//---------------------------------------------------------------------------------------
//
//Funciones de constructor de la pagina
//
//---------------------------------------------------------------------------------------

//Poner limite de 2000 letras a la notificacion y solo una foto al final.


  function constructor_pagina(titulo_notificacion,notificacion_texto,notificacion_imagen,notificacion_fecha,event_id){

    if(notificacion_fecha===null){
      notificacion_fecha="";
    }

    document.getElementById("titulo_notificacion").textContent=titulo_notificacion+" "+notificacion_fecha;

    document.getElementById("atras_btn").target="_top";
    document.getElementById("atras_btn").href="DatosEvento.html?id="+event_id;

    let cuerpo_mensaje=document.getElementById("cuerpo_notificacion");

    let texto_mensaje=document.createElement("div");
    texto_mensaje.textContent=notificacion_texto;
    texto_mensaje.classList.add("texto-mensaje");
    cuerpo_mensaje.append(texto_mensaje);

    if(notificacion_imagen!=null){
      cuerpo_mensaje.append(document.createElement("p"));
      let imagen_mensaje=document.createElement("img");
      imagen_mensaje.src=notificacion_imagen;
      cuerpo_mensaje.append(imagen_mensaje);
    }

    //Hay que poner cosas para los botones de seguir y compartir

    let follow_evento=document.getElementsByClassName("navbar_eventos")[0];

    follow_evento.id=event_id;
    follow_evento.addEventListener("click",seguir_evento);

  }

  function constructor_artista(artista_id,nombre_artista,imagen_artista){

    if(imagen_artista===null){
      imagen_artista="img/artist_default.jpeg";
    }

    let elemento=document.createElement("li");
    let enlace=document.createElement("a");
    let nombre=document.createElement("h4");

    let imagen=document.createElement("img");
    imagen.classList.add("img-responsive");
    imagen.classList.add("center-block");
    imagen.classList.add("imagen-perfil");
    imagen.src=imagen_artista;

    nombre.textContent=nombre_artista;

    enlace.href="PaginaPerfilArtista.html?id="+artista_id;
    enlace.href="perfil-artista.html"+artista_id;
    enlace.append(imagen);
    enlace.append(nombre);

    elemento.append(enlace);

    $('#info_artista').append(elemento).listview("refresh");

  }
