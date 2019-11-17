
//------------------------------------------------------------------------------
//
//Funciones de AJAX para ver si se sigue a un evento o a un usuario
//
//
//------------------------------------------------------------------------------

//document.getElementsByClassName("navbar_eventos")[1].id="1";
//document.getElementsByClassName("navbar_eventos")[1].addEventListener("click",seguir_artista);



function comprobar_seguimientos(){
  let id_evento=document.getElementsByClassName("navbar_eventos")[0].id;
  let id_artista=document.getElementsByClassName("navbar_eventos")[1].id;
  $.get({url: "seguir_comprobar.php?id_evento="+id_evento+"&id_artista="+id_artista,function(result){

    let comprobar_json=JSON.parse(result);

    if(comprobar_json[0]==true){
      document.getElementsByClassName("navbar_eventos")[0].setAttribute("data-icon","check");
    }
    if(comprobar_json[1]==true){
      document.getElementsByClassName("navbar_eventos")[1].setAttribute("data-icon","check");
    }
  }});
}

function seguir_artista(datos){

  let id_artista=datos.target.id;
  let icono=datos.target.getAttribute("data-icon");

  let peticion=0;

  if(icono=="plus"){

    peticion=1;

    datos.target.setAttribute("data-icon","check");
    datos.target.classList.add("navbar_compartir");
    datos.target.classList.remove("ui-icon-plus");
    datos.target.classList.add("ui-icon-check");
  }else if(icono=="check"){

    datos.target.setAttribute("data-icon","plus");
    datos.target.classList.remove("navbar_compartir");
    datos.target.classList.add("ui-icon-plus");
    datos.target.classList.remove("ui-icon-check");
  }


  $.ajax({url: "seguir_artista.php?id="+id_artista+"&peticion="+peticion,success:function(result){

    if(result=="OK"){
      //----------------------------------------------------------------------
      //Caso de que se quiera seguir al artista
      //----------------------------------------------------------------------
      if(peticion==1){
        datos.target.setAttribute("data-icon","check");
        datos.target.classList.add("navbar_compartir");
        datos.target.classList.remove("ui-icon-plus");
        datos.target.classList.add("ui-icon-check");
        //----------------------------------------------------------------------
        //Caso de que se quiera dejar de seguir
        //----------------------------------------------------------------------
      }else{
        datos.target.setAttribute("data-icon","plus");
        datos.target.classList.remove("navbar_compartir");
        datos.target.classList.add("ui-icon-plus");
        datos.target.classList.remove("ui-icon-check");
      }
    }else if(result=="No registrado"){
      window.plugins.toast.showLongBottom("Usuario no registrado.");
    }},error: function(error){

      window.plugins.toast.showLongBottom("No hay conexión a Internet.");

    }


  });
}

function seguir_evento(datos){

    let id_evento=datos.target.id;
    let icono=datos.target.getAttribute("data-icon");

    let peticion=0;

    if(icono=="plus"){
      peticion=1;
    }

    $.ajax({url: "seguir_evento.php?id="+id_evento+"&peticion="+peticion,success:function(result){

      if(result=="OK"){
        //----------------------------------------------------------------------
        //Caso de que se quiera seguir al artista
        //----------------------------------------------------------------------
        if(peticion==1){
          datos.target.setAttribute("data-icon","check");
          datos.target.classList.add("navbar_compartir");
          datos.target.classList.remove("ui-icon-plus");
          datos.target.classList.add("ui-icon-check");
          //----------------------------------------------------------------------
          //Caso de que se quiera dejar de seguir
          //----------------------------------------------------------------------
        }else{
          datos.target.setAttribute("data-icon","plus");
          datos.target.classList.remove("navbar_compartir");
          datos.target.classList.add("ui-icon-plus");
          datos.target.classList.remove("ui-icon-check");
        }
      }else if(result=="No registrado"){
        window.plugins.toast.showLongBottom("Usuario no registrado.");
      }},error: function(error){

        window.plugins.toast.showLongBottom("No hay conexión a Internet.");

      }

    });
}

//-------------------------------------------------------------------------------
//
//Funcion para introducir pausas
//
//-------------------------------------------------------------------------------

