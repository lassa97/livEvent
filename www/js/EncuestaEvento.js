
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
    montar_eventos(artista_id);
    //montar_cuerpo(evento_id);
  }


  //---------------------------------------------------------------------------------------
  //
  //Constructores de los elementos de la página
  //
  //---------------------------------------------------------------------------------------

  function constructor_eventos(id_artista,id_evento,titulo_evento,imagen_evento){

    let lista_eventos=document.getElementById("lista_eventos");
    let evento=document.createElement("li");
    let evento_a=document.createElement("a");
    evento.classList.add("listview_no_border");

    if(imagen_evento===null){
      imagen_evento="img/cartel_prueba.jpeg";
    }

    evento_a.href="CrearEncuesta.html?artistID="+id_artista+"&eventID="+id_evento;
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
    }
  });
  }