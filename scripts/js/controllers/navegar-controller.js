angular.module('todoApp').controller('NavegarController', function ($scope, $location, $routeParams, $http, $resource) {

  $scope.mensagem = '';
  $scope.passmes = false;

  $scope.titleTop = {
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    //imglogo: 'assets/img/logo_seven_antes.jpg'
    contVer: 'Versão beta 0.0.9-AngularJS - 22/07/2018,',
  };

  dtFormat = () => {
    let dtMesFull = new Date();
    //dtMesFull = dtMesFull.getMonth();

    dtCustom = { 0: 'JAN', 1: 'FEV', 2: 'MAR', 3: 'ABR', 4: 'MAI', 5: 'JUN', 6: 'JUL', 7: 'AGO', 8: 'SET', 9: 'OUT', 10: 'NOV', 11: 'DEZ' };

    $.each(dtCustom, (id, item) => {

      id == dtMesFull.getMonth() ? dtMes = item + '/' + dtMesFull.getFullYear() : 'MENU';
    });
  }

  let carregarPage = () => {

    dtFormat();

    if ($location.$$path == '/entrada') {

      $scope.titulo = 'Adicionar Entrada';
      $scope.subtitulo = dtMes; //'JUL/2018';
      $scope.passmes = true;

    } else if ($location.$$path == '/despesas') {

      $scope.titulo = 'Adicionar Despesas';
      $scope.subtitulo = dtMes;
      $scope.passmes = true;

    } else if ($location.$$path == '/visualizar') {
      $scope.titulo = 'Visualizar Despesas';
      $scope.subtitulo = dtMes;
      $scope.passmes = true;

    } else if ($location.$$path == '/relatorio') {

      $scope.mensagem = 'Relatorio, em desenvolvimento';

    } else if ($location.$$path == '/informacoes') {

      $scope.mensagem = 'Informações, em desenvolvimento';

    }
    else if ($location.$$path == '/sobre') {

      $scope.mensagem = 'Sobre, em desenvolvimento';

    } else if ($location.$$path == '/') {
      $scope.titulo = 'Controle Despesas';
      $scope.subtitulo = 'MENU';
    }
  }

  carregarPage();
  
  
  $scope.dadosApp = {
    nomeDeveloper: ' 2017 - Josuel A. Lopes',
    nomeEmpresa: ' Seven Solutions Tecnologic'
  }

})