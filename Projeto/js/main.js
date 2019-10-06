function MenuPrincipal(nome,pai){
    var $submenus = document.querySelectorAll('.submenu');
    var $opcoes = document.querySelectorAll('.opcao');
    $submenus.forEach((stl) => {
        stl.style.maxHeight = '0em';
    });
    $opcoes.forEach((stl) => {
        stl.style.color = 'white';
    });
    var $submenu = document.querySelector(nome);
    if(nome != "nada" || $submenu.style.maxHeight == '0em'){
        $submenu.style.maxHeight = '7em';
        var $opcao = document.querySelector(pai);
        $opcao.style.color = 'skyblue';
    }else{
        alert('erro');
    }
}