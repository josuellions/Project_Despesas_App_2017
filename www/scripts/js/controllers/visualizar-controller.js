angular.module('todoApp').controller('VisualizarController',
function($scope, alertAction, pass, formatValor, formatDate, despesaAction, entradaAction, visualizarAction){
  
  /*const objVisualizar = {
    listaEntradas : [],
    listaDespesas : [],
    listaInvestimentos :  [],
    resultValorTotal: [{
      _entrada: {
        total: '0,00',
        nome: 'Entradass',
        classColorSaldoGeral : '',
      },
      despesas:{
        total: '0,00',
        nome: 'Despesas',
        classColorSaldoGeral : '',
      },
      investimentos:{
        total: '0,00',
        nome: 'Investimentos',
        classColorSaldoGeral : '',
      },
      saldo:{
        total: '0,00',
        nome: 'Saldo Geral',
        classColorSaldoGeral : 'colorTotalViewPositivo',
      }
    }]
  };*/

  $scope.visualizar = {};

  const BuscarDadosVisualizarNaView  = async () => {
    $scope.visualizar = {};

    await formatDate.dtConsultaDB().then(async (response) => {

      const responseEntrada = await entradaAction.index([response.inicio, response.fim]).then((res) => {
        return res;
      }).catch((err) => {
        alertAction.error(err.message).catch((errs) => {
          alert(err.message)
        });
      });

      const responseDespesas = await despesaAction.indexSemInvestimentos([response.inicio, response.fim]).then((res) => {
        return res;
      }).catch((err) => {
        alertAction.error(err.message).catch((errs) => {
          alert(err.message)
        });
      });
      
      const responseInvestimentos = await despesaAction.indexInvestimentos([response.inicio, response.fim]).then((res) => {
        return res;
      }).catch((err) => {
        alertAction.error(err.message).catch((errs) => {
          alert(err.message)
        });
      });

      const responseVisualizar = await visualizarAction.formatLista(responseEntrada, responseDespesas, responseInvestimentos).then((res) => {
        return res;
      }).catch((err) => {
        alertAction.error(err.message).catch((errs) => {
          alert(err.message)
        });
      })

      $scope.visualizar = responseVisualizar;
      formatValor.moneyMask();
      
    }).catch((err) => {
      alertAction.error(err.message).catch((errs) => {
        alert(errs.message)
      })
    })

    
  }

  /*Adicionar data inicial no Submenu - passar mês | MES/ANO => JAN/2020 */
  pass.MonthInitial()
  .then((res) => {
    $scope.titulo = 'Visualizar Despesas';
    $scope.classSubTitulo = 'alinharMes';
    $scope.passmes = true;
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia; 

    setTimeout(() => {
      BuscarDadosVisualizarNaView();
    }, 5);
  })
  .catch((err) => {
    alertAction.error(err.message).catch((err) => {
      alert(err.message)
    })
  })

  /*Avançar ou voltar Mẽs do SubMenu  - passar mês | MES/ANO => JAN/2020 */
  $scope.submitPassames = ($returnNext) => {
    pass.Month($returnNext)
    .then((res) => {
      $scope.despesas = {};
      $scope.subtitulo = res.mesExt;
      $scope.comparaDt = res.anoMesDia;
      
      setTimeout(() => {
        BuscarDadosVisualizarNaView();
      }, 5);
    })
    .catch((err) => {
      alertAction.error(err.message).catch((err) => {
        alert(err.message)
      })
    })
  }
})
