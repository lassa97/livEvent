
//---------------------------------------------------------------------------------------
//
//Constructores para el contenido de la pagina
//
//---------------------------------------------------------------------------------------

function constructor_encuesta(survey_id,survey_image,survey_name,survey_description){

  let encuesta=document.createElement("li");
  let encuesta_enlace=document.createElement("a");
  encuesta.classList.add("listview_no_border");

  encuesta_enlace.href="DatosEncuesta.html?Encuesta="+survey_id;
  encuesta_enlace.target="_self";
  encuesta_enlace.classList.add("listview_no_side");

  let encuesta_titulo=document.createElement("h4");
  encuesta_titulo.textContent=survey_name;

  /*let notificacion_fecha=document.createElement("p");
  notificacion_fecha.textContent=fecha_notificacion;*/


  encuesta_enlace.append(encuesta_titulo);
  //encuesta_enlace.append(notificacion_fecha);

  if(survey_image!=null){
    let encuesta_imagen=document.createElement("img");
    encuesta_imagen.src=survey_image;
    encuesta_enlace.append(notificacion_imagen);
  }

  encuesta.append(encuesta_enlace);
  console.log(encuesta_enlace);
  $('#lista_encuestas').append(encuesta).listview('refresh');
}




//---------------------------------------------------------------------------------------
//
//Funcion para coger la lista de encuestas que hay disponibles.
//
//---------------------------------------------------------------------------------------
getSurveys();

function getSurveys(){
  $.ajax({url: "https://livevent.es/api/v1/survey_list.php",success: function(result){
            let eventos_listado=JSON.parse(JSON.stringify(result));
            let lista_encuestas=eventos_listado['msg']['surveys'];
            if(lista_encuestas.length!=0){
              let contador=0;
              while(lista_encuestas[contador]!=null){
                let datos=lista_encuestas[contador];
                constructor_encuesta(datos['surveyID'],datos['image'],datos['name'],datos['description']);
                contador++;
              }
            }else{
              let warning= document.createElement("h2");
              warning.innerText="No hay encuestas disponibles";
              document.getElementsByClassName("ui-content")[0].append(warning);
            }
          },error: function(error){
            let reason_error=JSON.parse(JSON.stringify(error));
            if(reason_error['readyState']===0){
              alert("No hay conexión a Internet");
            }
          }
        }
      );
}
