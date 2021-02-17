angular
  .module("dataBase",  ['ngResource'])
  .factory('configDataBase', function (){
    /*CRIAR TABLES NO BANCO DADOS*/
    const createTables = (localDB) => {
      //console.log('CRIAR TABLE NEW')
      const criarTb = [
        "CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);",
        "CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);",
        "CREATE TABLE IF NOT EXISTS TbDespesasStatus(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL, statusDesp INT NOT NULL);",
      ];

      criarTb.forEach((query) => {
        try {
          localDB.transaction((transaction) => {
            transaction.executeSql(query, []) //, nullDataHandler, errorHandler);
          });
        } catch (e) {
          alert("Erro: Data base Tabelas não criada " + e + ".");
          return;
        }
      });
    };
  
    const initDBDEV = () => {
      
      const alertErroNavegador = "Erro new: Seu navegador não permite banco de dados.";

      const shortName = "bdDespesas";
      const version = "1.0";
      const displayName = "BdGestorDespesas";
      const maxSize = 65536; // Em bytes

      try{
        const openDataBase = window.openDatabase(shortName, version, displayName, maxSize);
        
        !window.openDatabase ? alert(alertErroNavegador) : createTables(openDataBase);

        return openDataBase;
      }
      catch(tipoErro){
        const SelectMessageAlertError = {
          1(){
            return 'Versão de banco de dados inválida!' 
          },
          2(){
            `Tipo desconhecido: ${tipoErro}!`
          }  
        } 
        alert(`Error: ${SelectMessageAlertError[tipoErro]}`)
      }
    };
    
    return initDBDEV;
    //module.exports = initDBDEV;
  }) 