
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
