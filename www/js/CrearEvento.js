
function getids(){
  try{

    let sharedPreferences = window.plugins.SharedPreferences.getInstance("login");

    let key = 'id_artista';
    let successCallback = function(value) {
         $("#frame").attr("src", "OpcionCrearEvento.html?artistID="+value);

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
