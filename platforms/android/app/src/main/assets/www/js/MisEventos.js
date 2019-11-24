
//Sacar el ID del usuario de la buena shared preferences

function check_id(){
  try{
    let sharedPreferences = window.plugins.SharedPreferences.getInstance("app");
    let key = 'id_unico';
    let successCallback = function(value) {
        let url="ListaEventos.html?flag=1&check=1&user="+value;
        $("#eventos").attr("src", url);
      }
    let errorCallback = function(err) {
        alert("Ha habido un error");
    }

  sharedPreferences.get(key,successCallback,errorCallback);
  }catch(e){
    alert(e);
  }
}
