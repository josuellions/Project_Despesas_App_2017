// DEFINIR DATA 
function formataData() {
  dt = new Date()
  let dia = dt.getDate(),
    mes = dt.getMonth(),
    ano = dt.getFullYear();

  mes.toString().length < 10 ? mes = + parseInt(mes + 1) : false;

  dia.toString().length == 1 ? dia = '0' + dia : false;
  mes.toString().length == 1 ? mes = '0' + mes : false;

  return ano + "-" + mes + "-" + dia;
}

function formataValor(valor) {

  let valorFormatado = null;

  let cont = valor.length > 6 && valor.length < 9 ? valor.length - 6 : false;
  ((valor.length > 6) && (valor.length < 9)) ? valorFormatado = valor.substr(0, cont) + "." + valor.substr(cont++) : false

  cont = valor.length > 8 && valor.length < 12 ? valor.length - 9 : false;
  valor.length > 8 && valor.length < 12 ? valorFormatado = valor.substr(0, 2) + "." + valor.substr(2, 3) + "." + valor.substr(5) : false

  return valorFormatado ? valorFormatado : valor;
}

let convertMes = () => {
  let retonardt = null;
  let dtbasepag = $("#dtReference").text();
  let dtBasepg = dtbasepag.substr(0, 3);
  let dtBaseAno = dtbasepag.substr(4);

  let mesExt = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  mesExt.forEach(function (campo, id) {

    id < 9 ? (id = "0" + ++id) : ++id;

    dtBasepg == campo ? (retonardt = dtBaseAno + "-" + id + "-01") : false

  })


  return $("#comparaDt").html(retonardt);
}
// CRIAR BANCO LOCAL WEB
let localDB = null;

function onInit(comp) {

  const alertErroNavegador = "Erro: Seu navegador não permite banco de dados.";

  try {
    !window.openDatabase ? alert(alertErroNavegador) : (initDB(), createTables());

    comp === 1 ? $(document).ready(() => { queryAndUpdateOverviewLancaDespesas(1) }) : false
    comp === 2 ? $(document).ready(() => { queryAndUpdateOverviewLancaEntrada(2) }) : false
    comp === 3 ? $(document).ready(() => { queryAndUpdateOverviewVizualizarDespesas(3) }) : false

  } catch (e) {
    const alertErroVersaoBd = "Erro: Versão de banco de dados inválida.";
    const alertErroDesconhecido = "Erro: Erro desconhecido: ";

    e == 2 ? alert(alertErroVersaoBd) : alert(alertErroDesconhecido + e + ".");

    return;
  }
}

function initDB() {

  let shortName = 'bdDespesas';

  let version = '1.0';

  let displayName = 'BdGestorDespesas';

  let maxSize = 65536; // Em bytes

  localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables() {

  let criarTb = [
    'CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);',

    'CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);',

    'CREATE TABLE IF NOT EXISTS TbDespesasStatus(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL, statusDesp INT NOT NULL);',
  ];

  criarTb.forEach(function (query, id) {

    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [], nullDataHandler, errorHandler);
      });

    } catch (e) {
      alert("Erro: Data base Tabelas não criada " + e + ".");
      return;
    }
  });
}


