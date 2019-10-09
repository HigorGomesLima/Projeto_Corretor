function CriaTurma(){
    var _alunos;
    var _tabela_aluno = document.querySelector(".formulario-aluno .tabela-aluno tbody");
    var _padrao = document.querySelectorAll(".formulario-aluno .tabela-aluno tbody .dados-aluno td");
    var _btn_addaluno = document.querySelector(".btn-adicionar-avulso");
    _alunos = _tabela_aluno.length;
    
    _btn_addaluno.addEventListener('click', adicionarCampo);
    function adicionarCampo(){
        var nova_linha = _tabela_aluno.insertRow(1);
        nova_linha.className = "dados-aluno-"+_alunos;
        nova_linha.insertCell(0).innerHTML = _padrao[0].innerHTML;
        nova_linha.insertCell(1).innerHTML = _padrao[1].innerHTML;
        nova_linha.insertCell(2).innerHTML = _padrao[2].innerHTML;
        nova_linha.insertCell(3).innerHTML = _padrao[3].innerHTML;
    }
}
function removerCampo(config){
    var _linha_remover = config.parentElement.innerHTML;
    _linha_remover.parentElement.removeChild(_linha_remover);
}