angular.module('todoApp', ['ngRoute', 'ngAnimate', 'ngResource', 'depesasDirectives'])
.config(function ($routeProvider) {

  //var producao = true;
  //var urlApp;

  //producao ? urlApp = '/android_asset/www/' : urlApp = null;/* window.location.pathname;*/
 
//var url = window.location.pathname;
/*alert(window.location.pathname);*/
  $routeProvider
    .when('/', {
      //template: 'Hello World - Welcom user!',
      //templateUrl: '/public/home.html'
      templateUrl: '/android_asset/www/public/home.html'
      //templateUrl: '/public/home.html',
      //controller: 'DespesasController'
    })
    .when('/despesas', {
      templateUrl: '/android_asset/www/public/despesas.html'
      //templateUrl: '/public/despesas.html',
      //controller: 'DespesasController'

      //templeteUrl: '/public/menuMobile.html'
    })
    .when('/entrada', {
      //templateUrl: '/public/entrada.html'
         templateUrl: '/android_asset/www/public/entrada.html'
         //templeteView: '/public/menuMobile.html'
    })
    .when('/visualizar', {
      templateUrl: '/android_asset/www/public/visualiza.html'
      //templateUrl: '/android_asset/www/public/visualiza.html'
    })
    .when('/relatorio', {
      //templateUrl: '/public/relariorio.html',
    })
    .otherwise({
      redirectTo: '/'
    });
})

/*
.controller('navegarApp', function ($scope, $location) {
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
})
*/


