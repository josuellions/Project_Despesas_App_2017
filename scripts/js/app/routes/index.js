angular.module('routesApp', ['ngResource', 'apiApp'])
.factory('routesAction', function ($q, $rootScope, query, api ) {

  let app = {};
  //let evento = 'despesasServices';

  //console.log("FACTORY ROUTES/QUERY")
  //console.log(query.selectDespStatusDt())

  app.despesaIndex = (getDados ) =>{
    return $q((res, rej) => {
      res(api.index(query.selectDespStatusDt(), getDados))
      rej({message: 'Error: FACTORY ROUTE, falha ao lista as despesas'})
    })
  },
  app.despesaCreate = (getDados) => {
    return $q((res, rej) =>{
      //console.warn(">>CREATE FACTORY ROUTE")
      //console.log(res)
      res(api.create(query.insertDespStatus(), getDados))
      rej({message: 'Error: FACTORY ROUTE, falha ao adicionar despesa'})

      //customCssAddClass(itens.id, "ng-leave-active");
    })
  },
  app.despesaUpdate = (getDados) => {
    return $q((res,rej) => {
      res(api.update(query.updateDespStatus(), getDados))
      rej({message: 'Error: FACTORY ROUTE, falha ao atualizar despesa'})
    })
  },
  app.despesaStatus = (getDados) => {
    return $q((res, rej) => {
      res(api.update(query.updateStatusDesp(), getDados))
      rej({message: 'Error: FACTORY ROUTE, falha ao atualizar status'})
    })
  },
  app.despesaDelete = (getDados) => {
    return $q((res, rej) => {
      res(api.delete(query.deleteDesp(), getDados))
      rej({message: 'Error: FACTORY ROUTE, falha ao excluir despesa'})
    })
  }

  return app
})