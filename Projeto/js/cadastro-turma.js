function CriaTurma(){
    var _alunos;
    var _tabela_aluno = document.querySelector(".formulario-aluno .tabela-aluno tbody");
    var _padrao = document.querySelectorAll(".formulario-aluno .tabela-aluno tbody .dados-aluno td");
    var _btn_addaluno = document.querySelector(".btn-adicionar-avulso");
    var _btn_enviar_csv = document.querySelector(".btn-importar-csv");
    _alunos = _tabela_aluno.length;
    _btn_addaluno.addEventListener('click', adicionarCampo);
    _btn_enviar_csv.addEventListener('click', lerArquivoCSV);
    function adicionarCampo(){
        var nova_linha = _tabela_aluno.insertRow(0);
        nova_linha.className = "dados-aluno-"+_alunos;
        nova_linha.insertCell(0).innerHTML = _padrao[0].innerHTML;
        nova_linha.insertCell(1).innerHTML = _padrao[1].innerHTML;
        nova_linha.insertCell(2).innerHTML = _padrao[2].innerHTML;
        nova_linha.insertCell(3).innerHTML = _padrao[3].innerHTML;
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
    reader.readAsText(_arquivo.files[0]);
}

function loadCSV(event){
    var csv = event.target.result;
    var lines = csv.split('\n');
    var inicio = 0;
    var listaAlunos;
    lines.forEach((line,i) => {
        console.log(i,line);
        var texto = line.split(';');
        texto.forEach((text) => {
            if(text == 'Nome do Aluno'){
                inicio = i+1;
            }
        });
        if(i >= inicio){
            var aluno;
            texto.forEach((text) => {
                if(text != ''){
                    aluno.push(text);
                }
            })
            listaAlunos.push(aluno);
        }
    });
    console.log(listaAlunos);
}