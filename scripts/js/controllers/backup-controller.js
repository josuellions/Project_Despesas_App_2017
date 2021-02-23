angular
  .module("todoApp")
  .controller("BackupController", function ($scope, $http, $location, pass) {

  $scope.titulo = 'Controle Despesas';
  $scope.classSubTitulo = 'subtitulo-menu alinharMes';
  $scope.subtitulo = 'Backup'
  $scope.passmes = false;

/*FUNCIONADO COMENTADO PARA ESTIVIZAÇÂO DA VIEW
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
