angular.module('routesApp', ['ngResource', 'apiApp'])
.factory('routesAction', function ($q, $rootScope, query, api ) {

  let app = {};

  app.despesaIndex = (getDados ) =>{
    return $q((res, rej) => {
      try{
        res(api.index(query.selectDespesaStatusDate, getDados))
      } catch {
        rej({message: 'Error: FACTORY ROUTE, falha ao lista as despesas'})
      }
    })
  },
  app.despesaCreate = (getDados) => {
    return $q((res, rej) =>{
      try{
        res(api.create(query.insertDespesaStatus, getDados))
      } catch {
        rej({message: 'Error: FACTORY ROUTE, falha ao adicionar despesa'})
      }
    })
  },
  app.despesaUpdate = (getDados) => {
    return $q((res,rej) => {
      try{
        res(api.update(query.updateDespesaStatus, getDados))
      } catch {
        rej({message: 'Error: FACTORY ROUTE, falha ao atualizar dados despesa'})
      }
    })
  },
  app.despesaStatus = (getDados) => {
    return $q((res, rej) => {
      try {
        res(api.update(query.updateStatusDespesa, getDados))
      } catch {
        rej({message: 'Error: FACTORY ROUTE, falha ao atualizar status'})
      }
    })
  },
  app.despesaDelete = (getDados) => {
    return $q((res, rej) => {
      try {
        res(api.delete(query.deleteDespesa, getDados))
      } catch {
        rej({message: 'Error: FACTORY ROUTE, falha ao excluir dados despesa'})
      }
    })
  },
  app.entradaIndex = (getDados) => {
    return $q((res, rej) => {
      try{
        res(api.index(query.selectEntradaDate, getDados))
      }catch{
        rej({message: 'Error: FACTORY ROUTE, falha ao lista as entradas caixa'});
      }
    })
  },
  app.entradaCreate = (getDados) => {
    return $q((res, rej) => {
      try{
        res(api.create(query.insertEntrada, getDados))
      }catch{
        rej({message:'Error: FACTORY ROUTE, falha ao cadastrar entrada caixa'})
      }
    })
  },
  app.entradaUpdate = (getDados) => {
    return $q((res, rej) => {
      try{
        res(api.update(query.updateEntrada, getDados));
      }catch{
        rej({message: 'Error: FACTORY ROUTE, falha ao atualizar os dados entrada caixa'})
      }
    })
  },
  app.entradaDelete = (getDados) => {
    return $q((res, rej) => {
      try{
        res(api.delete(query.deleteEntrada, getDados))
      }catch{
        rej({message: 'Error: FACTORY ROUTE, falha ao excluir dados entrada caixa'})
      }
    })
  }

  return app

})
