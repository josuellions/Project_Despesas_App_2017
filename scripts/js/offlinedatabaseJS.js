/*VARIÁVEIS GLOBAIS*/
/*CONSTANTS QUERY */
const queryAll = {
  selecDesp: 'SELECT * FROM TbDespesas;',
  selectDespStatus: 'SELECT * FROM  TbDespesasStatus;',
  selectDespPorId: "SELECT * FROM TbDespesasStatus WHERE id=?;",
  selectDespStatusDt: 'SELECT * FROM TbDespesasStatus WHERE data >= ? and data <= ? ;',
  dropDesp: 'DROP TABLE TbDespesas;',
  selectEntrada: 'SELECT * FROM TbEntradas;',
  selectEntradaPorId: "SELECT * FROM TbEntradas WHERE id=?;",
  selectEntradaDt: 'SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ;',
  insertDespeStatus: "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);",
  updateStatusDesp: "UPDATE TbDespesasStatus SET statusDesp = ? WHERE id = ?;",
  deleteDesp: "DELETE FROM TbDespesasStatus WHERE id=?;",
  deleteEntrada: "DELETE FROM TbEntradas WHERE id=?;",
  insertDespStatus: "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);",
  insertEntrada: "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);",
  updateDespStatus: "UPDATE TbDespesasStatus SET dtLanc = ?, data = ?, despesa = ?, valor = ?, statusDesp = ? WHERE id=?;",
  updateEntrada: "UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;"
}

// SELECT CAMPO DESPESA PARA UPDATE, TELA ADD DESPESAS
let transfId = null;
let executarConsulta = true;

/*OBJECT DADOS DA VIEW*/
let postItens = {
  id: 0,
  dtID: '',
  itemID: '',
  valID: '',
  msgCampo: '',
  msgBd: '',
  status: true, //true despesas - false Entrada
  query: '',
  tipoView: ''
}

//VARIAVEIS QUERY
let postDados = []
let postMensagem = "";
let postQuery = "";
let resultRowsQuery;

/*OBJECT VIEW BD*/
const baseOnInit = {
  entradaInit: 'entradaInit',
  despesaInit: 'despesaInt',
  visualizarInit: 'visualizarInit',
  relatorioInit: 'relatorioInit'
}
//FIM VARIÁVEIS GLOBAIS

//BANCO DADOS
/*CRIAR PARAMETROS BANCO DADOS*/
let initDB = () => {
  const shortName = 'bdDespesas';
  const version = '1.0';
  const displayName = 'BdGestorDespesas';
  const maxSize = 65536; // Em bytes

  localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

/*CRIAR TABLES NO BANCO DADOS*/
let createTables = () => {
  const criarTb = [
    'CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);',
    'CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);',
    'CREATE TABLE IF NOT EXISTS TbDespesasStatus(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL, statusDesp INT NOT NULL);',
  ];

  criarTb.forEach((query) => {
    try {
      localDB.transaction((transaction) => {
        transaction.executeSql(query, [], nullDataHandler, errorHandler);
      });
    } catch (e) {
      alert("Erro: Data base Tabelas não criada " + e + ".");
      return;
    }
  });
}

/* CRIAR BANCO LOCAL WEB*/
let localDB = null;
let dtMesVerifica = null;

/*CHECK VIEW E BANCO DADOS*/
let onInit = (recebTipoView) => {

  const alertErroNavegador = "Erro: Seu navegador não permite banco de dados.";

  try {

    !window.openDatabase ? alert(alertErroNavegador) : (initDB(), createTables()); //, verifStatus());

    recebTipoView === baseOnInit.entradaInit ? $(document).ready(() => { queryAndUpdateOverviewLancaEntrada(baseOnInit.entradaInit) }) : false
    recebTipoView === baseOnInit.despesaInit ? $(document).ready(() => { queryAndUpdateOverviewLancaDespesas(baseOnInit.despesaInit) }) : false
    recebTipoView === baseOnInit.visualizarInit ? $(document).ready(() => { queryAndUpdateOverviewVizualizarDespesas(baseOnInit.visualizarInit) }) : false
    recebTipoView === baseOnInit.relatorioInit ? $(document).ready(() => { onloadRelatorio() }) : false

  } catch (tipoErro) {
    const alertErroVersaoBd = "Erro: Versão de banco de dados inválida.";
    const alertErroDesconhecido = "Erro: Erro desconhecido: ";

    tipoErro == 2 ? alert(alertErroVersaoBd) : alert(alertErroDesconhecido + tipoErro + ".");

    return;
  }
}

//CHECK POSSUI DADOS NO BANCO
//onInit(this.comp);

/*Executa Query Banco Dados*/
let executaQueryBD = (getQuery, getDados, getMensagem, getstatus) => {
  try {
    localDB.transaction((transaction) => {
      transaction.executeSql(getQuery, getDados, (transaction, results) => {
        !results.rowsAffected ? alert(getMensagem) : false; // getstatus;
      }, errorHandler);
    });
  } catch (e) {
    alert(getMensagem + e + ".");
  }
}

/*EXECUTA QUERY RETONA RESULT DO BANCO*/
let executaQueryVisualizarBD = (getQuery, getDados, executarConsulta) => {
  if (executarConsulta) {
    try {
      setTimeout(() => {
        localDB.transaction(function (transaction) {
          transaction.executeSql(getQuery, getDados, function (transaction, results) {
            resultRowsQuery = results.rows;
            executarConsulta = false;
          }, function (transaction, error) {
            alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
          });
        });
      }, 15);
    } catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
    }
  }
}
//END BANCO DADOS

