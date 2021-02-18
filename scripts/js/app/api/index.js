angular.module('apiApp', ['ngResource', 'dataApp' ])//'dataBase'])
.factory('api', function ($q, $rootScope, bdquery ) {//, configDataBase ) {

  let api = {};

  api.index = (getQuery, getDados ) =>{
    return $q((res, rej) => {
     res(bdquery.index(getQuery, getDados))
     rej({message: 'Error: FACTORY API INDEX, falha ao lista dados'})
    })
  },
  api.create = (getQuery, getDados) => {
    return $q((res, rej) => {
      res(bdquery.insert(getQuery, getDados))
      rej({message: 'Error: FACTORY API CREATE, falha ao salvar dados'})
    })
  },
  api.update = (getQuery, getDados) => {
    return $q((res, rej) =>{
      res(bdquery.update(getQuery, getDados))
      rej({message: 'Error: FACTORY API UPDATE, falha ao atualizar dados'})
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