let dtbaseBd = () => {

  onInit(this.comp);

  let query = "SELECT * FROM TbEntradas;"; dtMesVerifica

  try {

    localDB.transaction(function (transaction) {

      transaction.executeSql(query, [], function (transaction, results) {

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          let dtBD = (convertMes(row['dtLanc'].slice(5, 7), row['dtLanc'].slice(0, 4))) //Compara Mês

          document.getElementById("comparaDt").innerHTML = dtBD;

        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
}


// CHECK POSSUI DADOS NO BANCO
onInit(this.comp);

//INSERT STATUS DESPESAS
let insertStatus = (dtLanc, data, despesa, valor, status) => {
  var query = "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);";
  try {
    localDB.transaction(function (transaction) {
      transaction.executeSql(query, [dtLanc, data, despesa, valor, status], function (transaction, results) {
        !results.rowsAffected ? alert("Erro: Inserção não realizada") : false;
      }, errorHandler);
    });
  } catch (e) {
    alert("Erro: INSERT não realizado " + e + ".");
  }
}

// UPDATE STATUS DESPESAS NO DADOS BANCO

let onUpdateStatusDesp = (id, status) => {

  let query = "UPDATE TbDespesasStatus SET statusDesp = ? WHERE id = ?;";

  try {
    localDB.transaction(function (transaction) {
      transaction.executeSql(query, [status, id], function (transaction, results) {
        !results.rowsAffected ? alert("Erro: UPDATE não realizado.") : false;
      }, errorHandler);
    });
  } catch (e) {
    console.log("Erro: UPDATE não realizado " + e + ".");
    return false;
  }
};


//VERIFICA TABELA STATUS E REALIZA INSERT
let verifStatus = (idDesp, statusDesp, upStatus) => {
  let verif = false;
  let queryDesp = 'SELECT * FROM TbDespesas';
  let queryStatusDesp = 'SELECT * FROM  TbDespesasStatus;';
  let queryDelete = 'DROP TABLE TbDespesas;';

  try {
    localDB.transaction(function (transaction) {
      transaction.executeSql(queryDesp, [], function (transaction, results) {

        localDB.transaction(function (transaction) {
          transaction.executeSql(queryStatusDesp, [], function (transaction, result) {

            verif = result.rows.length == 0 ? true : false;

            if (results.rows.length > 0) {
              if (verif) {

                for (let i = 0; i < results.rows.length; i++) {
                  let row = results.rows.item(i);
                  insertStatus(row.dtLanc, row.data, row.despesa, row.valor, 0);
                }
              }
            } else if (upStatus) {
              onUpdateStatusDesp(idDesp, statusDesp);
            }

            else if (result.rows.length == results.rows.length) {
              localDB.transaction(function (transaction) {
                transaction.executeSql(queryDelete, [], function (transaction, result) {
                  onInit(1);
                });
              });
            }
          });
        });
      });
    });
  } catch (e) {
    alert('Error: Error tabela despesa, ' + e + '.');
  }
}

verifStatus();

// REMOVE DADOS BANCO, TELA ADD DESPESAS
function onDelete(id) {

  confirma = confirm("Salvar as alterações realizadas ");

  if (confirma == true) {

    let query = "DELETE FROM TbDespesasStatus WHERE id=?;";

    try {
      localDB.transaction(function (transaction) {

        transaction.executeSql(query, [id], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: Delete não realizado.") : onInit(1);;
        }, errorHandler);
      });

      //onDeleteStatusDesp(id);

    } catch (e) {
      alert("Erro: DELETE não realizado " + e + ".");
    }
    onInit(1)
    //window.location.reload();

  } else {
    onInit(1)
    //window.location.reload();
  }
}

// REMOVER DADOS DO BANCO TELA ENTRADA DE CAIXA
function onDeleteEntrada(id) {

  let query = "DELETE FROM TbEntradas WHERE id=?;";

  try {
    localDB.transaction(function (transaction) {

      transaction.executeSql(query, [id], function (transaction, results) {
        !results.rowsAffected ? alert("Erro: Delete não realizado.") : onInit(2);;
      }, errorHandler);
    });
  } catch (e) {
    alert("Erro: DELETE não realizado " + e + ".");
  }
}

// CRIAR DADOS NO BANCO, TELA ADD DESPESAS 
function onCreate() {

  let dtLancamento = formataData();

  let data = document.getElementById("dtDespesa").value;
  let despesa = document.getElementById("selectDespesas").value;
  let valor = document.getElementById("valDespesa").value;

  valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

  if (data == "" || despesa == "" || valor == "" || valor < 0) {
    valor < 0 ? $("#valDespesa").select() : alert("Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
  } else {
    var query = "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);";
    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [dtLancamento, data, despesa, valor, 0], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: Inserção não realizada") : onInit(1);;
        }, errorHandler);
      });
    } catch (e) {
      alert("Erro: INSERT não realizado " + e + ".");
    }
    $('#dtDespesa').val(formataData()).focus();
    $('#selectDespesas').val("");
    $('#valDespesa').val("");
  }
}

