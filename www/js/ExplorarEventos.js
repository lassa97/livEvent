
/*function label_change(){


  //document.getElementsByTagName('span')[2].style.fontSize="14px";
  //document.getElementsByTagName('span')[3].style.fontSize="14px";
}
*/

//---------------------------------------------------------------------------------------
//
//Constructores de los elementos de la página
//
//---------------------------------------------------------------------------------------

function constructor_select_ciudades(provincia){

}

function constructor_divider(fecha){
  let elemento=document.createElement("li");
  elemento.setAttribute("data-role","list-divider");
  elemento.style.borderColor="lightgray";
  elemento.style.textAlign="center";
  let event_fecha=sacar_fecha(fecha,0);
  elemento.textContent=event_fecha;

  $('#listview').append(elemento).listview('refresh');

}


function  constructor_lista(id_evento,event_img,event_name,event_date){

  let elemento=document.createElement("li");
  let enlace=document.createElement("a");
  enlace.target="_top";
  enlace.href="DatosEvento.html?id="+id_evento;
  let nombre=document.createElement("h2");
  let imagen=document.createElement("img");
  let fecha=document.createElement("p");
  nombre.textContent=event_name;
  imagen.src=event_img;
  fecha.textContent=event_date;
  enlace.append(imagen);
  enlace.append(nombre);
  enlace.append(fecha);
  elemento.append(enlace);

  $('#listview').append(elemento).listview('refresh');

}

//constructor_divider("22-09-2019 15:00");
//constructor_lista(1,1,"img/cartel_prueba.jpeg","SFDK - Redención","Sala Totem");


//-------------------------------------------------------------------------------
//
// Funciones de AJAX
//
//-------------------------------------------------------------------------------

getEvents();

function getEvents(){

  $.ajax({url: "https://livevent.es/api/v1/event_list.php?flag=2&ciudad=Pamplona",success: function(result){
            let Eventos_listado=JSON.parse(JSON.stringify(result));
            Lista_eventos=Eventos_listado['msg']['events'];
            let contador=0;
            let fecha="temp";

            while(contador<Lista_eventos.length){
              let Datos_evento=Lista_eventos[contador];
              let fecha_temp=Datos_evento['date'].split(" ")[0];
              if(fecha_temp!=fecha){
                fecha=fecha_temp;
                constructor_divider(fecha);
              }
              if(Datos_evento['image']===null){
                Datos_evento['image']="img/cartel_prueba.jpeg"
              }
              constructor_lista(2,Datos_evento['image'],Datos_evento['name'],Datos_evento['date']);
              contador++;

            }
            //constructor_lista(1,"img/cartel_prueba.jpeg","SFDK - Redención","Sala Totem");


          },error: function(error){
            let reason_error=JSON.parse(JSON.stringify(error));
            if(reason_error['readyState']===0){
              alert("No hay conexión a Internet");
              //Hacer una página web de mantenimiento/No internet
              //window.open()
            }
          }
        }
      );

}

//-------------------------------------------------------------------------------
//
// Funciones para el filtro de los eventos
//
//-------------------------------------------------------------------------------

function select_provincias(){
  let provincia=document.getElementById('provincia').value;
  if(provincia!="provincia"){
    let ciudades_disponibles=provincias_disponibles[provincia];

    for( index in ciudades_disponibles){
      let ciudad_option=document.createElement("option");
      ciudad_option.value=ciudades_disponibles[index];
      ciudad_option.textContent=ciudades_disponibles[index];
      document.getElementById("ciudad").append(ciudad_option);
      document.getElementById("ciudad").disabled=false;
    }

  }
}
function select_ciudades(){
  let ciudad=document.getElementById('ciudad').value;
  if(ciudad!="ciudad"){
    document.getElementById("filtrar").disabled=false;
  }
}

function filtrar_eventos(){
    let ciudad=document.getElementById('ciudad').value;

    //Aqui hacer una peticion a AJAX con los datos de la ciudad seleccionada
}
