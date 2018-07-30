angular.module("todoApp").controller('BtnhomemenuController', function ($scope, $location) {

  $scope.mensagem = '';

  $scope.submit = function ($page) {
    if ($page == 'entrada') {
      $location.path('/entrada');
      setTimeout(() => {
        onInit(2);
        //document.location.reload();
      }, 110);

    } else if ($page == 'despesas') {
      $location.path('/despesas');
      setTimeout(() => {
        onInit(1);
      }, 110);
      //document.loca100load();

    } else if ($page == 'visualizar') {
      $location.path('/visualizar');
      setTimeout(() => {
        onInit(3);
        //document.loca100load();
        // document.location.reload();
      }, 110);
    } else if ($page == 'relatorio') {
      //alert('Em Desenvolvimento');
      //document.location.reload();
      $location.path('/relatorio');
      $scope.mensagem = 'Relatorio, em desenvolvimento';

    } else if ($page == '/informacoes') {
      $location.path('/informacoes');
      $scope.mensagem = 'Informações, em desenvolvimento';

    }
    else if ($page == '/sobre') {
      $location.path('/sobre');
      $scope.mensagem = 'Sobre, em desenvolvimento';

    } else {
      $location.path('/');
      //document.location.reload( )    
    }
  }
});