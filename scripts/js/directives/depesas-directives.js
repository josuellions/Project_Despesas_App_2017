angular.module('depesasDirectives', [])
  .directive('menuInfo', function(){
    var ddo = {};

    ddo.restric = 'AE';

    /*ddo.scope = {

    }*/

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/menu-info.html';

    return ddo;
  })

  .directive('menuTop', function(){
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/menu-top.html';

    return ddo;

  })
  
  .directive('panelViews', function(){
    var ddo = {};

    ddo.restric = 'AE';

    ddo.transclude = true;

    ddo.templateUrl = 'public/partials/panel-views.html';

    return ddo;

  })