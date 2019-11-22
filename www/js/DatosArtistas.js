
  //---------------------------------------------------------------------------------------
  //
  //Función para ver a donde retrocedo
  //
  //---------------------------------------------------------------------------------------
  function retroceso_artista(){
    //console.log(window.history);
    //A ver como la puedo poner bien....
    window.history.back();
  }

  function provisional(){

    try{
    window.plugins.toast.showShortCenter('Opción en desarrollo', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert("Función no disponible aún.");
    }
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
    let artista_id=variables1[1].split("=")[1];
    montar_cabecera(artista_id);
    //montar_cuerpo(evento_id);
  }



  //---------------------------------------------------------------------------------------
  //
  //Funciones de AJAX para coger datos --> Tengo que sacar todos los datos de lo que se construye en la cabecera
  //
  //---------------------------------------------------------------------------------------

  //Necesito todos los PhPs de fermin

  function montar_cabecera(id){
    //ASINCRONO

    $.ajax({url: "http://livevent.es/api/v1/artist_list.php?artistID="+id,
    success: function(result,status){

                let datos=JSON.parse(JSON.stringify(result));

                let datos_artista=datos['msg'];
                constructor_cabecera(datos_artista['name'],datos_artista['image'],datos_artista['description'],id);
                montar_eventos(id);
                constructor_redessociales(datos_artista['twitter'],datos_artista['facebook'],datos_artista['instagram'],datos_artista['youtube'],datos_artista['webpage']);

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

  function montar_eventos(id){

  $.ajax({url: "https://livevent.es/api/v1/event_list.php?artistID="+id,
   success: function(result,status){

          let datos=JSON.parse(JSON.stringify(result));

          let datos_eventos=datos['msg']['events'];

          document.getElementById("NEventos").textContent=datos_eventos.length;
          //console.log("HOLA");
          if(datos_eventos.length==0){
            let lista_eventos=document.getElementById("lista_eventos");
            let evento=document.createElement("li");

            evento.textContent="No hay eventos programados";
            evento.classList.add("listview_no_border");
            //console.log("HOLA");

            $("#lista_eventos").append(evento).listview("refresh");

          }else{
            let contador_eventos=0;
            while(contador_eventos<(datos_eventos.length)){
              let datos_single=datos_eventos[contador_eventos];
              constructor_eventos(datos_single['eventID'],datos_single['name'],datos_single['image'])
              contador_eventos++;

            }



          }
          //montar_redessociales(id);

    }
  });
/*
  function montar_redessociales(id){

    $.ajax({url: "https://livevent.es/api/v1/artist_list.php?artistID="+id,
    success: function(result,status){
              let datos=JSON.parse(JSON.stringify(result));
              let datos_artista=datos['msg'];


          },


  });
    }
*/
  }

  //---------------------------------------------------------------------------------------
  //
  //Constructores de los elementos de la página
  //
  //---------------------------------------------------------------------------------------

  function constructor_cabecera(artista_nombre,image_artist,description_artist,artista_id){


      if(image_artist==null || image_artist=="" || image_artist==" "){
        image_artist="img/artist_default.jpg";
      }
      image_artist="img/artist_default.jpeg";

      document.getElementById("Artista_imagen").style.backgroundImage="url("+image_artist+")";
      document.getElementById("fotografia_artista").src=image_artist;

      document.getElementById("Artista_nombre").textContent=artista_nombre;
      document.getElementById("Artista_descripcion").textContent=description_artist;

     /*let follow_artista=document.getElementsByClassName("navbar_eventos")[0];

      follow_artista.id=artista_id;
      follow_artista.addEventListener("click",seguir_artista);*/


  }



  function constructor_redessociales(twitter_artista,facebook_artista,instagram_artista,youtube_artista,webpage_artista){

  if(twitter_artista==null && instagram_artista==null && youtube_artista==null && webpage_artista==null ){

    let notificacion=document.createElement("li");
    //let notificacion_titulo=document.createElement("p");
    notificacion.textContent="No hay redes sociales añadidas aún";
    notificacion.classList.add("listview_no_border");
    //notificacion.append(notificacion_titulo);

    $("#lista_redessociales").append(notificacion).listview("refresh");


  }else{

    if(twitter_artista==null){

    }else{
      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://twitter.com/"+twitter_artista;
      imagen.target="_blank"
      imagen.src="img/Iconos_compartir/Twitter.png";

      nombre.textContent="Twitter";

      enlace.href="https://twitter.com/"+twitter_artista;
      enlace.target="_blank"
      enlace.classList.add("listview_no_side");
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }


    if(instagram_artista==null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://www.instagram.com/"+instagram_artista;
      imagen.target="_blank"
      imagen.src="img/Iconos_compartir/instagram.png";

      nombre.textContent="Instagram";

      enlace.href="https://www.instagram.com/"+instagram_artista;
      enlace.target="_blank";
      enlace.classList.add("listview_no_side");
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }

    if(youtube_artista==null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://www.youtube.com/user/"+youtube_artista;
      imagen.target="_blank";
      enlace.classList.add("listview_no_side");
      imagen.src="img/Iconos_compartir/youtube.png";

      nombre.textContent="YouTube";

      enlace.href="https://www.youtube.com/user/"+youtube_artista;
      enlace.target="_blank"
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }


    if(webpage_artista==null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://"+webpage_artista;
      imagen.target="_blank";
      enlace.classList.add("listview_no_side");
      imagen.src="img/Iconos_compartir/webpage.png";

      nombre.textContent="Página web";

      enlace.href="https://"+webpage_artista;
      enlace.target="_blank"
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }
  }

  }


  function constructor_eventos(id_evento,titulo_evento,imagen_evento){

    let lista_eventos=document.getElementById("lista_eventos");
    let evento=document.createElement("li");
    let evento_a=document.createElement("a");
    evento.classList.add("listview_no_border");

    if(imagen_evento=="null" || imagen_evento==null){
      imagen_evento="img/cartel_defecto.jpeg";
    }

    evento_a.href="DatosEvento.html?evento="+id_evento;
    evento_a.target="_top";
    evento_a.classList.add("listview_no_side");

    let evento_imagen=document.createElement("img");
    evento_imagen.src=imagen_evento;

    let evento_titulo=document.createElement("h4");
    evento_titulo.textContent=titulo_evento;

    evento_a.append(evento_imagen);
    evento_a.append(evento_titulo);

    evento.append(evento_a);
    $('#lista_eventos').append(evento).listview('refresh');

  }
