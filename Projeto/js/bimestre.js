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
        $(".habilidades").fadeToggle("slow");
    });
    $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
    $(".descricao-habilidades .exluir").bind('click',removerCampo);
})

function removerCampo(){
    var par = $(this).parent().parent();
    par.remove();
}

function atualizar(){
    var codigo = $(this).val().toUpperCase();
    var descricao = $(this).parent().parent().children("td:nth-child(2)");
    if(_habilidades != undefined && codigo.length > 1){
        if(_habilidades[codigo] == undefined){
            descricao.html("<td><textarea readonly name='descricao'>Código não localizado</textarea></td>");
        }else{
            descricao.html("<td><textarea readonly name='descricao'>"+_habilidades[codigo]+"</textarea></td>");
        }
    }else{
        descricao.html("<td><textarea readonly name='descricao'></textarea></td>");
    }
};

$(".btn-adicionar").click(function (){
    $(".descricao-habilidades tbody").append("<tr><td><input type='text' name='codigo'></td><td><textarea name='descricao'></textarea></td><td><img src='imagem/trash-alt-solid.svg' class='exluir'></td></tr>");
    $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
    $(".descricao-habilidades .exluir").bind('click',removerCampo);
});