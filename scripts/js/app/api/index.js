angular.module('apiApp', ['ngResource', 'dataBase'])
.factory('api', function ($q, $rootScope, configDataBase ) {

  let api = {};
  let evento = 'despesasServices';
  const dataBase = configDataBase();

  api.DespesasIndex = (getQuery, getDados ) =>{
    return $q((res, rej) => {
      dataBase.transaction((transaction) => {
        transaction.executeSql( getQuery,  getDados, (transaction, results) => {
            res(results.rows)
            rej({'Error':'FACTORY API, falha ao lista do banco dados'})
          },
          errorHandler
        );
      });
    })
  }
  return api
})