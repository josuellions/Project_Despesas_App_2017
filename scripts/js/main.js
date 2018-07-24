angular.module('todoApp', ['ngRoute', 'ngAnimate', 'ngResource', 'depesasDirectives'])
  .config(function ($routeProvider) {

    var producao = true;
    var urlApp;

    //producao ? urlApp = window.location.pathname : urlApp = '';

    //var url = window.location.pathname;
    /*alert(window.location.pathname);*/

    if (producao) {
      /* PRODUÇÂO */
      $routeProvider
        .when('/', {
          templateUrl: '/android_asset/www/public/home.html',
          //controller: 'NavegarController'

        })
        .when('/despesas', {
          templateUrl: '/android_asset/www/public/despesas.html'
        })
        .when('/entrada', {
          templateUrl: '/android_asset/www/public/entrada.html'
        })
        .when('/visualizar', {
          templateUrl: '/android_asset/www/public/visualiza.html'
        })
        .when('/relatorio', {
        })
        .otherwise({
          redirectTo: '/'
        });

    } else {

      /* Desenvolvimento */
      $routeProvider
        .when('/', {
          templateUrl: '/public/home.html',
          controller: 'NavegarController'
          //controller: 'DespesasController'
        })
        .when('/despesas', {
          templateUrl: '/public/despesas.html',
          //controller: 'DespesasController'
        })
        .when('/entrada', {
          templateUrl: '/public/entrada.html'
        })
        .when('/visualizar', {
          templateUrl: '/public/visualiza.html'
        })
        .when('/relatorio', {
          //templateUrl: urlApp + '/public/relariorio.html',
        })
        .otherwise({
          redirectTo: '/',
        });
    }
  })


