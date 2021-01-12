/*VARIÁVEIS GLOBAIS*/

/*CONSTANTS QUERY */
const queryAll = {
  selecDesp: "SELECT * FROM TbDespesas;",
  selectDespStatus: "SELECT * FROM  TbDespesasStatus",
  selectDespPorId: "SELECT * FROM TbDespesasStatus WHERE id=?;",
  selectDespStatusDt:
    "SELECT * FROM TbDespesasStatus WHERE data >= ? and data <= ? ORDER BY data ASC ;",
  selectDespStatusDtValor:
    "SELECT valor FROM TbDespesasStatus WHERE data >= ? and data <= ? ;",
  dropDesp: "DROP TABLE TbDespesas;",
  selectEntrada: "SELECT * FROM TbEntradas;",
  selectEntradaPorId: "SELECT * FROM TbEntradas WHERE id=?;",
  selectEntradaDt:
    "SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ORDER BY data ASC;",
  selectEntradaDtValor:
    "SELECT * FROM TbEntradas WHERE data >= ? and data <= ? ORDER BY data ASC;",
  insertDespeStatus:
    "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);",
  updateStatusDesp: "UPDATE TbDespesasStatus SET statusDesp = ? WHERE id = ?;",
  deleteDesp: "DELETE FROM TbDespesasStatus WHERE id=?;",
  deleteEntrada: "DELETE FROM TbEntradas WHERE id=?;",
  insertDespStatus:
    "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);",
  insertEntrada:
    "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);",
  updateDespStatus:
    "UPDATE TbDespesasStatus SET dtLanc = ?, data = ?, despesa = ?, valor = ?, statusDesp = ? WHERE id=?;",
  updateEntrada:
    "UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;",
};

// SELECT CAMPO DESPESA PARA UPDATE, TELA ADD DESPESAS
let transfId = null;
let executarConsulta = true;

/*OBJECT DADOS DA VIEW*/
let postItens =  {
  id: 0,
  dtID: "",
  itemID: "",
  valID: "",
  msgCampo: "",
  msgBd: "",
  status: true, //true despesas - false Entrada
  query: "",
  tipoView: "",
};

//VARIAVEIS QUERY
let postDados = [];
let postMensagem = "";
let postQuery = "";
let resultRowsQuery = null;

/*OBJECT VIEW BD*/
const baseOnInit = {
  entradaInit: "entradaInit",
  despesaInit: "despesaInt",
  visualizarInit: "visualizarInit",
  relatorioInit: "relatorioInit",
};
//FIM VARIÁVEIS GLOBAIS

//BANCO DADOS
/*CRIAR PARAMETROS BANCO DADOS*/
const initDB = () => {
  const shortName = "bdDespesas";
  const version = "1.0";
  const displayName = "BdGestorDespesas";
  const maxSize = 65536; // Em bytes

  localDB = window.openDatabase(shortName, version, displayName, maxSize);
};

/*CRIAR TABLES NO BANCO DADOS*/
const createTables = () => {
  const criarTb = [
    "CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);",
    "CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);",
    "CREATE TABLE IF NOT EXISTS TbDespesasStatus(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL, statusDesp INT NOT NULL);",
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
};

/* CRIAR BANCO LOCAL WEB*/
let localDB = null;
let dtMesVerifica = null;

/*CHECK VIEW E BANCO DADOS*/

const Views = {
  entradaInit() {
    return queryAndUpdateOverviewLancaEntrada(baseOnInit.entradaInit);
  },
  despesaInt() {
    return queryAndUpdateOverviewLancaDespesas(baseOnInit.despesaInit);
  },
  visualizarInit () {
    return queryAndUpdateOverviewVizualizarDespesas(baseOnInit.visualizarInit);
  },
  relatorioInit() {
    return onloadRelatorio();
  }
}

const onInit = async (recebTipoView) => {
  
  const alertErroNavegador = "Erro: Seu navegador não permite banco de dados.";

  try {
    if(parseInt(recebTipoView) == 0){
      return
    }

    !window.openDatabase
      ? alert(alertErroNavegador)
      : (initDB(), createTables()); //, verifStatus());

    const selectView = Views[recebTipoView];

    await $(() => {
      selectView()
    })
          
  } catch (tipoErro) {
    const alertErroVersaoBd = "Erro: Versão de banco de dados inválida.";
    const alertErroDesconhecido = "Erro: Erro desconhecido: ";

    if(tipoErro == 2){
      alert(alertErroVersaoBd)
      return;
    }
    
    alert(alertErroDesconhecido + tipoErro + ".");

    return;
  }
};

//CHECK POSSUI DADOS NO BANCO
//onInit(this.comp);

/*Executa Query Banco Dados*/
const executaQueryBD = (getQuery, getDados, getMensagem, getstatus) => {
  try {
    localDB.transaction((transaction) => {
      transaction.executeSql(
        getQuery,
        getDados,
        (transaction, results) => {
          !results.rowsAffected ? alert(getMensagem) : false; // getstatus;
        },
        errorHandler
      );
    });
  } catch (e) {
    alert(getMensagem + e + ".");
  }
};

const SetResultRowsQuery = (data) => {
  resultRowsQuery =  data;
}

/*EXECUTA QUERY RETONA RESULT DO BANCO*/
const executaQueryVisualizarBD = async (getQuery, getDados, executarConsulta) => {
  resultRowsQuery = null;

  if (executarConsulta) {
    try {
      //setTimeout(() => {
       await localDB.transaction(function (transaction) {
            transaction.executeSql(
            getQuery,
            getDados,
            function  (_, results) {
              executarConsulta = false;
              return SetResultRowsQuery(results.rows);
            },
            function (_, error) {
              alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
            }
          );
          return
        });
      //}, 15);
    } catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
    }
  }
  return;
};
//END BANCO DADOS

