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

//Funcion para coger los datos del formulario

function getForm(){

  let score=document.getElementById("score").value;
  let opinion=document.getElementById("opinion").value;

  if(score==""){
    alert("Introduzca un valor de satisfaccion");
  }else{
    let datos_post=new FormData();
    datos_post.append("surveyID",survey_id);
    datos_post.append("userID",user_id);
    datos_post.append("score",score);
    if(opinion==""){
      opinion=null;
    }else{
      datos_post.append("opinion",opinion);
    }
    sendData(datos_post);
  }
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
