  angular.module('despesaServices', ['ngResource', 'routesApp'])
  .factory('despesaAction', function ($q, $rootScope, routesAction ) {

    let servico = {};
    let evento = 'despesasServices';
    //const dataBase = configDataBase();

    console.warn('DATA BASE')
    //console.log(dataBase)

    servico.index = (getQuery, getDados ) =>{
      return $q((res, rej) => {
        console.log('SERVICE')
          res(routesAction.index(getQuery, getDados ))
          rej({mesagem: 'Error: FACTORY SERVICES, falha ao buscar dados'})
      })
    }
    return servico
  })