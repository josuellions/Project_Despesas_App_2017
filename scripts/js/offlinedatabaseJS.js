/*VARIÁVEIS GLOBAIS*/

/*CONSTANTS QUERY */
/*MOVIDO PARA FACTORY
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
    updateStatusDesp: "UPDATE TbDespesasStatus SET statusDesp = ? WHERE id = ?;",
    deleteDesp: "DELETE FROM TbDespesasStatus WHERE id=?;",
    deleteEntrada: "DELETE FROM TbEntradas WHERE id=?;",
    insertDespeStatus:
      "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?); SELECT * FROM TbDespesasStatus WHERE id = SCOPE_IDENTITY();",
  insertDespStatus:
    "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);",
  insertEntrada:
    "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);",
  updateDespStatus:
    "UPDATE TbDespesasStatus SET dtLanc = ?, data = ?, despesa = ?, valor = ?, statusDesp = ? WHERE id=?;",
  updateEntrada:
    "UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;",
};
*/
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
/* SOMENTE USAR QUANDO ESTIVER SEM USO DE FACTORY ANGULAR
const baseOnInit = {
  entradaInit: "entradaInit",
  despesaInit: "despesaInt",
  visualizarInit: "visualizarInit",
  relatorioInit: "relatorioInit",
};
*/
//FIM VARIÁVEIS GLOBAIS

//BANCO DADOS
/*CRIAR PARAMETROS BANCO DADOS*/
/* MOVIDO PARA FACTORY AGULAR - config/database
const initDB = () => {
  const shortName = "bdDespesas";
  const version = "1.0";
  const displayName = "BdGestorDespesas";
  const maxSize = 65536; // Em bytes

  localDB = window.openDatabase(shortName, version, displayName, maxSize);
};
*/
/* CRIAR BANCO LOCAL WEB*/
let localDB = null;
let dtMesVerifica = null;

/*CRIAR TABLES NO BANCO DADOS*/
/* MOVIDO PARA FACTORY ANGULAR - config/database
const createTables = () => {
  console.log('CRIAR TABLE ANTIGO')
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
*/



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

let contReloadPage = 1;

/*
const onInit = async (recebTipoView) => {
  
  const alertErroNavegador = "Erro: Seu navegador não permite banco de dados.";

  try {
    if(parseInt(recebTipoView) == 0){
      return
    }

    !window.openDatabase ? alert(alertErroNavegador) : (initDB(), createTables()); //, verifStatus());

    const selectView = Views[recebTipoView];

    if(contReloadPage > 1){
      contReloadPage = 1;
      return;
    }
    
    await $(() => {
      contReloadPage++;
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
  }
};
*/

//CHECK POSSUI DADOS NO BANCO
//onInit(this.comp);

/*Executa Query Banco Dados*/
const executaQueryBD = (getQuery, getDados, getMensagem, getstatus) => {
  /*console.log(getQuery)
  console.log(getDados)
  console.log(getMensagem)
  console.log(getstatus)
  */
 //QUERYINSERT
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

/*
const SetResultRowsQuery = (data) => { //remover deixar só na query com ref = RESULT
  if(cont = 1){
    cont++;
    resultRowsQuery =  data;
    console.log(cont)
    return;
  }
  cont = 1;
}
*/
/*EXECUTA QUERY RETONA RESULT DO BANCO*/
const executaQueryVisualizarBD = async (getQuery, getDados, executarConsulta) => {
  
  //console.log(getDados)
  
  if (executarConsulta) 
  {
    resultRowsQuery = null;
    try 
    {
      localDB.transaction(function (transaction) {
        transaction.executeSql(
          getQuery,
          getDados,
          function  (_, results) {
            executarConsulta = false;
            //SetResultRowsQuery(results.rows);
            contReloadPage = 1;
            resultRowsQuery = results.rows //REF = RESULT
            
            console.log(resultRowsQuery)
          
          },
          function (_, error) {
            alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
          }
        );
      });
    } catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
    }
  }
};
//END BANCO DADOS

//FUNÇÕES TRATAMENTO DADOS

/*FORMATA VALOR*/
/*MOVIDO PARA FACTORY
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
*/


/*FORMATA VALOR PARA SOMAR*/
/* MOVIDO PARA CONTROLLER DESPESA
const convertSomarValor = (valor) => {
  return parseFloat(valor.replace(",", "."));
};
*/
/*FORMATA VALOR PARA VIEW*/
/* MOVIDO PARA CONTROLLER DESPESA
const convertValorView = (valorView) => {
  return formataValor(valorView.toFixed(2).replace(".", ","));
};
*/
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
    //console.log(getText)
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
/*Query para realizar insert com base no mẽs anterior */
const SelectQueryInsertEntradaDespesa = {
  true(){
    return queryAll.insertDespStatus
  },
  false() {
    return queryAll.insertEntrada
  }
}

const SelectQueryRemoveEntradaDespesa = {
  true(){
    return queryAll.selectDespStatusDtValor
  },
  false() {
    return queryAll.selectEntradaDtValor
  }
}

