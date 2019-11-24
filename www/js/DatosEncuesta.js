let survey_id;
let user_id;

//Coger el id de la encuesta

getids();

function getids(){
  let url= document.URL;
  let variables1=url.split("?");
  survey_id=variables1[1].split("=")[1].split("&")[0];
  user_id=variables1[1].split("=")[2];
  //montar_cuerpo(evento_id);
}

//constructor_preguntas("Pregunta 1:");

//Funciones de constructores

function  constructor_preguntas(pregunta_texto){

  let slider=document.createElement("input");
  let label=document.createElement("label");

  label.innerHTML=pregunta_texto;
  label.classList.add("titulos_listas");

  slider.type="range";
  slider.classList.add("respuesta");
  slider.min="0";
  slider.max="10";
  slider.required="true";

  document.getElementById("Preguntas").append(label);
  document.getElementById("Preguntas").append(slider);



}




//Función para coger los datos de la encuesta a hacer.

function getSurveyData(){

  //Llamar y coger todos los datos de la encuesta para ponerlos (ahora mismo no vale de nada)

  $.ajax({
  url: "https://livevent.es/api/v1/survey_answer.php",
  type: "POST",
  data :datos_post,
  processData: false,
  contentType: false,
  success:  function(result,status){
      if(status==="success"){
        let datos=JSON.parse(JSON.stringify(result));
        if(datos['msg']=="Respuesta registrada correctamente"){
          alert("Respuesta registrada adecuadamente.");

          let contador_preguntas=0;

          while(contador_preguntas<datos_preguntas.lenght){

            constructor_preguntas();


          }


          window.history.back();
        }

        /*
        if(datos['msg']=="Artista creado correctamente"){
          try{
          window.plugins.toast.showShortCenter('Usuario creado correctamente.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          window.open("LoginArtista.html","_self");
          }catch(e){
            alert('Usuario creado correctamente.');
            window.open("LoginArtista.html","_self");
          }
          */
        }else{
          try{
          window.plugins.toast.showShortCenter('Error al conectarse', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Error al conectarse');
        }
        }
      }
    }
  );



}




//Funcion para coger los datos del formulario

function getForm(){

  let preguntas=document.getElementsByClassName("respuesta");
  let respuestas=new Array();

  for(let i=0;i<preguntas.lenght;i++){
    respuestas[i]=preguntas[i].value;
  }

    score=JSON.stringify(respuestas)
    let datos_post=new FormData();
    datos_post.append("surveyID",survey_id);
    datos_post.append("userID",user_id);

    datos_post.append("score",respuestas);
    if(opinion==""){
      opinion=null;
    }else{
      datos_post.append("opinion",opinion);
    }
    sendData(datos_post);
}


//Funcion para enviar los datos del formulario

function sendData(datos_post){



  $.ajax({
  url: "https://livevent.es/api/v1/survey_answer.php",
  type: "POST",
  data :datos_post,
  processData: false,
  contentType: false,
  success:  function(result,status){
      if(status==="success"){
        let datos=JSON.parse(JSON.stringify(result));
        if(datos['msg']=="Respuesta registrada correctamente"){
          alert("Respuesta registrada adecuadamente.");
          window.history.back();
        }

        /*
        if(datos['msg']=="Artista creado correctamente"){
          try{
          window.plugins.toast.showShortCenter('Usuario creado correctamente.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          window.open("LoginArtista.html","_self");
          }catch(e){
            alert('Usuario creado correctamente.');
            window.open("LoginArtista.html","_self");
          }
          */
        }else{
          try{
          window.plugins.toast.showShortCenter('Error al conectarse', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Error al conectarse');
        }
        }
      }
    }
  );
}
