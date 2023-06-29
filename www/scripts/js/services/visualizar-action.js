angular
  .module("visualizarServices", ["ngResource"])
  .factory("visualizarAction", function ($q, formatDate, formatValor) {
    let services = {};

    const FormatDadosView = (getDados) => {
      let dadosFormat = [];
      let somaTotal = 0;

      for (let row of getDados) {
        dadosFormat.push({
          id: row.id,
          nome: row.despesa || row.entrada,
          dateBd: row.dtLanc,
          dateView: formatDate.dtView(row.data),
          valor: formatValor.ptBr(row.valor),
          classColor: row.valor >= 0 ? "" : "colorTotalViewNegativo",
        });
        somaTotal += parseFloat(row.valor);
      }

      return { dados: dadosFormat, total: somaTotal };
    };

    services.formatLista = (getEntradas, getDespesas, getInvestimentos) => {
      return $q((res, rej) => {
        try {
          const despesaFormat = FormatDadosView(getDespesas);
          const entradaFormat = FormatDadosView(getEntradas);
          const investimentoFormat = FormatDadosView(getInvestimentos);
          const saldoGeral =
            entradaFormat.total -
            (despesaFormat.total + investimentoFormat.total);

          const response = {
            listaDespesas: despesaFormat.dados,
            listaEntradas: entradaFormat.dados,
            listaInvestimentos: investimentoFormat.dados,
            resultValorTotal: [
              {
                _entrada: {
                  nome: "Entrada",
                  total: formatValor.ptBr(entradaFormat.total),
                  classColorValor:
                    saldoGeral <= 0
                      ? "colorTotalViewNegativo"
                      : "colorTotalViewPositivo",
                },
                despesas: {
                  nome: "Despesas",
                  classColorValor: "",
                  total: formatValor.ptBr(despesaFormat.total),
                },
                investimentos: {
                  nome: "Investimentos",
                  classColorValor: "",
                  total: formatValor.ptBr(investimentoFormat.total),
                },
                saldo: {
                  nome: "Saldo Geral",
                  total: formatValor.ptBr(saldoGeral),
                  classColorValor:
                    saldoGeral <= 0
                      ? "colorTotalViewNegativo"
                      : "colorTotalViewPositivo",
                },
              },
            ],
          };

          res(response);
        } catch {
          rej({
            message:
              "Erro: FACTORY VISUALIZAR SERVICES, falha ao formatar a lista",
          });
        }
      });
    };

    return services;
  });
