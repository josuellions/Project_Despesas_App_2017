angular.module('todoApp').controller('RelatorioController',
function($scope, pass, alertAction, relatorioAction, formatValor){

 

  $scope.despesas = {}


  const RenderizarGrafico = (getDados) => {
    var size = 0.0;
    const fixSize = 3.6;
    const porcentagem =  relatorioAction.CalculaPorcentagem(getDados.entradaValorTotal, getDados.despesaValorTotal);
    
    const root = document.querySelector('html')
    
      while (size < (255 / 100 * porcentagem)) {
        size += parseFloat(fixSize)
      }
      
      root.style.setProperty('--size', 255 + 3.6 - (size))

    return porcentagem;

  }

  const BuscarDadosVisualizarNaView = () => {
    relatorioAction.index().then((res) => {
      const porcentagem = RenderizarGrafico(res.resultValorTotal);
      
      $scope.relatorio = {
        total : [
          {
            despesas: res.resultValorTotal.despesaValorTotal,
            entradas: res.resultValorTotal.entradaValorTotal
          },
        ],
        despesas: res.listaDespesas,
        entrada: {
          porcentagem: porcentagem
        } 
      }
      
      formatValor.moneyMask();
      
    }).catch((err) =>{
      alertAction.error(err.message).catch((errs) => {
        alert(err.message)
      });
    })
  }

  /*Avançar ou voltar Mẽs do SubMenu  - passar mês | MES/ANO => JAN/2020 */
  pass.MonthInitial()
  .then((res) => {
    $scope.titulo = 'Relatório Despesas';
    $scope.classSubTitulo = 'alinharMes';
    $scope.passmes = true;
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia; 
    
    setTimeout(() => {
      BuscarDadosVisualizarNaView();
    }, 5);
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
      setTimeout(() => {
        BuscarDadosVisualizarNaView();
      }, 60);
    })
    .catch((err) => {
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }
})