// INSERIR DADOS NO BANCO TELA ENTRADA CAIXA
function onCreateEntrada() {

  let dtLancamento = formataData();

  let data = document.getElementById("dtEntrada").value;
  let entrada = document.getElementById("textEntrada").value;
  let valor = document.getElementById("valEntrada").value;

  valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

  if (data == "" || entrada == "" || valor == "" || valor < 0) {
    valor < 0 ? $("#valEntrada").select() : alert("Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
  }
  else {
    let query = "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);";
    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [dtLancamento, data, entrada, valor], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: Inserção não realizada") : onInit(2);;
        }, errorHandler);
      });
    } catch (e) {
      alert("Erro: INSERT não realizado " + e + ".");
    }
    $('#dtEntrada').val(formataData()).focus();
    $('#textEntrada').val("");
    $('#valEntrada').val("");
  }
}

// VARIÁVEL GLOBAL PARA EFETUAR CALCULO TELA VISUALIZAR
let somaDespesaVisualizar = 0.0;
let cont = 0;

// CONSULTA BANCO DADOS DESPESAS TELA VISUALIZAR
function queryAndUpdateOverviewVizualizarDespesas() {

  convertMes();

  let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

  let queryDesp = "SELECT * FROM TbDespesasStatus;";

  try {
    let dtDia;
    let dtMes;
    let dtMesAlt;
    let dtAno;
    let dtFormt;
    let valorFormat;
    let conf = false;

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryDesp, [], function (transaction, results) {

        document.getElementById("totalDespesas").innerText = "0,00";

        document.getElementById("calculototalDespesas").innerText = "0,00";

        document.getElementById('totalDespesas'.innerHTML = "");

        $("#visualizaDesp tr").remove();

        somaDespesaVisualizar = 0.0;

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          verif = row['data'].slice(0, 7) == basemesPag ? true : false;

          if (verif === true) {

            conf = true;

            dtDia = row['data'].substr(8, 10);
            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);

            dtFormt = (dtDia + "/" + dtMesAlt);

            $("#visualizaDesp").append(
              "<tr>" +
              "<td>" + dtFormt + "</td>" +
              "<td>" + row['despesa'] + "</td>" +
              "<td> R$ </td>" +
              '<td style="text-align: right; padding-right: 4%;">' + formataValor(row['valor']) + '</td>' +
              "</tr>"
            );
            somaDespesaVisualizar += parseFloat(row['valor']);

            valorFormatDespVisualiza = formataValor((somaDespesaVisualizar).toFixed(2).replace('.', ','));

            $("#totalDespesas").html(valorFormatDespVisualiza).css("text-align", "right");
            $("#calculototalDespesas").html(valorFormatDespVisualiza).css("text-align", "right");
            cont = 1;

          } else if ((window.location.pathname === "/public/visualiza.html") && (conf === false)) {
            document.getElementById("totalDespesas").innerText = "0,00";
            document.getElementById("calculototalDespesas").innerText = "0,00";
            document.getElementById('totalDespesas'.innerHTML = "");
            $("#visualizaDesp tr").remove();
            somaDespesaVisualizar = 0.0;
          }
        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }

  // // CONSULTA BANCO DADOS ENTRADA TELA VISUALIZAR
  //   function queryAndUpdateOverviewVizualizarEntrada( ){
  queryEntrad = "SELECT * FROM TbEntradas;";

  try {

    let dtDia;
    let dtMes;
    let dtMesAlt;
    let dtAno;
    let dtFormt;
    let somaEntrada = 0.0;
    let result = 0.0;
    let valorFormat;
    let valorFormatResult;
    let conf = false;

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryEntrad, [], function (transaction, results) {

        document.getElementById("totalEntrada").innerText = "0,00";
        document.getElementById("calculototalEntrada").innerText = "0,00";
        document.getElementById("calculosomaGeral").innerText = "0,00";
        $("#visualizaEntrada tr").remove();
        somaEntrada = 0.0;

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          verif = row['data'].slice(0, 7) == basemesPag ? true : false;

          if (verif == true) {

            conf = true;

            dtDia = row['data'].substr(8, 10);

            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);

            dtFormt = (dtDia + "/" + dtMesAlt);

            somaEntrada += parseFloat(row['valor']);

            $("#visualizaEntrada").append(
              "<tr>" +
              "<td>" + dtFormt + "</td>" +
              "<td>" + row['entrada'] + "</td>" +
              "<td> R$ </td>" +
              '<td style="text-align: right; padding-right: 4%;">' + formataValor(row['valor']) + "</td>" +
              "</tr>"
            );

            result = somaEntrada - somaDespesaVisualizar;
            result = formataValor(result.toFixed(2).replace('.', ','));

            valorFormatResult = formataValor(parseFloat(somaEntrada).toFixed(2).replace('.', ','));

            $("#totalEntrada").html(valorFormatResult).css("text-align", "right");
            $("#calculototalEntrada").html(valorFormatResult).css("text-align", "right");

            if (result <= 0) {
              $("#saldoGeral").css({ "color": "rgb(233, 71, 71)", "text-shadow": "0px 0px 2px #337ab7" });
              $("#simboloMoeda").css({ "color": "rgb(233, 71, 71)", "text-shadow": "0px 0px 3px #337ab7" });
              $("#calculosomaGeral").html(result).css({ "text-align": "right", "color": "rgb(233, 71, 71)", "text-shadow": "0px 0px 3px #337ab7" });
            } else {
              $("#calculosomaGeral").html(result).css("text-align", "right");
            }

          } else if ((window.location.pathname === "/public/visualiza.html") && (conf === false)) {
            document.getElementById("totalEntrada").innerText = "0,00";
            document.getElementById("calculototalEntrada").innerText = "0,00";
            document.getElementById("calculosomaGeral").innerText = "0,00";
            $("#visualizaEntrada tr").remove();
            somaEntrada = 0.0;
          }
        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    }); "<td> R$ </td>" +
      '<td style="text-align: right; padding-right: 4%;">'
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
}
cont = 0;
// CONSULTA BANCO DADOS, CRIA NOVAS LINHAS NA TABELA, TELA ADD DESPESAS.
function queryAndUpdateOverviewLancaDespesas(verif) {

  convertMes();

  let basemesPag = $("#comparaDt").text();

  let queryDesp = "SELECT * FROM TbDespesasStatus;";

  try {

    let dtDia;
    let dtMes;
    let dtMesAlt;
    let dtFormt;
    let somaDespesa = 0.0;
    let conf = false;
    let copyConfirmar = false;
    let dtMesVerifica;

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryDesp, [], function (transaction, results) {

        $("#tbDespesas tbody tr").remove();

        for (let i = 0; i < results.rows.length; i++) {


          let row = results.rows.item(i);
          let rowStatus = 0;

          verif = row['data'].slice(0, 7) == basemesPag.slice(0, 7) ? true : false;

          dtMesVerifica = row['data'].slice(5, 7);

          if (verif == true) {

            conf = true;

            dtDia = row['data'].substr(8, 10);
            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);

            dtFormt = (dtDia + "/" + dtMesAlt);

            let valorFormatDespesa = formataValor(row['valor']);

            $('#tbDespesas > tbody').append(
              '<tr id=" ' + row['id'] + ' ">' +
              '<td width="22%" onclick="onUpdateDesp( ' + row['id'] + ' )">' + dtFormt + '</td>' +
              '<td width="48%" onclick="onUpdateDesp( ' + row['id'] + ' )">' + row['despesa'] + '</td>' +
              '<td> R$ </td>' +
              '<td style="text-align: right; padding-right: 4%;" onclick="onUpdateDesp( ' + row['id'] + ' )">' + valorFormatDespesa + '</td>' +
              '<td width="5%"><div class="toggle"><input type="checkbox" id="' + row['id'] + '" onclick="onStatusDesp( ' + row['id'] + ' )"><label for="' + row['id'] + '"></label></div>' +
              '<a id="' + row['id'] + '" onclick="onDelete( ' + row['id'] + ' )" hidden><span class="glyphicon glyphicon-trash"></span></a>' +
              /*'<td width="5%"><a href="" id="' + row['id'] + '" onclick="onDelete( ' +
              row['id'] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +*/
              '</td></tr>'
            );

            rowStatus = row['statusDesp'];
            rowStatus == 1 ? $('#' + row['id']).val('checked')[0].checked = true : $('#' + row['id']).val('checked')[0].checked = false;

            somaDespesa += parseFloat(row['valor'].replace(",", "."));

            cont++;

          } else if (basemesPag.slice(0, 7) > row['data'].slice(0, 7) && !verif && (i == results.rows.length - 1)) {

            if (!copyConfirmar) {
              copyConfirmar = confirm("Adicionar laçamentos com base no mês anterior?")
            }
            if (copyConfirmar && (dtMesVerifica == (basemesPag.slice(5, 7) - 1))) {

              let ver = row['data'].slice(5, 7);
              ver = parseInt(ver);
              insertMesDespesa(basemesPag);
            }

          } else if ((window.location.pathname === "/public/despesas.html") && (conf === false)) {
            document.getElementById("somaDespesas").innerText = "";

            $("#tbDespesas tbody tr").remove();

          }

        }
        valorFormatDespesa = formataValor((somaDespesa).toFixed(2).replace('.', ','));

        if (this.verif) {
          $('.toggle').remove()
          $('.despPG').html('Del');
          $('#tbDespesas tbody tr td a').removeAttr('hidden');
        } else {
          $('.despPG').html('Pago');
          $('.toggle').css({ 'display': 'block' });
          $('#tbDespesas tbody tr td a').attr('hidden');
        }

        $("#somaDespesas").html(valorFormatDespesa);

      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
    // });
    //});
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
  // });
}

// UPDATE DADOS BANCO, TELA ADD DESPESAS
var transfId = null;

let onUpdateDesp = (id) => {

  $(document).ready(function () {

    convertMes();

    let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

    let queryDesp = "SELECT * FROM TbDespesasStatus;";

    try {

      let dtDia;
      let dtMes;
      let dtMesAlt;
      let dtAno;
      let dtFormt;
      let somaDespesa = 0.0;
      let conf = false;

      localDB.transaction(function (transaction) {

        transaction.executeSql(queryDesp, [], function (transaction, results) {

          $("#tbDespesas tbody tr").remove();

          for (let i = 0; i < results.rows.length; i++) {

            let row = results.rows.item(i);

            verif = row['data'].slice(0, 7) == basemesPag ? true : false;

            if (verif == true) {

              conf = true;

              dtDia = row['data'].substr(8, 10);
              dtMes = row['data'].substr(4, 5);
              dtMesAlt = dtMes.substr(1, 2);
              dtAno = row['data'].substr(2, 2);

              dtFormt = (dtDia + "/" + dtMesAlt);

              if (id == row['id']) {
                transfId = row['id'];

                $('#dtDespesa').val(row['data']).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
                $('#selectDespesas').val(row['despesa']).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
                $('#valDespesa').val(formataValor(row['valor'])).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
                $('#btnDesp').css('display', 'none');
                $('#btnDespEdit').css({ 'display': 'inline-block', 'color': '#337ab7' });
              }
            }
          }
          queryAndUpdateOverviewLancaDespesas(true);

        }, function (transaction, error) {
          alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
      });
      //}
    } catch (e) {
      alert("Erro" + e)
    }
  });
}

// UPDATE SALVAR NO DADOS BANCO, TELA ADD DESPESAS
let onUpdateDespBd = (() => {

  confirma = confirm("Salvar as alterações realizadas ");

  let dtLancamento = formataData();

  let data = document.getElementById("dtDespesa").value;
  let despesa = document.getElementById("selectDespesas").value;
  let valor = document.getElementById("valDespesa").value;

  let limparDados = () => {
    $.ajax({
      url: window.location.pathname,
      success: function () {
        $("#itemTbody tr td").remove();
        document.getElementById("dtDespesa").value = "";
        document.getElementById("selectDespesas").value = "";
        document.getElementById("valDespesa").value = "";
        $('#btnDespEdit').css({ 'display': 'none' });
        $('#btnDesp').css({ 'display': 'inline' })
        $('.toggle').css({ 'display': 'block' });
        //$('a>span.glyphicon.glyphicon-trash').css('display', 'none');
        queryAndUpdateOverviewLancaDespesas(true);
      },
      error: function () {
        alert("Error");
      }
    });
  }

  if (data == "" || despesa == "" || valor == "" || valor < 0) {
    valor < 0 ? $("#valDespesa").select() : alert("Erro: 'Data', 'Entrada' e 'Valor' são campos obrigatórios!");
  }
  else if (confirma) {
    let query = "UPDATE TbDespesasStatus SET dtLanc = ?, data = ?, despesa = ?, valor = ?, statusDesp = ? WHERE id=?;";

    valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [dtLancamento, data, despesa, valor, 0, transfId], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: UPDATE não realizado.") : onInit(1);
        }, errorHandler);
      });

      limparDados();

    } catch (e) {
      alert("Erro: UPDATE não realizado " + e + ".");

    }
    //$("#tbEntrada tbody tr").remove();
    //onInit(1)
    //window.location.reload();
  } else {
    //$("#tbEntrada tbody tr").remove();
    //onInit(1)
    //window.location.reload();
    limparDados();
  }
});

