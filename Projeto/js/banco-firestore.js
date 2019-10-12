  function getAlunos(nome_turma){
      var _db = firebase.firestore();
      var _lista = []
      if(nome_turma != ''){
          var _cAluno = _db.collection('aluno');
          _cAluno.where('turma','==',nome_turma).get().then((data) => {
              data.docs.forEach(doc => {
                  var _aux = {
                      matricula: doc.data().matricula,
                      nome: doc.data().nome
                  }
                  _lista.push(_aux);
              })
          })
      }
      console.log(_lista);
  }

  function setTurma(dados){
    var _db = firebase.firestore();
    if(dados.nome != ''){
        var _cTurma = _db.collection('turma');
        var id = dados.ano+dados.nome;
        _cTurma.doc(id).set({
            nome: dados.nome,
            ano: dados.ano,
            ensino: dados.ensino,
            turno: dados.turno
        });
    }
  }