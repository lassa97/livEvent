//---------------------------------------------------------------------------------------
//
//Funciones para coger identificadores
//
//---------------------------------------------------------------------------------------

getids();


function getids(){
  let url= document.URL;
  let variables1=url.split("=");
  let artist_id=variables1[1].split("&")[0];
  let event_id=variables1[2]
  montar_notificacion(artist_id,event_id);
}

//---------------------------------------------------------------------------------------
//
//Funciones de AJAX para coger datos
//
//---------------------------------------------------------------------------------------

function montar_notificacion(id_artista,id_evento){


  $.post("https://livevent.es/api/v1/notification_list.php",{
    artistID: id_artista,
    eventID:id_evento
  },function(result,status){
    let datos=JSON.parse(JSON.stringify(result));
    let datos_notificacion=datos['info']['info'][0];
    console.log(datos);
    constructor_pagina(datos_notificacion['title'],datos_notificacion['description'],datos_notificacion['image'],null,id_evento);
    //montar_artista(id_artista);
    //Esta funcion es comun con la de DatosEvento.js


  });
  //

}

//---------------------------------------------------------------------------------------
//
//Funciones de constructor de la pagina
//
//---------------------------------------------------------------------------------------

//Poner limite de 2000 letras a la notificacion y solo una foto al final.


  function constructor_pagina(titulo_notificacion,notificacion_texto,notificacion_imagen,notificacion_fecha,id_evento){

    if(notificacion_fecha===null){
      notificacion_fecha="";
    }

    document.getElementById("titulo_notificacion").textContent=titulo_notificacion+" "+notificacion_fecha;

    let cuerpo_mensaje=document.getElementById("cuerpo_notificacion");

    let texto_mensaje=document.createElement("div");
    texto_mensaje.textContent=notificacion_texto;
    texto_mensaje.classList.add("texto-mensaje");
    cuerpo_mensaje.append(texto_mensaje);

    if(notificacion_imagen!=null){
      cuerpo_mensaje.append(doument.createElement("p"));
      let imagen_mensaje=document.createElement("img");
      imagen_mensaje.src=notificacion_imagen;
      cuerpo_mensaje.append(imagen_mensaje);
    }

    //Hay que poner cosas para los botones de seguir y compartir

    let follow_evento=document.getElementsByClassName("navbar_eventos")[0];

    follow_evento.id=evento_id;
    follow_evento.addEventListener("click",seguir_evento);

  }

  function constructor_artista(artista_id,nombre_artista,imagen_artista){

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
