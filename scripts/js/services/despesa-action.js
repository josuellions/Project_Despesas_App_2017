  angular.module('despesaServices', ['ngResource', 'routesApp'])
  .factory('despesaAction', function ($q, $rootScope, routesAction ) {

    let service = {};
    //let evento = 'despesasServices';
    //const dataBase = configDataBase();

    //console.warn('DATA BASE')
    //console.log(dataBase)

    service.index = (getDados ) =>{
      return $q((res, rej) => {
        //console.log('SERVICE')
          res(routesAction.despesaIndex(getDados))
          rej({mesagem: 'Error: FACTORY SERVICES, falha ao buscar dados'})
      })
    },
    service.indexMesAnterior = (getDados) => {
      return $q((res, rej) => {
        const date = new Date(getDados)
        const dadosFormat = [
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(1, date.getMonth(), date.getFullYear()),
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
        ]
        res(routesAction.despesaIndex(dadosFormat))
        rej({message: 'Error: FACTORY SERVICES, falha ao buscar dados mês anterior'})
      })
    },
    service.copy = (getDados) => {
      return $q((res, rej) => {
        /*const date = new Date(getDados)
        const dadosFormat = [
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(1, date.getMonth(), date.getFullYear()),
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
        ]*/
        let response = {}
        let dadosFormat = [];
        $.each(getDados, (id, row) =>{
          const date = row.dtLanc.split('-')
          const formtDate = GetDateFormat.anoFullMesDiaFormatBDParamsFull(date[2], parseInt(date[1]), date[0])
          
          dadosFormat = [
            formtDate,
            formtDate,
            row.despesa,
            row.valor,
            0
          ]
          routesAction.despesaCreate(dadosFormat)
        })
        
        res({message: 'Success: Despesas adicionadas com base no mês anterior'});
        rej({message: 'Error: FACTORY SERVICES, falha ao copiar dados mês anterior'})
      })
    },
    service.create = (getDados) => {
      return $q((res, rej) =>{
        const date = new Date(getDados.date)
        
        const dadosFormat = [
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
          getDados.nome,
          getDados.valor,
          0,
        ]
        //console.log(">>FACTORY CADASTRO DESPESA")
        //console.log(getDados)
        //console.log(dadosFormat)

        res(routesAction.despesaCreate(dadosFormat));
        rej({message: 'Error: FACTORY SERVICES, falha ao cadastra despesa'});
      })
    },
    service.update = (getDados) => {
      console.log(">>FACTORY CADASTRO DESPESA")
      console.log(getDados)
      return $q((res, rej) => {
        const date = new Date(getDados.date)

        const dadosFormat = [
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
          GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
          getDados.nome,
          getDados.valor,
          getDados.status = 0,
          getDados.id,
        ]
        res(routesAction.despesaUpdate(dadosFormat));
        rej({message: 'Error: FACTORY SERVICES, falha ao atualizar despesa'});
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
        rej({message: 'Error: FACTORY SERVICES, falha ao atualizar despesa'});
      })
    },
    service.delete = (getDados) => {
      return $q((res, rej) => {
        res(routesAction.despesaDelete([getDados.id]))
        rej({message: 'Error: FACTORY SERVICES, falha ao excluir despesa'});
      })
    }
    return service
  })