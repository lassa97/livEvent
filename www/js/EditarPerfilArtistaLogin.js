//-----------------------------------------------------------------------------------------------------------------------------------
// Función perfil artista login para dirigir a la edicion de perfil con el id
//-----------------------------------------------------------------------------------------------------------------------------------
let boton = document.getElementById("boton");

boton.onclick = function dirigirEditarPerfil(){
  let params = new URLSearchParams(location.search);
  let datos = params.get('id');
  window.open("EditarPerfilArtista.html?id="+datos,"_top");
        
  
}