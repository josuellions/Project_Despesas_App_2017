angular.module('todoApp').controller('InformacoesController',
function($scope, pass){
  pass.MonthInitial()
  .then((res) => {
    $scope.titulo = 'Controle Despesas';
    $scope.classSubTitulo = 'subtitulo-menu alinharMes';
    $scope.subtitulo = 'Informações'
    $scope.passmes = false;
  })
  .catch((err) => {
    alert(err)
  })

})