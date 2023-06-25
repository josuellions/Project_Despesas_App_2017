angular
  .module("formatDadosServices", ["ngResource"])
  .factory(
    "formatDadosAction",
    function ($q, formatDate, formatValor, routesAction, alertAction) {
      let services = {};

      /*const FormatDadosView = (getDados, invest) => {

    let dadosFormat = [];
    let somaTotal = 0;

    let dadosFormatInvestmentos= []
    let somaTotalInvestimentos = 0;

    let isInvestimento = false;
    let splitStr = [];

    for(let row of getDados) {
      //splitStr = undefined !== row.despesa && row.despesa.split('-');
      //isInvestimento = splitStr && splitStr[0] === 'IN';

      //if(isInvestimento){
      if(invest){
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
  }*/

      const FormatDadosView = (getDados) => {
        let dadosFormat = [];
        let total = 0;

        for (let row of getDados) {
          dadosFormat.push({
            id: row.id,
            dateBd: row.dtLanc,
            nome: row.despesa || row.entrada || "",
            dateView: formatDate.dtView(row.data),
            valor: formatValor.ptBr(row.valor),
          });
          total += parseFloat(row.valor);
        }

        return { dados: dadosFormat, total };
      };

      services.index = (getDados) => {
        return $q((res, rej) => {
          try {
            const despesaFormat = FormatDadosView(getDados.despesas);
            const entradaFormat = FormatDadosView(getDados.entradas);
            const investimentosFormat = FormatDadosView(getDados.investimentos);
            const total =
              entradaFormat.total -
              (despesaFormat.total + investimentosFormat.total);

            const response = {
              listaDespesas: despesaFormat.dados,
              listaEntradas: entradaFormat.dados,
              listaInvestimentos: investimentosFormat.dados, //despesaFormat.investimentos,
              graphicInvestimento: {},
              resultValorTotal: {
                despesaValorTotal: formatValor.ptBr(despesaFormat.total),
                entradaValorTotal: formatValor.ptBr(entradaFormat.total),
                investimetosValorTotal: formatValor.ptBr(
                  investimentosFormat.total
                ), //formatValor.ptBr(despesaFormat.totalInvestimentos).toFixed(2),
                saldoGeral: formatValor.ptBr(total),
                classColorSaldoGeral: total < 0 && "colorTotalViewNegativo",
              },
            };

            res(response);
          } catch {
            rej({
              message:
                "Erro: FACTORY FORMAT DADOS SERVICES, falha ao formatar os dados",
            });
          }
        });
      };

      return services;
    }
  );
