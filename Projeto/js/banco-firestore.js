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
  }

  function setTurma(dados){
    var _db = firebase.firestore();
    if(dados.nome != ''){
        var _cTurma = _db.collection('turma');
        var id = dados.ano+"_"+dados.nome;
        _cTurma.doc(id).set({
            nome: dados.nome,
            ano: dados.ano,
            ensino: dados.ensino,
            turno: dados.turno
        });
        var _cAlunos = _db.collection('aluno');
        dados.alunos.forEach((stl) => {
            _cAlunos.doc().set({
                nome: stl.nome,
                matricula: stl.matricula,
                turma: id
            });
        })
    }
  }

function getUser(email){
    var _db = firebase.firestore();
    if(email != ''){
        var _user = _db.collection('user').doc(email);
        return _user.get().then(function(doc){
            return { nome: doc.data().nome,
                    tipo: doc.data().tipo};
        })
    }
}