//SALVAR STATUS DESPESAS  
let onStatusDesp = (id) => {

  let verif = $('#' + id).val('checked');

  verif[0].checked == true ? verifStatus(id, 1, true) : verifStatus(id, 0, true)
};

let contar = 0;
// CONSULTA BANCO DADOS, CRIAR LINHA, EXIBIR TELA ENTRADA CAIXA.
function queryAndUpdateOverviewLancaEntrada() {

  convertMes();

  let basemesPag = $('#comparaDt').text(); // document.getElementById("comparaDt").innerText.slice(0, 7);
  let query = 'SELECT * FROM TbEntradas;';

  try {

    let dtDia;
    let dtMes;
    let dtMesAlt;
    let dtFormt;
    let somaEntrada = 0.00;
    let conf = false;
    let copyConfirmar = false;
    let dtMesVerifica;

    localDB.transaction(function (transaction) {

      transaction.executeSql(query, [], function (transaction, results) {

        $("#tbEntrada tbody tr").remove();

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          let verif = row['data'].slice(0, 7) == basemesPag.slice(0, 7) ? true : false;

          dtMesVerifica = row['data'].slice(5, 7);

          if (verif == true) {

            conf = true;

            dtDia = row['data'].substr(8, 10);
            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);
            dtFormt = (dtDia + "/" + dtMesAlt);

            let valorFormat = formataValor(row['valor']);

            $('#tbEntrada > tbody').append(
              '<tr id="' + row['id'] + ' ">' +
              '<td onclick="onUpdateEnt( ' + row['id'] + ' )">' + dtFormt + '</td>' +
              '<td onclick="onUpdateEnt( ' + row['id'] + ' )">' + row['entrada'] + '</td>' +
              '<td> R$ </td>' +
              '<td style="text-align: right; padding-right: 4%;" onclick="onUpdateEnt( ' + row['id'] + ' )">' + valorFormat + '</td>' +
              '<td width="5%><a id="' + row['id'] + '" onclick="onDeleteEntrada( ' +
              row['id'] + ' )"><span class="glyphicon glyphicon-trash"></span></a></td>' +
              '</tr>'
            );
            somaEntrada += parseFloat(row['valor'].replace(",", "."));

          } else if (basemesPag.slice(0, 7) > row['data'].slice(0, 7) && !verif && (i == results.rows.length - 1)) {

            if (!copyConfirmar) {
              copyConfirmar = confirm("Adicionar laçamentos com base no mês anterior?")
            }
            if (copyConfirmar && (dtMesVerifica == (basemesPag.slice(5, 7) - 1))) {

              let ver = row['data'].slice(5, 7);
              ver = parseInt(ver);
              //insertMes( basemesPag.slice(0, 5) + --ver + basemesPag.slice(7))
              insertMesEntrada(basemesPag); //   row['data'])
            }

          }
          else if ((window.location.pathname === "/public/entrada.html") && (conf == false)) {
            document.getElementById("somaEntrada").innerText = "";

            $("#tbEntrada tbody tr").remove();

          }
        }

        valorFormat = formataValor((somaEntrada).toFixed(2).replace(".", ","));

        $("#somaEntrada").html(valorFormat);

      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
}

// UPDATE DADOS BANCO, TELA ENTRADA RECEITA CAIXA
let onUpdateEnt = (id) => {

  $(document).ready(function () {

    convertMes();

    let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

    let queryDesp = "SELECT * FROM TbEntradas;";

    try {

      let dtDia;
      let dtMes;
      let dtMesAlt;
      let dtAno;
      let dtFormt;
      let somaEntrada = 0.0;
      let conf = false;

      localDB.transaction(function (transaction) {

        transaction.executeSql(queryDesp, [], function (transaction, results) {

          $("#tbEntrada tbody tr").remove();

          for (let i = 0; i < results.rows.length; i++) {

            let row = results.rows.item(i);

            verif = row['data'].slice(0, 7) == basemesPag ? true : false;

            if (verif == true) {

              conf = true;

              dtDia = row['data'].substr(8, 10);
              dtMes = row['data'].substr(4, 5);
              dtMesAlt = dtMes.substr(1, 2);
              dtAno = row['data'].substr(2, 2);

              dtFormt = (dtDia + "/" + dtMesAlt);

              if (id == row['id']) {
                transfId = row['id'];

                $('#dtEntrada').val(row['data']).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
                $('#textEntrada').val(row['entrada']).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
                $('#valEntrada').val(formataValor(row['valor'])).css({ 'border-color': '#337ab7', 'color': '#337ab7' });
                $('#btnEntrada').css('display', 'none');
                $('#btnEntEdit').css({ 'display': 'inline-block', 'color': '#337ab7' });
              }
            }
          }
          queryAndUpdateOverviewLancaEntrada();
        }, function (transaction, error) {
          alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
      });
    } catch (e) {
      alert("Erro" + e)
    }
  });
}

// UPDATE SALVAR NO DADOS BANCO, TELA ENTRADA RECEITA CAIXA
let onUpdateEntBd = () => {

  confirma = confirm("Salvar as alterações realizadas ");

  let dtLancamento = formataData();

  let data = document.getElementById("dtEntrada").value;
  let entrada = document.getElementById("textEntrada").value;
  let valor = document.getElementById("valEntrada").value;


  let limparDados = () => {
    $.ajax({
      url: window.location.pathname,
      success: function () {
        $("#itemTbody tr td").remove();
        $('#dtEntrada').val('');
        $('#textEntrada').val('');
        $('#valEntrada').val('');
        $('#btnEntEdit').css({ 'display': 'none' });
        $('#btnEntrada').css({ 'display': 'inline' })
        ///queryAndUpdateOverviewLancaDespesas(true);
        onInit(2);
      },
      error: function () {
        alert("Error");
      }
    });
  }


  if (data == "" || entrada == "" || valor == "" || valor < 0) {
    valor < 0 ? $("#valEntrada").select() : alert("Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
  }
  else if (confirma == true) {
    let query = "UPDATE TbEntradas SET dtLanc = ?, data = ?, entrada = ?, valor = ? WHERE id=?;";

    valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [dtLancamento, data, entrada, valor, transfId], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: UPDATE não realizado.") : onInit(2);;
        }, errorHandler);
      });
    } catch (e) {
      alert("Erro: UPDATE não realizado " + e + ".");
    }
   
    limparDados();
   
    //window.location.reload();
  } else {
   
    limparDados();
   
    //onInit(2);
    //window.location.reload();
  }
};

// // 3. FUNÇAO DE TRATAMENTO E STATUS.

// Tratando erros
errorHandler = function (transaction, error) {
  alert("Erro: " + error.message);
  return true;
}

nullDataHandler = function (transaction, results) {
}

//******************************************/
let insertMesEntrada = (dados) => {

  convertMes();

  dt = dados; // new Date()
  dtDia = '01'; // dt.getDate();
  dtMes = parseInt(dt.slice(5, 7)) < 11 ? ('0' + (parseInt(dt.slice(5, 7)) - 1).toString()) : dt.slice(5, 7) - 1
  dtAno = dt.slice(0, 4);
  dt = [dtAno, dtMes, dtDia].join('-')

  let queryDesp = "SELECT * FROM TbEntradas WHERE data >=  ?  and data <= ?;";
  //console.log(dados, [dtAno, dtMes, dtDia].join('-'));    //dt.toLocaleString('yyyy-MM-dd'));
  try {

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryDesp, [dt, dados], function (transaction, results) {

        console.log(queryDesp, [dt, dados])

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);
          console.log(results.rows);

          let ver = dados.slice(5, 7);
          ver = parseInt(ver);

          let dtLancamento = formataData();
          let data = dados;
          let entrada = row['entrada'];
          let valor = row['valor'];

          valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

          if (data == "" || entrada == "" || valor == "" || valor < 0) {
            valor < 0 ? $("#valEntrada").select() : alert("Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
          }
          else {
            let query = "INSERT INTO TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);";
            try {
              localDB.transaction(function (transaction) {
                transaction.executeSql(query, [dtLancamento, data, entrada, valor], function (transaction, results) {
                  !results.rowsAffected ? alert("Erro: Inserção não realizada") : onInit(2);;
                }, errorHandler);
              });
            } catch (e) {
              alert("Erro: INSERT não realizado " + e + ".");
            }
            $('#dtEntrada').val(formataData()).focus();
            $('#textEntrada').val("");
            $('#valEntrada').val("");
          }
        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  } catch (e) {
    alert("Erro" + e)
  }
}


let insertMesDespesa = (dados) => {

  convertMes();

  dt = dados; // new Date()
  dtDia = '01'; // dt.getDate();
  dtMes = parseInt(dt.slice(5, 7)) < 11 ? ('0' + (parseInt(dt.slice(5, 7)) - 1).toString()) : dt.slice(5, 7) - 1
  dtAno = dt.slice(0, 4);
  dt = [dtAno, dtMes, dtDia].join('-')

  let queryDesp = "SELECT * FROM TbDespesasStatus WHERE data >=  ?  and data <= ?;";
  //console.log(dados, [dtAno, dtMes, dtDia].join('-'));    //dt.toLocaleString('yyyy-MM-dd'));
  try {

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryDesp, [dt, dados], function (transaction, results) {

        console.log(queryDesp, [dt, dados])

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);
          console.log(results.rows);

          let ver = dados.slice(5, 7);
          ver = parseInt(ver);

          let dtLancamento = formataData();
          let data = dados;
          let despesa = row['despesa'];
          let valor = row['valor'];

          valor.length >= 7 ? valor = valor.substr(0, 1) + valor.substr(2) : false

          if (data == "" || despesa == "" || valor == "" || valor < 0) {
            valor < 0 ? $("#valDespesa").select() : alert("Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
          } else {
            var query = "INSERT INTO TbDespesasStatus (dtLanc, data, despesa, valor, statusDesp) VALUES (?, ?, ?, ?, ?);";
            try {
              localDB.transaction(function (transaction) {
                transaction.executeSql(query, [dtLancamento, data, despesa, valor, 0], function (transaction, results) {
                  !results.rowsAffected ? alert("Erro: Inserção não realizada") : onInit(1);;
                }, errorHandler);
              });
            } catch (e) {
              alert("Erro: INSERT não realizado " + e + ".");
            }
            $('#dtDespesa').val(formataData()).focus();
            $('#selectDespesas').val("");
            $('#valDespesa').val("");
          }
        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  } catch (e) {
    alert("Erro" + e)
  }
}



