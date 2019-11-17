//---------------------------------------------------------------------------------------
//
//Sitio para poner las shared preferences de momento
//
// Igual hay que probar mas tarde a poner algo que compruebe que tiene internet
//
//---------------------------------------------------------------------------------------


function check_id(){
  try{

    let sharedPreferences = window.plugins.SharedPreferences.getInstance();

    let key = 'id_unico';
    let successCallback = function(value) {
        //alert(value);
      }
    let errorCallback = function(err) {
        unique_id();
    }

  sharedPreferences.get(key, successCallback, errorCallback)
  }catch(e){
    alert(e);
  }
}

function unique_id(){
  try{
  let sharedPreferences = window.plugins.SharedPreferences.getInstance();

    let key = 'id_unico';
    let d = new Date();
    let x=d.getTime();
    let value = x+"-LE-"+Math.random().toString(36).substring(2, 15);
    let successCallback = function() {

      $.post("https://livevent.es/api/v1/user_create.php",{
        IMEI: value
      },function(result,status){
          if(status==="success"){
            let datos=JSON.parse(JSON.stringify(result));
            //alert(result);
          }else{
            alert("Debe disponer de conexion a Internet la primera vez que se conecte.");
          }
      }
    );

    }
    let errorCallback = function(err) {
        alert(err);
    }

    sharedPreferences.put(key, value, successCallback, errorCallback);
}catch(e){
  alert(e);
}

}
