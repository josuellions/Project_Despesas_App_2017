angular
  .module("todoApp", [
    "ngRoute",
    "ngAnimate",
    "ngResource",
    "depesasDirectives",
  ])
  .config(function ($routeProvider) {
    var producao = true;
    //var urlApp;

    //producao ? urlApp = window.location.pathname : urlApp = '';

    //var url = window.location.pathname;
    alert(window.location.pathname);

    if (producao) {
      /* PRODUÇÂO */
      $routeProvider
        .when("/", {
          templateUrl: "/android_asset/www/public/home.html",
          controller: "NavegarController",
        })
        .when("/despesas", {
          templateUrl: "/android_asset/www/public/despesas.html",
          controller: "NavegarController",
        })
        .when("/entrada", {
          templateUrl: "/android_asset/www/public/entrada.html",
          controller: "NavegarController",
        })
        .when("/visualizar", {
          templateUrl: "/android_asset/www/public/visualiza.html",
          controller: "NavegarController",
        })
        .when("/relatorio", {
          templateUrl: "/android_asset/www/public/relatorio.html",
          controller: "NavegarController",
        })
        .when("/informacoes", {
          templateUrl: "/android_asset/www/public/informacoes.html",
          controller: "NavegarController",
        })
        .when("/sobre", {
          templateUrl: "/android_asset/www/public/sobre.html",
          controller: "NavegarController",
        })
        .otherwise({
          redirectTo: "/",
        });
    } else {
      /* Desenvolvimento */
      $routeProvider
        .when("/", {
          templateUrl: "/public/home.html",
          controller: "NavegarController",
        })
        .when("/despesas", {
          templateUrl: "/public/despesas.html",
          controller: "NavegarController",
        })
        .when("/entrada", {
          templateUrl: "/public/entrada.html",
          controller: "NavegarController",
        })
        .when("/visualizar", {
          templateUrl: "/public/visualiza.html",
          controller: "NavegarController",
        })
        .when("/relatorio", {
          templateUrl: "/public/relatorio.html",
          controller: "NavegarController",
        })
        .when("/informacoes", {
          templateUrl: "/public/informacoes.html",
          controller: "NavegarController",
        })
        .when("/sobre", {
          templateUrl: "/public/sobre.html",
          controller: "NavegarController",
        })
        .otherwise({
          redirectTo: "/",
        });
    }
  });
