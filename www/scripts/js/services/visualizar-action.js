angular.module('visualizarServices', ['ngResource'])
.factory('visualizarAction', function ($q, formatDate, formatValor ){

  let services = {};

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

  services.formatLista = (getDespesas, getEntradas) => {
    return $q((res, rej) => {
      try{
        const despesaFormat = FormatDadosView(getDespesas);
        const entradaFormat = FormatDadosView(getEntradas);
   
        const response = {
          listaDespesas: despesaFormat.dados,
          listaEntradas: entradaFormat.dados,
          resultValorTotal:[{
            despesaValorTotal: formatValor.ptBr(despesaFormat.total).toFixed(2),
            entradaValorTotal: formatValor.ptBr(entradaFormat.total).toFixed(2),
            saldoGeral: formatValor.ptBr(entradaFormat.total - despesaFormat.total).toFixed(2),
            classColorSaldoGeral: 'colorTotalViewPositivo',
          }],
        }

        if( formatValor.ptBr(entradaFormat.total - despesaFormat.total).toFixed(2)<= 0) {
          response.resultValorTotal[0].classColorSaldoGeral = 'colorTotalViewNegativo';
        }
    
        res(response);
      }catch{
        rej({message: 'Erro: FACTORY VISUALIZAR SERVICES, falha ao formatar a lista'})
      }
    })
  }

  return services;
})
