var _disciplina;
var _turma;
var _bUser;
var _habilidades;
(function Bimestre(){
    $(".fundo,.loader").fadeIn('fast');
    (function setUser(){
        _bUser = _user;
        if(_bUser == undefined){
            setTimeout(setUser,500);
        }else{
           _bUser.then(function (d){
                _turma = d.turma;
                _disciplina = d.disciplina;
               _turma.forEach((t) => {
                   getTurma(t).then(function (n){
                       $(".selecao-turma .turmas").append("<option name='turma' value='"+n.codigo+"'>"+n.nome+"</option>");
                   });
               });
               _disciplina.forEach((stl) =>{
                    $(".selecao-turma .disciplina").append("<option name='disciplina' value='"+stl+"'>"+stl+"</option>");
                });
            });
            $(".fundo,.loader").fadeOut('fast');
        }
    })();
})();

$(".btn-carregar-disciplina").click(function (){
    _disciplina = $(".disciplina").val();
    $.getJSON("js/habilidades.json",function (data){
        _habilidades = data[_disciplina];
    })
})

$(".descricao-habilidades input[name='codigo']").keyup(function(){
    if(_habilidades != undefined){
        var descricao = $(".descricao-habilidades textarea[name='descricao']");
        var codigo = $(".descricao-habilidades input[name='codigo']").val().toUpperCase();
        descricao.val(_habilidades[codigo]);
    }
});