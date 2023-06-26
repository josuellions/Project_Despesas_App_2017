angular
  .module("todoApp")
  .controller(
    "BackupController",
    function ($scope, backupAction, alertAction, formatValor) {
      $scope.titulo = "Controle Despesas";
      $scope.classSubTitulo = "subtitulo-menu alinharMes";
      $scope.subtitulo = "Backup";
      $scope.passmes = false;
      $scope.formBackup = {};
      $scope.origin = "";
      $scope.tipo = "";

      $scope.listaBackups = [];
      $scope.formBackup.server = "192.168.7.11:3333";

      const ResponseConnection = (conn) => {
        alertAction
          .success(`Sucesso: Conexão com servidor realizada!`)
          .catch((errs) => {
            alert(errs.message);
          });
        return true;
      };

      const ResponseError = (getMessage) => {
        alertAction
          .error(
            `Error: Falha na conexão com server!
      Contate o administrador server backup, ou verifique o endereço de conexão do servidor
      e tente novamente.
      ${getMessage}`
          )
          .catch((errs) => {
            alert(errs.message);
          });
      };

      const ExibirDataView = (getData) => {
        $scope.entrada = getData.entrada;
        $scope.despesas = getData.despesas;

        setTimeout(() => {
          $("#ModalBackup").modal("toggle");
          formatValor.moneyMask();
        }, 900);
      };

      const ExibirListaBackupsView = (getData) => {
        $scope.listaBackups = getData;

        setTimeout(() => {
          $("#ModalBackupList").modal("toggle");
        }, 900);
      };

      const BuscarDataAPI = (getConextion, getFile) => {
        backupAction
          .restaureAPI(getConextion, getFile)
          .then((res) => {
            $scope.origin = "Backup Sever Download - API";
            $scope.tipo = "download";

            ExibirDataView(res);
          })
          .catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(errs.message);
            });
          });
      };

      const BuscarDataLocal = () => {
        backupAction
          .buscarDataLocal()
          .then((res) => {
            $scope.origin = "Backup Sever Upload - API";
            $scope.tipo = "upload";
            ExibirDataView(res);
          })
          .catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(errs.message);
            });
          });
      };

      const ListaBackupsAPI = (getConection) => {
        backupAction
          .listaBaclupsAPI(getConection)
          .then((res) => {
            $scope.origin = "Backup Sever Download - API";
            $scope.tipo = "upload";
            ExibirListaBackupsView(res);
          })
          .catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(errs.message);
            });
          });
      };

      const EnviarDataAPI = () => {
        const data = {
          entrada: $scope.entrada,
          despesas: $scope.despesas,
        };
        const conection = $scope.formBackup.server;
        backupAction
          .enviarAPI(conection, data)
          .then((res) => {
            alertAction
              .success(`Success: Backup dados realizado!`)
              .catch((errs) => {
                alert(errs.message);
              });
          })
          .catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(errs.message);
            });
          });
      };

      const Connection = (getConection, tipoAction) => {
        ResponseConnection;

        if (String(getConection).trim().length === 0 || undefined) {
          ResponseError();
          return;
        }

        if (String(getConection).trim() === "local") {
          tipoAction = getConection;
        }

        action = {
          local: () => {
            backupAction
              .restaureLocal()
              .then((res) => {
                $scope.origin = "Backup Local - JSON";
                ExibirDataView(res);
              })
              .catch((err) => {
                ResponseError(err.message);
              });
          },
          upload: (conection) => {
            backupAction
              .conectionAPI(conection)
              .then((res) => {
                ResponseConnection();
                BuscarDataLocal();
              })
              .catch((err) => {
                ResponseError("");
              });
          },
          download: (conection) => {
            backupAction
              .conectionAPI(conection)
              .then((res) => {
                ResponseConnection();
                ListaBackupsAPI(conection);
              })
              .catch((err) => {
                ResponseError("");
              });
          },
        };

        return action[tipoAction](getConection);
      };

      const SalveDownloadsDataLocal = () => {
        backupAction
          .SalveDataBDLocal({
            despesas: $scope.despesas,
            entrada: $scope.entrada,
          })
          .then((res) => {
            alertAction
              .success(`Success: Restaruração dados realizada!`)
              .catch((errs) => {
                alert(errs.message);
              });
          })
          .catch((err) => {
            alertAction.error(err.message).catch((errs) => {
              alert(errs.message);
            });
          });
      };

      const Action = (type) => {
        const setAction = {
          upload: EnviarDataAPI,
          download: SalveDownloadsDataLocal,
        };
        return setAction[type]();
      };

      $scope.upload = () => {
        /*alertAction.info(`Informação: Envio/Upload do backup em desenvolvimento!`).catch((errs) => {
      alert(errs.message)
    })*/
        Connection($scope.formBackup.server, "upload");
      };

      $scope.download = () => {
        Connection($scope.formBackup.server, "download");
      };

      $scope.selectRestaureDownload = (file) => {
        BuscarDataAPI($scope.formBackup.server, file);
      };

      $scope.submitAction = (type) => {
        Action(type);
      };
    }
  );
