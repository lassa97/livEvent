//---------------------------------------------------------------------------------------
//
//Funciones para coger identificadores
//
//---------------------------------------------------------------------------------------

getArtist();

//---------------------------------------------------------------------------------------
//
//Funciones para construir la pagina
//
//---------------------------------------------------------------------------------------

function constructor_lista(id_artista,artista_img,artista_name,artista_genero){

  let elemento=document.createElement("li");
  elemento.classList.add("listview_no_border");
  let enlace=document.createElement("a");
  enlace.classList.add("listview_no_side");
  enlace.target="_top";
  enlace.href="PerfilArtista.html?id="+id_artista;
  let nombre=document.createElement("h2");
  let imagen=document.createElement("img");
  let genero=document.createElement("p");
  nombre.textContent=artista_name;
  if(artista_img==null || artista_img==""){
    artista_img="img/artist_default.jpeg";
  }
  imagen.classList.add("img-responsive");
  imagen.classList.add("center-block");
  imagen.classList.add("imagen-perfil");
  imagen.src=artista_img;

  genero.textContent=artista_genero;
  enlace.append(imagen);
  enlace.append(nombre);
  //enlace.append(genero);
  elemento.append(enlace);

  $('#listview').append(elemento).listview('refresh');

}

//---------------------------------------------------------------------------------------
//
//Funciones para sacar los artistas del usuario
//
//---------------------------------------------------------------------------------------

function getArtist(){

    let flag=0;
    let check=0;

    $.ajax({url: "https://livevent.es/api/v1/artist_list.php",success: function(result){
              let Artistas_listado=JSON.parse(JSON.stringify(result));

              Lista_artistas=Artistas_listado['msg']['artists'];
              let contador=0;
              while(contador<Lista_artistas.length){
                let Datos_artista=Lista_artistas[contador];
                console.log(Datos_artista);

                constructor_lista(Datos_artista['artistID'],Datos_artista['image'],Datos_artista['name'],Datos_artista['description']);
                contador++;

              }
              let checker=0;
              if(Lista_artistas.length==0){
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
