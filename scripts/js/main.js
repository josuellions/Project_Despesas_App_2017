angular
  .module("todoApp", [
    "ngRoute",
    "ngAnimate",
    "ngResource",
    "depesasDirectives",
  ])
  .config(function ($routeProvider) {

    const ambientType = 'dev';

    const ambient = {
        prod() {
          return 'producao';
        },
        dev() {
          return 'developer'
        }
      }

    const Directiory = { 
      producao(path) {
        return `/android_asset/www/public/${path}.html`
      },
      developer(path) {
        return `/public/${path}.html`
      }
    }
    const AmbientSelect = ambient[ambientType];

    const AmbientPath = Directiory[AmbientSelect()];

    $routeProvider
      .when("/", {
        templateUrl: AmbientPath('home'),
        controller: "NavegarController",
      })
      .when("/despesas", {
        templateUrl: AmbientPath('despesas'),
        controller: "NavegarController",
      })
      .when("/entrada", {
        templateUrl: AmbientPath('entrada'),
        controller: "NavegarController",
      })
      .when("/visualizar", {
        templateUrl: AmbientPath('visualizar'),
        controller: "NavegarController",
      })
      .when("/relatorio", {
        templateUrl: AmbientPath('relatorio'),
        controller: "NavegarController",
      })
      .when("/informacoes", {
        templateUrl: AmbientPath('informacoes'),
        controller: "NavegarController",
      })
      .when("/backup", {
        templateUrl: AmbientPath('backup'),
        controller: "BackupController",
      })
      .when("/sobre", {
        templateUrl: AmbientPath('sobre'),
        controller: "NavegarController",
      })
      .otherwise({
        redirectTo: "/",
      });
  });
