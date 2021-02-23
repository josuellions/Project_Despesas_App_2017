angular.module('todoApp').controller('VisualizarController',
function($scope, alertAction, pass, formatValor, formatDate, despesaAction, entradaAction){
  
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

  /*const LimparDadosView = () => {
    $scope.visualizar = {
      listaDespesas: [],
      listaEntradas: [],
      despesaValorTotal: '0,00',
      entradaValorTotal: '0,00',
      saldoGeral: '0,00',
      classColorSaldoGeral : 'colorTotalViewPositivo',
    }
  }*/

  const FormatDadosView = (getDados) => {
    let dadosFormat = [];
    let somaTotal = 0;

    for(let row of getDados) {
      somaTotal += parseFloat(row.valor);
      dadosFormat.push({
        id: row.id,
        nome: row.despesa,
        dateBd: row.dtLanc,
        dateView: formatDate.dtView(row.data),
        valor: row.valor.toFixed(2),
      })
    }

    return {dados: dadosFormat, total: somaTotal};
  }

  const FormatLista = (getDespesas, getEntradas) => {
    
    //LimparDadosView();
    
    const despesaFormat = FormatDadosView(getDespesas);
    const entradaFormat = FormatDadosView(getEntradas);
    
    $scope.visualizar = {
      listaDespesas: despesaFormat.dados,
      listaEntradas: entradaFormat.dados,
      resultValorTotal:[{
        despesaValorTotal: formatValor.ptBr(despesaFormat.total).toFixed(2),//.replace('.',','),
        entradaValorTotal: formatValor.ptBr(entradaFormat.total).toFixed(2),//.replace('.',','),
        saldoGeral: formatValor.ptBr(entradaFormat.total - despesaFormat.total).toFixed(2),//.replace('.',','),
        classColorSaldoGeral: 'colorTotalViewPositivo',
      }],
    }

    if( formatValor.ptBr(entradaFormat.total - despesaFormat.total).toFixed(2)<= 0) {
      $scope.visualizar.resultValorTotal[0].classColorSaldoGeral = 'colorTotalViewNegativo';
    }
    formatValor.moneyMask();
   }
   
  const BuscarDadosVisualizarNaView  = () => {
    formatDate.dtConsultaDB().then((response) => {
      let responseDespesas = {};
      let responseEntradas = {};
      
      despesaAction.index([response.inicio, response.fim]).then((res) => {
        responseDespesas = res;
      }).catch((err) => {
        alertAction.error(err.message);
        throw 'Error'
      });
      
      entradaAction.index([response.inicio, response.fim]).then((res) => {
        responseEntradas = res;
        
        FormatLista(responseDespesas, responseEntradas);
      }).catch((err) => {
        alertAction.error(err.message);
        throw 'Error'
      })

      
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
    $scope.comparaDt = res.anoMesDia; //VERIFICAR SE ESTÁ USANDO

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
      //$scope.formDespesa.date = res.formatDate;
      
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
