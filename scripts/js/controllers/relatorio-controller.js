angular.module('todoApp').controller('RelatorioController',
function($scope, pass){

  const colorProgressBar = {
    'success' : "progress-bar-success",
    'info': "progress-bar-info",
    'primary': "progress-bar-primary",
    'warnig': "progress-bar-warning",
    'danger': "progress-bar-danger",
  };

  $scope.entrada = {
    valor: '3.500,00',
    color: colorProgressBar.primary,
    porcentagem: {
      style : {'width': '70%'},
      valor : 70
    }
  } 

  
  $scope.despesatotal = '1.850,00',
  
  $scope.despesas = [
    {
      nome: 'Mercado',
      valor: '750,00',
      color: colorProgressBar.danger,
      porcentagem: {
        style : {
          'width': '30%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 30
      }
    },
    {
      nome: 'Seguro',
      valor: '450,00',
      color: colorProgressBar.success,
      porcentagem: {
        style : {
          'width': '15%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 15
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    },
    {
      nome: 'Mercado',
      valor: '750,00',
      color: colorProgressBar.danger,
      porcentagem: {
        style : {
          'width': '30%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 30
      }
    },
    {
      nome: 'Seguro',
      valor: '450,00',
      color: colorProgressBar.success,
      porcentagem: {
        style : {
          'width': '15%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 15
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    },
    {
      nome: 'Catão Brad.',
      valor: '650,00',
      color: colorProgressBar.warnig,
      porcentagem: {
        style : {
          'width': '25%',
          'padding-top': '.5rem',
          'border-top-left-radius':'0 !important',
          'border-bottom-left-radius': '0 !important'
        },
        valor : 25
      }
    }
  ]

  /*for(let despesa of $scope.despesas){
    console.log(despesa)
  }*/

  /*Avançar ou voltar Mẽs do SubMenu  - passar mês | MES/ANO => JAN/2020 */
  pass.MonthInitial()
  .then((res) => {
    $scope.titulo = 'Relatório Despesas';
    $scope.classSubTitulo = 'alinharMes';
    $scope.passmes = true;
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia; 
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
      
    })
    .catch((err) => {
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }
})
