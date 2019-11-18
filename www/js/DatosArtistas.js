
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
    let artista_id=variables1[1].split("=")[1];
    montar_cabecera(artista_id);
    //montar_cuerpo(evento_id);
  }


  //---------------------------------------------------------------------------------------
  //
  //Constructores de los elementos de la página
  //
  //---------------------------------------------------------------------------------------

  function constructor_cabecera(Artista_nombre,image_artist,description_artist,artista_id){

      if(image_artist===null){
        image_artist="img/artista_prueba.jpg";
      }
      document.getElementById("Artista_imagen").style.backgroundImage="url("+image_artist+")";
      document.getElementById("fotografia_artista").src=image_artist;

      document.getElementById("Artista_nombre").textContent=Artista_nombre;
      document.getElementById("Artista_descripcion").textContent=description_artist;

      let follow_artista=document.getElementsByClassName("navbar_artistas")[0];

      follow_artista.id=artista_id;
      follow_artista.addEventListener("click",seguir_artista);


  }



  function constructor_redessociales(twitter_artista,facebook_artista,instagram_artista,youtube_artista,webpage_artista){

    if(twitter_artista===null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://twitter.com/"+twitter_artista;
      imagen.target="_blank"
      imagen.src="img/twitter.png";

      nombre.textContent="Twitter";

      enlace.href="https://twitter.com/"+twitter_artista;
      enlace.target="_blank"
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }



    if(instagram_artista===null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://www.instagram.com/"+instagram_artista;
      imagen.target="_blank"
      imagen.src="img/instagram.png";

      nombre.textContent="Instagram";

      enlace.href="https://www.instagram.com/"+instagram_artista;
      enlace.target="_blank"
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }

    if(youtube_artista===null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://www.youtube.com/user/"+youtube_artista;
      imagen.target="_blank"
      imagen.src="img/youtube.png";

      nombre.textContent="YouTube";

      enlace.href="https://www.youtube.com/user/"+youtube_artista;
      enlace.target="_blank"
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }


    if(webpage_artista===null){

    }else{

      let redsocial=document.createElement("li");
      let enlace=document.createElement("a");
      let nombre=document.createElement("h4");

      let imagen=document.createElement("img");
      imagen.classList.add("redessociales");
      imagen.href="https://"+webpage_artista;
      imagen.target="_blank"
      imagen.src="img/webpage.png";

      nombre.textContent="Página web";

      enlace.href="https://"+webpage_artista;
      enlace.target="_blank"
      enlace.append(imagen);
      enlace.append(nombre);

      redsocial.append(enlace);

      $('#lista_redessociales').append(redsocial).listview("refresh");
    }

  }


  function constructor_eventos(id_artista,id_evento,titulo_evento,imagen_evento){

    let lista_eventos=document.getElementById("lista_eventos");
    let evento=document.createElement("li");
    let evento_a=document.createElement("a");
    evento.classList.add("listview_no_border");

    if(imagen_evento===null){
      imagen_evento="img/cartel_prueba.jpeg";
    }

    evento_a.href="DatosEvento.html?artista="+id_artista+"&evento="+id_evento;
    evento_a.target="_top";

    let evento_imagen=document.createElement("img");
    evento_imagen.src=imagen_evento;

    let evento_titulo=document.createElement("h4");
    evento_titulo.textContent=titulo_evento;

    evento_a.append(evento_imagen);
    evento_a.append(evento_titulo);

    evento.append(evento_a);
    $('#lista_eventos').append(evento).listview('refresh');

  }

  //---------------------------------------------------------------------------------------
  //
  //Funciones de AJAX para coger datos --> Tengo que sacar todos los datos de lo que se construye en la cabecera
  //
  //---------------------------------------------------------------------------------------

  //Necesito todos los PhPs de fermin

  function montar_cabecera(id){
    //ASINCRONO
    //event_data
    //console.log(id);
    $.ajax({url: "http://livevent.es/api/v1/artist_list.php?artistID="+id,
    success: function(result,status){
                //document.getElementById("Artista_nombre").textContent=JSON.stringify(result);
                let datos=JSON.parse(JSON.stringify(result));
                //console.log(JSON.stringify(datos));
                let datos_artista=datos['msg'];
                constructor_cabecera(datos_artista['name'],datos_artista['image'],datos_artista['description'],id);
                //montar_artista(datos_artista['artistID']);
                montar_eventos(id);
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
    //SINCRONO
    console.log(id);


  $.ajax({url: "https://livevent.es/api/v1/event_list.php?artistID="+id,
   success: function(result,status){
        //console.log(status);

          let datos=JSON.parse(JSON.stringify(result));
          console.log(datos);
          let datos_eventos=datos['msg']['events'];
          console.log(datos_eventos);
          document.getElementById("NEventos").textContent=datos_eventos.length;
          if(datos_eventos.length==0){
            let lista_eventos=document.getElementById("lista_eventos");
            let evento=document.createElement("li");

            evento.textContent="No hay eventos programados";
            evento.classList.add("listview_no_border");

            $("#lista_eventos").append(evento).listview("refresh");

          }else{
            let contador_eventos=0;
            while(contador_eventos<(datos_eventos.length)){
              console.log('ok');
              let datos_single=datos_eventos[contador_eventos];
              console.log(datos_single);

              constructor_eventos(id,datos_single['eventID'],datos_single['name'],datos_single['image'])
              contador_eventos++;

            }



          }
          montar_redessociales(id);

    }
  });

  function montar_redessociales(id){
    //ASINCRONO
    console.log(id);
    $.ajax({url: "https://livevent.es/api/v1/artist_list.php?artistID="+id,
    success: function(result,status){
              let datos=JSON.parse(JSON.stringify(result));
              let datos_artista=datos['msg'];

              constructor_redessociales(datos_artista['twitter'],datos_artista['facebook'],datos_artista['instagram'],datos_artista['youtube'],datos_artista['webpage']);
          },


  });
    }

  }
