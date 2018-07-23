angular.module('todoApp').controller('NavegarController', function ($scope, $location ){//, $http, $resource) {
  //$scope.titulo =  'Controle Despesas';
 $scope.titleTop = {
          titulo: "Controle Despesas",
          subtitulo: "MENU",
          imglogoalt: 'Logo Seven',
          imglogotitle: 'Logo Seven',
          //imglogo: 'assets/img/logo_seven_antes.jpg'
        };
 

    $scope.submit = function ($page) {
      if ($page == 'entrada') {
        $location.path('/entrada');
        //document.location.reload();
      } else if ($page == 'despesas') {
        $location.path('/despesas');
      } else if ($page == 'visualizar') {
        $location.path('/visualizar');
        //document.location.reload();
      } else if ($page == 'relatorio') {
        alert('Em Desenvolvimento');
        //document.location.reload();
      } else {
        $location.path('/');

       


        //document.location.reload(true);
      }
    }
});
