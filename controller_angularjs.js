var app = angular.module('todoApp', ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      //template: 'Hello World - Welcom user!',
      templateUrl: '/android_asset/www/public/home.html'
    })
    .when('/despesas', {
      templateUrl: '/android_asset/www/public/despesas.html',

      //templeteUrl: '/public/menuMobile.html'
    })
    .when('/entrada', {
      templateUrl: '/android_asset/www/public/entrada.html',
      //templeteView: '/public/menuMobile.html'
    })
    .when('/visualizar', {
      templateUrl: '/android_asset/www/public/visualiza.html'
    })
    .when('/relatorio', {
      //templateUrl: '/public/relariorio.html',

    })
    .otherwise({
      redirectTo: '/'
    });
});
//console teste=> window.location.hast = '#/index';

app.controller('navegarApp', function ($scope, $location) {
console.log($location.path);  
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

