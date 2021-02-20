angular.module('todoApp').controller('VisualizarController',
function($scope, pass){

  pass.MonthInitial()
  .then((res) => {
    $scope.titulo = 'Visualizar Despesas';
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
      //$scope.formEntrada.date = res.formatDate;
      
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
})
