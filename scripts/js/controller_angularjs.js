var app = angular.module('todoApp', ['ngRoute']);
app.config(function ($routeProvider) {

  var producao = true; 
  var urlApp;

  producao ? urlApp = '/android_asset/www/' : urlApp = window.location.pathname;

  $routeProvider
    .when('/', {
      templateUrl: urlApp + 'public/home.html'
    })
    .when('/despesas', {
      templateUrl: urlApp + 'public/despesas.html',
    })
    .when('/entrada', {
         templateUrl: urlApp + 'public/entrada.html',
    })
    .when('/visualizar', {
      templateUrl: urlApp + 'public/visualiza.html'
    })
    .when('/relatorio', {
      //templateUrl: '/public/relariorio.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});
 
app.controller('navegarApp', function ($scope, $location) {
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
      //document.location.reload(true);
    }
  }
});

