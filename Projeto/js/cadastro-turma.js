function CriaTurma(){
    var _tabela_aluno = document.querySelector(".formulario-aluno .tabela-aluno tbody");
    var _btn_addaluno = document.querySelector(".btn-adicionar-avulso");
    var _btn_enviar_csv = document.querySelector(".btn-importar-csv");
    var _campo_novo = document.querySelector(".dados-aluno");
    _alunos = _tabela_aluno.length;
    _btn_addaluno.addEventListener('click', adicionarCampo);
    _btn_enviar_csv.addEventListener('click', lerArquivoCSV);
    function adicionarCampo(){
        var nova_linha = _tabela_aluno.insertRow(-1);
        nova_linha.insertCell(0).innerHTML = _campo_novo.querySelector('input[name="matricula"]').value;
        nova_linha.insertCell(1).innerHTML = _campo_novo.querySelector('input[name="nome-aluno"]').value;
        nova_linha.insertCell(2).innerHTML = '<div class="btn-editar"><img src="imagem/user-edit-solid.svg"></div>';
        nova_linha.insertCell(3).innerHTML = '<div class="btn-excluir"><img src="imagem/user-minus-solid.svg"></div>';
        console.log(_campo_novo);
        $(".btn-excluir").bind("click",removerCampo);
    }
}
function removerCampo(){
    var par = $(this).parent().parent();
    par.remove();
}
function lerArquivoCSV(){
    var _arquivo = document.querySelector(".selecionar-csv");
    var reader = new FileReader();
    reader.onload = loadCSV;
    reader.readAsText(_arquivo.files[0],'ISO-8859-1');
}

function loadCSV(event){
    var csv = event.target.result;
    var lines = csv.split('\n');
    var inicio = 999;
    var listaAlunos = [];
    var dados = true;
    lines.forEach((line,i) => {
        var texto = line.split(';');
        texto.forEach((text) => {
            if(text == 'Nome do Aluno'){
                inicio = i + 1;
            }
        });
    });
    for(var i = inicio;dados;i++){
        var linha = lines[i].split(';');
        console.log(linha);
        if(linha.length < 3 || linha[0] == 'Emissão:') dados = false
        else {
            linha = linha.filter(e => e !== '');
            var aluno = {
                matricula: linha[0],
                nome: linha[1]
            };
            listaAlunos.push(aluno);
        }
    }
    criarTabelaAlunos(listaAlunos);
}

function criarTabelaAlunos(lista){
    var _tabela_aluno = document.querySelector(".formulario-aluno .tabela-aluno tbody");
    lista.forEach((aluno) => {
        var nova_linha = _tabela_aluno.insertRow(-1);
        nova_linha.insertCell(0).innerHTML = '<td>'+aluno.matricula+"</td>"
        nova_linha.insertCell(1).innerHTML = '<td>'+aluno.nome+"</td>"
        nova_linha.insertCell(2).innerHTML = '<div class="btn-editar"><img src="imagem/user-edit-solid.svg"></div>';
        nova_linha.insertCell(3).innerHTML = '<div class="btn-excluir"><img src="imagem/user-minus-solid.svg"></div>';
        $(".btn-excluir").bind("click",removerCampo);
    });
}