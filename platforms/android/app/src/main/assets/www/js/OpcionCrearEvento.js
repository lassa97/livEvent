
let datos_localizacion=["lugar","ciudad","provincia","lat","lon"];

function crear_evento(){
  let artist_id= getArtistID();
  let nombre_evento=document.getElementById("name").value;
  let localizacion_evento=document.getElementById("calle").value;
  let fecha_evento=document.getElementById("fecha").value;
  let hora_evento=document.getElementById("hora").value;
  let duracion_evento=document.getElementById("duracion").value;
  let descripcion_evento=document.getElementById("descripcion").value;
  let imagen_evento=document.getElementById("imagen").files[0];


  let date_evento=fecha_evento+" "+hora_evento;


  if(nombre_evento=="" || localizacion_evento=="" || fecha_evento=="" || hora_evento=="" || duracion_evento=="" || imagen_evento=="" || datos_localizacion[3]=="lon"){
    try{
    window.plugins.toast.showShortCenter('Introduzca todos los campos obligatorios.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert("Introduzca todos los campos obligatorios.");
    }
  /*}else if(nombre_evento.length>49 || email_artista.length>49){
    try{
    window.plugins.toast.showShortCenter('El nombre no pueden tener más de 50 caracteres.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert('El nombre no pueden tener más de 50 caracteres.');
    }*/
  }else{

    if(imagen_evento){
      let reader= new FileReader();
      reader.readAsDataURL(imagen_evento);
      let img= new Image();
      reader.onloadend = function() {
          img.src= reader.result;
          img.onloadend=function(){
            let height=img.height;
            let width=img.width;
          if(height>300 && width>300){

            let datos_post=new FormData();
            datos_post.append("artistID",artist_id);
            datos_post.append("name",nombre_evento);
            datos_post.append("description",descripcion_evento);
            datos_post.append("date",date_evento);
            datos_post.append("localization",localizacion_evento);
            datos_post.append("duration",duracion_evento);
            datos_post.append("image",imagen_evento);
            //console.log(datos_post);
            enviar_datos(datos_post);
          }else{
            try{
            window.plugins.toast.showShortCenter('Introduzca una foto de mayor resolución.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
            }catch(e){
              alert('Introduzca una foto de mayor resolución.');
            }
          }
        }
      }
    }else{
      imagen_evento=null;
      let datos_post=new FormData();
      datos_post.append("artistID",artist_id);
      datos_post.append("name",nombre_evento);
      datos_post.append("description",descripcion_evento);
      datos_post.append("date",date_evento);
      datos_post.append("localization",localizacion_evento);
      datos_post.append("duration",duracion_evento);
      //datos_post.append("image",imagen_evento);
      //console.log(datos_post);
      enviar_datos(datos_post);
  }
  }
}
function getArtistID(){
  let url= document.URL;
  let variables1=url.split("?");
  artist_id=variables1[1].split("=")[1];
  return artist_id;
}

//Funcion para enviar los datos del formulario

function enviar_datos(datos_post){

  $.ajax({
  url: "https://livevent.es/api/v1/event_create.php",
  type: "POST",
  data :datos_post,
  processData: false,
  contentType: false,
  success:  function(result,status){
      if(status==="success"){

        //Necesito hacer mas pruebas
        console.log(result);
        let datos=JSON.parse(JSON.stringify(result));

        if(datos['msg']=="Evento creado correctamente"){
          try{
          window.plugins.toast.showShortCenter('Evento creado correctamente.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          window.open("LoginArtista.html","_self");
          }catch(e){
            alert('Evento creado correctamente.');
            window.open("PerfilArtistaLogin.html","_top");
          }
        }else{
          try{
          window.plugins.toast.showShortCenter('Error al crear el evento.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Error al crear el evento.');

          }
        }

        }
      }
    }

  );
}
