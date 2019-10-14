var _menu_aberto = 'nada';
var _login_aberto = false;
var _usuario = 'visitante';

(function main(){
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            var user = getUser(user.email);
            user.then(function(d){
                _usuario = d.tipo;
                definirMenu();
            });
        }else{
            console.log("offline");
        }
    });
})();

$(".btn-logar").click(function(){
    if(_login_aberto){
        $(".login,.fundo").fadeOut('slow');
        _login_aberto = false;
    }else{
        $(".login,.fundo").fadeIn('slow');
        _login_aberto = true;
    }
});
$(".btn-cancelar").click(function (){
    $(".login,.fundo").fadeOut('slow');
    _login_aberto = false;
});
$(".opcao").click(function (){
    $(".submenu").hide();
    if(_menu_aberto != $(this).attr('class')){
        $(this).children(".submenu").animate({
            height: 'toggle'
        },'slow');
        _menu_aberto = $(this).attr('class');
    }else{
        _menu_aberto = 'nada';
    }
});

$(".btn-entrar").click(function (){
    var email = $(".login input[name='email']").val();
    var password = $(".login input[name='password']").val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(erro){
        console.log(erro);
    });
    $(".login,.fundo").fadeOut('slow');
    _login_aberto = false;
});

function definirMenu(){
    if(_usuario == 'visitante'){
        $(".opcao-provas").hide();
        $(".opcao-turmas").hide();
        $(".opcao-relatorio").hide();
    }else if(_usuario == 'administrador'){
        $(".opcao-provas").show();
        $(".opcao-turmas").show();
        $(".opcao-relatorio").show();
    }
    $(".submenu").hide();
}