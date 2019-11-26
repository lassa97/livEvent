getids();

//Cojo el id del artista y el de la encuesta

function getids(){
  let url= document.URL;
  let variables1=url.split("?");
  let artist_id=variables1[1].split("=")[1].split("&")[0];
  let survey_id=variables1[1].split("=")[2];
  montar_encuesta(artist_id,survey_id);
}


function constructor_encuestas(id_artista,id_evento,score_encuesta,opinion_encuesta){

    let lista_encuesta=document.getElementById("lista_encuesta");
    let encuestas=document.createElement("li");
    let encuestas_enlace=document.createElement("a");
    
    encuestas.classList.add("listview_no_border");
    encuestas_enlace.classList.add("listview_no_side");

    let encuesta_score=document.createElement("h4");
    encuesta_score.textContent=score_encuesta;

    let encuesta_opinion=document.createElement("p");
    encuesta_opinion.textContent=opinion_encuesta;

    encuestas_enlace.append(encuesta_score);
    encuestas_enlace.append(encuesta_opinion);

    encuestas.append(encuestas_enlace);
    $('#lista_encuesta').append(encuestas).listview('refresh');

}




function montar_encuesta(artist_id,survey_id){
	survey_id=parseInt(survey_id);
    artist_id=parseInt(artist_id);


    $.post("https://livevent.es/api/v1/survey_list.php",{
      artistID: artist_id,
      surveyID:survey_id
    },function(result,status){
        //console.log(status);
        if(status==="success"){
          let datos=JSON.parse(JSON.stringify(result));
          let datos_encuesta=datos['info']['surveys'];
		  document.getElementById("Encuestas").textContent=datos_encuesta.length;
		        
		        if(datos_encuesta.length==0){
		        	let lista_encuesta=document.getElementById("lista_encuesta");
		            let encuestas=document.createElement("li");
		            //let encuesta_opinion=document.createElement("p");
		            encuestas.textContent="No hay resultados de encuestas aún.";
		            encuestas.classList.add("listview_no_border");
		            //encuestas.append(encuesta_opinion);

	            $("#lista_encuesta").append(encuestas).listview("refresh");

	            }else{
	            	let cont_encuestas=0;
		            while(cont_encuestas<(datos_encuesta.length)){
		              let datos_single=datos_encuesta[cont_encuestas];
		              datos_single['notificationimage']=null;
		              constructor_encuestas(artist_id,survey_id,datos_single['score'],datos_single['opinion']);
		              cont_encuestas++;
		            }
	        	}
	    }
  	}
}