//#region  olcultarDev

//FUNÇÕES TRATAMENTO DADOS
/* DEFINIR DATA */
let formataData = () => {
  let dt = new Date();
  let dia = dt.getDate();
  let mes = dt.getMonth();
  let ano = dt.getFullYear();

  mes.toString().length < 10 ? mes = + parseInt(mes + 1) : false;

  dia.toString().length == 1 ? dia = '0' + dia : false;
  mes.toString().length == 1 ? mes = '0' + mes : false;

  return [ano, mes, dia].join("-");
}

/*FORMATA DATA CONSULTA BD */
let dtConsultaBD = () => {
  let dtConsulta = {
    inicio: "",
    fim: ""
  }

  let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);
  let dtBaseAno = basemesPag.slice(0, 4);
  let dtBaseMes = basemesPag.slice(5);

  let primeiroDiaMes = new Date(dtBaseAno, dtBaseMes).getDate();
  let ultimoDiaMes = new Date(dtBaseAno, dtBaseMes, 0).getDate();

  dtConsulta.inicio = [dtBaseAno, dtBaseMes, "0" + primeiroDiaMes].join('-');
  dtConsulta.fim = [dtBaseAno, dtBaseMes, ultimoDiaMes].join('-');

  return dtConsulta;
}

/*FORMATA DATA VIEWS */
let fotmatDateView = (dtFull) => {
  return [dtFull.slice(8, 10), dtFull.slice(5, 7)].join("/");
}

/*FORMATA VALOR*/
let formataValor = (valor) => {

  let valorFormatado = null;

  let cont = valor.length > 6 && valor.length < 9 ? valor.length - 6 : false;
  ((valor.length > 6) && (valor.length < 9)) ? valorFormatado = [valor.substr(0, cont), valor.substr(cont++)].join(".") : false

  cont = valor.length > 8 && valor.length < 12 ? valor.length - 9 : false;
  valor.length > 8 && valor.length < 12 ? valorFormatado = [valor.substr(0, 2), valor.substr(2, 3), valor.substr(5)].join(".") : false

  return valorFormatado ? valorFormatado : valor;
}

/*FORMATA VALOR PARA SOMAR*/
let convertSomarValor = (valor) => {
  return parseFloat(valor.replace(",", "."));
}

/*FORMATA VALOR PARA VIEW*/
let convertValorView = (valorView) => {
  return formataValor((valorView).toFixed(2).replace('.', ','));
}

/*CONVERTE CAMPO MÊS*/
let convertMes = () => {
  let retonardt = null;
  let dtbasepag = $("#dtReference").text();
  let dtBasepg = dtbasepag.substr(0, 3);
  let dtBaseAno = dtbasepag.substr(4);

  const mesExt = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  mesExt.forEach((campo, id) => {
    id < 9 ? (id = "0" + ++id) : ++id;
    dtBasepg == campo ? (retonardt = dtBaseAno + "-" + id + "-01") : false
  })
  return $("#comparaDt").html(retonardt);
}

/*BASE MÊS VIEW*/
let basemesPag = () => {
  return $("#comparaDt").text();
}