//FUNÇÕES TRATAMENTO DADOS

const mesExtObj = {
  JAN(){
    return "01";
  },
  FEV(){
    return "02";
  },
  MAR(){
    return "03";
  },
  ABR(){
    return "04";
  },
  MAI(){
    return "05";
  },
  JUN(){
    return "06";
  },
  JUL(){
    return "07";
  },
  AGO(){
    return "08";
  },
  SET(){
    return "08";
  },
  OUT(){
    return "10";
  },
  NOV(){
    return "11";
  },
  DEZ(){
    return "12";
  }
};

const mesExt = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

/* DEFINIR DATA */
const formataData = () => {
  let dt = new Date();
  let dia = dt.getDate();
  let mes = dt.getMonth();
  let ano = dt.getFullYear();

  mes = parseInt(mes) < 11 ? `${+parseInt(mes + 1)}` : mes;

  dia = parseInt(dia) < 10 ? `0${dia}` : dia;
  mes = parseInt(mes) < 10 ? `0${mes}` : mes;

  return [ano, mes, dia].join("-");
};

/*FORMATA DATA CONSULTA BD */
const dtConsultaBD = () => {
  let dtConsulta = {
    inicio: "",
    fim: "",
  };

  const DtBaseAtual = new Date();
  const comparaDtbase = document.getElementById("comparaDt");
  const DtBaseAnoMesAtual = [ DtBaseAtual.getFullYear(),mesExt[DtBaseAtual.getMonth()]].join('-');

  const basemesPag = comparaDtbase == null ? DtBaseAnoMesAtual : comparaDtbase.innerText.slice(0, 8);
  const dtBaseAno = basemesPag.split('-')[0];
  const dtBaseMesStr =  basemesPag.split('-')[1];
  
  const formatDtBaseMes = mesExtObj[dtBaseMesStr];
  const dtBaseMes = formatDtBaseMes();

  const primeiroDiaMes = new Date(dtBaseAno, dtBaseMes + 1).getDate();
  const ultimoDiaMes = new Date(dtBaseAno, dtBaseMes, 0).getDate();

  dtConsulta.inicio = [dtBaseAno, dtBaseMes, `0${primeiroDiaMes}`].join("-");
  dtConsulta.fim = [dtBaseAno, dtBaseMes, ultimoDiaMes].join("-");

  return dtConsulta;
};

/*FORMATA DATA VIEWS */
const fotmatDateView = (dtFull) => {
  return [dtFull.slice(8, 10), dtFull.slice(5, 7)].join("/");
};

/*FORMATA VALOR*/
const formataValor = (valor) => {
  let valorFormatado = null;

  let cont = valor.length > 6 && valor.length < 9 ? valor.length - 6 : false;
  valor.length > 6 && valor.length < 9
    ? (valorFormatado = [valor.substr(0, cont), valor.substr(cont++)].join("."))
    : false;

  cont = valor.length > 8 && valor.length < 12 ? valor.length - 9 : false;
  valor.length > 8 && valor.length < 12
    ? (valorFormatado = [
        valor.substr(0, 2),
        valor.substr(2, 3),
        valor.substr(5),
      ].join("."))
    : false;

  return valorFormatado ? valorFormatado : valor;
};

/*FORMATA VALOR PARA SOMAR*/
const convertSomarValor = (valor) => {
  return parseFloat(valor.replace(",", "."));
};

/*FORMATA VALOR PARA VIEW*/
const convertValorView = (valorView) => {
  return formataValor(valorView.toFixed(2).replace(".", ","));
};

/*CONVERTE CAMPO MÊS*/
const convertMes = () => {
  let dtbasepag = $("#dtReference").html();
  
  if(dtbasepag == null){
    const retonardt = formataData(); 
    $("#comparaDt").html(retonardt);
    return  retonardt; 
  }

  const dtBaseMes = dtbasepag.split('/')[0];
  const dtBaseAno = dtbasepag.split('/')[1];
  
  const retonardt = [dtBaseAno, mesExtObj[dtBaseMes],'01'].join('-');
  $("#comparaDt").html(retonardt);

  return retonardt;
};

/*BASE MÊS VIEW*/
const basemesPag = () => {
  return $("#comparaDt").text();
};

