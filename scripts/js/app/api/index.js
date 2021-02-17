angular.module('apiApp', ['ngResource', 'dataApp' ])//'dataBase'])
.factory('api', function ($q, $rootScope, bdquery ) {//, configDataBase ) {

  let api = {};
  let evento = 'despesasServices';
  //const dataBase = configDataBase();

  api.index = (getQuery, getDados ) =>{
    return $q((res, rej) => {
      /*dataBase.transaction((transaction) => {
        transaction.executeSql( getQuery,  getDados, (transaction, results) => {
            res(results.rows)
          },
          rej({'Error':'FACTORY API, falha ao lista do banco dados'})
          //errorHandler
        );
      });
      */
     res(bdquery.index(getQuery, getDados))
     rej({message: 'Error: FACTORY API INDEX, falha ao lista dados'})
    })
  },
  api.create = (getQuery, getDados) => {
    return $q((res, rej) => {
      //console.log(">>FACTORY API CREATE")
      //console.log(getQuery)
      //console.log(getDados)
      res(bdquery.insert(getQuery, getDados))
      rej({message: 'Error: FACTORY API CREATE, falha ao salvar dados'})
    })
  },
  api.update = (getQuery, getDados) => {
    return $q((res, rej) =>{
      res(bdquery.update(getQuery, getDados))
      rej({message: 'Error: FACTORY API UPDATE, falha ao atualizar status'})
    })
  }
  api.delete = (getQuery, getDados) => {
    return $q((res, rej) => {
      res(bdquery.delete(getQuery, getDados))
      rej({message: 'Error: FACTORY API DELETE, falha ao excluir dados'})
    })
  }

  return api
})