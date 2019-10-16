var _menu_aberto = 'nada';
var _login_aberto = false;
var _usuario = 'visitante';
var _logado = false;
var _user = '';

(function main(){
    const firebaseConfig = {
    apiKey: "AIzaSyCI6LDePJLmWcEyP6u06cjtbhsCEY7_CFc",
    authDomain: "bancodadossimples.firebaseapp.com",
    databaseURL: "https://bancodadossimples.firebaseio.com",
    projectId: "bancodadossimples",
    storageBucket: "bancodadossimples.appspot.com",
    messagingSenderId: "489659906933",
    appId: "1:489659906933:web:6bf4a41eda7eecb999f13c",
    measurementId: "G-B3ZCL5PWNZ"
  };
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(function (user) {
        if(user){
            _user = getUser(user.email);
            _user.then(function(d){
                _usuario = d.tipo;
                $(".btn-logar img").attr("src","imagem/logout.svg");
                $(".info-log").html("<a>"+d.nome+"</a>");
                $(".tooltip-logar").text("Sair");
                _logado = true;
                definirMenu();
                $(".login,.fundo").fadeOut('slow');
                $(".loader").fadeOut('slow');
            });
        }else{
            _logado = false;
            _usuario = 'visitante';
            $(".btn-logar img").attr("src","imagem/login.svg");
            $(".info-log").html("<a>Bem vindo</a>");
            $(".tooltip-logar").text("Entrar");
            definirMenu();
            $(".fundo").fadeOut('slow');
            $(".loader").fadeOut('slow');
        }
    });
})();

//Botão de logar do header
$(".btn-logar").click(function(){
    if(!_logado){
        if(_login_aberto){
            $(".login,.fundo").fadeOut('slow');
            _login_aberto = false;
        }else{
            $(".login,.fundo").fadeIn('slow');
            _login_aberto = true;
        }
    }else{
        if(_login_aberto){
            $(".logout,.fundo").fadeOut('slow');
            _login_aberto = false;
        }else{
            $(".logout,.fundo").fadeIn('slow');
            _login_aberto = true;
        }
    }
});

//Tele de opção de logout
$(".btn-cancelar").click(function (){
    $(".login,.fundo,.logout").fadeOut('slow');
    _login_aberto = false;
});

$(".btn-confirmar").click(function (){
    firebase.auth().signOut().then(function (){
        $(".logout,").fadeOut('slow');
        $(".loader").fadeIn('slow');
        _login_aberto = false;
        _usuario = 'visitante';
    }).catch(function (erro){
        $(".logout,.fundo").fadeOut('slow');
        //alert("Erro "+erro);
    });
});

//Menu principal
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

//Botão de confirma o login
$(".btn-entrar").click(function (){
    var email = $(".login input[name='email']").val();
    var password = $(".login input[name='password']").val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (){
        $(".login").hide;
        $(".loader").fadeIn('slow');
    }).catch(function (erro){
        alert("Usuário ou senha incorreta");
    })
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