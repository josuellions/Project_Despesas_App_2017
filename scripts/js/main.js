angular
  .module("todoApp", [
    "ngRoute",
    "ngAnimate",
    "ngResource",
    "depesasDirectives",
    "dataBase",
    "dataApp",
    "apiApp",
    "querysApp",
    "routesApp",
    "formatValorServices",
    "formatDateServices",
    "passMonthServices",
    "despesaServices",
    "alertServices"
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
        controller: "MenuController",
      })
      .when("/despesas", {
        templateUrl: AmbientPath('despesas'),
        controller: 'DespesaController'
        //controller: "MenuController",
      })
      .when("/entrada", {
        templateUrl: AmbientPath('entrada'),
        controller: "EntradaController",
      })
      .when("/visualizar", {
        templateUrl: AmbientPath('visualizar'),
        controller: "VisualizarController",
      })
      .when("/relatorio", {
        templateUrl: AmbientPath('relatorio'),
        controller: "RelatorioController",
      })
      .when("/informacoes", {
        templateUrl: AmbientPath('informacoes'),
        controller: "InformacoesController",
      })
      .when("/backup", {
        templateUrl: AmbientPath('backup'),
        controller: "BackupController",
      })
      .when("/sobre", {
        templateUrl: AmbientPath('sobre'),
        controller: "SobreController",
      })
      .otherwise({
        redirectTo: "/",
      });
  });
