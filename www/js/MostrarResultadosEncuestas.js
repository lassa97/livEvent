//Cojo el id del artista y el de la encuesta

function getids(){
  let url= document.URL;
  let variables1=url.split("?");
  let artist_id=variables1[1].split("=")[1].split("&")[0];
  let survey_id=variables1[1].split("=")[2];
  montar_encuesta(artist_id,survey_id);
  console.log('artist_id');
}


function constructor_encuestas(opinion_encuesta){

    console.log(opinion_encuesta);
    let lista_encuesta=document.getElementById("lista_encuesta");
    let encuestas=document.createElement("li");
    let encuestas_enlace=document.createElement("a");
    
    encuestas.classList.add("listview_no_border");
    encuestas_enlace.classList.add("listview_no_side");

    let encuesta_opinion=document.createElement("h4");
    encuesta_opinion.textContent=opinion_encuesta;

    encuestas_enlace.append(encuesta_opinion);

    encuestas.append(encuestas_enlace);
    $('#lista_encuesta').append(encuestas).listview('refresh');

}




function montar_encuesta(artist_id,survey_id){
	survey_id=parseInt(survey_id);
    artist_id=parseInt(artist_id);


    // $.get("https://livevent.es/api/v1/survey_result.php",{
    //   artistID: artist_id,
    //   surveyID: survey_id
    // },function(result,status){

      $.ajax({url: "https://livevent.es/api/v1/survey_result.php?artistID="+artist_id+"&surveyID="+survey_id,
      success: function(result,status){
        //console.log(status);
        if(status==="success"){
          let datos=JSON.parse(JSON.stringify(result));

          let variable ={};
          for (x=0;x<11;x++){
            var n = x.toString();
            variable[x]=[n,datos['msg'][x]];
          }


// GRAFICO 3D

          google.charts.load("current", {packages:["corechart"]});
          google.charts.setOnLoadCallback(drawChart);
        
          function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Valoración', 'Score'],
              variable[0],
              variable[1],
              variable[2],
              variable[3],
              variable[4],
              variable[5],
              variable[6],
              variable[7],
              variable[8],
              variable[9],
              variable[10]
              ]);

            var options = {
              title: 'Resultado valoración encuesta',
              is3D: true,
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
          }

// FIN GRAFICO
          
          console.log(datos.comments.opinions);
          
          let contador_encuesta = Object.keys(datos.comments.opinions).length;

		      document.getElementById("Encuestas").textContent=contador_encuesta;
		        
		        if(contador_encuesta==0){
		        	  let lista_encuesta=document.getElementById("lista_encuesta");
		            let encuestas=document.createElement("li");
		            //let encuesta_opinion=document.createElement("p");
		            encuestas.textContent="No hay resultados de encuestas aún.";
		            encuestas.classList.add("listview_no_border");
		            //encuestas.append(encuesta_opinion);

	            $("#lista_encuesta").append(encuestas).listview("refresh");

	            }else{
                console.log(contador_encuesta);
                for (x=0;x<contador_encuesta;x++){
		              let datos_single=datos['comments']['opinions'][x]['opinion'];
                  //console.log(datos_single);
		              constructor_encuestas(datos_single);
		            }
	        	  }
	      }
  	  }
    });
}