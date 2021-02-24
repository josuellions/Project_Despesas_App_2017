angular.module('entradaServices', ['ngResource', 'routesApp'])
.factory('entradaAction', function ($q, routesAction, formatValor) {

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
      try{
        res(routesAction.entradaIndex(FormatDataBuscaMesAnterior(getDados)))
      }catch{
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao buscar dados do mês anterior'})
      }
    })
  },
  service.copy = (getDados) => {
    return $q((res, rej) => {
      try{

        let dadosFormat = [];
        for(let row of getDados) {
          const date = row.dtLanc.split('-')

          const formtDate = GetDateFormat.anoFullMesDiaFormatBDParamsFull(date[2], parseInt(date[1]), date[0])
          dadosFormat = [
            formtDate,
            formtDate,
            row.entrada,
            row.valor,
          ]
          routesAction.entradaCreate(dadosFormat)
        }
        res({message: 'Success: Entrada Caixa adicionadas com base no mês anterior'});
      }catch{
        rej({message: 'Error: FACTORY ENTRADA SERVICE, falha ao copiar dados do mês anterior'})
      }
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
        
        res(routesAction.entradaUpdate(dadosFormat));
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
