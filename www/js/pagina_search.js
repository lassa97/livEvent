

function ostias(){
  let y=document.getElementsByClassName("ui-btn");
  y[1].classList.add("ui-alt-icon");
    y[1].classList.add("ui-nodisc-icon");
    y[1].id="boton_equis"


}
function busqueda(){

  let texto=document.getElementById('buscador').value;
  if(texto.length>2){
    console.log(texto.length);
    document.getElementsByClassName("ui-btn")[1].classList.add("ui-state-disabled");
    var $this = $( "boton_equis" ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
  }
  if(texto.length>5){
    $.mobile.loading( "hide" );
    document.getElementsByClassName("ui-btn")[1].classList.remove("ui-state-disabled");
  }

}
