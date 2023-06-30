angular
  .module('relatorioServices', ['ngResource'])
  .factory(
    'relatorioAction',
    function ($q, getDadosAction, formatDadosAction, alertAction) {
      let services = {};

      services.colorProgressBar = {
        success: 'progress-bar-success',
        primary: 'progress-bar-primary',
        warnig: 'progress-bar-warning',
        danger: 'progress-bar-danger',
        info: 'progress-bar-info',
      };
      services.CalculaPorcentagem = (getTotal, getValor) => {
        getTotal = parseFloat(getTotal.replace('.', '').replace(',', '.'));
        getValor = parseFloat(getValor.replace('.', '').replace(',', '.'));

        if (parseFloat(getTotal) <= 0 || parseFloat(getValor) <= 0) {
          return 0;
        }

        let porcentagem = parseFloat((getValor / getTotal) * 100).toFixed(2);

        if (porcentagem.split('.')[1] == 0) {
          return parseFloat(porcentagem).toFixed(0);
        }

        return parseFloat(porcentagem).toFixed(2);
      };
      services.PorcentagemSelectColor = (getPorcentagem) => {
        if (parseInt(getPorcentagem) > 40) {
          return {
            barra: services.colorProgressBar.danger,
            color: '#fff',
          };
        }
        if (parseInt(getPorcentagem) > 30) {
          return {
            barra: services.colorProgressBar.warnig,
            color: '#fff',
          };
        }
        if (parseInt(getPorcentagem) > 20) {
          return {
            barra: services.colorProgressBar.info,
            color: '#fff',
          };
        }
        if (parseInt(getPorcentagem) > 10) {
          return {
            barra: services.colorProgressBar.primary,
            color: '#333',
          };
        }

        return {
          barra: services.colorProgressBar.success,
          color: '#333',
        };
      };
      services.PorcentagemInvestimentoSelectColor = (getPorcentagem) => {
        if (parseInt(getPorcentagem) < 10) {
          return {
            barra: services.colorProgressBar.danger,
            color: '#333',
          };
        }
        if (parseInt(getPorcentagem) < 20) {
          return {
            barra: services.colorProgressBar.warnig,
            color: '#333',
          };
        }
        if (parseInt(getPorcentagem) < 30) {
          return {
            barra: services.colorProgressBar.info,
            color: '#fff',
          };
        }
        if (parseInt(getPorcentagem) < 40) {
          return {
            barra: services.colorProgressBar.primary,
            color: '#fff',
          };
        }

        return {
          barra: services.colorProgressBar.success,
          color: '#fff',
        };
      };

      selectStyleColor = (getType, porcentagem) => {
        const typeColor = {
          IN: services.PorcentagemInvestimentoSelectColor(porcentagem),
          DESP: services.PorcentagemSelectColor(porcentagem),
        };

        return typeColor[getType];
      };

      services.FormatDadosViewRelatorio = (getTotal, getDados, getType) => {
        let dadosFormat = [];

        for (let row of getDados) {
          const porcentagem = services.CalculaPorcentagem(getTotal, row.valor);
          const porcentagemStyle = selectStyleColor(getType, porcentagem);

          dadosFormat.push({
            nome: row.nome,
            valor: row.valor,
            color: porcentagemStyle.barra,
            porcentagem: {
              style: {
                'max-width': `${porcentagem}%`,
                color: `${porcentagemStyle.color}`,
                'padding-top': '.7rem',
                'border-top-left-radius': '0 !important',
                'border-bottom-left-radius': '0 !important',
              },
              valor: `${porcentagem}%`,
            },
          });
        }
        return dadosFormat;
      };

      services.index = () => {
        return $q((res, rej) => {
          try {
            getDadosAction
              .index()
              .then((response) => {
                formatDadosAction
                  .index(response)
                  .then((responseFormat) => {
                    const porcentagemInvest = services.CalculaPorcentagem(
                      responseFormat.resultValorTotal.entradaValorTotal,
                      responseFormat.resultValorTotal.investimetosValorTotal
                    );
                    const porcentagemInvestStyle =
                      services.PorcentagemInvestimentoSelectColor(
                        porcentagemInvest
                      );

                    responseFormat.listaDespesas =
                      services.FormatDadosViewRelatorio(
                        responseFormat.resultValorTotal.despesaValorTotal,
                        responseFormat.listaDespesas,
                        'DESP'
                      );

                    responseFormat.listaInvestimentos =
                      services.FormatDadosViewRelatorio(
                        responseFormat.resultValorTotal.investimetosValorTotal,
                        responseFormat.listaInvestimentos,
                        'IN'
                      );

                    responseFormat.graphicInvestimento = {
                      nome: 'Investimento',
                      valor:
                        responseFormat.resultValorTotal.investimetosValorTotal,
                      color: porcentagemInvestStyle.barra,
                      porcentagem: {
                        style: {
                          'max-width': `${porcentagemInvest}%`,
                          color: `${porcentagemInvestStyle.color}`,
                          'padding-top': '.7rem',
                          'border-top-left-radius': '0 !important',
                          'border-bottom-left-radius': '0 !important',
                        },
                        valor: `${porcentagemInvest}%`,
                      },
                    };

                    res(responseFormat);
                  })
                  .catch((err) => {
                    alertAction.error(err.message).catch((errs) => {
                      alert(err.message);
                    });
                  });
              })
              .catch((err) => {
                alertAction.error(err.message).catch((errs) => {
                  alert(err.message);
                });
              });
          } catch {
            rej({
              message:
                'Erro: FACTORY RELATÓRIO SERVICES, falha ao BUSCAR os dados relatório',
            });
          }
        });
      };

      return services;
    }
  );
