angular
  .module('backupServices', ['ngResource'])
  .factory(
    'backupAction',
    function ($q, routesAction, despesaAction, entradaAction) {
      let services = {};

      /* Action Despesas CRUD */
      const Actions = () => {
        /*CREATE - criar despesa */
        const createDespesa = (despesa) => {
          despesaAction.create(despesa).catch((err) => {
            alertAction.error(err.message).catch((err) => {
              alert(err.message);
            });
          });
        };
        /*CREATE - criar Entrada Caixa */
        const createEntrada = (entrada) => {
          entradaAction.create(entrada).catch((err) => {
            alertAction.error(err.message).catch((err) => {
              alert(err.message);
            });
          });
        };

        return {
          createDespesa,
          createEntrada,
        };
      };

      const FormatDateValorView = (getData) => {
        getData.map((row) => {
          //row.data = formatDate.dtMesDiaAnoView(row.data)
          row.valor = parseFloat(row.valor).toFixed(2);
        });

        return getData;
      };

      const FormatDataView = (getType, getData) => {
        const formatObj = {
          despesas: getData.despesa?.map((_, index) => {
            return {
              despesa: getData.despesa[index],
              data: getData.data[index],
              valor: parseFloat(getData.valor[index]).toFixed(2),
            };
          }),
          entrada: getData.entrada?.map((_, index) => {
            return {
              entrada: getData.entrada[index],
              data: getData.data[index],
              valor: parseFloat(getData.valor[index]).toFixed(2),
            };
          }),
        };
        return formatObj[getType];
      };

      const FormatDataInsertBD = (getData) => {
        const action = Actions();
        getData.entrada.map((item) => {
          action.createEntrada(
            (data = {
              nome: item.entrada,
              date: item.data, //((item.data = item.data)), //formatDate.dtAnoMesDiaBD(item.data),
              valor: item.valor.replace('.', ','), //((item.valor = item.valor.replace(".", ","))),
            })
          );
        });

        getData.despesas.map((item) => {
          action.createDespesa(
            (data = {
              nome: item.despesa,
              date: item.data, //((item.data = item.data)), //formatDate.dtAnoMesDiaBD(item.data),
              valor: item.valor.replace('.', ','), //((item.valor = item.valor.replace(".", ","))),
            })
          );
        });
      };

      const formatObjDataBackup = (getType, items) => {
        const _despesas = [];
        const _entradas = [];
        const data = [];
        const valor = [];

        const formatObj = {
          despesas: () => {
            items.map((item) => {
              _despesas.push(item.despesa);
              data.push(`${item.data} 00:00:01`);
              valor.push(item.valor);
            });

            return {
              despesa: _despesas,
              data: data,
              valor: valor,
            };
          },
          entrada: () => {
            items.map((item) => {
              _entradas.push(item.entrada);
              data.push(`${item.data} 00:00:01`);
              valor.push(item.valor);
            });

            return {
              entrada: _entradas,
              data: data,
              valor: valor,
            };
          },
        };

        return formatObj[getType]();
      };

      services.restaureLocal = () => {
        return $q((res, rej) => {
          try {
            res(
              routesAction.backupLocal().then((resp) => {
                resp.entrada = FormatDateValorView(resp.entrada);
                resp.despesas = FormatDateValorView(resp.despesas);
                return resp; //FormatDataView(resp);
              })
            );
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure local JSON',
            });
          }
        });
      };

      services.conectionAPI = (getConextion) => {
        return $q((res, rej) => {
          try {
            res(routesAction.conectionAPI(getConextion));
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure local JSON',
            });
          }
        });
      };

      services.restaureAPI = (getConextion, getFile) => {
        return $q(async (res, rej) => {
          try {
            const formatData = {
              entrada: {},
              despesas: {},
            };

            await res(
              routesAction.backupDownAPI(getConextion, getFile).then((resp) => {
                for (var type in resp.data) {
                  resp.data[type].length > 0
                    ? (formatData[type] = FormatDateValorView(resp.data[type]))
                    : (formatData[type] = FormatDataView(
                        type,
                        resp.data[type]
                      ));
                }
                return formatData;
              })
            );
            /*res(
              routesAction.backupDownAPI(getConextion, getFile).then((resp) => {
                return FormatDataView('tipo', resp.data);
              })
            );*/
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure na API',
            });
          }
        });
      };

      services.listaBaclupsAPI = (getConextion) => {
        return $q((res, rej) => {
          try {
            res(
              routesAction.backupListaAPI(getConextion).then((resp) => {
                return resp.data;
              })
            );
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao buscar lista de backups na API',
            });
          }
        });
      };

      services.buscarDataLocal = () => {
        const data = {
          entrada: [],
          despesas: [],
        };

        return $q(async (res, rej) => {
          try {
            const date = await routesAction.dateInicioFimData().then((res) => {
              return res[0];
            });

            await entradaAction
              .index([date.entradainicio, date.entradafim])
              .then((res) => {
                for (var r of res) {
                  data.entrada.push({
                    entrada: r.entrada,
                    data: r.data,
                    valor: parseFloat(r.valor).toFixed(2),
                  });
                }
              });

            await despesaAction
              .index([date.despesainicio, date.despesafim])
              .then((res) => {
                for (var r of res) {
                  data.despesas.push({
                    despesa: r.despesa,
                    data: r.data,
                    valor: parseFloat(r.valor).toFixed(2),
                  });
                }
              });

            await res(data);
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao enviar os dados para API',
            });
          }
        });
      };

      services.enviarAPI = (getConextion, data) => {
        return $q(async (res, rej) => {
          try {
            const formatData = {
              entrada: {},
              despesas: {},
            };

            //type = "entrada" ou "despesas"
            for (var type in data) {
              formatData[type] = await formatObjDataBackup(type, data[type]);
            }

            await res(
              routesAction
                .backupUpAPI(getConextion, formatData)
                .then((resp) => {
                  return resp;
                })
            );
            res('ok');
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao enviar os dados para API',
            });
          }
        });
      };

      services.SalveDataBDLocal = (getData) => {
        return $q((res, rej) => {
          try {
            res(FormatDataInsertBD(getData));
          } catch {
            rej({
              message:
                'Error: FACTORY BACKUP SERVICES, falha ao salvar no banco dados local.',
            });
          }
        });
      };

      return services;
    }
  );
