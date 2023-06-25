angular.module('formatDateServices', ['ngResource'])
.factory('formatDate', function($q, alertAction){
  
  let service = {};

  let datefull = [];
  let hora = [];
  let date = [];

  service.dtConsultaDB = () => { // FORMAT = yyyy-MM-dd
    const dtConsulta = {
      inicio: "",
      fim: "",
    };
  
    const dtBaseAtual = new Date();

    return $q((res, rej) => {
      try{
        const comparaDtbase = document.getElementById("comparaDt");
        
        const anoMes = comparaDtbase == null
                        ? [dtBaseAtual.getFullYear(), dtBaseAtual.getMonth() + 1]
                        : comparaDtbase.innerText.split('-');
      
        const ano = anoMes[0];
        let mes = parseInt(anoMes[1]) < 10 ? `0${parseInt(anoMes[1])}` : anoMes[1];
        
        const primeiroDiaMes = new Date(ano, mes, 1).getDate();
        const ultimoDiaMes = new Date(ano, mes, 0).getDate();
      
        dtConsulta.inicio = [ano, mes, `0${primeiroDiaMes}`].join("-");
        dtConsulta.fim = [ano, mes, ultimoDiaMes].join("-");

        res(dtConsulta)
      
      } catch {
        rej({message: 'Error: FACTORY FORMAT DATE, falha ao formatar data!'})
      }
    })
  },
  service.dtView = (getDate) => { // FORMAT = dd/MM
      try{

        const dt = getDate.split('-');
        return [String(`0${dt[2]}`.slice(-2)), String(`0${dt[1]}`.slice(-2))].join("/");

      } catch {
        throw new 'Error: FACTORY FORMAT DATE, falha ao formatar data para exibir na view!';
      }
  }
  service.dtInsertDB = (getDate) => { // FORMAT = yyyy-MM-dd HH:MM:SS

    datefull = getDate.split(' ')
    date = datefull[0].split('-')
    hora = datefull[1].split(':');

    
    return  new Date(date[0], date[1], date[2], hora[0], hora[1], hora[2]);
  }
  service.dtMesDiaAnoView = (getDate) => { // FORMAT = dd/MM/yyyy

    datefull = getDate.split(' ')
    date = datefull[0].split('-')

    return  [date[2], date[1], date[0]].join('/');
  }
  service.dtAnoMesDiaBD = (getDate) => { // FORMAT = yyyy-MM-dd
    date = getDate.split('/')
    const dt = [date[2], date[1], date[0]].join('-')
    //console.log(dt)
    return  dt;
  }

  return service;

})
