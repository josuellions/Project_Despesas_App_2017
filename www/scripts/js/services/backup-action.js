angular
  .module("backupServices", ["ngResource"])
  .factory(
    "backupAction",
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

      const FormatDataView = (getData) => {
        getData.entrada = FormatDateValorView(getData.entrada);
        getData.despesas = FormatDateValorView(getData.despesas);

        return getData;
      };

      const FormatDataInsertBD = async (getData) => {
        const action = Actions();
        await getData.entrada.map((item) => {
          action.createEntrada(
            (data = {
              nome: item.entrada,
              date: item.data, //((item.data = item.data)), //formatDate.dtAnoMesDiaBD(item.data),
              valor: item.valor.replace(".", ","), //((item.valor = item.valor.replace(".", ","))),
            })
          );
        });

        await getData.despesas.map((item) => {
          action.createDespesa(
            (data = {
              nome: item.despesa,
              date: item.data, //((item.data = item.data)), //formatDate.dtAnoMesDiaBD(item.data),
              valor: item.valor.replace(".", ","), //((item.valor = item.valor.replace(".", ","))),
            })
          );
        });
      };

      const formatObjDataBackup = (getType, items) => {
        const formatObj = {
          despesas: items.map((item) => {
            return {
              despesa: item.despesa,
              data: `${item.data} 00:00:01`,
              valor: item.valor,
            };
          }),
          entrada: items.map((item) => {
            return {
              entrada: item.entrada,
              data: `${item.data} 00:00:01`,
              valor: item.valor,
            };
          }),
        };
        return formatObj[getType];
      };

      services.restaureLocal = () => {
        return $q((res, rej) => {
          try {
            res(
              routesAction.backupLocal().then((resp) => {
                return FormatDataView(resp);
              })
            );
          } catch {
            rej({
              message:
                "Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure local JSON",
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
                "Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure local JSON",
            });
          }
        });
      };
      services.restaureAPI = (getConextion, getFile) => {
        return $q((res, rej) => {
          try {
            res(
              routesAction.backupDownAPI(getConextion, getFile).then((resp) => {
                return FormatDataView(resp.data);
              })
            );
          } catch {
            rej({
              message:
                "Error: FACTORY BACKUP SERVICES, falha ao buscar dados restaure na API",
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
                "Error: FACTORY BACKUP SERVICES, falha ao buscar lista de backups na API",
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
                  data.entrada.push(r);
                }
              });

            await despesaAction
              .index([date.despesainicio, date.despesafim])
              .then((res) => {
                for (var r of res) {
                  data.despesas.push(r);
                }
              });

            await res(data);
          } catch {
            rej({
              message:
                "Error: FACTORY BACKUP SERVICES, falha ao enviar os dados para API",
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
                  return formatData;
                })
            );
          } catch {
            rej({
              message:
                "Error: FACTORY BACKUP SERVICES, falha ao enviar os dados para API",
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
                "Error: FACTORY BACKUP SERVICES, falha ao salvar no banco dados local.",
            });
          }
        });
      };

      return services;
    }
  );