/*FORMATAR DATA INSERT BASE MÊS ANTERIO*/
let formatDataInsert = () => {

  convertMes();

  let dtConsultaAlt = dtConsultaBD();

  let dtInicio = dtConsultaAlt.inicio;
  let dtFim = dtConsultaAlt.fim;

  let dtDiaInicio = dtInicio.slice(8, 10)
  let dtDiaFim = dtFim.slice(8);
  let dtMes = parseInt(dtInicio.slice(5, 7)) < 11 ? ('0' + (parseInt(dtInicio.slice(5, 7)) - 1)) : dtInicio.slice(5, 7) - 1
  let dtAno = dtInicio.slice(0, 4)

  dtInicio = [dtAno, dtMes, dtDiaInicio].join('-');
  dtFim = [dtAno, dtMes, dtDiaFim].join('-');

  dtConsultaAlt = { inicio: dtInicio, fim: dtFim };

  return dtConsultaAlt;
}
//END FUNÇÃO TRATAMENTO DADOS

//FUNÇÕES LIMPAR DADOS VIEW
/*LIMPAR CAMPOS */
let limparCampos = (campos) => {
  campos.forEach(campo => {
    document.getElementById(campo).value = "";
  });
}

/*LIMPA DADOS DESPESAS*/
let limparDadosDespesas = () => {
  const campos = ['dtDespesa', 'selectDespesas', 'valDespesa'];
  const postCampos = { edit: 'btnDespEdit', salve: 'btnDesp' };// , statusPG: true };

  limparCampos(campos)
  customCssViewPgRemover(postCampos, false)
}

/*LIMPA DADOS ENTRADA*/
let limparDadosEntrada = () => {
  const campos = ['dtEntrada', 'textEntrada', 'valEntrada'];
  const postCampos = { edit: 'btnEntEdit', salve: 'btnEntrada' };//, statusPG: false };

  limparCampos(campos);
  customCssViewPgRemover(postCampos, false)
}

/*LIMPAR DADOS TELA VISUALIZAR */
let limparVisualizarDados = (campos) => {
  campos.forEach(campo => {
    document.getElementById(campo).innerText = "0,00";
  });
}

/*LIMPAR TABLE TELA VISUALIZAR*/
let limparTableVisualizar = (campoID) => {
  $('#' + campoID).remove();
}

/*LIMPAR DADOS RELATÓRIO*/
let limparDadosViewRelatorio = () => {
  $('#valorTotalEnt').html("R$ 0,00").css({ "font-size": "1rem" });
  $('#progressTotal').html("0%").css({ 'width': '0%' });
  limparTableVisualizar('sectionRelatorioGrupo > br')
  limparTableVisualizar('sectionRelatorioGrupo > div')
}

//END FUNÇÕES LIMPAR DADOS VIEW

//VERIFICA TABELA STATUS E REALIZA INSERT
let verifStatus = (idDesp, statusDesp, upStatus) => {
  setTimeout(() => {
    try {
      localDB.transaction((transaction) => {
        transaction.executeSql(queryAll.selecDesp, [], (transaction, results) => {

          localDB.transaction(function (transaction) {
            transaction.executeSql(queryAll.selectDespStatus, [], (transaction, result) => {

              if (results.rows.length > 0 && result.rows.length == 0) {
                results.forEach(item => {
                  insertStatus(item.dtLanc, item.data, item.despesa, item.valor, 0);
                });
                return;

              } else if (upStatus) {

                onUpdateStatusDesp(idDesp, statusDesp);
                return;

              } else if (result.rows.length == results.rows.length) {
                localDB.transaction((transaction) => {
                  transaction.executeSql(query.dropDesp, [], (transaction, result) => {
                    onInit(baseOnInit.despesaInit);
                  });
                });
                return;
              }
            });
          });
        });
      });
    } catch (e) {
      alert('Error: Error tabela despesa, ' + e + '.');
    }
  }, 25);
}

//FUNÇÕES DE RENDERIZAÇÃO DAS VIEWS
/*FUNÇÃO EXIBIR DADOS TELA VISUALIZAR*/
let exibirDadosVisualizar = (campoID, dtFormt, rowDados, rowValor) => {
  $('#' + campoID).append(
    "<tr>" +
    "<td>" + dtFormt + "</td>" +
    "<td>" + rowDados + "</td>" +
    "<td> R$ </td>" +
    '<td style="text-align: right; padding-right: 4%;">' + rowValor + '</td>' +
    "</tr>"
  );
}

//SALVAR STATUS DESPESAS  
let onStatusDesp = (id) => {
  let verif = $('#checkbox' + id).prop('checked');
  verif ? verifStatus(id, 1, true) : verifStatus(id, 0, true)
};

