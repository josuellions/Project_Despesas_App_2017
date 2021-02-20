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

})
