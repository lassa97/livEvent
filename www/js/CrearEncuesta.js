
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
  let duration=document.getElementById("duration").value;


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
  url: "https://livevent.es/api/v1/artist_login.php?duration="+duration+"&artistID="+artist_id+"&eventID"+evento_id,
  type: "GET",
  success:  function(result,status){
      if(status==="success"){
        let datos=JSON.parse(JSON.stringify(result));
        console.log(datos);
        /*
        if(datos['msg']=="Email o contraseña incorrectas"){
          try{
          window.plugins.toast.showShortCenter('Email o contraseña incorrectas.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Email o contraseña incorrectas.');
          }
        }else{
          window.open("PerfilArtistaLogin.html?id="+datos['artistID'],"_top");
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
          window.plugins.toast.showShortCenter('Email/Nombre ya en uso', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Email/Nombre ya en uso');
          }
        }

        }
      }
  );
}
