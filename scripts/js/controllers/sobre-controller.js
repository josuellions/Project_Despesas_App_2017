angular.module('todoApp').controller('SobreController',
function($scope, pass){
  pass.MonthInitial()
  .then((res) => {
    $scope.titulo = 'Controle Despesas';
    $scope.classSubTitulo = 'subtitulo-menu alinharMes';
    $scope.subtitulo = 'Sobre'
    $scope.passmes = false;
  })
  .catch((err) => {
    alert(err)
  })

  //Dados Sobre Top e controle versão
  $scope.titleTop = {
    comparaDt:'',
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    contVer: 'v1.0.7n - AngularJS - 20/02/2021',
    dtLancamento: String(GetDateFormat.anoFullMesDiaAtual(dtDia))
  };

})
