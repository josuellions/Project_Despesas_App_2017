angular.module('depesasDirectives', [])

  /* Define Modal alert custom */
  .directive('alertsCustom', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/alerts-custom.html';

    return ddo;

  })

  /* Define Modal Info Backup */
  .directive('backupModal', function () {
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/backup-modal.html';

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
