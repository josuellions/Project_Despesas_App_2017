angular.module('querysApp', ['ngResource'])
    .factory('query', function ($q) {

    let query = {};
//console.log(">> FACTORY QUERY")
  
  query.selecDesp = () => { 
      return "SELECT * FROM TbDespesas;"
    },
    query.selectDespStatus = () => {
      return "SELECT * FROM  TbDespesasStatus;"
    },
    query.selectDespPorId = () => {
       return "SELECT * FROM TbDespesasStatus WHERE id=?;"
    },
    query.selectDespStatusDt = () => {
       return "SELECT * FROM TbDespesasStatus WHERE data >= ? and data <= ? ORDER BY data ASC ;"
    },
    query.selectDespStatusDtValor = () => {
       //return "SELECT valor FROM TbDespesasStatus WHERE data >= ? and data <= ? ;"
    },
    query.dropDesp = () => {
       return "DROP TABLE TbDespesas;"
    },
    query.selectEntrada = () => {
       return "SELECT * FROM TbEntradas;"
    },
    query.selectEntradaPorId = () => {
       return "SELECT * FROM TbEntradas WHERE id=?;"
    },
    query.selectEntradaDt = () => {
       return "SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ORDER BY data ASC;"
    },
    query.selectEntradaDtValor = () => {
       //return "SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ORDER BY data ASC;"
    },
    query.updateStatusDesp = () => {
       return "UPDATE TbDespesasStatus SET statusDesp = ? WHERE id = ?;"
    },
    query.deleteDesp = () => {
       return "DELETE FROM TbDespesasStatus WHERE id=?;"
    },
    query.deleteEntrada = () => {
       return "DELETE FROM TbEntradas WHERE id=?;"
    },
    query.insertDespeStatus = () => {
       //return "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?); SELECT * FROM TbDespesasStatus WHERE id = SCOPE_IDENTITY();"
    },
    query.insertDespStatus = () => {
       return "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);"
    },
    query.insertEntrada = () => {
       return "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);"
    },
    query.updateDespStatus = () => {
       return "UPDATE TbDespesasStatus SET dtLanc = ?, data = ?, despesa = ?, valor = ?, statusDesp = ? WHERE id=?;"
    },
    query.updateEntrada = () => {
       return "UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;"
    }
    return query;
  })