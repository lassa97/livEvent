
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
  elemento.classList.add()
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
  let lugar=document.createElement("p");
  nombre.textContent=event_name;
  lugar.textContent="Pamplona";

  if(event_img==null || event_img=="img/cartel_prueba.jpeg"){
    event_img="img/cartel_defecto.jpeg";
  }

    //CAMBIAR LAS COSAS

  event_img="img/cartel_defecto.jpeg";
  imagen.src=event_img;

  fecha_event=sacar_fecha(event_date,1);
  fecha.classList.add("ui-li-aside");
  fecha.textContent=fecha_event.split("- ")[1];
  enlace.append(imagen);
  enlace.append(nombre);
  enlace.append(fecha);
  enlace.append(lugar);
  enlace.classList.add("listview_no_side");
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

  $.ajax({url: "https://livevent.es/api/v1/event_list.php?flag=2&ciudad=null",success: function(result){
            let Eventos_listado=JSON.parse(JSON.stringify(result));
            Lista_eventos=Eventos_listado['msg']['events'];
            let contador=0;
            let fecha="temp";

            console.log(Lista_eventos);

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
              constructor_lista(Datos_evento['eventID'],Datos_evento['image'],Datos_evento['name'],Datos_evento['date']);
              contador++;

            }
            //constructor_lista(1,"img/cartel_prueba.jpeg","SFDK - Redención","Sala Totem");


          },error: function(error){
            console.log(error);
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
//--------------------------------------------------------------------------------

/*

function select_provincias(){

  let provincia=document.getElementById('provincia').value;
  let provincias_disponibles;

  if(provincia!="provincia"){
    $("#ciudad").empty();
    let ciudad_option=document.createElement("option");
    ciudad_option.value="Ciudad";
    ciudad_option.textContent="Ciudad";
    $("#ciudad").append(ciudad_option);
    //let ciudades_disponibles=provincias_disponibles[provincia];
    let ciudades_disponibles=['pamplona','burlada'];

    for( index in ciudades_disponibles){
      let ciudad_option=document.createElement("option");
      ciudad_option.value=ciudades_disponibles[index];
      ciudad_option.textContent=ciudades_disponibles[index];
      $("#ciudad").append(ciudad_option);
      console.log(index);
    }
    $( "#ciudad" ).selectmenu( "enable");
    $("#ciudad").selectmenu("refresh",true);
  }else{
    $("#ciudad").empty();
    let ciudad_option=document.createElement("option");
    ciudad_option.value="Ciudad";
    ciudad_option.textContent="Ciudad";
    $( "#ciudad" ).append(ciudad_option);
    $( "#ciudad" ).selectmenu( "disable");
    $("#ciudad").selectmenu("refresh",true);
  }
}
function select_ciudades(){
  let ciudad=document.getElementById('ciudad').value;
  if(ciudad!="ciudad"){
    console.log("waht");
    $( "#filtrar" ).button("enable");
    $( "#filtrar" ).button("refresh");
  }else{
    $( "#filtrar" ).button("disable");
    $( "#filtrar" ).button("refresh");
  }
}

function filtrar_eventos(){
    let ciudad=document.getElementById('ciudad').value;

    //Aqui hacer una peticion a AJAX con los datos de la ciudad seleccionada
}
*/
