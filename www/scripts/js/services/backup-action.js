angular.module('backupServices', ['ngResource'])
.factory('backupAction', function($q, routesAction, formatDate, despesaAction, entradaAction) {

  let services = {}

  /* Action Despesas CRUD */
  const Actions  = () => {
    /*CREATE - criar despesa */
    const createDespesa = (despesa) => {
      despesaAction.create(despesa)
      .catch((err)=> {
        alertAction.error(err.message).catch((err) =>{
          alert(err.message);
        })
      })
    };
    /*CREATE - criar Entrada Caixa */
    const createEntrada = (entrada) => {
      entradaAction.create(entrada)
      .catch((err) => {
        alertAction.error(err.message).catch((err) =>{
          alert(err.message)
        })
      })
    };
  
    return {
      createDespesa,
      createEntrada
    }
  }

  const FormatDateValorView = (getData) =>  {
    getData.map((row) => {
      //row.data = formatDate.dtMesDiaAnoView(row.data)
      row.valor = parseFloat(row.valor).toFixed(2)
    })

    return getData;
  }

  const FormatDataView = (getData) => {
    
    getData.entrada = FormatDateValorView(getData.entrada)
    getData.despesas = FormatDateValorView(getData.despesas)

    return getData;
  }

  const FormatDataInsertBD =  (getData) => {
   
    const action = Actions();

    getData.entrada.map( (item) => {
      action.createEntrada(data = {
        nome: item.entrada,
        date: item.data = item.data,//formatDate.dtAnoMesDiaBD(item.data),
        valor: item.valor = item.valor.replace('.',',')
      });
    });

    getData.despesas.map( (item) => {
       action.createDespesa(data = {
        nome: item.despesa,
        date: item.data = item.data, //formatDate.dtAnoMesDiaBD(item.data),
        valor: item.valor = item.valor.replace('.',',')
      })
    });
  }

  services.restaureLocal = () => {
    return $q((res, rej) => {
      try{
        res(routesAction.backupLocal().then((resp) => {
            return FormatDataView(resp);
          })
        )
      }catch {
        rej({message: 'Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure local JSON'})
      }
    })
  },
  services.conectionAPI = (getConextion) => {
    return $q((res, rej) => {
      try{
        res(routesAction.conectionAPI(getConextion))
      }catch {
        rej({message: 'Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure local JSON'})
      }
    })
  },
  services.restaureAPI = (getConextion) => {
    return $q((res, rej) => {
      try{
        res(routesAction.backupAPI(getConextion).then((resp) => {
            return FormatDataView(resp.data);
          })
        )
      }catch {
        rej({message: 'Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure na API'})
      }
    })
  }
  services.SalveDataBDLocal = (getData) => {
    return $q((res, rej) => {
      try{
        res(FormatDataInsertBD(getData))
      }catch {
        rej({message: 'Error: FACTORY BACKUP SERVICES, falha ao salvar no banco dados local.'})
      }
    })
  }

  return services;

})