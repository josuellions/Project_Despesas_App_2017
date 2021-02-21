angular
  .module("todoApp")
  .controller("HeaderController", function ($scope, $location, formatDate, pass) {
    
    $scope.passmes = false;
    $scope.subtitulo = '';
    $scope.classSubTitulo = 'subtitulo-menu';

    $scope.titulo = 'Controle Despesas'; 
    $scope.subtitulo = 'MENU'; 
    $scope.comparaDt = '';
    
});
