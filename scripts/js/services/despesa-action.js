  angular.module('despesaServices', ['ngResource', 'routesApp'])
  .factory('despesaAction', function ($q, $rootScope, routesAction ) {

    let servico = {};
    //let evento = 'despesasServices';
    //const dataBase = configDataBase();

    //console.warn('DATA BASE')
    //console.log(dataBase)

    servico.index = (getDados ) =>{
      return $q((res, rej) => {
        //console.log('SERVICE')
          res(routesAction.despesaindex(getDados))
          rej({mesagem: 'Error: FACTORY SERVICES, falha ao buscar dados'})
      })
    },
    servico.create = (getDados) => {
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

        res(routesAction.despesacreate(dadosFormat));
        rej({message: 'Error: FACTORY SERVICES, falha ao cadastra despesa'});
      })
    },
    servico.updateStatus = (getDados) => {
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
    servico.delete = (getDados) => {
      return $q((res, rej) => {
        res(routesAction.despesaDelete([getDados.id]))
        rej({message: 'Error: FACTORY SERVICES, falha ao excluir despesa'});
      })
    }
    return servico
  })