/*FORMATAR DATA INSERT BASE MÊS ANTERIO*/
const formatDataInsert = () => {
  convertMes();

  let dtConsultaAlt = dtConsultaBD();
  

  let dtInicio = dtConsultaAlt.inicio;
  let dtFim = dtConsultaAlt.fim;

  let dtDiaInicio = dtInicio.slice(8, 10);
  let dtDiaFim = dtFim.slice(8);
  let dtMes =
    parseInt(dtInicio.slice(5, 7)) < 11
      ? "0" + (parseInt(dtInicio.slice(5, 7)) - 1)
      : dtInicio.slice(5, 7) - 1;
  let dtAno = dtInicio.slice(0, 4);

  dtMes == 00 ? ((dtMes = 12), (dtAno = dtAno - 1)) : false;

  dtInicio = [dtAno, dtMes, dtDiaInicio].join("-");
  dtFim = [dtAno, dtMes, dtDiaFim].join("-");

  dtConsultaAlt = { inicio: dtInicio, fim: dtFim };
  
  return dtConsultaAlt;
};
//END FUNÇÃO TRATAMENTO DADOS

//FUNÇÕES LIMPAR DADOS VIEW
/*LIMPAR CAMPOS */
const limparCampos = (campos) => {
  campos.forEach((campo) => {
    document.getElementById(campo).value = "";
  });
};

/*LIMPA DADOS DESPESAS*/
const limparDadosDespesas = () => {
  const campos = ["dtDespesa", "selectDespesas", "valDespesa"];
  const postCampos = { edit: "btnDespEdit", salve: "btnDesp" }; // , statusPG: true };

  limparCampos(campos);
  customCssViewPgRemover(postCampos, false);
};

/*LIMPA DADOS DESPESAS UPDATE*/
const limparDadosDespesasUpdate = () => {
  const campos = ["selectDespesas", "valDespesa"];
  const postCampos = { edit: "btnDespEdit", salve: "btnDesp" }; // , statusPG: true };

  limparCampos(campos);
  customCssViewPgRemover(postCampos, false);
};

/*LIMPA DADOS ENTRADA*/
const limparDadosEntrada = () => {
  const campos = ["dtEntrada", "textEntrada", "valEntrada"];
  const postCampos = { edit: "btnEntEdit", salve: "btnEntrada" }; //, statusPG: false };

  limparCampos(campos);
  customCssViewPgRemover(postCampos, false);
};

/*LIMPA DADOS ENTRADA UPDATE*/
const limparDadosEntradaUpdate = () => {
  const campos = ["textEntrada", "valEntrada"];
  const postCampos = { edit: "btnEntEdit", salve: "btnEntrada" }; //, statusPG: false };

  limparCampos(campos);
  customCssViewPgRemover(postCampos, false);
};

/*LIMPAR DADOS TELA VISUALIZAR */
const limparVisualizarDados = (campos) => {
  campos.forEach((campo) => {
    document.getElementById(campo).innerText = "0,00";
  });
};

/*LIMPAR TABLE TELA VISUALIZAR*/
const limparTableVisualizar = (campoID) => {
  $(`#${campoID}`).remove();
};

/*LIMPAR DADOS RELATÓRIO*/
const limparDadosViewRelatorio = () => {
  $("#valorTotalEnt").html("R$ 0,00").css({ "font-size": "1rem" });
  $("#progressTotal").html("0%").css({ width: "0%" });
  limparTableVisualizar("sectionRelatorioGrupo > br");
  limparTableVisualizar("sectionRelatorioGrupo > div");
};
//END FUNÇÕES LIMPAR DADOS VIEW

//FUNÇÕES DE RENDERIZAÇÃO DAS VIEWS
/*FUNÇÃO EXIBIR DADOS TELA VISUALIZAR*/
const exibirDadosVisualizar = (campoID, dtFormt, rowDados, rowValor) => {
  $("#" + campoID).append(
    "<tr>" +
      "<td>" +
      dtFormt +
      "</td>" +
      "<td>" +
      rowDados +
      "</td>" +
      "<td> R$ </td>" +
      '<td style="text-align: right; padding-right: 4%;">' +
      rowValor +
      "</td>" +
      "</tr>"
  );
};

//SALVAR STATUS DESPESAS
const onStatusDesp = (id) => {
  const verif = $("#checkbox" + id).prop("checked");
  // verif ? verifStatus(id, 1, true) : verifStatus(id, 0, true)
  verif ? onUpdateStatusDesp(id, 1) : onUpdateStatusDesp(id, 0);
};

/*ALTERAR TEXTO VIEW*/
const customTextView = (getCampo, getText) => {
  getCampo.forEach((campo) => {
    $("#" + campo).html(getText);
  });
};

