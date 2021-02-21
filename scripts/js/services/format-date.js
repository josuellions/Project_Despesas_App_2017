angular.module('formatDateServices', ['ngResource'])
.factory('formatDate', function($q){
  
  let service = {};

  service.dtConsultaDB = () => {
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
  service.dtView = (getDate) => { // FORMAT = MM/yyyy
      try{
        const dt = getDate.split('-');
        return [dt[2].slice(-2), dt[1].slice(-2)].join("/");
      } catch {
        rej({message: 'Error: FACTORY FORMAT DATE, falha ao formatar data para exibir na view!'})
      }
  }

  return service;

})
