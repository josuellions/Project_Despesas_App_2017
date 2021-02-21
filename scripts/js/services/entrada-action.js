angular.module('entradaServices', ['ngResource', 'routesApp'])
.factory('entradaAction', function ($q, routesAction, formatValor) {
  console.log('>> FACTORY ENTRADA SERVICE')

  let service = {}

  service.index = (getDados) => {
    return $q((res, rej) => {
      try{
        res(routesAction.entradaIndex(getDados))
      }catch{
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao buscar dados'})
      }
    })
  },
  service.indexMesAnterior = (getDados) => {
    return $q((res, rej) => {
      //res(routesAction.entradaIndex(FormatDataBuscaMesAnterior(getDados)))
      rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao buscar dados do mês anterior'})
    })
  },
  service.create = (getDados) => {
    return $q((res, rej) => {
      try{
        //const date = new Date(getDados.date) 
        const dateFormat = FormatDateParaBancoDados(getDados.date); //GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear());
        
        const dadosFormat = [
          dateFormat,
          dateFormat,
          getDados.nome,
          formatValor.bancoDados(getDados.valor)
        ]
        res(routesAction.entradaCreate(dadosFormat));
      }catch{
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao cadastra entrada'});
      }
    })
  },
  service.update = (getDados) => {
    return $q((res, rej) => {
      try{
        const dateFormat = FormatDateParaBancoDados(getDados.date);

        const dadosFormat = [
          dateFormat,
          dateFormat,
          getDados.nome,
          formatValor.bancoDados(getDados.valor),
          getDados.id
        ]
        //res(routesAction.entradaUpdate(dadosFormat));
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao atualizar entrada'});
      }catch{
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao atualizar entrada'});
      }
    })
  },
  service.delete = (getDados) => {
    return $q((res, rej) => {
      try{
        res(routesAction.entradaDelete([getDados.id]))
      }catch{
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha excluir entrada'});
      }
    })
  }

  return service;
})
