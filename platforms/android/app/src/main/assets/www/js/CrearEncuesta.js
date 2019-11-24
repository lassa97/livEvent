
let evento_id;
let artist_id;

//---------------------------------------------------------------------------------------
//
//Funciones para coger identificadores
//
//---------------------------------------------------------------------------------------


getids();

function getids(){
  let url= document.URL;
  let variables1=url.split("?");
  evento_id=variables1[1].split("=")[1].split("&")[0];
  artist_id=variables1[1].split("=")[2];
}


//Funcion para coger datos de entrevista
function login_entrevista(){

  //let hora_comienzo=document.getElementById("hora_comienzo").value;
  document.getElementsByClassName("preguntas");


  if(duration==""){
    try{
    window.plugins.toast.showShortCenter('Introduzca todos los campos obligatorios.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert("Introduzca todos los campos obligatorios.");
    }
  }else{

      enviar_datos_login(duration);
  }

}

//Sin testar ya que no tengo los phps adecuados

//Funcion para enviar datos del formulario

function enviar_datos_login(duration){

  $.ajax({
  url: "https://livevent.es/api/v1/survey_create.php?duration="+duration+"&artistID="+artist_id+"&eventID="+evento_id,
  type: "GET",
  success:  function(result,status){
      if(status==="success"){
        let datos=JSON.parse(JSON.stringify(result));
        if(datos['msg']=="Encuesta creada correctamente"){
          alert("Encuesta creada correctamente");
          window.open("PerfilArtistaLogin.html","_top");
        }else{
          alert("Encuesta ya existente o error en los parámetros");
        }

        }else{
          try{
          window.plugins.toast.showShortCenter('Encuesta ya existente', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Encuesta ya existente o no válida.');
          }
        }

        }
      }
  );
}

//Funcion para añadir preguntas al cuestionario

function anadirPregunta(){
  let preguntas=document.getElementsByClassName("Pregunta");
  if(preguntas.length>9){
    alert("No se permiten más preguntas.")
  }else{

    let nPregunta=parseInt(preguntas.length)+1;
    let pregunta_div=document.createElement("div");
    let pregunta_label=document.createElement("label");
    let input_div=document.createElement("div");
    let pregunta_input=document.createElement("input");

    input_div.classList.add("ui-input-text");
    input_div.classList.add("ui-body-inherit");
    input_div.classList.add("ui-corner-all");
    input_div.classList.add("ui-shadow-inset");

    pregunta_label.innerHTML="Pregunta "+nPregunta+":";
    pregunta_div.classList.add("Pregunta");
    pregunta_label.classList.add("titulos_listas");
    pregunta_input.name="pregunta_"+nPregunta;
    pregunta_input.placeholder="¿Pregunta.......?";

        input_div.append(pregunta_input);

    pregunta_div.append(pregunta_label);
    pregunta_div.append(input_div);

    document.getElementById("preguntas").append(pregunta_div);
    if(preguntas.lenght>9){
      $("#anadir").button("disable");
      $("#anadir").button("refresh");
    }
  }


}
