var _disciplina;
var _turma;
var _bUser;
var _habilidades;
var _bimestres;
var _email;
var _bimestre_selecionado;
var _lista_conceitos = {};
//Carregar usuário
(function Bimestre(){
    $(".fundo,.loader").fadeIn('fast');
    (function setUser(){
        _bUser = _user;
        if(_bUser == undefined){
            setTimeout(setUser,500);
        }else{
           _bUser.then(function (d){
                _turma = d.turma;
                _email = d.email;
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
    $(".descricao-habilidades tbody").empty();
    $.getJSON("js/habilidades.json",function (data){
        _habilidades = data[_disciplina];
        var cTurma = $(".selecao-turma .turmas").val();
        getFicha_Bimestral(_email,cTurma,_disciplina).then(function (lista) {
            _bimestres = lista;
            _bimestres.sort(function (A,B){
                var vA = parseInt(A.bimestre);
                var vB = parseInt(B.bimestre);
                return vA - vB;
            });
            _bimestres[0].habilidades.forEach((h) => {
                $(".descricao-habilidades tbody").append("<tr><td><input type='text' name='codigo' value='"+h+"'></td><td><textarea name='descricao'>"+_habilidades[h]+"</textarea></td><td><img src='imagem/trash-alt-solid.svg' class='exluir'></td></tr>");
                $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
                $(".descricao-habilidades .exluir").bind('click',removerCampo);
                _bimestre_selecionado = 0;
            });
            $(".habilidades").fadeToggle("slow");
            if(_bimestres[0].length == 0){
                $(".descricao-habilidades tbody").append("<tr><td><input type='text' name='codigo'></td><td><textarea name='descricao'></textarea></td><td><img src='imagem/trash-alt-solid.svg' class='exluir'></td></tr>");
                $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
                $(".descricao-habilidades .exluir").bind('click',removerCampo);
            }
        });
    });
    atualizarAlunos();
    $(".habilidades ul li").bind('click',carregarBimestre);
});

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

$(".btn-adicionar div").click(function (){
    $(".descricao-habilidades tbody").append("<tr><td><input type='text' name='codigo'></td><td><textarea name='descricao'></textarea></td><td><img src='imagem/trash-alt-solid.svg' class='exluir'></td></tr>");
    $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
    $(".descricao-habilidades .exluir").bind('click',removerCampo);
});

$(".btn-cadastrar-habilidades").click(function (){
    var lista_habilidades = [];
    $(".descricao-habilidades tbody tr td input[name='codigo']").each( (i,h) => {
        if(h.value != ''){
            lista_habilidades.push(h.value.toUpperCase());
        }
    });
    var obj = {
        bimestre: (_bimestre_selecionado+1),
        disciplina: _disciplina,
        professor: _email,
        turma: $(".selecao-turma .turmas").val(),
        habilidades: lista_habilidades
    }
    setFicha_Bimestral(obj);
})

function carregarBimestre(){
    var valor = parseInt($(this).val() -1);
    _bimestre_selecionado = valor;
    $(".descricao-habilidades tbody").empty();
    if(_bimestres[valor] == undefined || _bimestres[valor].habilidades.length == 0){
        $(".descricao-habilidades tbody").append("<tr><td><input type='text' name='codigo'></td><td><textarea name='descricao'></textarea></td><td><img src='imagem/trash-alt-solid.svg' class='exluir'></td></tr>");
        $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
        $(".descricao-habilidades .exluir").bind('click',removerCampo);
    }else{
        _bimestres[valor].habilidades.forEach((h) => {
            $(".descricao-habilidades tbody").append("<tr><td><input type='text' name='codigo' value='"+h+"'></td><td><textarea name='descricao'>"+_habilidades[h]+"</textarea></td><td><img src='imagem/trash-alt-solid.svg' class='exluir'></td></tr>");
            $(".descricao-habilidades input[name='codigo']").bind('keyup',atualizar);
            $(".descricao-habilidades .exluir").bind('click',removerCampo);
        });
    }
}

function atualizarAlunos(){
    var lista_alunos = getBimestreAlunos(_turma[0],_disciplina);
    var lista_aux;
    lista_alunos.then((lista) => {
        lista_aux = lista;
    });
    (function timePromise() {
        if(lista_aux == undefined){
            setTimeout(timePromise,500);
        }else{
            if(lista_aux.length > 0){
                lista_aux.sort(function (A,B){
                    if(A.nome<B.nome){
                        return -1;
                    }else if(B.nome<A.nome){
                        return 1;
                    }else{
                        return 0;
                    }
                });
                listarAlunos();
            }else{
                setTimeout(timePromise,500);
            }
        }
    })();
    function listarAlunos(lista){
        if(lista_aux == undefined){
            console.log("error");
        }else{
            lista_aux.forEach((stl) => {
                var aluno = {
                    id: stl.id,
                    matricula: stl.matricula,
                    nome: stl.nome
                };
            var bimestres = [];
            for(var i = 0;i < 4;i++){
                if(stl.bimestres[i] == undefined){
                    bimestres[i] = {
                        bimestre: (i+1),
                        conceito: '-'
                    };
                }else{
                    bimestres[i] = {
                        id: stl.bimestres[i].id,
                        conceito: stl.bimestres[i].conceito
                    };
                }
            }
            aluno['bimestres'] = bimestres;
            _lista_conceitos[aluno.matricula] = aluno;
        });
            listarTabela();
        }
    }
    function listarTabela(){
        if(_lista_conceitos != {}){
            $(".lista-alunos tbody").empty();
            let array_alunos = Object.entries(_lista_conceitos);
            array_alunos.sort(function (A,B){
                if(A[1].nome < B[1].nome) { return -1;}
                else if(A[1].nome > B[1].nome) {return 1;}
                else {return 0;}
            })
            array_alunos.forEach((stl) => {
                var aluno_html = "<tr value='"+stl[1].matricula+"'><td>"+stl[1].matricula+"</td><td>"+stl[1].nome+"</td>";
                stl[1].bimestres.forEach((bim) => {
                    aluno_html += "<td class='btn-conceito"+bim.conceito+" value='"+bim.bimestre+"'>"+bim.conceito+"</td>";
                });
                $(".lista-alunos tbody").append(aluno_html);
            });
        }
    }
}