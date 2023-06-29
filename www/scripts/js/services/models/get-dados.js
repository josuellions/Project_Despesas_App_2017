angular.module('getDadosServices', ['ngResource'])
.factory('getDadosAction', function($q, formatDate, routesAction, alertAction){
  
  let services = {}

  services.index = (getDados) => {
    return $q((res, rej) => {
      try{
        formatDate.dtConsultaDB().then(async (response) => {
          const postDate = [response.inicio, response.fim]
           
          let responseEntrada = await  routesAction.entradaIndex(postDate).then((responseEnt) => {
            return responseEnt;
          }).catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(err.message)
            });
          });
          
          //routesAction.despesaIndex(postDate).then((responseDesp) => {
          let responseDespesas = await routesAction.despesaIndexSemInvestimentos(postDate).then((responseDesp) => {
            return responseDesp;
          }).catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(err.message)
            });
          });

          let responseInvestimentos = await routesAction.despesaIndexInvestimentos(postDate).then((responseDesp) => {
            return responseDesp;
          }).catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(err.message)
            });
          });

          res({
            entradas: responseEntrada,
            despesas: responseDespesas,
            investimentos: responseInvestimentos
          })

        }).catch((err) => {
          alertAction.error(err.message).catch((errs) => {
            alert(errs.message)
          })
        });

      } catch {
        rej({message: 'Erro: FACTORY GETDADOS SERVICES, falha ao buscar dados'})
      }
    })
  }

  return services;
})
