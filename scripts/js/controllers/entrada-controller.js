angular.module('todoApp').controller('EntradaController',
function($scope, alertAction, formatDate, formatValor, pass){
  $scope.formEntrada = {};
  $scope.formEntrada.date = new Date();
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
   $scope.entradas = [
     {
       'id': 1,
       'dateView': '21/05/2021',
       'nome': 'Salario - 01',
       'valor': 7500.00
     },
     {
       "id":2,
       'dateView': '21/05/2021',
       'nome': 'Salario - 02',
       'valor': 7500.00
     },
     {
      "id":3,
      'dateView': '21/05/2021',
      'nome': 'Salario - 03',
      'valor': 7500.00
    }
   ]

  pass.MonthInitial()
    .then((res) => {
      $scope.titulo = 'Adicionar Entrada';
      $scope.classSubTitulo = 'alinharMes';
      $scope.passmes = true;

      $scope.subtitulo = res.mesExt;
      $scope.comparaDt = res.anoMesDia; //VERIFICAR SE ESTA USANDO
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
      
      //ListaComTimeOut();
    })
    .catch((err) => {
      //alert(err.message)
      alertAction.error(err.message).then((res) =>{
        return
      }).catch((err) =>{
        alert(err.message);
      })
    })
  }

  $scope.submeter =() => {
    console.log($scope.formEntrada)
  }

})
