angular.module('todoApp').controller('SobreController',
function($scope){
  $scope.titulo = 'Controle Despesas';
  $scope.classSubTitulo = 'subtitulo-menu alinharMes';
  $scope.subtitulo = 'Sobre'
  $scope.passmes = false;
  $scope.comparaDt = '';
  
  $scope.abouts = {
   version: 'v2.0.0 - AngularJS - 27/04/2021',
   developer: 'Josuel A. Lopes',
   contact: {
    email: 'josuel_lions@hotmail.com',
    phone: '11 98273 8274'
   },
   profile: {
      tech:'Aplicativos Mobile App, Web Sites, API e Desktops',
      descriptions: `React, React Native, NodeJs, PHP, Laravel, Eloquent, Blade, C#, ASP.NET,
      ADO.NET, Angular, AngularJS, PhoneGap, Cordova, SQL, MySQL, WebSQL, NoSQL`
   }
  }
})