/*EXIBIR DADOS DO BANCO NA VIEW LANÇAMENTOS */
const exibirDadosLancamentosView = (
  campoID,
  dadosID,
  dtFormat,
  campoNome,
  valorFormat,
  acaoStatus,
  acaoUpdate,
  acaoDelete
) => {
  $("#" + campoID + " > tbody").append(
    '<tr class="remover-animado" id="' +
      dadosID +
      '">' +
      '<td width="22%" onclick="' +
      acaoUpdate +
      "(" +
      dadosID +
      ')">' +
      dtFormat +
      "</td>" +
      '<td width="48%" onclick="' +
      acaoUpdate +
      "(" +
      dadosID +
      ')">' +
      campoNome +
      "</td>" +
      "<td> R$ </td>" +
      '<td style="text-align: right; padding-right: 4%;" onclick="' +
      acaoUpdate +
      "(" +
      dadosID +
      ')">' +
      valorFormat +
      "</td>" +
      '<td width="5%"><div class="toggle"  id="' +
      acaoStatus +
      '"><input type="checkbox" id="checkbox' +
      dadosID +
      '" onclick="' +
      acaoStatus +
      "(" +
      dadosID +
      ')">' +
      '<label for="checkbox' +
      dadosID +
      '"></label></div>' +
      '<a id="' +
      dadosID +
      '" onclick="' +
      acaoDelete +
      "(" +
      dadosID +
      ')" hidden><span class="glyphicon glyphicon-trash text-right"></span></a>' +
      "</td></tr>"
  );

  if (acaoStatus == "onStatusEntrada") {
    $("#" + campoID + "> tbody > tr > td > div").remove();
    $("#" + campoID + "> tbody tr td a").removeAttr("hidden");
  }
};

const exibirDadosRelatorioView = (
  getDesp,
  getValor,
  getColor,
  getDespPorcentagem
) => {
  $("#sectionRelatorioGrupo").append(
    '<div class="col-xs-6 text-left">' +
      '<label for="">' +
      getDesp +
      "</label>" +
      "</div>" +
      '<div class="col-xs-6 text-right">' +
      '<label for="">R$ ' +
      getValor +
      "</label>" +
      "</div>" +
      "<br />" +
      '<div class="col-xs-12">' +
      '<div class="progress">' +
      '<div class="progress-bar ' +
      getColor +
      '" role="progressbar" aria-valuenow="' +
      getDespPorcentagem +
      '" aria-valuemin="0" aria-valuemax="100" style="width:' +
      getDespPorcentagem +
      '%; color: gray"><strong>' +
      getDespPorcentagem +
      "%</strong></div>" +
      "</div>" +
      "</div>" +
      "<br />"
  );
};
//END RENDERIZAÇÃO DAS VIEWS

//FUNÇÕES APLICAR CSS VIEWS
/*APLICA CSS SELECT CAMPO DADOS PARA UPDATE*/
const customCssViewUpdate = (getDadosCSS, getBtn, getBtnEdit, getBtnRemover) => {
  getDadosCSS.forEach((campo) => {
    $("#" + campo.id)
      .val(campo.dado)
      .css({ "border-color": "#337ab7", color: "#337ab7" });
  });

  const postCampos = { edit: getBtnEdit, salve: getBtn };
  customCssViewPgRemover(postCampos, getBtnRemover);
};

//APLICA Css icon REMOVER OU PAGAR
const customCssViewPgRemover = (getCampoID, getStatus) => {
  if (getStatus) {
    $(".despPG").html("Del");
    $(".toggle").css({ display: "none" });
    $("#tbDespesas > tbody > tr > td > a").removeAttr("hidden");
    $("#" + getCampoID.salve).css("display", "none");
    $("#" + getCampoID.edit).css({ display: "inline-block", color: "#337ab7" });
    return;
  } 

    $(".despPG").html("Pago");
    $(".toggle").css({ display: "block" });
    $("#tbDespesas > tbody > tr > td > a").attr("hidden", true);
    $("#" + getCampoID.edit).css({ display: "none" });
    $("#" + getCampoID.salve).css({ display: "inline" });
  
};

/*CUSTOM Css VIEW*/
const customCssView = (getCampo, getText, getCss, getParam) => {
  getCampo.forEach((campo) => {
    $("#" + campo)
      .html(getText)
      .css(getCss, getParam);
  });
};

/*CUSTOM Css VIEW APPEND*/
const customCssViewAppend = (getCampo, getParam, removeParam) => {
  getCampo.forEach((campo) => {
    $("#" + campo).removeClass(removeParam);
    $("#" + campo).addClass(getParam);
  });
};

const customCssAddClass = (id, classCss) => {
  $("#" + id).addClass(classCss);
};
//END FUNÇÕES CSS

//FUNÇÕES MANIPULAÇÃO DADOS BANCO DADOS E VIEW

