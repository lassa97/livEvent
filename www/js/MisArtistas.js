// function ajaxGet(url, callback) {
//   v ar req = new XMLHttpRequest();
//   req.open("GET", "http://livevent.es/user_list-artist.php", true);
//   req.addEventListener("load", function() {
//     if (req.status >= 200 && req.status < 400) {
//       // Llamada ala función callback pasándole la respuesta
//       callback(req.responseText);
//     } else {
//       console.error(req.status + " " + req.statusText);
//     }
//   });
//   req.addEventListener("error", function(){
//     console.error("Error de red");
//   });
//   req.send(null);
// }

// function mostrar(respuesta) {
//     console.log(respuesta);
// }

// ajaxGet("http://livevent.es/user_list.php", function(respuesta) {
//   // Transformación de formato JSON a JavaScript
//   var artista = JSON.parse(respuesta);

//   artista.forEach(function(elemento) {
//     let elemento=document.createElement("li");
//     let enlace=document.createElement("a");
//     enlace.target="_top";
//     enlace.href="http://livevent.es?followartists="+id_artista;
//     let nombre=document.createElement("h2");
//     let imagen=document.createElement("img");
//     nombre.textContent=artista_name;
//     imagen.src=artista_img;
//     document.getElementsByTagName("ul")[0].append(elemento);
//     enlace.append(imagen);
//     enlace.append(nombre);
//     elemento.append(enlace);
//   });
// });




//---------------------------------------------------------------------------------------
//
//Funciones para coger identificadores
//
//---------------------------------------------------------------------------------------


getids();

  function getids(){
    let url= document.URL;
    let variables1=url.split("?");
    let user_id=variables1[1].split("=")[1];
    getArtists(user_id);
    //montar_cuerpo(evento_id);
  }

//---------------------------------------------------------------------------------------
//
//Funciones para construir la pagina
//
//---------------------------------------------------------------------------------------

function constructor_lista(id_artista,imagen_artista,nombre_artista){

  let elemento=document.createElement("li");

  let enlace=document.createElement("a");
  enlace.target="_top";
  enlace.href="perfil-artista.html?id="+id_artista;

  let nombre=document.createElement("h2");
  let imagen=document.createElement("img");

  nombre.textContent=nombre_artista;
  imagen.src=imagen_artista;

  enlace.append(imagen);
  enlace.append(nombre);
  elemento.append(enlace);

  $('#listview').append(elemento).listview('refresh');

}


//---------------------------------------------------------------------------------------
//
//Funciones para sacar los eventos que hay ese dia
//
//---------------------------------------------------------------------------------------


  function getArtists(user_id){

    $.ajax({url: "http://livevent.es/api/v1/user_list.php?userID="+user_id,
      success: function(result){
        let Artista_lista=JSON.parse(JSON.stringify(result));
        console.log(result);
        Lista_artistas=Artista_lista['artistID'];

        if(Lista_artistas.length==0){
            let listview=document.getElementById("listview");
            let notificacion=document.createElement("li");
            //let notificacion_titulo=document.createElement("p");
            notificacion.textContent="¿No te gusta ningún artista?";
            notificacion.classList.add("listview_no_border");
            //notificacion.append(notificacion_titulo);

            $("#listview").append(notificacion).listview("refresh");

        }else{

            let contador=0;
            while(contador<(Lista_artistas.length)){
              $.post("http://livevent.es/api/v1/artist_list.php?artistID="+id,{
                artistID: artistID,
                msg: msg
              },function(result,status){

                let datos=JSON.parse(JSON.stringify(result));
                console.log(result);
                let datos_artista=datos['info']['info'];
                let datos_single=datos_artista[contador];
                console.log(datos_single);

                constructor_eventos(id,datos_single['image'],datos_single['name'],)
                contador++;

              }
            }
        }
          
    }
  }      
  );