/*EXIBIR DADOS DO BANCO NA VIEW LANÇAMENTOS */
let exibirDadosLancamentosView = (campoID, dadosID, dtFormat, campoNome, valorFormat, acaoStatus, acaoUpdate, acaoDelete) => {
  $('#' + campoID + ' > tbody').append(
    '<tr id="' + dadosID + '">' +
    '<td width="22%" onclick="' + acaoUpdate + '(' + dadosID + ')">' + dtFormat + '</td>' +
    '<td width="48%" onclick="' + acaoUpdate + '(' + dadosID + ')">' + campoNome + '</td>' +
    '<td> R$ </td>' +
    '<td style="text-align: right; padding-right: 4%;" onclick="' + acaoUpdate + '(' + dadosID + ')">' + valorFormat + '</td>' +
    '<td width="5%"><div class="toggle"  id="' + acaoStatus + '"><input type="checkbox" id="checkbox' + dadosID + '" onclick="' + acaoStatus + '(' + dadosID + ')">' +
    '<label for="checkbox' + dadosID + '"></label></div>' +
    '<a id="' + dadosID + '" onclick="' + acaoDelete + '(' + dadosID + ')" hidden><span class="glyphicon glyphicon-trash text-right"></span></a>' +
    '</td></tr>'
  );

  if (acaoStatus == 'onStatusEntrada') {
    $('#' + campoID + '> tbody > tr > td > div').remove();
    $('#' + campoID + '> tbody tr td a').removeAttr('hidden');
  }
}

let exibirDadosRelatorioView = (getDesp, getValor, getColor, getDespPorcentagem) => {
  $('#sectionRelatorioGrupo').append(
    '<div class="col-xs-6 text-left">' +
    '<label for="">' + getDesp + '</label>' +
    '</div>' +
    '<div class="col-xs-6 text-right">' +
    '<label for="">R$ ' + getValor + '</label>' +
    '</div>' +
    '<br />' +
    '<div class="col-xs-12">' +
    '<div class="progress">' +
    '<div class="progress-bar ' + getColor +
    '" role="progressbar" aria-valuenow="' + getDespPorcentagem +
    '" aria-valuemin="0" aria-valuemax="100" style="width:' + getDespPorcentagem +
    '%; color: gray"><strong>' + getDespPorcentagem + '%</strong></div>' +
    '</div>' +
    '</div>' +
    '<br />'
  )
}
//END RENDERIZAÇÃO DAS VIEWS

//FUNÇÕES APLICAR CSS VIEWS
/*APLICA CSS SELECT CAMPO DADOS PARA UPDATE*/
let customCssViewUpdate = (getDados, getBtn, getBtnEdit, getBtnRemover) => {

  getDados.forEach(campo => {
    $('#' + campo.id).val(campo.dado).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
  })

  const postCampos = { edit: getBtnEdit, salve: getBtn };
  customCssViewPgRemover(postCampos, getBtnRemover)
}

//APLICA Css icon REMOVER OU PAGAR
let customCssViewPgRemover = (getCampoID, getStatus) => {
  if (getStatus) {
    $('.despPG').html('Del');
    $('.toggle').css({ 'display': 'none' });
    $('#tbDespesas > tbody > tr > td > a').removeAttr('hidden');
    $('#' + getCampoID.salve).css('display', 'none');
    $('#' + getCampoID.edit).css({ 'display': 'inline-block', 'color': '#337ab7' });
    return;
  } else {

    $('.despPG').html('Pago');
    $('.toggle').css({ 'display': 'block' });
    $('#tbDespesas > tbody > tr > td > a').attr('hidden', true);
    $('#' + getCampoID.edit).css({ 'display': 'none' });
    $('#' + getCampoID.salve).css({ 'display': 'inline' })
  }
}

/*CUSTOM Css VIEW*/
let customCssView = (getCampo, getText, getCss, getParam) => {
  getCampo.forEach(campo => {
    $("#" + campo).html(getText).css(getCss, getParam);
  });
}

/*CUSTOM Css VIEW APPEND*/
let customCssViewAppend = (getCampo, getParam, removeParam) => {
  getCampo.forEach(campo => {
    $("#" + campo).removeClass(removeParam);
    $("#" + campo).addClass(getParam);
  });
}
//END FUNÇÕES CSS

//FUNÇÕES MANIPULAÇÃO DADOS BANCO DADOS E VIEW
/*INSERT STATUS DESPESAS */
let insertStatus = (dtLanc, data, despesa, valor, status) => {

  postDados = [dtLanc, data, despesa, valor, status];
  postMensagem = "Erro: Inserção não realizada ";
  postQuery = queryAll.insertStatus;

  executaQueryBD(postQuery, postDados, postMensagem, false)
}

