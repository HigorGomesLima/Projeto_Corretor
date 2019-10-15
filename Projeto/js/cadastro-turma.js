var _total_alunos = 0;
(function CriaTurma(){
    $(".btn-adicionar-avulso").bind('click',adicionarCampo);
    $(".btn-importar-csv").bind('click',lerArquivoCSV);
    $(".btn-cadastrar").bind('click',cadastrarTurma);
})();

function adicionarCampo(){
    var _tabela_aluno = document.querySelector(".formulario-aluno .tabela-aluno tbody");
    var _campo_novo = document.querySelector(".dados-aluno");
    var nova_linha = _tabela_aluno.insertRow(-1);
    var matricula = _campo_novo.querySelector('input[name="matricula"]').value;
    var nome = _campo_novo.querySelector('input[name="nome-aluno"]').value;
    if(matricula != '' && nome != ''){
        _total_alunos = $(".formulario-aluno .tabela-aluno tbody tr").length -1;
        nova_linha.insertCell(0).innerHTML = _campo_novo.querySelector('input[name="matricula"]').value;
        _campo_novo.querySelector('input[name="matricula"]').value = '';
        nova_linha.insertCell(1).innerHTML = _campo_novo.querySelector('input[name="nome-aluno"]').value;
        _campo_novo.querySelector('input[name="nome-aluno"]').value = '';
        nova_linha.insertCell(2).innerHTML = '<div class="btn-editar"><img src="imagem/user-edit-solid.svg"></div>';
        nova_linha.insertCell(3).innerHTML = '<div class="btn-excluir"><img src="imagem/user-minus-solid.svg"></div>';
        $(".btn-excluir").bind("click",removerCampo);
        $(".btn-editar").bind("click",editCampo);
        document.querySelector(".numero-total").innerHTML = _total_alunos;
    }else{
        alert("Digite a matrícula e o nome");
    }
}
function removerCampo(){
    var par = $(this).parent().parent();
    par.remove();
    _total_alunos = $(".formulario-aluno .tabela-aluno tbody tr").length-1;
    document.querySelector(".numero-total").innerHTML = _total_alunos;
}
function editCampo(){
    var par = $(this).parent().parent();
    var matricula = par.children("td:nth-child(1)");
    var nome = par.children("td:nth-child(2)");
    var btn = par.children("td:nth-child(3)");
    
    matricula.html("<input type='number' name='matricula' value='"+matricula.html()+"'/>");
    nome.html("<input type='text' name='nome-aluno' value='"+nome.html()+"'/>");
    btn.html("<div class='btn-salvar'><img src='imagem/user-check-solid.svg'></div>");
    $(".btn-salvar").bind("click",saveCampo);
}

function saveCampo(){
    var par =$(this).parent().parent();
    var matricula = par.children("td:nth-child(1)");
    var nome = par.children("td:nth-child(2)");
    var btn = par.children("td:nth-child(3)");
    matricula.html(matricula.children("input").val());
    
    nome.html(nome.children("input").val());
    btn.html("<div class='btn-editar'><img src='imagem/user-edit-solid.svg'></div>");
    $(".btn-editar").bind("click",editCampo);
}
function lerArquivoCSV(){
    var _arquivo = document.querySelector(".selecionar-csv input");
    var reader = new FileReader();
    reader.onload = loadCSV;
    reader.readAsText(_arquivo.files[0],'ISO-8859-1');
    _arquivo.value = '';
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
        nova_linha.insertCell(2).innerHTML = '<td><div class="btn-editar"><img src="imagem/user-edit-solid.svg"></div></td>';
        nova_linha.insertCell(3).innerHTML = '<td><div class="btn-excluir"><img src="imagem/user-minus-solid.svg"></div></td>';
        $(".btn-excluir").bind("click",removerCampo);
        $(".btn-editar").bind("click",editCampo);
    });
    _total_alunos = $(".formulario-aluno .tabela-aluno tbody tr").length-1;
    document.querySelector(".numero-total").innerHTML = _total_alunos;
}

function cadastrarTurma(){
    var ano = $(".formulario-ano-letivo .selecao-ano").val();
    var nome = $(".forumulario-turma input[name='nome']").val();
    var ensino = $(".forumulario-turma .selecao-ensino").val();
    var turno = $(".forumulario-turma .selecao-turno").val();
    if(nome != ''){
        var alunos = [];
        var lista_alunos = document.querySelectorAll(".formulario-aluno .tabela-aluno tbody tr");
        lista_alunos.forEach((dado,index) => {
            if(index > 0){
                var aux = {
                    matricula: dado.querySelector("td:nth-child(1)").innerHTML,
                    nome: dado.querySelector("td:nth-child(2)").innerHTML
                }
                alunos.push(aux);
            }
        });
        var nova_turma = {
            ano: ano,
            nome: nome,
            ensino: ensino,
            turno: turno,
            alunos: alunos
        }
        setTurma(nova_turma);
        alert("Turma cadastrada");
        location.reload(true);
    }
}