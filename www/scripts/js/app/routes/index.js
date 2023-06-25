angular
  .module("routesApp", ["ngResource", "apiApp"])
  .factory("routesAction", function ($q, $rootScope, query, api) {
    let app = {};

    const FormatDataMesAtualESaldoMesAnterior = (
      dateMes,
      totalEntrada,
      totalDespesas,
      data
    ) => {
      const saldoMesAnterior = totalEntrada - totalDespesas;

      const date = new Date(dateMes);
      const itemSaldoMesAnterior = {
        id: 0,
        data: dateMes,
        dtLanc: dateMes,
        entrada: `SALDO-01 ${GetDateFormat.mesExtAnoParams(
          mesExt[date.getMonth()],
          date.getFullYear()
        )}`,
        valor: saldoMesAnterior,
      };

      const dataFormat = [itemSaldoMesAnterior];

      for (item of data) {
        dataFormat.push(item);
      }

      return dataFormat;
    };

    app.despesaIndex = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.index(query.selectDespesaStatusDate, getDados));
        } catch {
          rej({ message: "Error: FACTORY ROUTE, falha ao lista as despesas" });
        }
      });
    };
    app.despesaIndexSemInvestimentos = (getDados) => {
      return $q((res, rej) => {
        try {
          res(
            api.index(query.selectDespesaStatusSemInvestimentosDate, getDados)
          );
        } catch {
          rej({ message: "Error: FACTORY ROUTE, falha ao lista as despesas" });
        }
      });
    };
    app.despesaIndexInvestimentos = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.index(query.selectDespesaStatusInvestimentosDate, getDados));
        } catch {
          rej({ message: "Error: FACTORY ROUTE, falha ao lista as despesas" });
        }
      });
    };
    app.despesaCreate = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.create(query.insertDespesaStatus, getDados));
        } catch {
          rej({ message: "Error: FACTORY ROUTE, falha ao adicionar despesa" });
        }
      });
    };
    app.despesaUpdate = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.update(query.updateDespesaStatus, getDados));
        } catch {
          rej({
            message: "Error: FACTORY ROUTE, falha ao atualizar dados despesa",
          });
        }
      });
    };
    app.despesaStatus = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.update(query.updateStatusDespesa, getDados));
        } catch {
          rej({ message: "Error: FACTORY ROUTE, falha ao atualizar status" });
        }
      });
    };
    app.despesaDelete = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.delete(query.deleteDespesa, getDados));
        } catch {
          rej({
            message: "Error: FACTORY ROUTE, falha ao excluir dados despesa",
          });
        }
      });
    };
    app.entradaIndex = (getDados) => {
      return $q(async (res, rej) => {
        try {
          const dtMesAnteriorFormat = FormatDataBuscaMesAnterior(getDados[0]);

          const data = await api.index(query.selectEntradaDate, getDados);
          const totalEntrada = await api.index(
            query.selectEntradaTotalSaldoMesAnterior,
            [dtMesAnteriorFormat[1]]
          );
          const totalDespesas = await api.index(
            query.selectDespesaStatusTotalSaldoMesAnterior,
            [dtMesAnteriorFormat[1]]
          );

          const dataFormat = FormatDataMesAtualESaldoMesAnterior(
            getDados[0],
            totalEntrada[0].total,
            totalDespesas[0].total,
            data
          );

          res(dataFormat);
        } catch {
          rej({
            message: "Error: FACTORY ROUTE, falha ao lista as entradas caixa",
          });
        }
      });
    };
    app.entradaCreate = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.create(query.insertEntrada, getDados));
        } catch {
          rej({
            message: "Error: FACTORY ROUTE, falha ao cadastrar entrada caixa",
          });
        }
      });
    };
    app.entradaUpdate = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.update(query.updateEntrada, getDados));
        } catch {
          rej({
            message:
              "Error: FACTORY ROUTE, falha ao atualizar os dados entrada caixa",
          });
        }
      });
    };
    app.entradaDelete = (getDados) => {
      return $q((res, rej) => {
        try {
          res(api.delete(query.deleteEntrada, getDados));
        } catch {
          rej({
            message:
              "Error: FACTORY ROUTE, falha ao excluir dados entrada caixa",
          });
        }
      });
    };
    app.conectionAPI = (getConextion) => {
      return $q((res, rej) => {
        try {
          res(api.conectionAPI(getConextion));
        } catch {
          rej({
            message: "Error: FACTORY ROUTE SERVICES, falha conexão com API",
          });
        }
      });
    };
    app.backupListaAPI = (getConextion) => {
      return $q((res, rej) => {
        try {
          res(api.listaBackupsdAPI(getConextion));
        } catch {
          rej({
            message:
              "Error: FACTORY ROUTE SERVICES, falha busca lista backups na API",
          });
        }
      });
    };
    app.backupDownAPI = (getConextion, getFile) => {
      return $q((res, rej) => {
        try {
          res(api.downloadAPI(getConextion, getFile));
        } catch {
          rej({
            message: "Error: FACTORY ROUTE SERVICES, falha busca dados na API",
          });
        }
      });
    };
    app.backupUpAPI = (getConextion, getData) => {
      return $q((res, rej) => {
        try {
          res(api.uploadAPI(getConextion, getData));
        } catch {
          rej({
            message:
              "Error: FACTORY ROUTE SERVICES, falha enviar dados para API",
          });
        }
      });
    };
    app.dateInicioFimData = () => {
      return $q((res, rej) => {
        try {
          res(api.index(query.dateInicioFimData));
        } catch {
          rej({
            message: "Error: FACTORY ROUTE, falha ao lista as entradas caixa",
          });
        }
      });
    };
    app.backupLocal = () => {
      return $q((res, rej) => {
        try {
          res(api.downloadLocal(query.data));
        } catch {
          rej({
            message:
              "Error: FACTORY ROUTE SERVICES, falha ao buscar dados Local",
          });
        }
      });
    };

    return app;
  });