/*UPDATE STATUS DESPESAS NO DADOS BANCO*/
let onUpdateStatusDesp = (id, status) => {

  postDados = [status, id]
  postMensagem = "Erro: UPDATE não realizado. ";
  postQuery = queryAll.updateStatusDesp;

  executaQueryBD(postQuery, postDados, postMensagem, false)
}

/*REMOVE DADOS BANCO, TELA ADD DESPESAS*/
let onDelete = (id) => {

  if (confirm("Salvar as alterações realizadas ")) {

    postDados = [id]
    postMensagem = "Erro: Delete não realizado. ";
    postQuery = queryAll.deleteDesp;

    executaQueryBD(postQuery, postDados, postMensagem, false); // onInit(baseOnInit.despesaInit))
    limparTableVisualizar(id);
  }
  limparDadosDespesas();
}

/*REMOVER DADOS DO BANCO TELA ENTRADA DE CAIXA*/
let onDeleteEntrada = (id) => {

  if (confirm("Salvar as alterações realizadas ")) {

    postDados = [id]
    postMensagem = "Erro: Delete não realizado. ";
    postQuery = queryAll.deleteEntrada;

    executaQueryBD(postQuery, postDados, postMensagem, false); // onInit(baseOnInit.entradaInit))
    limparTableVisualizar(id)
  }
  limparDadosEntrada();
}

/*EXCULTA QUERY BANCO DADOS DADOS RECEBIDO DA VIEW*/
let executaQueryViewBD = (getItens) => {//, getStatus, getMensagem, getMensagemDB, getQuery ) => {

  let itens = getItens;
  let dtLancamento = formataData();
  let data = $('#' + itens.dtID).val();
  let item = $('#' + itens.itemID).val();
  let valor = $('#' + itens.valID).val();

  if (data == "" || item == "" || valor == null || valor == "" || valor < 0) {

    valor < 0 ? $('#' + itens.valID).select() : alert(itens.msgCampo);

  } else {

    valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

    postDados = [dtLancamento, data, item, valor]
    getItens.status ? postDados.push(0) : false;
    getItens.id ? postDados.push(itens.id) : false;

    executaQueryBD(itens.query, postDados, itens.msgBd, onInit(itens.tipoView));

    limparCampos([itens.itemID, itens.valID]);
    $('#' + itens.dtID).val(formataData()).focus();
  }
}

/*SALVAR DADOS NO BANCO, TELA ADD DESPESAS */
let onCreate = () => {

  postItens.dtID = 'dtDespesa';
  postItens.itemID = 'selectDespesas';
  postItens.valID = 'valDespesa';
  postItens.msgCampo = ' Erro: \'Data\', \'Despesa\' e \'Valor\' são campos obrigatórios! ';
  postItens.msgBd = 'Erro: Inserção não realizada. ';
  postItens.status = true;
  postItens.query = queryAll.insertDespStatus;
  postItens.tipoView = baseOnInit.despesaInit;

  executaQueryViewBD(postItens);
}

/*SALVA DADOS NO BANCO TELA ENTRADA CAIXA*/
let onCreateEntrada = () => {

  postItens.dtID = 'dtEntrada';
  postItens.itemID = 'textEntrada';
  postItens.valID = 'valEntrada';
  postItens.msgCampo = 'Erro: \'Data\', \'Entrada\' e \'Valor\' são campos obrigatórios! ';
  postItens.status = false;
  postItens.msgBd = 'Erro: Inserção não realizada. ';
  postItens.query = queryAll.insertEntrada;
  postItens.tipoView = baseOnInit.entradaInit;

  executaQueryViewBD(postItens)
}
//#endregion