/*REMOVER DADOS SEM RENDERIZAR VIEW*/
let somaValorView = 0.0;
const somarTotalValor = async (tipoView) => {
  postQuery = '';
  convertMes();

  let dtConsulta = dtConsultaBD();
  postDados = [dtConsulta.inicio, dtConsulta.fim];
  postMensagem = "Erro: Select não realizado. ";
  tipoView
    ? (postQuery = queryAll.selectDespStatusDtValor)
    : (postQuery = queryAll.selectEntradaDtValor);

    
    //setTimeout(() => {
  const ExibirResultadoConsulta = () => { 
    
    executaQueryVisualizarBD(postQuery, postDados, true);
    
    let resultConsulta = resultRowsQuery;
    
    if (resultConsulta.length > 0) {
      $.each(resultConsulta, (id, row) => {
        somaValorView += convertSomarValor(row.valor);
      });
    }
  }
  //}, 25);
  await ExibirResultadoConsulta();
};

/*UPDATE STATUS PAGO VIEW DESPESAS SALVA NO DADOS BANCO*/
const onUpdateStatusDesp = (id, status) => {
  postDados = [status, id];
  postMensagem = "Erro: UPDATE não realizado. ";
  postQuery = queryAll.updateStatusDesp;

  executaQueryBD(postQuery, postDados, postMensagem, false); //onInit(baseOnInit.despesaInit))
};

/*REMOVE DADOS BANCO, TELA ADD DESPESAS*/
const onDelete = async (id) => {
  if (confirm("Salvar as alterações realizadas ")) {
    await customCssAddClass(id, "ng-leave-active");
    postQuery = '';
    postDados = [id];
    postMensagem = "Erro: Delete não realizado. ";
    postQuery = queryAll.deleteDesp;

    await executaQueryBD(postQuery, postDados, postMensagem, false); // onInit(baseOnInit.despesaInit))
    await somarTotalValor(true);

    //setTimeout(() => {
      await limparTableVisualizar(id);
      await customTextView(["somaDespesas"], convertValorView(somaValorView));
    //}, 1600);
  }
  await limparDadosDespesasUpdate();
};

/*REMOVER DADOS DO BANCO TELA ENTRADA DE CAIXA*/
const onDeleteEntrada = async (id) => {
  if (confirm("Salvar as alterações realizadas ")) {
    await customCssAddClass(id, "ng-leave-active");
    postQuery = '';
    postDados = [id];
    postMensagem = "Erro: Delete não realizado. ";
    postQuery = queryAll.deleteEntrada;

    await executaQueryBD(postQuery, postDados, postMensagem, false); //onInit(baseOnInit.entradaInit))
    await somarTotalValor(false);

    //setTimeout(() => {
     await limparTableVisualizar(id);
     await customTextView(["somaEntrada"], convertValorView(somaValorView));
    //}, 1600);
  }
  await limparDadosEntradaUpdate();
};

/*EXCULTA QUERY BANCO DADOS DADOS RECEBIDO DA VIEW*/
const executaQueryViewBD = async (getItens) => {
  //, getStatus, getMensagem, getMensagemDB, getQuery ) => {

  let itens = getItens;
  let dtLancamento = formataData();
  let data = $("#" + itens.dtID).val();
  let item = $("#" + itens.itemID).val();
  let valor = $("#" + itens.valID).val();

  if (data == "" || item == "" || valor == null || valor == "" || valor < 0) {
    valor < 0 ? $("#" + itens.valID).select() : alert(itens.msgCampo);
  } else {
    valor.length >= 7 ? (valor = valor.substr(0, 1) + valor.substr(2)) : false;

    postDados = [dtLancamento, data, item, valor];
    getItens.status ? postDados.push(0) : false;
    getItens.id ? postDados.push(itens.id) : false;

    await executaQueryBD(itens.query, postDados, itens.msgBd, false);

    await customCssAddClass(itens.id, "ng-leave-active");

    //setTimeout(() => {
     await onInit(itens.tipoView);
     await limparTableVisualizar(itens.id);
     await limparCampos([itens.itemID, itens.valID]);
     await $("#" + itens.dtID)
        .val(formataData())
        .focus();
    //}, 1200);
  }
};

/*SALVAR DADOS NO BANCO, TELA ADD DESPESAS */
const onCreate = async () => {
  const postNewItem = postItens;

  postNewItem.dtID = "dtDespesa";
  postNewItem.itemID = "selectDespesas";
  postNewItem.valID = "valDespesa";
  postNewItem.msgCampo = " Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios! ";
  postNewItem.msgBd = "Erro: Inserção não realizada. ";
  postNewItem.status = true;
  postNewItem.query = queryAll.insertDespStatus;
  postNewItem.tipoView = baseOnInit.despesaInit;

  await executaQueryViewBD(postNewItem);
};

/*SALVA DADOS NO BANCO TELA ENTRADA CAIXA*/
const onCreateEntrada = async () => {
  const postItensNew = postItens;

  postItensNew.dtID = "dtEntrada";
  postItensNew.itemID = "textEntrada";
  postItensNew.valID = "valEntrada";
  postItensNew.msgCampo =
    "Erro: 'Data', 'Entrada' e 'Valor' são campos obrigatórios! ";
  postItensNew.status = false;
  postItensNew.msgBd = "Erro: Inserção não realizada. ";
  postItensNew.query = queryAll.insertEntrada;
  postItensNew.tipoView = baseOnInit.entradaInit;

  await executaQueryViewBD(postItensNew);
};

