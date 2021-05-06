  angular.module('despesaServices', ['ngResource', 'routesApp'])
  .factory('despesaAction', function ($q, $rootScope, routesAction, formatValor ) {

    let service = {};

    service.index = (getDados ) =>{
      return $q((res, rej) => {
        //console.log('SERVICE')
          res(routesAction.despesaIndex(getDados))
          rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao buscar dados'})
      })
    },
    service.indexMesAnterior = (getDados) => {
      return $q((res, rej) => {
        /*const date = new Date(getDados)
        const dadosFormat = [
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(1, date.getMonth(), date.getFullYear()),
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
        ]*/
        //res(routesAction.despesaIndex(dadosFormat))
        res(routesAction.despesaIndex(FormatDataBuscaMesAnterior(getDados)))
        rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao buscar dados mês anterior'})
      })
    },
    service.copy = (getDados) => {
      return $q((res, rej) => {

        let dadosFormat = [];
        $.each(getDados, (id, row) =>{
          const date = row.data.split('-')

          const formtDate = GetDateFormat.anoFullMesDiaFormatBDParamsFull(date[2], parseInt(date[1]), date[0])
          dadosFormat = [
            formtDate,
            formtDate,
            row.despesa,
            row.valor,
            row.status = 0,
          ]
          routesAction.despesaCreate(dadosFormat)
        })
        
        res({message: 'Success: Despesas adicionadas com base no mês anterior'});
        rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao copiar dados mês anterior'})
      })
    },
    service.create = (getDados) => {
      return $q((res, rej) =>{
        const dateFormat = FormatDateParaBancoDados(getDados.date); 

        const dadosFormat = [
          dateFormat,
          dateFormat,
          getDados.nome,
          formatValor.bancoDados(getDados.valor),
          0,
        ]

        res(routesAction.despesaCreate(dadosFormat));
        rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao cadastra despesa'});
      })
    },
    service.update = (getDados) => {
      //console.log(">>FACTORY UPDATE DESPESA")
      //console.log(getDados)
      return $q((res, rej) => {
        try{
         //const date = new Date(getDados.date)
        const dateFormat = FormatDateParaBancoDados(getDados.date); 
        const dadosFormat = [
            //GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
            //GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
            dateFormat,
            dateFormat,
            getDados.nome,
            formatValor.bancoDados(getDados.valor),//getDados.valor,
            getDados.status = 0,
            getDados.id,
          ]
          res(routesAction.despesaUpdate(dadosFormat));
        }catch{
          rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao atualizar despesa'});
        }
      })
    },
    service.updateStatus = (getDados) => {
      return $q((res, rej) => {
        const ConvertStatus = (status) => {
          const Convert = {
            true: () => {
              return 1;
            },
            false: () => {
              return 0
            }
          }
          const convert = Convert[status]
          return convert();
        }
        
        res(routesAction.despesaStatus([ConvertStatus(getDados.status), getDados.id]));
        rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao atualizar despesa'});
      })
    },
    service.delete = (getDados) => {
      return $q((res, rej) => {
        res(routesAction.despesaDelete([getDados.id]))
        rej({message: 'Error: FACTORY DESPESA SERVICES, falha ao excluir despesa'});
      })
    }
    return service
  })