/*CONSULTA BANCO DADOS TELA VISUALIZAR*/
let queryAndUpdateOverviewVizualizarDespesas = () => {

  //CONSULTA BANCO DADOS DESPESAS PARA VIEW VISUALIZAR
  setTimeout(() => {
    convertMes();

    let dtConsulta = dtConsultaBD();
    let somaDespesaVisualizar = 0.0;

    postDados = [dtConsulta.inicio, dtConsulta.fim]
    postQuery = queryAll.selectDespStatusDt;

    /*Consulta e Retorna dados do Banco*/
    executaQueryVisualizarBD(postQuery, postDados, true)

    /*Exibir dados Despesas na View*/
    const camposDesp = ['totalDespesas', 'calculototalDespesas', 'totalDespesas']
    limparTableVisualizar('visualizaDesp  > tr');
    limparVisualizarDados(camposDesp)
    somaDespesaVisualizar = 0.0;

    setTimeout(() => {
      const resultConsultaBD = resultRowsQuery;
      if (resultConsultaBD.length > 0) {
        $.each(resultConsultaBD, (id, row) => {
          exibirDadosVisualizar('visualizaDesp', fotmatDateView(row.data), row.despesa, formataValor(row.valor));
          somaDespesaVisualizar += parseFloat(row.valor.replace(",", "."));
          valorFormatDespVisualiza = formataValor((somaDespesaVisualizar).toFixed(2).replace('.', ','));
          customCssView(['totalDespesas', 'calculototalDespesas'], valorFormatDespVisualiza, "text-align", "right");
        });
      }
    }, 50);

    //CONSULTA BANCO DADOS ENTRADA PARA VIEW VISUALIZAR
    setTimeout(() => {
      let valorFormatResult;
      let somaEntrada = 0.0;
      let somaResult = 0.0;

      const camposEntrada = ['totalEntrada', 'calculototalEntrada', 'calculosomaGeral'];
      const camposTotal = ['saldoGeral', 'simboloMoeda', 'calculosomaGeral'];
      limparTableVisualizar('visualizaEntrada > tr');
      limparVisualizarDados(camposEntrada);
      somaEntrada = 0.0;

      postQuery = queryAll.selectEntradaDt;
      executaQueryVisualizarBD(postQuery, postDados, true)

      setTimeout(() => {
        const resultConsultaBD = resultRowsQuery;
        if (resultConsultaBD.length > 0) {
          $.each(resultConsultaBD, (id, row) => {
            somaEntrada += parseFloat(row.valor.replace(",", "."));
            exibirDadosVisualizar('visualizaEntrada', fotmatDateView(row.data), row.entrada, formataValor(row.valor));

            somaResult = somaEntrada - somaDespesaVisualizar;
            somaResult = formataValor((somaResult).toFixed(2).replace('.', ','));
            valorFormatResult = formataValor((somaEntrada).toFixed(2).replace('.', ','));

            customCssViewAppend(camposTotal, 'colorTotalViewPositivo', 'colorTotalViewNegativo')
            customCssView(['totalEntrada', 'calculototalEntrada'], valorFormatResult, 'text-align', 'right');
            customCssView(['calculosomaGeral'], somaResult, 'text-align', 'right');
          });
          if (parseInt(somaResult) <= 0) {
            customCssViewAppend(camposTotal, 'colorTotalViewNegativo', 'colorTotalViewPositivo')
          }
        }
      }, 100);
    }, 150);
  }, 25);
}

/*CONFIRMA COPY MÊS ANTERIOR*/
let confirmarCopyMesAnterior = (getQuery, copyConfirmar, getTipoView) => {
  !copyConfirmar ? copyConfirmar = confirm("Adicionar laçamentos com base no mês anterior?") : false;
  copyConfirmar ? insertMesBaseAnterior(basemesPag(), getQuery, getTipoView) : false;
}

/*CONSULTA BANCO DADOS, CRIA NOVAS LINHAS NA TABELA, VIEW ADD DESPESAS.*/
let queryAndUpdateOverviewLancaDespesas = () => {

  setTimeout(() => {
    convertMes();

    let somaDespesa = 0.0;
    const dtConsulta = dtConsultaBD();

    postDados = [dtConsulta.inicio, dtConsulta.fim];
    postQuery = queryAll.selectDespStatusDt;

    executaQueryVisualizarBD(postQuery, postDados, true)

    limparTableVisualizar('tbDespesas > tbody > tr');

    setTimeout(() => {
      const resulConsulta = resultRowsQuery;
      if (resulConsulta.length > 0) {
        $.each(resulConsulta, (id, row) => {
          exibirDadosLancamentosView('tbDespesas', row.id, fotmatDateView(row.data), row.despesa, formataValor(row.valor), 'onStatusDesp', 'onUpdateDesp', 'onDelete')
          row.statusDesp == 1 ? $('#checkbox' + row.id).prop({ 'checked': true }) : $('#checkbox' + row.id).prop('checked', false);
          somaDespesa += parseFloat(row.valor.replace(",", "."));
        });
      } else {
        confirmarCopyMesAnterior(postQuery, false, true);
      }
      $("#somaDespesas").html(formataValor((somaDespesa).toFixed(2).replace('.', ',')));
    }, 50);
  }, 25);
}

