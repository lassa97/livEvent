function actualizar_artista(){
    let url= document.URL;
    let variables1=url.split("?");
    let id=variables1[1].split("=")[1];

    let name_artista=document.getElementById("name").value;
	let descripcion_artista=document.getElementById("description").value;
	let twitter_artista=document.getElementById("twitter").value;
	let youtube_artista=document.getElementById("youtube").value;
	let facebook_artista=document.getElementById("facebook").value;
	let instagram_artista=document.getElementById("instagram").value;
	let webpage_artista=document.getElementById("webpage").value;
	let imagen_artista=false;
	

    $.ajax({url: "http://livevent.es/api/v1/artist_list.php?artistID="+id,
    success: function(result,status){

            let datos=JSON.parse(JSON.stringify(result));

            let datos_artista=datos['msg'];
                

			if(name_artista==""){
		      name_artista=datos_artista["name"];
		    }
		    if(descripcion_artista==""){
		      descripcion_artista=datos_artista["description"];
		    }
		    if(twitter_artista==""){
		      twitter_artista=datos_artista["twitter"];
		    }
		    if(youtube_artista==""){
		      youtube_artista=datos_artista["youtube"];
		    }
		    if(facebook_artista==""){
		      facebook_artista=datos_artista["facebook"];
		    }
		    if(instagram_artista==""){
		      instagram_artista=datos_artista["instagram"];
		    }
		    if(webpage_artista==""){
		      webpage_artista=datos_artista["webpage"];
		    }
		    if (true) {
			    if(imagen_artista){
			      let reader= new FileReader();
			      reader.readAsDataURL(imagen_artista);
			      let img= new Image();
			      reader.onloadend = function() {
			            let datos_post=new FormData();
			            datos_post.append("name",nombre_artista);
			            datos_post.append("description",descripcion_artista);
			            datos_post.append("image",imagen_artista);
			            datos_post.append("twitter",twitter_artista);
			            datos_post.append("facebook",facebook_artista);
			            datos_post.append("instagram",instagram_artista);
			            datos_post.append("youtube",youtube_artista);
			            datos_post.append("webpage",webpage_artista);
			            console.log(datos_post);
			            enviar_datos(datos_post);
				   }
				}
			}else{
			    imagen_artista=null;
			    let datos_post=new FormData();
			    datos_post.append("name",nombre_artista);
			    datos_post.append("description",descripcion_artista);
			    datos_post.append("image",imagen_artista);
			    datos_post.append("twitter",twitter_artista);
			    datos_post.append("facebook",facebook_artista);
			    datos_post.append("instagram",instagram_artista);
			    datos_post.append("youtube",youtube_artista);
			    datos_post.append("webpage",webpage_artista);
			    enviar_datos(datos_post);
			  }

    }  
    });
}


function enviar_datos(datos_post){
  $.ajax({
  url: "https://livevent.es/api/v1/artist_edit.php",
  type: "POST",
  data :datos_post,
  processData: false,
  contentType: false,
  success:  function(result,status){
      if(status==="success"){
        let datos=JSON.parse(JSON.stringify(result));
        if(datos['msg']=="Artista creado correctamente"){
          try{
          window.plugins.toast.showShortCenter('Usuario creado correctamente.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          window.open("PerfilArtistaLogin.html?id="+datos['artistID'],"_top");
          }catch(e){
            alert('Usuario creado correctamente.');
          window.open("PerfilArtistaLogin.html?id="+datos['artistID'],"_top");
          }
        }else{
          try{
          window.plugins.toast.showShortCenter('Nombre ya en uso', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
          }catch(e){
            alert('Nombre ya en uso');

          }
        }

        }
      }
    }

  );
}