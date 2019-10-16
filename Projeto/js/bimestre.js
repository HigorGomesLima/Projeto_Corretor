var _disciplina = ["Matemática"];
var _turma = ['2019_1-006'];
var _bUser;
(function Bimestre(){
    _turma.forEach((stl) => {
        getTurma(stl).then(function (d){
            $(".selecao-turma .turmas").append("<option name='turma' value='"+d.codigo+"'>"+d.nome+"</option>");
        });
    });
    
    _disciplina.forEach((stl) =>{
        $(".selecao-turma .disciplina").append("<option name='disciplina' value='"+stl+"'>"+stl+"</option>");
    });
})();