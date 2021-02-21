angular.module('depesasDirectives', [])

  /* Define barra superior página */
  .directive('alertsCustom', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/alerts-custom.html';

    return ddo;

  })

  /* Define barra superior página */
  .directive('barraTop', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/barra-top.html';

    return ddo;

  })

  /* Define Icone Superio Home */
  .directive('menuInfo', function () {
    var ddo = {};

    ddo.restric = 'AE';

    /*ddo.scope = {

    }*/

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/menu-info.html';

    return ddo;
  })

  /* Define Menu superior Views */
  .directive('menuTop', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/menu-top.html';

    return ddo;

  })

    /* Define Titulo e Subtitulo Header Views */
    .directive('headerTitule', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/header-titule.html';

    return ddo;
  })

  /* Define painel das views */
  .directive('panelViews', function () {
    var ddo = {};

    ddo.restric = 'AE';

    //ddo.scope = {
    //titulo: '@',
    //subtitulo: '@',
    //fassmes: '@'
    //};

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/panel-views.html';

    return ddo;

  })

  .directive('panelInfo', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.scope = {
      mensagem: '@'
    }

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/panel-info.html';

    return ddo;

  })

  /* Define rodapé views */
  .directive('panelFooter', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/panel-footer.html';

    return ddo;

  })




//DIRECTIVE OLD
  /*
  .directive('toptitlePanel', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.scope = {
      subtitulo: '@',
      fassmes: '@'
    };

    ddo.template =
      '<div class="container-fluid col-xs-12 bg-04">'
      + ' <span class="glyphicon glyphicon-menu-left spanOpcaoMesEsquerdo col-xs-4 col-lg-5" title="Voltar para mês anterior " id="OpcaoMesEsquerdo"  ng-show="{{fassmes}}"></span>'
      + '    <h2 class="alinharMes col-xs-4 col-lg-2" id="dtReference">{{ subtitulo }}</h2>'
      + ' <span class="glyphicon glyphicon-menu-right spanOpcaoMesDireito col-xs-4 col-lg-5" title="Passar para mês seguinte" id="OpcaoMesDireito" ng-show="{{fassmes}}"></span>'
      + '</div>'

    return ddo;

  })

*/

  /*Define titulo página*/
  /*
  .directive('titleTop', function () {
    var ddo = {};

    ddo.restric = 'AE';
    
    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/title-top.html';

    return ddo;

  })
*/
  /*Define subtitulo página*/
  /*
  .directive('subtitleTop', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/subtitle-top.html';

    return ddo;

  })
*/
  /*
  .directive('subtitleTopHome', function () {
    var ddo = {};
    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = '/public/partials/subtitle-top-home.html';

    return ddo;

  })
*/
  /*
  .directive('subtitleTopViews', function () {
    var ddo = {};
    ddo.restric = 'AE';*/
    /*
        ddo.scope = {
          titulo: '@',
          subtitulo: '@'
        };
    */
//    ddo.transclude = true;

//    ddo.templateUrl = 'public/partials/subtitle-top-views.html';

//    return ddo;

//  })





