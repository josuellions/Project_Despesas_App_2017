angular.module('todoApp').controller('NavegarController', function ($scope, $location, $routeParams, $http, $resource) {
  
 // $scope.subtitletophome = false;
 // $scope.subtitletopviews = false;
  $scope.fassmes = true;

  let dtMes = new Date();
  dtMes = dtMes.getMonth() + '/' + dtMes.getFullYear();
  
  $scope.titleTop = {
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    //imglogo: 'assets/img/logo_seven_antes.jpg'
    contVer: 'Versão beta 0.0.9-AngularJS - 22/07/2018,',
  };

  $scope.dadosApp = {
    nomeDeveloper: ' 2017 - Josuel A. Lopes',
    nomeEmpresa: ' Seven Solutions Tecnologic'
  }

  var verifUrl = $location.$$url;

  if (verifUrl == '/entrada') {

    $scope.titulo = 'Adicionar Entrada';
    $scope.subtitulo =  dtMes; //'JUL/2018';
    $scope.fassmes = true;
    //$scope.subtitletopviews = true;
    //$scope.subtitletophome = false;

  } else if (verifUrl == '/despesas') {

    $scope.titulo = 'Adicionar Despesas';
    $scope.subtitulo = dtMes; //'JUL/2018';
    $scope.fassmes = true;
    //$scope.subtitletopviews = true;
   // $scope.subtitletophome = false;

  } else if (verifUrl == '/visualizar') {

    $scope.titulo = 'Visualizar Despesas';
    $scope.subtitulo = dtMes; //'JUL/2018';
    $scope.fassmes = true;
   // $scope.subtitletopviews = true;
   // $scope.subtitletophome = false;
    
  } else if (verifUrl == '/') {
      $scope.titulo = 'Controle Despesas';
      $scope.subtitulo = 'MENU';
      //$scope.subtitletophome = false;
      $scope.fassmes = false;
      document.getElementById('dtReference').style = 'margin-left: 31% !important;';  
  } 
});
