

//---------------------------------------------------------------------------------------
//
//Funciones para coger identificadores
//
//---------------------------------------------------------------------------------------


getids();

function getids(){

  let url= document.URL;
  let variables1=url.split("?");

  let variables_2=variables1[1].split("=");
  let flag=variables_2[1].split("&")[0];
  let check=variables_2[2].split("&")[0];
  let id_user=variables_2[3];


  getEvents(flag,check,id_user);

}

//---------------------------------------------------------------------------------------
//
//Funciones para construir la pagina
//
//---------------------------------------------------------------------------------------

function constructor_lista(id_evento,event_img,event_name,event_date){

  let elemento=document.createElement("li");
  elemento.classList.add("listview_no_border");
  let enlace=document.createElement("a");
  enlace.classList.add("listview_no_side");
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


//---------------------------------------------------------------------------------------
//
//Funciones para sacar los eventos que hay ese dia
//
//---------------------------------------------------------------------------------------


function getEvents(flag,check,id_user){

    $.ajax({url: "https://livevent.es/api/v1/event_list.php?flag="+flag+"&userID="+id_user,success: function(result){
              let Eventos_listado=JSON.parse(JSON.stringify(result));
              Lista_eventos=Eventos_listado['msg']['events'];
              let contador=0;
              while(contador<Lista_eventos.length){
                let Datos_evento=Lista_eventos[contador];
                if(Datos_evento['image']==null || Datos_evento['image']=="null" || Datos_evento['image']==""){
                  Datos_evento['image']="img/cartel_defecto.jpeg"
                }
                constructor_lista(Datos_evento['eventID'],Datos_evento['image'],Datos_evento['name'],Datos_evento['date']);
                contador++;

              }
              let checker=0;
              if(Lista_eventos.length==0){
                checker=1;
              }
              if(checker==1 && check==1){
                if(flag==1){
                  window.open("ListaEventos.html?flag=2&check=1","_self");
                }else if(flag==2){
                  window.open("ListaEventos.html?flag=0&check=1","_self");
                }else if(flag==0){

                }else{
                  //Habria que ver si abrir la ventana de explorar
                }

              }
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