/*REMOVER DADOS SEM RENDERIZAR VIEW*/
let somaValorView = 0.0;
const somarTotalValor = (tipoView) => {
  //DEVREMOVE
  convertMes();

  const dtConsulta = dtConsultaBD();
  
  const SelectQueryRemoveEntradaDespesaDB = SelectQueryRemoveEntradaDespesa[tipoView]
  
  const promiseLoad = new Promise( (resolve) => { 
    executaQueryVisualizarBD(
      SelectQueryRemoveEntradaDespesaDB(), [dtConsulta.inicio, dtConsulta.fim], true
      );
    
    setTimeout(() => {
      resolve(resultRowsQuery != null)
    }, 600);
  })

  promiseLoad.then(() => {
    if (resultRowsQuery.length > 0) {
      $.each(resultRowsQuery, (id, row) => {
        somaValorView += convertSomarValor(row.valor);
      });
      console.log(`ROW ${somaValorView}` )
    }
  })
};

/*UPDATE STATUS PAGO VIEW DESPESAS SALVA NO DADOS BANCO*/
const onUpdateStatusDesp = (id, status) => {
  postDados = [status, id];
  postMensagem = "Erro: UPDATE não realizado. ";
  postQuery = queryAll.updateStatusDesp;

  executaQueryBD(postQuery, postDados, postMensagem, false); //onInit(baseOnInit.despesaInit))
};

const OnDeleteConfirm = {
  true(id){
    postDados = [id];
    customCssAddClass(id, "ng-leave-active");
    postMensagem = "Erro: Delete não realizado. ";

    const promiseLoad = new Promise((resolve) => {
      executaQueryBD(queryAll.deleteDesp, postDados, postMensagem, false); 

      setTimeout(() => {
        //console.log(somarTotalValor(true))
        resolve(somarTotalValor(true))
      }, 900);
    });

    promiseLoad.then(() => {
      limparTableVisualizar(id);
      customTextView(["somaDespesas"], convertValorView(somaValorView));
    });

  },
  false(){
    return;
  }
  
}

