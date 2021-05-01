angular.module("todoApp").controller("BackupController",
 function ($scope, backupAction, alertAction, formatValor) {

  $scope.titulo = 'Controle Despesas';
  $scope.classSubTitulo = 'subtitulo-menu alinharMes';
  $scope.subtitulo = 'Backup'
  $scope.passmes = false;
  $scope.formBackup = {};
  $scope.origin = '';
  
  const ResponseConnection = (conn) => {
    alertAction.success(`Sucesso: Conexão com servidor realizada!`).catch((errs) => {
      alert(errs.message)
    });
  }

  const ResponseError = (getMessage) => {
    alertAction.error(`Error: Falha na conexão com server!
      Contate o administrador server backup, ou verifique o endereço de conexão do servidor
      e tente novamente.
      ${ getMessage}`).catch((errs) => {
      alert(errs.message)
    })
  }

  const ExibirDataView = (getData) => {
    $scope.entrada = getData.entrada;
    $scope.despesas = getData.despesas;

    $('#ModalBackup').modal('toggle');

    formatValor.moneyMask();
  }

  const BuscarDataAPI = (getConextion) => {
    backupAction.restaureAPI(getConextion).then((res) => {
      $scope.origin = 'Backup Sever - API'
      ExibirDataView(res);
     })
     .catch((err) => {
      alertAction.error(err.message).catch((errs) => {
        alert(errs.message)
      })
    });
  }

  const Connection = (getConextion) => {
   
    if(String(getConextion).trim().length === 0 || undefined) {
      ResponseError();
      return
    }

    if('local' === String(getConextion).trim().toLowerCase()){
      backupAction.restaureLocal().then((res) =>{
        $scope.origin = 'Backup Local - JSON'
        ExibirDataView(res)
      })
      .catch((err) => {
        ResponseError(err.message)
      });
      return
    }
    
    backupAction.conectionAPI(getConextion).then( (res) => {
       ResponseConnection();

       BuscarDataAPI(getConextion);
     })
     .catch((err) => {
      ResponseError('')
    });
  }

  const SalveDownloadsDataLocal =  () => {

     backupAction.SalveDataBDLocal({despesas: $scope.despesas, entrada: $scope.entrada}).then((res) => {
      console.log(res)
      alertAction.success(`Success: Restaruração dados realizada!`).catch((errs) => {
        alert(errs.message)
      })
    })
    .catch((err) => {
      alertAction.error(err.message).catch((errs) => {
        alert(errs.message)
      })
    });

  }
  
  $scope.upload = () => {
    alertAction.info(`Informação: Envio/Upload do backup em desenvolvimento!`).catch((errs) => {
      alert(errs.message)
    })
  }

  $scope.download = () => {
    Connection($scope.formBackup.server);
  }

  $scope.submeterDownload = () => {
    SalveDownloadsDataLocal();
  }
})
