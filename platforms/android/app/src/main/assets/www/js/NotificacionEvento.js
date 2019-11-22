
  //---------------------------------------------------------------------------------------
  //
  //Función para ver a donde retrocedo
  //
  //---------------------------------------------------------------------------------------
  function retroceso_evento(){
    //console.log(window.history);
    //A ver como la puedo poner bien....
    window.history.back();
  }


  //---------------------------------------------------------------------------------------
  //
  //Funciones para coger identificadores
  //
  //---------------------------------------------------------------------------------------



  function getids(){
    try{
      let sharedPreferences = window.plugins.SharedPreferences.getInstance("login");

      let key = 'id_artista';
      let successCallback = function(value) {
           $("#evento").attr("src", "ListaNotificacionesArtistas.html?artistID="+value);

        }
      let errorCallback = function(err) {
          alert(err);
      }

    sharedPreferences.get(key, successCallback, errorCallback)
    }catch(e){
      alert("HOLA");
      alert(e);
    }
  }
/*
  function link_create(){
    try{

      let sharedPreferences = window.plugins.SharedPreferences.getInstance();

      let key = 'id_artista';
      let successCallback = function(value) {
          $("#crearEvento").attr("href", "CrearEvento.html?id="+value);
          $("#miPerfil").attr("href", "PerfilArtistaLogin.html?id="+value);
        }
      let errorCallback = function(err) {
          alert(err);
      }

    sharedPreferences.get(key, successCallback, errorCallback)
    }catch(e){
      alert(e);
    }
  }
*/