/*CONSULTA BANCO DADOS TELA VISUALIZAR*/
const queryAndUpdateOverviewVizualizarDespesas = () => {
  //CONSULTA BANCO DADOS DESPESAS PARA VIEW VISUALIZAR
  setTimeout(() => {
    convertMes();
    postQuery = '';

    const camposTotal = ["saldoGeral", "simboloMoeda", "calculosomaGeral"];

    const camposDesp = [
      "totalDespesas",
      "calculototalDespesas",
      "totalDespesas",
    ];

    const camposEntrada = [
      "totalEntrada",
      "calculototalEntrada",
      "calculosomaGeral",
    ];
    
    limparVisualizarDados(camposDesp);
    limparVisualizarDados(camposEntrada);

    limparTableVisualizar("visualizaDesp  > tr");
    limparTableVisualizar("visualizaEntrada > tr");

    let somaDespesaVisualizar = 0.00;
    const dtConsulta = dtConsultaBD();
    postDados = [dtConsulta.inicio, dtConsulta.fim];
    
    postQuery = queryAll.selectDespStatusDt;
    executaQueryVisualizarBD(postQuery, postDados, true);
    
    /*Exibir dados Despesas na View*/
    setTimeout(() => {
      //const ExibirDespesas = () =>{
      
      /*Consulta e Retorna dados do Banco*/
      const resultConsultaBDDespesas = resultRowsQuery;

      if ((0) < resultConsultaBDDespesas.length) {
        const dt = new Date()
        $.each(resultConsultaBDDespesas, (id, row) => {
          somaDespesaVisualizar += convertSomarValor(row.valor);
          exibirDadosVisualizar(
            "visualizaDesp",
            fotmatDateView(row.data),
            row.despesa,
            formataValor(row.valor)
          );
          customCssView(
            ["totalDespesas", "calculototalDespesas"],
            convertValorView(somaDespesaVisualizar),
            "text-align",
            "right"
          );
        });
      }
    }, 5); 

    //CONSULTA BANCO DADOS ENTRADA PARA VIEW VISUALIZAR
    setTimeout(() => {
    //const ExibirEntrada = () => {
      let somaEntrada = 0.00;
      let somaResult = 0.00;

      postQuery = '';
      postQuery = queryAll.selectEntradaDt;
      executaQueryVisualizarBD(postQuery, postDados, true);
    
      setTimeout(() => {
        const resultConsultaEntrada = resultRowsQuery;

        if ((0) < resultConsultaEntrada.length) {
          $.each(resultConsultaEntrada, (id, row) => {
            somaEntrada += convertSomarValor(row.valor);
            somaResult = convertValorView(somaEntrada - somaDespesaVisualizar);

            exibirDadosVisualizar(
              "visualizaEntrada",
              fotmatDateView(row.data),
              row.entrada,
              formataValor(row.valor)
            );

            customCssViewAppend(
              camposTotal,
              "colorTotalViewPositivo",
              "colorTotalViewNegativo"
            );
            customCssView(
              ["totalEntrada", "calculototalEntrada"],
              convertValorView(somaEntrada),
              "text-align",
              "right"
            );
            customCssView(
              ["calculosomaGeral"],
              somaResult,
              "text-align",
              "right"
            );
          });
          if (parseInt(somaResult) <= 0) {
            customCssViewAppend(
              camposTotal,
              "colorTotalViewNegativo",
              "colorTotalViewPositivo"
            );
          }
        }
      }, 25);
    }, 30);
  }, 60);
};

/*CONFIRMA COPY MÊS ANTERIOR*/
const confirmarCopyMesAnterior = (getQuery, getTipoView) => {
  //setTimeout(() => {
    postQuery = '';
    convertMes();

    const dtConsulta =  formatDataInsert(); // dtConsultaBD();

    postDados = [dtConsulta.inicio, dtConsulta.fim];
    getTipoView
      ? (postQuery = queryAll.selectDespStatusDt) //? (postQuery = postQuery = queryAll.selectDespStatusDt)
      : (postQuery = queryAll.selectEntradaDt);

    executaQueryVisualizarBD(postQuery, postDados, true);

    setTimeout(() => {
      const ExibirResult = () =>{
        if ((null) != resultRowsQuery && (0) < resultRowsQuery.length ) {
          confirm(`Adicionar laçamentos com base no mês anterior, "${dtConsulta.inicio}"?`)
            ? insertMesBaseAnterior(basemesPag(), getQuery, getTipoView)
            : false;
        }
      }
      ExibirResult();
    }, 60);

  //}, 25);
};

