angular.module("todoApp").controller('BtnhomemenuController', function($scope, $location){

  $scope.submit = function ($page) {
    if ($page == 'entrada') {
      $location.path('/entrada');
      document.location.reload();

    } else if ($page == 'despesas') {
      $location.path('/despesas');
      document.location.reload();

    } else if ($page == 'visualizar') {
      $location.path('/visualizar');
      document.location.reload();

    } else if ($page == 'relatorio') {
      alert('Em Desenvolvimento');
      document.location.reload();
      
    } else {
      $location.path('/');
      document.location.reload( )
     
    }
  }
});