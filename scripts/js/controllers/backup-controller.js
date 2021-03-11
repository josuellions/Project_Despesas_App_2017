angular.module("todoApp").controller("BackupController",
 function ($scope, $http, $location, alertAction) {

  $scope.titulo = 'Controle Despesas';
  $scope.classSubTitulo = 'subtitulo-menu alinharMes';
  $scope.subtitulo = 'Backup'
  $scope.passmes = false;
  $scope.formBackup = {};

  $scope.formBackup = '21.21.21.11:3333'

  const ResponseConnection = (conn) => {
    console.log('SUCESS CONECTION')
  }


  const Connection = (getConextion) => {
    
    urlbase = `http://${getConextion}`;

    $http.get(`${urlbase}/connection`).then((res)=>{
      if(res.status == 201){
        ResponseConnection();
      }
    }).catch((err) => {
      alertAction.error(`Error: Falha na conexão com server!
        Contate o administrador server backup, ou verifique o endereço de conexão do servidor
        e tente novamente.
        ${urlbase}`).catch((errs) => {
        alert(errs.message)
      })
    })
  }
  


  $scope.upload = () => {
    Connection($scope.formBackup);
    //console.log($scope.formBackup)
  }

  $scope.download = () => {
    //Connection($scope.formBackup);
    //console.log($scope.formBackup)
    alertAction.info(`Informação: Restaure/upload do backup em desenvolvimento!`).catch((errs) => {
      alert(errs.message)
    })
  }




/*FUNCIONADO COMENTADO PARA ESTILIZAÇÂO DA VIEW
    let totalTable;
    let urlbase = ''; //'http://21.21.21.11:3333';

    const SetUrlServer = () =>{
      const enderecoServer = prompt("Digite endereço ip ou url do servidor e porta de conexão.", '21.21.21.11:3333'); //

      if(String(enderecoServer).length > 0 && enderecoServer != null ){
        urlbase = `http://${enderecoServer}`;
        return;
      }

      SetUrlServer();
    }

    SetUrlServer();

    function Connection () {
      const conect = () => {
        return $http.get(`${urlbase}/connection`);
      }

      conect().then((res)=>{
        if(res.status == 201){
          ResponseConnection(true);
        }
      }).catch((err) => {
        console.error("Falha na conexão server!");
        ResponseConnection(false);
      })
    }

    const ResponseConnection = (conn) => {
      if(!conn){
        alert(`Error: Falha na conexão server!\nURL = ${urlbase}/connection`)
        $location.path('/home')
        return;
      }
      const urlEntrada = `${urlbase}/entrada`;

      const Components = {
        TbDespesas(data) {
          return $http.post(urlEntrada, {
            Despesas: data
          });
        },
        TbDespesasStatus(data) {
          return $http.post(urlEntrada, {
            DespesasStatus: data
          })
        },
        TbEntradas(data) {
          return $http.post(urlEntrada, {
            Entrada: data
          })
        }
      }

      const PercorrerBancoDadosParaBackup = (check) => {

        let localDB = ''
        const tablesBdDespesas = ["TbDespesas", "TbDespesasStatus", "TbEntradas"];

        if(check == true){

          let initDB = () => {
            const shortName = "bdDespesas";
            const version = "1.0";
            const displayName = "BdGestorDespesas";
            const maxSize = 65536; // Em bytes

            localDB = window.openDatabase(shortName, version, displayName, maxSize);
          };

          initDB();

          totalTable = tablesBdDespesas.length - 1;

          tablesBdDespesas.forEach((table) => {

            localDB.transaction(function (transaction) {
              transaction.executeSql(
                `SELECT * FROM  ${table}`,
                [],
                function (transaction, results) {

                  executarConsulta = true;
                  PostData(table, results.rows);

                  if(totalTable == 0){

                      alert('Backup Concluído!')

                      $location.path('/home')
                  }
                },
                function (transaction, error) {
                  alert("Erro: " + error.code + "\nMensagem: " + error.message);
                }
              );
            });
          });
        }
      };

      const enviar = (table, data) => {

        const action = Components[table]

        return action(data);

      }

      async function PostData (table, data) {
       await enviar(table, data).then((res)=>{
         if(res.status == 201){
          --totalTable;
         }
       }).catch((err) => {
        alert("Error: Falha na comunicação server!")
         console.error("Falha na comunicação server!")
       })
      }

    PercorrerBancoDadosParaBackup(true)

    }

    Connection();
    */
})