/*CONSULTA BANCO DADOS, CRIA NOVAS LINHAS NA TABELA, VIEW ADD DESPESAS.*/
const queryAndUpdateOverviewLancaDespesas = async () => {

  postQuery = '';
  let somaDespesa = 0.00;

  convertMes()
  limparTableVisualizar("tbDespesas > tbody > tr");
  
  const dtConsulta = dtConsultaBD();
  
  postDados = [dtConsulta.inicio, dtConsulta.fim];
  postQuery = queryAll.selectDespStatusDt;
  
  executaQueryVisualizarBD(postQuery, postDados, true)

  setTimeout(()=>{
    if ((null) == resultRowsQuery || (0) == resultRowsQuery.length) {
      $("#somaDespesas").html(convertValorView(somaDespesa));
      confirmarCopyMesAnterior(postQuery, true);
      return;
    }

    $.each(resultRowsQuery, (id, row) => {
      exibirDadosLancamentosView(
        "tbDespesas",
        row.id,
        fotmatDateView(row.data),
        row.despesa,
        formataValor(row.valor),
        "onStatusDesp",
        "onUpdateDesp",
        "onDelete"
      );
      row.statusDesp == 1
        ? $("#checkbox" + row.id).prop({ checked: true })
        : $("#checkbox" + row.id).prop("checked", false);
      somaDespesa += convertSomarValor(row.valor);
    });
    $("#somaDespesas").html(convertValorView(somaDespesa));
    //return resultRowsQuery;
  }, 50);
};

/*EXIBIR DADOS NOS CAMPO PARA UPDATE VIEW DESPESAS*/
const onUpdateDesp =  (id) => {
  convertMes();
  postQuery = '';
  postDados = [id];
  postQuery = queryAll.selectDespPorId;
  
  executaQueryVisualizarBD(postQuery, postDados, true);

  setTimeout(() => {
    const row = resultRowsQuery[0];
    transfId = row.id;

    const CamposUpdate = [
      { id: "dtDespesa", dado: row.data },
      { id: "selectDespesas", dado: row.despesa },
      { id: "valDespesa", dado: row.valor },
    ];
    customCssViewUpdate(CamposUpdate, "btnDesp", "btnDespEdit", true);
  }, 25);
};

/*UPDATE NO DADOS BANCO, VIEW ADD DESPESAS*/
const onUpdateDespBd = () => {
  if (confirm("Salvar as alterações realizadas ")) {
    const postNewItem = postItens;

    postNewItem.id = transfId;
    postNewItem.dtID = "dtDespesa";
    postNewItem.itemID = "selectDespesas";
    postNewItem.valID = "valDespesa";
    postNewItem.msgCampo =
      " Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios! ";
    postNewItem.msgBd = "Erro: Falha ao atualizar dados! ";
    postNewItem.status = true;
    postNewItem.query = queryAll.updateDespStatus;
    postNewItem.tipoView = baseOnInit.despesaInit;

    executaQueryViewBD(postNewItem);
    return;
  }
  limparDadosDespesasUpdate();
};
/*CONSULTA BANCO DADOS, EXIBI DADOS VIEW ENTRADA CAIXA.*/
const queryAndUpdateOverviewLancaEntrada = async () => {

  postQuery = '';
  let somaEntrada = 0.00;
  
  convertMes();
  limparTableVisualizar("tbEntrada > tbody > tr");

  const dtConsulta = dtConsultaBD();

  postDados = [dtConsulta.inicio, dtConsulta.fim];
  postQuery = queryAll.selectEntradaDt;

  executaQueryVisualizarBD(postQuery, postDados, true);

  setTimeout(() => {
    if ((null) == resultRowsQuery || (0) == resultRowsQuery.length) {
      $("#somaEntrada").html(convertValorView(somaEntrada));
      confirmarCopyMesAnterior(postQuery, true);
      return;
    }
    
    $.each(resultRowsQuery, (id, row) => {
      exibirDadosLancamentosView(
        "tbEntrada",
        row.id,
        fotmatDateView(row.data),
        row.entrada,
        formataValor(row.valor),
        "onStatusEntrada",
        "onUpdateEnt",
        "onDeleteEntrada"
      );
      somaEntrada += convertSomarValor(row.valor);
    });

    $("#somaEntrada").html(convertValorView(somaEntrada));

  }, 50);
};

/*EXIBIR DADOS CAMPO PARA UPDATE VIEW ENTRADA DE CAIXA*/
const onUpdateEnt =  (id) => {
  convertMes();

  postQuery = '';
  postDados = [id];
  postQuery = queryAll.selectEntradaPorId;

  executaQueryVisualizarBD(postQuery, postDados, true);

  setTimeout(() => {
    const row = resultRowsQuery[0];
    transfId = row.id;

    const CamposUpdate = [
      { id: "dtEntrada", dado: row.data },
      { id: "textEntrada", dado: row.entrada },
      { id: "valEntrada", dado: row.valor },
    ];
    customCssViewUpdate(CamposUpdate, "btnEntrada", "btnEntEdit", true);
  }, 100);
};

