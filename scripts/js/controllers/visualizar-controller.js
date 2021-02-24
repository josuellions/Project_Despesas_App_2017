angular.module('todoApp').controller('VisualizarController',
function($scope, alertAction, pass, formatValor, formatDate, despesaAction, entradaAction, visualizarAction){
  
  $scope.visualizar = {
    listaDespesas  : [],
    listaEntradas :  [],
    resultValorTotal: [{
      entradaValorTotal : '0,00',
      despesaValorTotal : '0,00',
      saldoGeral : '0,00',
    }],
    classColorSaldoGeral : 'colorTotalViewPositivo',
    }

  const BuscarDadosVisualizarNaView  = () => {
    formatDate.dtConsultaDB().then((response) => {
      let responseDespesas = {};
      
      despesaAction.index([response.inicio, response.fim]).then((res) => {
        responseDespesas = res;
      }).catch((err) => {
        alertAction.error(err.message);
        throw 'Error'
      });
      
      entradaAction.index([response.inicio, response.fim]).then((res) => {
      
        visualizarAction.formatLista(responseDespesas, res).then((res) => {
          $scope.visualizar = res;
          formatValor.moneyMask();
        }).catch((err) => {
          alertAction.error(err.message)
            throw 'Error'
        })

      }).catch((err) => {
        alertAction.error(err.message);
        throw 'Error'
      });

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
