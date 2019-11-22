//Funcion para sacar los datos del artista

function getids(){

  try{
    let url= document.URL;
    let variables1=url.split("?");
    if(variables1.length>1){

      artista_id=variables1[1].split("=")[1];
      try{

          let sharedPreferences = window.plugins.SharedPreferences.getInstance("login");
          //alert("MADSAMDASD");
          let key = 'id_artista';
          let value=artista_id;
          let successCallback = function() {
            //alert(artista_id);
            //alert("MADSAMDASD3123123");
              montar_cabecera(artista_id);
            }
          let errorCallback = function(err) {
              //alert(err);
              //alert("MADSAMDASD31231223233");
          }

        sharedPreferences.put(key,value,successCallback, errorCallback);
      }catch(e){
        montar_cabecera(artista_id);
      }
    }else{
      try{
          let sharedPreferences = window.plugins.SharedPreferences.getInstance("login");

          let key = 'id_artista';
          let successCallback = function(value) {

              montar_cabecera(value);
              //alert(value);
            }
          let errorCallback = function(err) {
              //alert(err);
          }

        sharedPreferences.get(key,successCallback, errorCallback);
      }catch(e){
        //alert(e);
      }
  }
}catch(e){
  alert(e);
}
}

//Funcion para coger los datos del formulario y ver que hay.


//Para coger registro datos

function registro_artista(){



  let descripcion_artista=document.getElementById("description").value;
  let twitter_artista=document.getElementById("twitter").value;
  let youtube_artista=document.getElementById("youtube").value;
  let facebook_artista=document.getElementById("facebook").value;
  let instagram_artista=document.getElementById("instagram").value;
  let webpage_artista=document.getElementById("webpage").value;
  let imagen_artista=false;
  //let imagen_artista=document.getElementById("imagen").files[0];


if(true){

    if(descripcion_artista==""){
      descripcion_artista=null;
    }
    if(twitter_artista==""){
      twitter_artista=null;
    }
    if(youtube_artista==""){
      youtube_artista=null;
    }
    if(facebook_artista==""){
      facebook_artista=null;
    }
    if(instagram_artista==""){
      instagram_artista=null;
    }
    if(webpage_artista==""){
      webpage_artista=null;
    }
    if(imagen_artista){
      let reader= new FileReader();
      reader.readAsDataURL(imagen_artista);
      let img= new Image();
      reader.onloadend = function() {

            let datos_post=new FormData();
            datos_post.append("email",email_artista);
            datos_post.append("password",password_artista);
            datos_post.append("name",nombre_artista);
            datos_post.append("gender",gender_artista);
            datos_post.append("description",descripcion_artista);
            datos_post.append("image",imagen_artista);
            datos_post.append("twitter",twitter_artista);
            datos_post.append("facebook",facebook_artista);
            datos_post.append("instagram",instagram_artista);
            datos_post.append("youtube",youtube_artista);
            datos_post.append("webpage",webpage_artista);
            datos_post.append("image",imagen_artista);
            console.log(datos_post);
            enviar_datos(datos_post);
      }
    }else{
      imagen_artista=null;
      let datos_post=new FormData();
      datos_post.append("email",email_artista);
      datos_post.append("password",password_artista);
      datos_post.append("name",nombre_artista);
      datos_post.append("gender",gender_artista);
      datos_post.append("description",descripcion_artista);
      datos_post.append("image",imagen_artista);
      datos_post.append("twitter",twitter_artista);
      datos_post.append("facebook",facebook_artista);
      datos_post.append("instagram",instagram_artista);
      datos_post.append("youtube",youtube_artista);
      datos_post.append("webpage",webpage_artista);
      datos_post.append("image",imagen_artista);
      enviar_datos(datos_post);
  }
  }
}

//Funcion para enviar los datos del formulario

function enviar_datos(datos_post){
  $.ajax({
  url: "https://livevent.es/api/v1/artist_update.php",
  type: "POST",
  data :datos_post,
  processData: false,
  contentType: false,
  success:  function(result,status){
      if(status==="success"){

        //HAY QUE MIRARLO

        /*
        let datos=JSON.parse(JSON.stringify(result));
        if(datos['msg']=="Artista creado correctamente"){
          try{
          window.plugins.toast.showShortCenter('Usuario creado correctamente.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          window.open("LoginArtista.html","_self");
          }catch(e){
            alert('Usuario creado correctamente.');
            window.open("LoginArtista.html","_self");
          }
        }else{
          try{
          window.plugins.toast.showShortCenter('Email/Nombre ya en uso', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Email/Nombre ya en uso');

          }
        }
        */

        }
      }
    }

  );
}
