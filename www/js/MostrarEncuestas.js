
function getids(){
  let url= document.URL;
  let variables1=url.split("?");
  let artist_id=variables1[1].split("=")[1];
  montar_encuestas(artist_id);
}


function constructor_encuestas(datos_name,datos_surveyid,artist_id){

    console.log(datos_name);
    console.log(datos_surveyid);

    let lista_encuestas=document.getElementById("lista_encuestas");
    let encuestas=document.createElement("li");
    let encuestas_enlace=document.createElement("a");
    
    encuestas.classList.add("listview_no_border");
    encuestas_enlace.classList.add("listview_no_side");
    encuestas_enlace.href="MostrarResultadosEncuestas.html?artistID="+artist_id+"&surveyID="+datos_surveyid;
    encuestas_enlace.target="_top";

    let encuesta_name=document.createElement("h4");
    encuesta_name.textContent=datos_name;

    encuestas_enlace.append(encuesta_name);

    encuestas.append(encuestas_enlace);
    $('#lista_encuestas').append(encuestas).listview('refresh');

}




function montar_encuestas(artist_id){
  artist_id=parseInt(artist_id);


    // $.get("https://livevent.es/api/v1/survey_result.php",{
    //   artistID: artist_id,
    //   surveyID: survey_id
    // },function(result,status){

      $.ajax({url: "https://livevent.es/api/v1/survey_list.php?artistID="+artist_id,
      success: function(result,status){
        //console.log(status);
        if(status==="success"){
          let datos=JSON.parse(JSON.stringify(result));
          console.log(datos['msg']['surveys']);

          let variable ={};
          for (x=0;x<10;x++){
            var n = x.toString();
            variable[x]=[n,datos['msg']['surveys'][x]];
          }


          console.log((datos['msg']['surveys']).length);
          let contador_encuesta = (datos['msg']['surveys']).length;

		      document.getElementById("Encuestas").textContent=contador_encuesta;
		        
		        if(contador_encuesta==0){
		        	  let lista_encuestas=document.getElementById("lista_encuestas");
		            let encuestas=document.createElement("li");
		            //let encuesta_name=document.createElement("p");
		            encuestas.textContent="No hay resultados de encuestas aún.";
		            encuestas.classList.add("listview_no_border");
		            //encuestas.append(encuesta_opinion);

	            $("#lista_encuestas").append(encuestas).listview("refresh");

	            }else{
                console.log(contador_encuesta);
                for (x=0;x<contador_encuesta;x++){
		              let datos_name=datos['msg']['surveys'][x]['name'];
                  let datos_surveyid=datos['msg']['surveys'][x]['surveyID'];
                  //console.log(datos_single);
		              constructor_encuestas(datos_name,datos_surveyid,artist_id);
		            }
	        	  }
	      }
  	  }
    });
}