/*EXIBIR DADOS NOS CAMPO PARA UPDATE VIEW DESPESAS*/
let onUpdateDesp = (id) => {

  convertMes();

  postDados = [id]
  postQuery = queryAll.selectDespPorId;
  executaQueryVisualizarBD(postQuery, postDados, true)

  setTimeout(() => {
    const row = resultRowsQuery[0];
    transfId = row.id;

    const CamposUpdate = [{ id: 'dtDespesa', dado: row.data },
    { id: 'selectDespesas', dado: row.despesa },
    { id: 'valDespesa', dado: row.valor }];
    customCssViewUpdate(CamposUpdate, 'btnDesp', 'btnDespEdit', true);
  }, 100);
}

/*UPDATE NO DADOS BANCO, VIEW ADD DESPESAS*/
let onUpdateDespBd = (() => {
  if (confirm("Salvar as alterações realizadas ")) {
    postItens.id = transfId;
    postItens.dtID = 'dtDespesa';
    postItens.itemID = 'selectDespesas';
    postItens.valID = 'valDespesa';
    postItens.msgCampo = ' Erro: \'Data\', \'Despesa\' e \'Valor\' são campos obrigatórios! ';
    postItens.msgBd = 'Erro: Falha ao  inserir daodos! ';
    postItens.status = true;
    postItens.query = queryAll.updateDespStatus;
    postItens.tipoView = baseOnInit.despesaInit;

    executaQueryViewBD(postItens);
    limparTableVisualizar('tbDespesas > tbody > tr');
  }
  limparDadosDespesas();
});

/*CONSULTA BANCO DADOS, EXIBI DADOS VIEW ENTRADA CAIXA.*/
let queryAndUpdateOverviewLancaEntrada = (verif) => {
  setTimeout(() => {

    convertMes();

    let somaEntrada = 0.00;
    const dtConsulta = dtConsultaBD();

    postDados = [dtConsulta.inicio, dtConsulta.fim];
    postQuery = queryAll.selectEntradaDt;

    executaQueryVisualizarBD(postQuery, postDados, true)

    limparTableVisualizar('tbEntrada > tbody > tr');

    setTimeout(() => {
      const resultConsultaBD = resultRowsQuery;
      if (resultConsultaBD.length > 0) {
        $.each(resultRowsQuery, (id, row) => {
          exibirDadosLancamentosView('tbEntrada', row.id, fotmatDateView(row.data), row.entrada, formataValor(row.valor), 'onStatusEntrada', 'onUpdateEnt', 'onDeleteEntrada');
          somaEntrada += parseFloat(row.valor.replace(",", "."));
        });
      } else {
        confirmarCopyMesAnterior(postQuery, false, false);
      }

      let valorFormatEntrada = formataValor((somaEntrada).toFixed(2).replace('.', ','));

      $("#somaEntrada").html(valorFormatEntrada);

    }, 50);
  }, 25);
}

/*EXIBIR DADOS CAMPO PARA UPDATE VIEW ENTRADA DE CAIXA*/
let onUpdateEnt = (id) => {

  convertMes();

  postDados = [id];
  postQuery = queryAll.selectEntradaPorId

  executaQueryVisualizarBD(postQuery, postDados, true)

  setTimeout(() => {
    const row = resultRowsQuery[0];
    transfId = row.id;

    const CamposUpdate = [{ id: 'dtEntrada', dado: row.data },
    { id: 'textEntrada', dado: row.entrada },
    { id: 'valEntrada', dado: row.valor }];
    customCssViewUpdate(CamposUpdate, 'btnEntrada', 'btnEntEdit', true)
  }, 100)
}

/*UPDATE SALVAR NO DADOS BANCO, TELA ENTRADA RECEITA CAIXA */
let onUpdateEntBd = () => {
  if (confirm("Salvar as alterações realizadas ")) {
    postItens.id = transfId;
    postItens.dtID = 'dtEntrada';
    postItens.itemID = 'textEntrada';
    postItens.valID = 'valEntrada';
    postItens.msgCampo = ' Erro: \'Data\', \'Receita Caixa\' e \'Valor\' são campos obrigatórios! ';
    postItens.msgBd = 'Erro: Falha ao  inserir daodos! ';
    postItens.status = false;
    postItens.query = queryAll.updateEntrada;
    postItens.tipoView = baseOnInit.entradaInit;

    executaQueryViewBD(postItens);
    limparTableVisualizar('tbEntrada > tbody > tr');
  }
  limparDadosEntrada();
};
//END MANIPULAR DADOS VIEWS

// // 3. FUNÇAO DE TRATAMENTO E STATUS.  

