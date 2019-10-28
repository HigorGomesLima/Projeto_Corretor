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

function getTurma(codigo){
    var _db = firebase.firestore();
    if(codigo != ''){
        var _turma = _db.collection('turma').doc(codigo);
        return _turma.get().then(function (doc){
            return {
                nome: doc.data().nome,
                ensino: doc.data().ensino,
                ano: doc.data().ano,
                turno: doc.data().turno,
                codigo: codigo
            }
        });
    }
}

function getUser(email){
    var _db = firebase.firestore();
    if(email != ''){
        var _user = _db.collection('user').doc(email);
        return _user.get().then(function(doc){
            return { nome: doc.data().nome,
                    tipo: doc.data().tipo,
                   email: doc.data().email,
                   turma: doc.data().turma,
                   disciplina: doc.data().disciplina};
        })
    }
}

function getFicha_Bimestral(email,turma,disciplina){
    var _db = firebase.firestore();
    if(email != ''){
        var _ficha = _db.collection('ficha_bimestral')
        .where('professor','==',email)
        .where('turma','==',turma)
        .where('disciplina','==',disciplina);
        return _ficha.get().then(function (lista){
            var r = [];
            lista.forEach(function (doc){
                var aux = {
                    bimestre: doc.data().bimestre,
                    habilidades: doc.data().habilidades
                }
                r.push(aux);
            })
            return r;
        });
    }
}

function setFicha_Bimestral(obj_bimeste){
    var _db = firebase.firestore();
    var _criar = true;
    if(obj_bimeste.professor != ''){
        var _ficha = _db.collection('ficha_bimestral')
        .where('professor','==',obj_bimeste.professor)
        .where('turma','==',obj_bimeste.turma)
        .where('disciplina','==',obj_bimeste.disciplina)
        .where('bimestre','==',obj_bimeste.bimestre);
        _ficha.get().then(function (doc){
            doc.forEach((element) => {
                _criar = false;
                if(element.exists){
                    element.ref.update({
                        habilidades: obj_bimeste.habilidades
                    })
                }
            })
            if(_criar){
            _db.collection('ficha_bimestral').doc().set({
                bimestre: obj_bimeste.bimestre,
                disciplina: obj_bimeste.disciplina,
                professor: obj_bimeste.professor,
                turma: obj_bimeste.turma,
                habilidades: obj_bimeste.habilidades
            })
        }
        }).catch(function (erro){
            console.log(erro);
        })
    }
}

function getBimestreAlunos(turma,disciplina){
    var lista_alunos = [];
    var _db = firebase.firestore();
    var _alunos = _db.collection('aluno').where('turma','==',turma);
    return _alunos.get().then((stl) => {
        stl.forEach((doc_aluno) => {
            var aluno = {
                id: doc_aluno.id,
                nome: doc_aluno.data().nome,
                matricula: doc_aluno.data().matricula,
                bimestres: []
            };
            doc_aluno.ref.collection('ficha_individual').get().then((stl2) => {
                var bimestres = [];
                stl2.forEach((doc_ficha) => {
                    var ficha = {
                        id: doc_ficha.id,
                        bimestre: doc_ficha.data().bimestre,
                        conceito: doc_ficha.data().conceito,
                        habilidades: doc_ficha.data().habilidades,
                        atitudes: doc_ficha.data().atitudes,
                        melhoria: doc_ficha.data().melhoria,
                        observacao: doc_aluno.data().observacao
                    };
                    bimestres[(doc_ficha.data().bimestre-1)] = ficha;
                });
                aluno.bimestres = bimestres;
                lista_alunos.push(aluno);
            });
        });
        return lista_alunos;
    });
}