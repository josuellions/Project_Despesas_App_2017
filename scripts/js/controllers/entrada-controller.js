angular.module('todoApp').controller('EntradaController',
function($scope, entradaAction, alertAction, formatDate, formatValor, pass){
  //$scope.comparaDt = '';
  $scope.formEntrada = {};
  $scope.formEntrada.date = new Date();
  $scope.entradaValorTotal = 0.0;
  $scope.listaEntradas  = [
    {
     'id': 1 ,
     'nome': 'Salario-01',
    },
    {
     'id': 2 ,
     'nome': 'Salario-02',
    },
    {
     'id': 3 ,
     'nome': 'Adiantamento-03',
    },
    {
     'id': 4 ,
     'nome': 'Adiantamento-04',
    },
    {
     'id': 5 ,
     'nome': 'Poupança',
    },
    {
     'id': 6 ,
     'nome': 'Vendas diversas',
    },
    {
     'id': 7 ,
     'nome': 'Outros recursos',
    },
   ]
  
   $scope.update = true;
   $scope.btnSave = '';
   $scope.btnUpdate = 'hidden';
   $scope.entradas = {};

   $scope.titulo = 'Adicionar Entrada';
   $scope.classSubTitulo = 'alinharMes';
   $scope.passmes = true;

  /*Limpar Table e campos Form */
  const LimparCamposForm = () =>{
    $scope.entradas = {};
    $scope.formEntrada = {};
    $scope.formEntrada.date = new Date();
  }

  /*Formatar dados para exibir na table view */
  const ExibirListaView = (dados) => {
    let entradaFormat = [];
    let somaEntrada = 0;
    
    for(let row of dados ){
      entradaFormat.push({
        id: row.id,
        nome: row.entrada,
        dateBd: row.dtLanc,
        dateView: formatDate.dtView(row.data),
        valor: row.valor.toFixed(2),
      })
      somaEntrada += parseFloat(row.valor); 
    }

    return {entradas: entradaFormat, total: formatValor.ptBr(somaEntrada.toFixed(2).replace('.',','))}
  }

  /* Action Entrada - CRUD */
  const Actions = () => {
    /*CREATE - criar Entrada Caixa */
    const createEntrada = () => {
      entradaAction.create($scope.formEntrada).then((res) => {
        LimparCamposForm();
        action.indexEntrada(); //verificar para carregar automaticamente sem declarar aqui
      }).catch((err) => {
        console.log(err.message)
        alertAction.error(err.message).catch((err) =>{
          alert(err.message)
        })
      })
    };
    /*INDEX - listar Entradas Caixa */
    const indexEntrada = () => {
      formatDate.dtConsultaDB().then((res) => {
        entradaAction.index([res.inicio, res.fim]).then((res) => {
          
          if(res.length === 0){
            alertAction.info('Nenhuma despesa cadastrada buscar dados mês anterio')
          }
          const response = ExibirListaView(res)
          $scope.entradas = response.entradas;
          $scope.entradaValorTotal = response.total
          formatValor.moneyMask();

        }).catch((err) => {
            alertAction.error(err.message).catch((err) => {
            alert(err)
          })
        })
      }).catch((err) => {
          alertAction.error(err.message).catch((err) => {
          alert(err)
        })
      })
    }
    /*UPDATE - atualizar dados Entrada Caixa */
    const updateEntrada = (getDados) => {
      return;
    }
    /*COPY - create copiando dados do mês anterio Entrada Caixa */
    const copyEntrada = (getDados) => {
      return
    }
    /*DELETE - excluir dados Entrada de Caixa */
    const deleteEntrada = (getDados) => {
      entradaAction.delete(getDados.dados).then(() => {
        alertAction.success(`Sucesso: "${getDados.dados.nome}" foi excuido!`)
        ListaComTimeOut(); //RENDERIZAR PARA TRATAR DADOS
      }).catch((err) => {
        alertAction.error(err.message).catch((err) => {
          alert(err.message)
        })
      })
    }

    return {
      createEntrada,
      indexEntrada,
      updateEntrada,
      copyEntrada,
      deleteEntrada,
    }
  }

  const action = Actions();
  
  //Exibir Lista Entradas Caixa 
  const ListaComTimeOut = () => {
    setTimeout(() => {
      action.indexEntrada();
      formatValor.moneyMask();
    }, 5); 
  }

  //action.indexEntrada();
  ListaComTimeOut();

  $scope.submeter =() => {
    action.createEntrada();
  }

  $scope.submitDelete = (entrada) => {
    alertAction.question(`Deseja excluir entrada caixa \n ${entrada.nome}`, action.deleteEntrada, {dados: entrada})
    .catch((err) => {
      alertAction.error((err.message)).catch((err) =>{
        alert(err.message)
      })
    })
  }

  /*Iniciar Mês no header - MM/yyyy */
  pass.MonthInitial()
  .then((res) => {
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia; //VERIFICAR SE ESTA USANDO
    ListaComTimeOut();
  })
  .catch((err) => {
    alert(err)
})

/*Avançar ou voltar Mẽs do SubMenu  - passar mês | MES/ANO => JAN/2020  */
$scope.submitPassames = ($returnNext) => {
  pass.Month($returnNext)
  .then((res) => {
    $scope.despesas = {};
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia;
    $scope.formEntrada.date = res.formatDate;
    
    ListaComTimeOut();
  })
  .catch((err) => {
    alertAction.error(err.message).catch((err) =>{
      alert(err.message);
    })
  })
}
})
