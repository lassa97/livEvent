
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
  artist_id=variables1[1].split("=")[1].split("&")[0];
  artist_id=variables1[1].split("=")[2];
}


//Funcion para coger datos de entrevista
function crear_notificacion(){

  //let hora_comienzo=document.getElementById("hora_comienzo").value;
  let titulo=document.getElementById("titulo").value;
  let mensaje=document.getElementById("mensaje").value;
  let imagen=false;
  //let imagen=document.getElementById("imagen").files[0];


  if(titulo=="" || mensaje==""){
    try{
    window.plugins.toast.showShortCenter('Introduzca todos los campos obligatorios.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert("Introduzca todos los campos obligatorios.");
    }
  }else{
    let datos_post=new FormData();
    datos_post.append("artistID",artist_id);
    datos_post.append("eventID",evento_id);
    datos_post.append("title",titulo);
    datos_post.append("description",mensaje);
    if(imagen){
      let reader= new FileReader();
      reader.readAsDataURL(imagen_artista);
      let img= new Image();
      reader.onloadend = function() {
          datos_post.append("image",imagen);
            enviar_datos_notificacion(datos_post);
        }
      }else{
        imagen=null;
        datos_post.append("image",imagen);
          enviar_datos_notificacion(datos_post);
      }
  }

}

//Sin testar ya que no tengo los phps adecuados

//Funcion para enviar datos del formulario

function enviar_datos_notificacion(datos_post){

  $.ajax({
  url: "https://livevent.es/api/v1/notification_create.php",
  type: "POST",
  data :datos_post,
  processData: false,
  contentType: false,
  success:  function(result,status){
      if(status==="success"){
        let datos=JSON.parse(JSON.stringify(result));
        if(datos['msg']=="Notificacion registrada correctamente"){
          alert("Notificación creada correctamente.");
          window.open("PerfilArtistaLogin.html","_top");
        }else{
          alert("Encuesta ya existente o error en los parámetros");
        }

      }else if(datos['msg']=="Ya existen otras notificaciones para ese evento"){
          alert('No puede haber más de tres notificaciones por evento');
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