// Tratando erros
errorHandler = function (transaction, error) {
  alert("Erro: " + error.message);
  return true;
}
nullDataHandler = function (transaction, results) {
}

/*SELECT E INSERT DADOS NO BANCO COM BASE MÊS ANTERIOR*/
let insertMesBaseAnterior = (dados, getQuery, getView) => { /////EDITANDO

  convertMes();

  let dtConsulta = formatDataInsert();

  postMensagem = "Erro: Inserção não realizada. ";
  postDados = [dtConsulta.inicio, dtConsulta.fim]
  postQuery = getQuery;

  executaQueryVisualizarBD(postQuery, postDados, true)

  getView ? postQuery = queryAll.insertDespStatus : postQuery = queryAll.insertEntrada;

  setTimeout(() => {
    const resultConsultaBD = resultRowsQuery;
    if (getView) {
      $.each(resultConsultaBD, (id, row) => {
        postDados = [formataData(), dados, row.despesa, row.valor, 0];
        executaQueryBD(postQuery, postDados, postMensagem, onInit(baseOnInit.despesaInit));
      });
      return;
    } else {
      console.log("Ent")
      $.each(resultConsultaBD, (id, row) => {
        postDados = [formataData(), dados, row.entrada, row.valor];
        executaQueryBD(postQuery, postDados, postMensagem, onInit(baseOnInit.entradaInit));
      });
    }
  }, 100);
}

/*RELATÓRIO GRAFICO */ //-  REFATORANDO 09 - 12 - 2018 - PAROU AQUI
let onloadRelatorio = () => {

  limparDadosViewRelatorio();

  setTimeout(() => {
    convertMes()

    let somaValor = 0;
    let porcentagem = 0;
    let convertValor = 0;
    let porcentagemEnt = 0;
    let porcentagemDesp = 0;
    const dtConsulta = dtConsultaBD();

    const colorProgressBar = {
      1: "progress-bar-success", 2: "progress-bar-info",
      3: "progress-bar-primary", 4: "progress-bar-warning",
      5: "progress-bar-danger"
    }

    let defineColorProgressBar = (porcentagemDesp) => {
      if (porcentagemDesp <= 5) {
        return colorProgressBar[1];
      }
      else if (porcentagemDesp > 5 && porcentagemDesp <= 10) {
        return colorProgressBar[2];

      } else if (porcentagemDesp > 10 && porcentagemDesp <= 20) {
        return colorProgressBar[3];

      } else if (porcentagemDesp > 20 && porcentagemDesp <= 30) {
        return colorProgressBar[4];

      } else if (porcentagemDesp >= 30) {
        return colorProgressBar[5];
      }
    }

    let verifProcentagem = (dados) => {
      return dados != 0 ? true : false;
    }

    let calculaPorcentgem = (valor) => {
      return (parseFloat(valor) * (100 / somaValor));
    }

    postDados = [dtConsulta.inicio, dtConsulta.fim]
    postQuery = { queryEntrada: queryAll.selectEntradaDt, queryDesp: queryAll.selectDespStatusDt }
    executaQueryVisualizarBD(postQuery.queryEntrada, postDados, true);

    setTimeout(() => {
      const resultConsultaBD = resultRowsQuery;
      if (resultConsultaBD.length > 0) {
        $.each(resultConsultaBD, (id, row) => {
          somaValor += convertSomarValor(row.valor)
        });
      }
    }, 50);

    setTimeout(() => {
      executaQueryVisualizarBD(postQuery.queryDesp, postDados, true);

      setTimeout(() => {
        const resultConsultaBD = resultRowsQuery;
        if (resultConsultaBD.length > 0) {
          $.each(resultConsultaBD, (id, row) => {

            porcentagemDesp = calculaPorcentgem(row.valor);
            porcentagem += porcentagemDesp;

            verifProcentagem(porcentagem % 2) ? porcentagemEnt = porcentagem.toFixed(2) : porcentagemEnt = porcentagem;
            verifProcentagem(porcentagemDesp % 2) ? porcentagemDesp = porcentagemDesp.toFixed(2) : false;

            convertValor = convertValorView(somaValor);

            $('#valorTotalEnt').html("R$ " + convertValor).css({ "font-size": ".7rem" });
            $('#progressTotal').html(porcentagemEnt + "%").css({ 'width': porcentagemEnt + '%' })

            exibirDadosRelatorioView(row.despesa, formataValor(row.valor), defineColorProgressBar(porcentagemDesp), porcentagemDesp);

          });
        }
      }, 100);
    }, 75);
  }, 25);
}  //1222