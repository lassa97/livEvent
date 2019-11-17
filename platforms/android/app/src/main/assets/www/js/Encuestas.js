

function comprobarEncuestas(){

  $.ajax({url: "http://livevent.es/api/v1/event_list.php?eventID="+id,
  success: function(result,status){
              //document.getElementById("Artista_nombre").textContent=JSON.stringify(result);
              let datos=JSON.parse(JSON.stringify(result));
              console.log(JSON.stringify(datos));
              let datos_evento=datos['msg'];
              constructor_cabecera(datos_evento['description'],datos_evento['localization'],datos_evento['date'],datos_evento['image'],id);
              constructor_tickets(null);
              montar_notificaciones(datos_evento['artistID'],id);
              montar_artista(datos_evento['artistID']);
              if()
          },error: function(error){
              let reason_error=JSON.parse(JSON.stringify(error));
              if(reason_error['readyState']===0){
                alert("No hay conexión a Internet");
                //Hacer una página web de mantenimiento/No internet
                //window.open()
              }
            }

});

}
