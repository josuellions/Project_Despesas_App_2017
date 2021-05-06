angular.module('formatDadosServices', ['ngResource'])
.factory('formatDadosAction', function($q, formatDate, formatValor, routesAction, alertAction){
  
  let services = {}

  const FormatDadosView = (getDados) => {
    
    let dadosFormat = [];
    let somaTotal = 0;

    let dadosFormatInvestmentos= []
    let somaTotalInvestimentos = 0;

    let isInvestimento = false;
    let splitStr = [];

    for(let row of getDados) {
      splitStr = undefined !== row.despesa && row.despesa.split('-');
      isInvestimento = splitStr && splitStr[0] === 'IN';

      if(isInvestimento){
        dadosFormatInvestmentos.push({
          id: row.id,
          nome: row.despesa || ' ',
          dateBd: row.dtLanc,
          dateView: formatDate.dtView(row.data),
          valor: row.valor.toFixed(2),
        })
        somaTotalInvestimentos += parseFloat(row.valor);
      }else{
        dadosFormat.push({
          id: row.id,
          nome: row.despesa || row.entrada,
          dateBd: row.dtLanc,
          dateView: formatDate.dtView(row.data),
          valor: row.valor.toFixed(2),
        })
        somaTotal += parseFloat(row.valor);
      }
    }

    return {dados: dadosFormat, total: somaTotal, investimentos: dadosFormatInvestmentos, totalInvestimentos: somaTotalInvestimentos};
  }

  services.index = (getDados) => {
    return $q((res, rej) => {
      try{
        const despesaFormat = FormatDadosView(getDados.despesas);
        const entradaFormat = FormatDadosView(getDados.entradas);
   
        const response = {
          listaDespesas: despesaFormat.dados,
          listaEntradas: entradaFormat.dados,
          listaInvestimentos: despesaFormat.investimentos,
          graphicInvestimento: {},
          resultValorTotal:{
            despesaValorTotal: formatValor.ptBr(despesaFormat.total).toFixed(2),
            entradaValorTotal: formatValor.ptBr(entradaFormat.total).toFixed(2),
            investimetosValorTotal: formatValor.ptBr(despesaFormat.totalInvestimentos).toFixed(2),
            saldoGeral: formatValor.ptBr(entradaFormat.total - despesaFormat.total).toFixed(2),
            classColorSaldoGeral: 'colorTotalViewPositivo',
          },
        }

        if( formatValor.ptBr(entradaFormat.total - despesaFormat.total).toFixed(2)<= 0) {
          //response.resultValorTotal.classColorSaldoGeral = 'colorTotalViewNegativo';
        }
        res(response);
      } catch {
        rej({message: 'Erro: FACTORY FORMATDADOS SERVICES, falha ao formatar os dados'})
      }
    })
  }

  return services;
})
