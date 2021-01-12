angular
  .module("todoApp")
  .controller("BtnhomemenuController", function($scope, $location) {
    $scope.mensagem = "";

    const MenuPages = {
      home() {
        onInit(0)
        $location.path("/")
      },
      entrada() {
        //onInit('entradaInit')
        $location.path("/entrada");
      },
      despesas() {
        //onInit('despesaInt')
        $location.path("/despesas");
      },
      visualizar() {
        //onInit('visualizarInit')
        $location.path("/visualizar");
      },
      relatorio() {
        //onInit('relatorioInit')
        $location.path("/relatorio");
      },
      backup() {
        onInit(0)
        $location.path("/backup");
      },
      informacoes() {
        onInit(0)
        $location.path("/informacoes");
      },
      sobre() {
        onInit(0)
        $location.path("/sobre");
      }
    }


    $scope.submit = function($page) {

      const selectView = MenuPages[$page]

      selectView();

    };
  });
