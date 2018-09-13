angular.module("todoApp").controller('BtnhomemenuController', function ($scope, $location) {

  $scope.mensagem = '';

  $scope.submit = function ($page) {
    if ($page == 'entrada') {
      $location.path('/entrada');
      setTimeout(() => {
        onInit(2);
      }, 110);

    } else if ($page == 'despesas') {
      $location.path('/despesas');
      setTimeout(() => {
        onInit(1);
      }, 110);
    } else if ($page == 'visualizar') {
      $location.path('/visualizar');
      setTimeout(() => {
        onInit(3);
      }, 110);
    } else if ($page == 'relatorio') {
      $location.path('/relatorio');

    } else if ($page == 'informacoes') {
      $location.path('/informacoes');

    }
    else if ($page == 'sobre') {
      $location.path('/sobre');

    } else {
      $location.path('/');
    }
  }
});