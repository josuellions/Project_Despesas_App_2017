angular.module('getDadosServices', ['ngResource'])
.factory('getDadosAction', function($q, formatDate, routesAction, alertAction){
  
  let services = {}

  services.index = (getDados) => {
    return $q((res, rej) => {
      try{
        formatDate.dtConsultaDB().then((response) => {
          const postDate = [response.inicio, response.fim]
          let responseDespesas = {};
          
          routesAction.despesaIndex(postDate).then((responseDesp) => {
            responseDespesas = responseDesp;
          }).catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(err.message)
            });
          });

          routesAction.entradaIndex(postDate).then((responseEnt) => {
            let responseEntradas = responseEnt;
            res({
              "despesas": responseDespesas,
              "entradas": responseEntradas
            })

          }).catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(err.message)
            });
          });

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