/*REMOVE DADOS BANCO, TELA ADD DESPESAS*/
const onDelete = (id) => {
  const OnDeleteConfirmAction = OnDeleteConfirm[(confirm("Salvar as alterações realizadas "))]
  
  OnDeleteConfirmAction(id);
  limparDadosDespesasUpdate();
  
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

const SelectQueryEntradaDespesa = {
  true(){
    return queryAll.selectDespStatusDt
  },
  false() {
    return queryAll.selectEntradaDt
  }
}

/*Inserir Rows Listas do Mês anterior para mês selecionado */
const insertRowsMesAnteriorParaMesSeguinte ={
  true(getQuery, getTipoView){
    InsertMesBaseAnterior(basemesPag(), getQuery, getTipoView)
  },
  false(){
    return
  }
}

/*CONFIRMA COPY MÊS ANTERIOR*/
const ConfirmarCopyMesAnterior = (getQuery, getTipoView) => {
  //DEV
  convertMes();
  const dtConsulta =  formatDataInsert(); //dtConsultaBD();
  const postQuery = SelectQueryEntradaDespesa[getTipoView]
  
  const executaQuery = executaQueryVisualizarBD; //['action'];
  
  const promiseLoad = new Promise(function(resolve, _){
    executaQuery(postQuery(), [dtConsulta.inicio, dtConsulta.fim], true);
    console.warn(`>> CONFIRMA COPY VERIFICA MES ANTERIOR`)
    console.log([dtConsulta.inicio, dtConsulta.fim])
    setTimeout(() => {
      resolve(resultRowsQuery != null);
    }, 60);
  })

  promiseLoad.then(function(){
    if (resultRowsQuery.length == 0) {
      return;
    }

    const dtMesAnterior = dtConsulta.inicio.split('-');
    const dtMesAnteriorFormat = [mesExt[parseInt(dtMesAnterior[1] -1)],dtMesAnterior[0]].join('/')
    const confirmCopy =  confirm(`Adicionar laçamentos com base no mês anterior,\n "${dtMesAnteriorFormat}"?`)
    const exibirConfirmCopy = insertRowsMesAnteriorParaMesSeguinte[confirmCopy];
    
    exibirConfirmCopy(getQuery, getTipoView)
  })
};

/*Exibir Dados Despesas View */
const DadosDespesasView = async (resultRows, somaDespesa) => {
  
  $.each(resultRows, (id, row) => {
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
}

/*CONSULTA BANCO DADOS, CRIA NOVAS LINHAS NA TABELA, VIEW ADD DESPESAS.*/
const queryAndUpdateOverviewLancaDespesas = async () => {
  //DEV
  convertMes();
  limparTableVisualizar("tbDespesas > tbody > tr");
  
  let somaDespesa = 0.00;
  const dtConsulta = dtConsultaBD();
  
  const executaQuery = executaQueryVisualizarBD //['action'];
  
  const promiseLoad = new Promise(function (resolve, reject) { 
    
    //console.log("LOAD")
    //console.log([dtConsulta.inicio, dtConsulta.fim])
    
    executaQuery(queryAll.selectDespStatusDt, [dtConsulta.inicio, dtConsulta.fim], true)

    setTimeout(() => {
      resolve(resultRowsQuery != null)
    }, 60); //  Math.random() * 2000 + 1000);
  })

  promiseLoad.then(function () {
    if (null == resultRowsQuery || 0 == resultRowsQuery.length) { //
      $("#somaDespesas").html(convertValorView(somaDespesa));
      ConfirmarCopyMesAnterior(queryAll.selectDespStatusDt, true);
      return;
    }
    DadosDespesasView(resultRowsQuery, somaDespesa)
  }).catch(()=>{
    alert("Error: Falha ao carregar lista Despesas do banco dados!")
  })
  
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
      ConfirmarCopyMesAnterior(postQuery, true);
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

/*Exibir os dados na view ao realizar insert com base nos dodos mês anterior */
const TipoViewExibirDados = {
  true(resultConsultaMesAnterio){
    DadosDespesasView(resultConsultaMesAnterio, 0.00)
  },
  false(resultConsultaMesAnterio){
    $.each(resultConsultaMesAnterio, (id, row) => {
      postDados = [formataData(), dados, row.entrada, row.valor];
      executaQueryBD(
        postQuery,
        postDados,
        postMensagem,
        onInit(baseOnInit.entradaInit)
      );
    });
  }
}

const ProximoMesCopy = (dados ) => {
  if(contReloadPage = 1) {
    const DtMesDados = dados.split('-');
    let anoCopy = parseInt(DtMesDados[0])
    let mesCopy = parseInt(DtMesDados[1])
    const diaCopy = DtMesDados[2]
    
    //console.log(dados)
    
    if(mesCopy == 12) {
      
      //console.log('IGUAl 12')
      
      mesCopy = mesCopy < 10 ? `0${++mesCopy}` : mesCopy;
    return [++anoCopy, mesCopy - 11, diaCopy].join('-'); 
    }

    if(mesCopy >=1 && mesCopy <=11) {
      
      //console.log('DIFETEN 12')
      
      mesCopy = mesCopy < 10 ? `0${++mesCopy}` : mesCopy;
      return [anoCopy, mesCopy, diaCopy].join('-'); 
    } 
  }
}
/*SELECT E INSERT DADOS NO BANCO COM BASE MÊS ANTERIOR*/
const InsertMesBaseAnterior = (dados, getQuery, getView) => {
  convertMes();

  const dtConsulta = formatDataInsert();

  const promiseLoad = new Promise(function(resolve) {
    
    executaQueryVisualizarBD(getQuery, [dtConsulta.inicio, dtConsulta.fim], true);
    
    setTimeout(() => {
      resolve(resultRowsQuery != null)
    }, 60);
    
  })
  
  promiseLoad.then(() =>{
    const SelectQueryInsertEntradaDespesaBD = SelectQueryInsertEntradaDespesa[getView]
    
    $.each(resultRowsQuery,(_, row) => {
      executaQueryBD(
        SelectQueryInsertEntradaDespesaBD(),
        [formataData(), ProximoMesCopy(row.data), row.despesa, row.valor, 0],
        "Erro: Inserção não realizada. ",
        false //onInit(baseOnInit.despesaInit)
      );
    });
    onInit(baseOnInit.despesaInit);
  })
}; 

/*RELATÓRIO GRAFICO */
const onloadRelatorio = () => { //JLDEV
  
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
      'sucess' : "progress-bar-success",
      'info': "progress-bar-info",
      'primary': "progress-bar-primary",
      'warnig': "progress-bar-warning",
      'danger': "progress-bar-danger",
    };

    const NivelAvaliacaoDespesas = {
      'Excelente': 2,
      'Bom': 5,
      'Moderado': 10,
      'Medio': 15,
      'Alto': 20
    }

    const CalclulaPorcentagem = (porcentagem) => {
      return parseInt(porcentagem / 2);
    }

    let defineColorProgressBar = (porcentagemDesp) => {

      if (CalclulaPorcentagem(porcentagemDesp) > NivelAvaliacaoDespesas.Alto) {
        return colorProgressBar.danger;
       }

       if (CalclulaPorcentagem(porcentagemDesp) > NivelAvaliacaoDespesas.Medio) {
        return colorProgressBar.warnig;
      }
      
      if (CalclulaPorcentagem(porcentagemDesp) > NivelAvaliacaoDespesas.Moderado ) {
        return colorProgressBar.primary;
      } 

      if (CalclulaPorcentagem(porcentagemDesp) > NivelAvaliacaoDespesas.Bom) {
        return colorProgressBar.info;
      } 
        //NivelAvaliacaoDespesas.Excelente
        return colorProgressBar.sucess;
    };

    const verifProcentagem = (dados) => {
      return parseInt(dados) > 0 ? true : false;
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
              : (porcentagemEnt = (0.00).toFixed(2));

            verifProcentagem(porcentagemDesp % 2)
              ? (porcentagemDesp = porcentagemDesp.toFixed(2))
              : porcentagemDesp = (0.00).toFixed(2);

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
