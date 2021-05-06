angular
  .module("todoApp")
  .controller("MenuController", function($scope, $location) {
    $scope.mensagem = "";

    const MenuPages = {
      home() {
        $location.path("/")
      },
      entrada() {
        $location.path("/entrada");
      },
      despesas() {
        $location.path("/despesas");
      },
      visualizar() {
        $location.path("/visualizar");
      },
      relatorio() {
        $location.path("/relatorio");
      },
      backup() {
        $location.path("/backup");
      },
      informacoes() {
        $location.path("/informacoes");
      },
      sobre() {
        $location.path("/sobre");
      }
    }


    $scope.submit = function($page) {

      const selectView = MenuPages[$page]

      selectView();

    };
  });
