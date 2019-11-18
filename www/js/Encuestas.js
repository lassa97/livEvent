

getids();


function getids(){
  let url= document.URL;
  let encuesta_id=url.split("Encuesta=")[1];
  let user_id=null;
  $("form")[0].reset();

  try{

    let sharedPreferences = window.plugins.SharedPreferences.getInstance();

    let key = 'id_unico';
    let successCallback = function(value) {
        user_id=value;
      }
    let errorCallback = function(err) {
        alert("Ha habido un error.")
    }

  sharedPreferences.get(key, successCallback, errorCallback)
  }catch(e){
    alert(e);
  }


  $("#survey_id").value=encuesta_id;
  console.log(encuesta_id);
}
