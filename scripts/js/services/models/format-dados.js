angular.module('formatDadosServices', ['ngResource'])
.factory('formatDadosAction', function($q, formatDate, formatValor, routesAction, alertAction){
  
  let services = {}

  const FormatDadosView = (getDados) => {
    
    let dadosFormat = [];
    let somaTotal = 0;

    for(let row of getDados) {
      dadosFormat.push({
        id: row.id,
        nome: row.despesa || row.entrada,
        dateBd: row.dtLanc,
        dateView: formatDate.dtView(row.data),
        valor: row.valor.toFixed(2),
      })
      somaTotal += parseFloat(row.valor);
    }

    return {dados: dadosFormat, total: somaTotal};
  }

  services.index = (getDados) => {
    return $q((res, rej) => {
      try{
        const despesaFormat = FormatDadosView(getDados.despesas);
        const entradaFormat = FormatDadosView(getDados.entradas);
   
        const response = {
          listaDespesas: despesaFormat.dados,
          listaEntradas: entradaFormat.dados,
          resultValorTotal:{
            despesaValorTotal: formatValor.ptBr(despesaFormat.total).toFixed(2),
            entradaValorTotal: formatValor.ptBr(entradaFormat.total).toFixed(2),
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
