angular
  .module("todoApp")
  .controller("HomeController", function ($scope) {
    
    $scope.passmes = false;
    $scope.subtitulo = '';
    $scope.classSubTitulo = 'subtitulo-menu';

    $scope.titulo = 'Controle Despesas'; 
    $scope.subtitulo = 'MENU'; 
    $scope.comparaDt = '';
    
});
