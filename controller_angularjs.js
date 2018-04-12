var app = angular.module('todoApp', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/android_asset/www/public/home.html'
    })
    .when('/despesas', {
      templateUrl: '/android_asset/www/public/despesas.html',

    })
    .when('/entrada', {
      templateUrl: '/android_asset/www/public/entrada.html',
    })
    .when('/visualizar', {
      templateUrl: '/android_asset/www/public/visualiza.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('navegarApp', function ($scope, $location) {
  $scope.submit = function ($page) {
    if ($page == 'entrada') {
      //window.location.hash = '#/teste';
      $location.path('/entrada');

      document.location.reload(true);
    } else if ($page == 'despesas') {
      $location.path('/despesas');
      document.location.reload(true);
    } else if ($page == 'visualizar') {
      $location.path('/visualizar');
      document.location.reload(true);
    } else if ($page == 'relatorio') {
      alert('Em Desenvolvimento');
      document.location.reload(true);
    } else {
      $location.path('/');
    }
  }
});

