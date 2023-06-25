angular.module("querysApp", ["ngResource"]).factory("query", function ($q) {
  const getLocalJSON = JSON.parse(data);

  const query = {
    selectDespesaStatusTotalSaldoMesAnterior: `SELECT SUM(valor) AS total FROM TbDespesasStatus
														WHERE (data <= ?)`,
    selectEntradaTotalSaldoMesAnterior: `SELECT SUM(valor) AS total FROM  TbEntradas
														WHERE (data <= ?);`,

    selectDespesaStatusSemInvestimentosDate: `SELECT * FROM TbDespesasStatus WHERE data >= ? and data <= ? and despesa NOT LIKE ('IN-%') ORDER BY data ASC;`,
    selectDespesaStatusInvestimentosDate: `SELECT * FROM TbDespesasStatus WHERE data >= ? and data <= ? and despesa LIKE ('IN-%') ORDER BY data ASC;`,
    selectDespesaStatusDate: `SELECT * FROM TbDespesasStatus WHERE data >= ? and data <= ? ORDER BY data ASC;`,
    insertDespesaStatus:
      "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);",
    updateDespesaStatus:
      "UPDATE TbDespesasStatus SET dtLanc = ?, data = ?, despesa = ?, valor = ?, statusDesp = ? WHERE id=?;",
    updateStatusDespesa:
      "UPDATE TbDespesasStatus SET statusDesp = ? WHERE id = ?;",
    deleteDespesa: "DELETE FROM TbDespesasStatus WHERE id=?;",
    selectEntradaDate:
      "SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ORDER BY data ASC;",
    insertEntrada:
      "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);",
    updateEntrada:
      "UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;",
    deleteEntrada: "DELETE FROM TbEntradas WHERE id=?;",
    /*dataInicioFimDespesas: 'SELECT MIN(data) AS datainicio, MAX(data) AS datafim FROM TbDespesasStatus',
			dataInicioFimEntrada: 'SELECT MIN(data) AS datainicio, MAX(data) AS datafim FROM TbEntradas',*/

    dateInicioFimData:
      "SELECT MIN(desp.data) AS despesainicio, MAX(desp.data) AS despesafim, MIN(ent.data) AS entradainicio, MAX(ent.data) AS entradafim FROM TbDespesasStatus as desp INNER JOIN TbEntradas AS ent",

    data: getLocalJSON,
    /*selecDespesa : 'SELECT * FROM TbDespesas;',
			selectDespesaStatus: 'SELECT * FROM  TbDespesasStatus;',
			selectDespesaPorId: 'SELECT * FROM TbDespesasStatus WHERE id=?;',
			selectDespesaStatusDateValor: 'SELECT valor FROM TbDespesasStatus WHERE data >= ? and data <= ? ;',//EXCLUIR
			dropDespesa: 'DROP TABLE TbDespesas;',
			selectEntrada: 'SELECT * FROM TbEntradas;',
			selectEntradaPorId: 'SELECT * FROM TbEntradas WHERE id=?;',
			selectEntradaDateValor: 'SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ORDER BY data ASC;', //ESCLUIR
			insertDespesaStatus_old: 'INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?); SELECT * FROM TbDespesasStatus WHERE id = SCOPE_IDENTITY();', //EXCLUIR DUPLICADO
			updateEntrada: 'UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;',
			*/

    /*
despesafim:"2023-06-18"
despesainicio:"2018-01-04"

entradafim:"2023-06-18"
entradainicio:"2017-12-31"
			*/
  };

  return query;
});