function resolveAfter(x,mili) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, mili);
  });
}

//-------------------------------------------------------------------------------
//
//Funcion para compartir el evento--> Hay que marcar red social y que tipo se quiere:
//
//  Tipo 1 = Notificar de que hay un artista en la aplicacion
//  Tipo 2 = Notificar de que hay un evento en la aplicacion
//
//-------------------------------------------------------------------------------
function share_media(red,tipo){

  try{
    let mensaje

  if(tipo==1){


  mensaje='¡El artista '+artista_name+' está en la aplicación LivEvent!.¡Descargatela para android y siguelo!';

  }
  if(tipo==2){
      let event_name=document.getElementById("Evento_nombre").textContent;
      mensaje='¡El evento '+event_name+' está en la aplicación LivEvent!.¡Descargatela para android y siguelo!';
  }
  //let link=(document.URL).split("www/")[1];
  //let enlace='https://livevent.es/'+link;
  //enlace=document.URL;

  if(red=="twitter"){
  window.plugins.socialsharing.shareViaTwitter(mensaje, null /* img */, null /*url*/);
  }else if (red=="facebook") {
    window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(mensaje, null /* img */, null /* url */, 'Fallo en el envio, mensaje copiado al portapapeles.', function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
  }else if (red=="whatsapp") {
    window.plugins.socialsharing.shareViaWhatsApp(mensaje, null /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});
  }else if(red=="paste"){
    cordova.plugins.clipboard.copy(mensaje);
    try{
    window.plugins.toast.showShortCenter('Mensaje copiado al portapapeles.', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)});
    }catch(e){
      alert("Mensaje copiado al portapapeles.");
    }
  }
}catch(e){
  alert(e);
}
}
//-------------------------------------------------------------------------------
//
//Funcion para sacar la fecha en el formato que quiero
//
//-------------------------------------------------------------------------------
function sacar_fecha(event_date,tipo){
  let date=new Date(event_date);
  //console.log(event_date)
  let dia=date.getDay();
  let month=date.getMonth();

  //console.log(dia)
  let wdia;
  let mes;

  switch(dia) {
    case 0:
    wdia="Lunes";
    break;
    case 1:
    wdia="Martes";
    break;
    case 2:
    wdia="Miércoles";
    break;
    case 3:
    wdia="Jueves";
    break;
    case 4:
    wdia="Viernes";
    break;
    case 5:
    wdia="Sábado";
    break;
    case 6:
    wdia="Domingo";
    break;
    }
    switch(month) {
      case 0:
        mes="ene.";
        break;
      case 1:
        mes="feb.";
        break;
      case 2:
        mes="mar.";
        break;
      case 3:
        mes="abr.";
        break;
      case 4:
        mes="may.";
        break;
      case 5:
        mes="jun.";
        break;
      case 6:
        mes="jul.";
        break;
      case 7:
        mes="ago."
        break;
      case 8:
        mes="sep."
        break;
      case 9:
        mes="oct."
        break;
      case 10:
        mes="nov."
        break;
      case 11:
        mes="dic."
        break;
      }
    let hora;
    let minutos;
    let hora_event;

    if(tipo==1){
      if(parseInt(date.getHours())<10){
        hora="- 0"+date.getHours();
        console.log(hora);
      }else{
        hora="- "+date.getHours();
      }
      if(date.getMinutes()<10){
        minutos="0"+date.getMinutes();
      }else{
        minutos=date.getMinutes();
      }
      hora_event=hora+":"+minutos

    }else{
      hora_event="";
    }
    console.log(hora_event);
    return wdia+" "+date.getDate()+" "+mes+" "+date.getFullYear()+" "+hora_event;
}



//Barra lateral

function toggle_sidebar()
{
    let sidebar = document.getElementById("sidebar");
    let resto=document.getElementById("resto");

    console.log(sidebar.style.left);

    if(sidebar.style.left == "-200px")
    {
        resto.addEventListener("click", toggle_sidebar);
        resto.style.opacity="3";
        sidebar.style.left = "0px";
    }
    else
    {
        resto.removeEventListener("click", toggle_sidebar);
        sidebar.style.left = "-200px";
    }
}

//Para las tabs

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