/*UPDATE SALVAR NO DADOS BANCO, TELA ENTRADA RECEITA CAIXA */
const onUpdateEntBd = () => {
  if (confirm("Salvar as alterações realizadas ")) {
    const postNewItem = postItens;
    postNewItem.id = transfId;
    postNewItem.dtID = "dtEntrada";
    postNewItem.itemID = "textEntrada";
    postNewItem.valID = "valEntrada";
    postNewItem.msgCampo =
      " Erro: 'Data', 'Receita Caixa' e 'Valor' são campos obrigatórios! ";
    postNewItem.msgBd = "Erro: Falha ao atualizar dados! ";
    postNewItem.status = false;
    postNewItem.query = queryAll.updateEntrada;
    postNewItem.tipoView = baseOnInit.entradaInit;

    executaQueryViewBD(postNewItem);

    return;
  }
  limparDadosEntradaUpdate();
};
//END MANIPULAR DADOS VIEWS

// // 3. FUNÇAO DE TRATAMENTO E STATUS.
// Tratando erros
errorHandler = function (transaction, error) {
  alert("Erro: " + error.message);
  return true;
};
nullDataHandler = function (transaction, results) {};

/*SELECT E INSERT DADOS NO BANCO COM BASE MÊS ANTERIOR*/
const insertMesBaseAnterior = (dados, getQuery, getView) => {
  setTimeout(() => {
     convertMes();

    let dtConsulta = formatDataInsert();
    
    postQuery = '';
    postMensagem = "Erro: Inserção não realizada. ";
    postDados = [dtConsulta.inicio, dtConsulta.fim];
    postQuery = getQuery;

     executaQueryVisualizarBD(postQuery, postDados, true);

    getView
      ? (postQuery = queryAll.insertDespStatus)
      : (postQuery = queryAll.insertEntrada);

    setTimeout(() => {
      const resultConsultaBD = resultRowsQuery;
      if (getView) {
        $.each(resultConsultaBD, (id, row) => {
          postDados = [formataData(), dados, row.despesa, row.valor, 0];
          executaQueryBD(
            postQuery,
            postDados,
            postMensagem,
            onInit(baseOnInit.despesaInit)
          );
        });
        return;
      } else {
        $.each(resultConsultaBD, (id, row) => {
          postDados = [formataData(), dados, row.entrada, row.valor];
          executaQueryBD(
            postQuery,
            postDados,
            postMensagem,
            onInit(baseOnInit.entradaInit)
          );
        });
      }
    }, 100);
  }, 25);
}; 

/*RELATÓRIO GRAFICO */
const onloadRelatorio = () => {
  
  convertMes();
  limparDadosViewRelatorio();

  setTimeout(() => {

    let somaValor = 0;
    let porcentagem = 0;
    let convertValor = 0;
    let porcentagemEnt = 0;
    let porcentagemDesp = 0;
    const dtConsulta = dtConsultaBD();

    const colorProgressBar = {
      1: "progress-bar-success",
      2: "progress-bar-info",
      3: "progress-bar-primary",
      4: "progress-bar-warning",
      5: "progress-bar-danger",
    };

    let defineColorProgressBar = (porcentagemDesp) => {
      if (porcentagemDesp <= 5) {
        return colorProgressBar[1];
      } else if (porcentagemDesp > 5 && porcentagemDesp <= 10) {
        return colorProgressBar[2];
      } else if (porcentagemDesp > 10 && porcentagemDesp <= 20) {
        return colorProgressBar[3];
      } else if (porcentagemDesp > 20 && porcentagemDesp <= 30) {
        return colorProgressBar[4];
      } else if (porcentagemDesp >= 30) {
        return colorProgressBar[5];
      }
    };

    const verifProcentagem = (dados) => {
      return dados != 0 ? true : false;
    };

    const calculaPorcentgem = (valor) => {
      return parseFloat(valor) * (100 / somaValor);
    };

    postQuery = '';
    postDados = [dtConsulta.inicio, dtConsulta.fim];
    postQuery = {
      queryEntrada: queryAll.selectEntradaDt,
      queryDesp: queryAll.selectDespStatusDt,
    };
    
    executaQueryVisualizarBD(postQuery.queryEntrada, postDados, true);

    setTimeout(() => {
      const resultConsultaBD = resultRowsQuery;
      if (resultConsultaBD.length > 0) {
        $.each(resultConsultaBD, (id, row) => {
          somaValor += convertSomarValor(row.valor);
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

            verifProcentagem(porcentagem % 2)
              ? (porcentagemEnt = porcentagem.toFixed(2))
              : (porcentagemEnt = porcentagem);
            verifProcentagem(porcentagemDesp % 2)
              ? (porcentagemDesp = porcentagemDesp.toFixed(2))
              : false;

            convertValor = convertValorView(somaValor);

            $("#valorTotalEnt")
              .html("R$ " + convertValor)
              .css({ "font-size": ".7rem" });
            $("#progressTotal")
              .html(porcentagemEnt + "%")
              .css({ width: porcentagemEnt + "%" });

            exibirDadosRelatorioView(
              row.despesa,
              formataValor(row.valor),
              defineColorProgressBar(porcentagemDesp),
              porcentagemDesp
            );
          });
        }
      }, 100);
    },75);
  }, 25);
}; //172 //1222
