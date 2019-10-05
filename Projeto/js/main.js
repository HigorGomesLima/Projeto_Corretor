function MenuPrincipal(nome){
    var $submenus = document.querySelectorAll('.submenu');
    $submenus.forEach((stl) => {
        stl.style.maxHeight = '0em';
    });
    if(nome != "nada"){
        var $submenu = document.querySelectorAll(nome);
        $submenu[0].style.maxHeight = '7em';
    }
}