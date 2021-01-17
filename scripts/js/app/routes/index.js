angular.module('routesApp', ['ngResource', 'apiApp'])
.factory('routesAction', function ($q, $rootScope, api ) {

  let app = {};
  let evento = 'despesasServices';

  app.index = (getQuery, getDados ) =>{
    return $q((res, rej) => {
      res(api.DespesasIndex(getQuery, getDados))
      rej({'Error':'FACTORY ROUTE, falha ao lista do banco dados'})
    })
  }
  return app
})