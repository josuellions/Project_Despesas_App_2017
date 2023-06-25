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
    "getDadosServices",
    "formatDadosServices",
    "formatValorServices",
    "formatDateServices",
    "passMonthServices",
    "despesaServices",
    "entradaServices",
    "visualizarServices",
    "relatorioServices",
    "backupServices",
    "alertServices",
  ])
  .config(function ($routeProvider) {
    const ambientType = "dev";

    const SelectEnvironment = (getPath) => {
      const ambient = {
        prod() {
          //produção
          return `/android_asset/www/public/${getPath}.html`;
        },
        dev() {
          //developer
          return `public/${getPath}.html`;
        },
      };

      const selectEnvironment = ambient[ambientType];

      return selectEnvironment();
    };

    $routeProvider
      .when("/", {
        templateUrl: SelectEnvironment("home"),
        controller: "HomeController",
      })
      .when("/despesas", {
        templateUrl: SelectEnvironment("despesas"),
        controller: "DespesaController",
      })
      .when("/entrada", {
        templateUrl: SelectEnvironment("entrada"),
        controller: "EntradaController",
      })
      .when("/visualizar", {
        templateUrl: SelectEnvironment("visualizar"),
        controller: "VisualizarController",
      })
      .when("/relatorio", {
        templateUrl: SelectEnvironment("relatorio"),
        controller: "RelatorioController",
      })
      .when("/informacoes", {
        templateUrl: SelectEnvironment("informacoes"),
        controller: "InformacoesController",
      })
      .when("/backup", {
        templateUrl: SelectEnvironment("backup"),
        controller: "BackupController",
      })
      .when("/sobre", {
        templateUrl: SelectEnvironment("sobre"),
        controller: "SobreController",
      })
      .otherwise({
        redirectTo: "/",
      });
  });
