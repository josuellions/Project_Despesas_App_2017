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
  let retonardt;
  let dtbasepag = document.getElementById("dtReference").innerText;

  let dtBasepg = dtbasepag.substr(0, 3);
  let dtBaseAno = dtbasepag.substr(4);

  let mesExt = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

  mesExt.forEach(function (campo, id) {

    id < 9 ? (id = "0" + ++id) : ++id;

    dtBasepg == campo ? (retonardt = dtBaseAno + "-" + id + "-01") : false

  })

  return document.getElementById("comparaDt").innerHTML = retonardt;
}

// CRIAR BANCO LOCAL WEB
let localDB = null;

function onInit(comp) {

  const alertErroNavegador = "Erro: Seu navegador não permite banco de dados.";

  try {
    !window.openDatabase ? alert(alertErroNavegador) : (initDB(), createTables());

    comp === 1 ? $(document).ready(() => { queryAndUpdateOverviewLancaDespesas() }) : false
    comp === 2 ? $(document).ready(() => { queryAndUpdateOverviewLancaEntrada() }) : false
    comp === 3 ? $(document).ready(() => { queryAndUpdateOverviewVizualizarDespesas() }) : false

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

    'CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);'
  ];

  criarTb.forEach(function (query, id) {

    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [], nullDataHandler, errorHandler);
      });

    } catch (e) {
      alert("Erro: Data base 'TbDespesas' não criada " + e + ".");
      return;
    }
  });
}

//===============================21/12/2017
let dtbaseBd = () => {

  onInit(this.comp);

  let query = "SELECT * FROM TbEntradas;";

  try {

    localDB.transaction(function (transaction) {
      0.00
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
// dtbaseBd( );

// CHECK POSSUI DADOS NO BANCO
onInit(this.comp);
let query = "SELECT * FROM TbEntradas;";

try {

  localDB.transaction(function (transaction) {

    transaction.executeSql(query, [], function (transaction, results) {

      for (let i = 0; i < results.rows.length; i++) {

        let row = results.rows.item(i);

      }

    }, function (transaction, error) {
      alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
    });
  });

} catch (e) {
  alert("Error: SELECT não realizado " + e + ".");
}

// REMOVE DADOS BANCO, TELA ADD DESPESAS
function onDelete(id) {

  let query = "delete from TbDespesas where id=?;";

  try {
    localDB.transaction(function (transaction) {

      transaction.executeSql(query, [id], function (transaction, results) {
        !results.rowsAffected ? alert("E0.00rro: Delete não realizado.") : location.reload();
      }, errorHandler);
    });
  } catch (e) {
    alert("Erro: DELETE não realizado " + e + ".");
  }
}

// REMOVER DADOS DO BANCO TELA ENTRADA DE CAIXA
function onDeleteEntrada(id) {

  let query = "delete from TbEntradas where id=?;";

  try {
    localDB.transaction(function (transaction) {

      transaction.executeSql(query, [id], function (transaction, results) {
        !results.rowsAffected ? alert("Erro: Delete não realizado.") : location.reload();
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
    var query = "insert into TbDespesas (dtLanc, data, despesa, valor) VALUES (?, ?, ?, ?);";
    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [dtLancamento, data, despesa, valor], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: Inserção não realizada") : location.reload();
        }, errorHandler);
      });
    } catch (e) {
      alert("Erro: INSERT não realizado " + e + ".");
    }
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
    let query = "insert into TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);";
    try {
      localDB.transaction(function (transaction) {
        transaction.executeSql(query, [dtLancamento, data, entrada, valor], function (transaction, results) {
          !results.rowsAffected ? alert("Erro: Inserção não realizada") :
            location.reload();
        }, errorHandler);
      });
    } catch (e) {
      alert("Erro: INSERT não realizado " + e + ".");
    }
  }
}

// VARIÁVEL GLOBAL PARA EFETUAR CALCULO TELA VISUALIZAR
// let somaDespesaVisuzaliza = 0.0;
// let somaDespesa = 0.0;
let somaDespesaVisualizar = 0.0;
let cont = 0;

// CONSULTA BANCO DADOS DESPESAS TELA VISUALIZAR
function queryAndUpdateOverviewVizualizarDespesas() {

  convertMes();

  let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

  let queryDesp = "SELECT * FROM TbDespesas;";

  function limparVisualizaDespesas() {
    if (window.location.pathname === "/public/visualiza.html") {

      document.getElementById("totalDespesas").innerText = "0,00";

      document.getElementById("calculototalDespesas").innerText = "0,00";

      document.getElementById("visualizaDesp").innerText = "";

      document.getElementById('totalDespesas'.innerHTML = "");

      somaDespesaVisualizar = 0.0;
    }
  }

  try {
    let dtDia;
    let dtMes;
    let dtMesAlt;
    let dtAno;
    let dtFormt;
    let valorFormat;
    let conf = false;

    // $(document).ready(() => {

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryDesp, [], function (transaction, results) {

        limparVisualizaDespesas()

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          verif = row['data'].slice(0, 7) == basemesPag ? true : false;

          if (verif == true) {

            conf = true;

            let td = document.createElement("td");

            td.setAttribute("id", row['id']);
            td.setAttribute("class", "date col-xs-12");
            td.setAttribute("onclick", "onSelect(this)");

            dtDia = row['data'].substr(8, 10);
            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);

            dtFormt = (dtDia + "/" + dtMesAlt);

            $("#visualizaDesp").append(
              "<tr>" +
              "<td>" + dtFormt + "</td>" +
              "<td>" + row['despesa'] + "</td>" +
              "<td>" + "R$ " + row['valor'] + "</td>" +
              "</tr>"
            );
            somaDespesaVisualizar += parseFloat(row['valor']); // .replace(",", "."))

            valorFormatDespVisualiza = formataValor((somaDespesaVisualizar).toFixed(2).replace('.', ','));

            $("#totalDespesas").html(valorFormatDespVisualiza).css("text-align", "right");
            $("#calculototalDespesas").html(valorFormatDespVisualiza).css("text-align", "right");
            cont = 1;

          } else if (!conf) {

            limparVisualizaDespesas();
          }
        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
    // }) //ready
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
  //   }

  // // CONSULTA BANCO DADOS ENTRADA TELA VISUALIZAR
  //   function queryAndUpdateOverviewVizualizarEntrada( ){

  function limparVisualizaEntrada() {
    if (window.location.pathname === "/public/visualiza.html") {
      document.getElementById("totalEntrada").innerText = "0,00";

      document.getElementById("calculototalEntrada").innerText = "0,00";

      document.getElementById("calculosomaGeral").innerText = "0,00";

      document.getElementById("visualizaEntrada").innerText = "";

      somaEntrada = 0.0;
    }
  }

  queryEntrad = "SELECT * FROM TbEntradas;";
  // let basemesPag;

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

    // $(document).ready(() => {

    // convertMes();

    // let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

    localDB.transaction(function (transaction) {

      transaction.executeSql(queryEntrad, [], function (transaction, results) {

        limparVisualizaEntrada();

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          verif = row['data'].slice(0, 7) == basemesPag ? true : false;

          if (verif == true) {

            conf = true;

            let td = document.createElement("td");

            td.setAttribute("id", row['id']);
            td.setAttribute("class", "date col-xs-12");
            td.setAttribute("onclick", "onSelect(this)");

            dtDia = row['data'].substr(8, 10);
            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);

            dtFormt = (dtDia + "/" + dtMesAlt);

            somaEntrada += parseFloat(row['valor']); //.replace(',', '.'));

            // valorFormat = (row['valor']);

            $("#visualizaEntrada").append(
              "<tr>" +
              "<td>" + dtFormt + "</td>" +
              "<td>" + row['entrada'] + "</td>" +
              "<td>" + "R$ " + row['valor'] + "</td>" +
              "</tr>"
            );

            result = somaEntrada - somaDespesaVisualizar;
            result = formataValor(result.toFixed(2).replace('.', ','));

            valorFormatResult = formataValor(parseFloat(somaEntrada).toFixed(2).replace('.', ','));

            $("#totalEntrada").html(valorFormatResult).css("text-align", "right");
            $("#calculototalEntrada").html(valorFormatResult).css("text-align", "right");

            let comp = (0).toFixed(2).replace('.', ',');

            if (result <= comp) {
              $("#saldoGeral").css({ "color": "rgb(233, 71, 71)", "text-shadow": "0px 0px 2px #337ab7" });
              $("#simboloMoeda").css({ "color": "rgb(233, 71, 71)", "text-shadow": "0px 0px 3px #337ab7" });
              $("#calculosomaGeral").html(result).css({ "text-align": "right", "color": "rgb(233, 71, 71)", "text-shadow": "0px 0px 3px #337ab7" });
            } else {
              $("#calculosomaGeral").html(result).css("text-align", "right");
            }

            //cont = 2;
            //somaDespesaVisualizar = 0.0;

          } else if (!conf) {

            limparVisualizaEntrada();
          }
        }
      }, function (transaction, error) {
        alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
    // }) //ready
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
}
cont = 0;
// CONSULTA BANCO DADOS, CRIA NOVAS LINHAS NA TABELA, TELA ADD DESPESAS.
function queryAndUpdateOverviewLancaDespesas() {



  $(document).ready(function () {

    convertMes();

    let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

    let queryDesp = "SELECT * FROM TbDespesas;";

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

              let valorFormatDespesa = row['valor'];

              $('#tbDespesas > tbody').append(
                '<tr>' +
                '<td width="22%">' + dtFormt + '</td>' +
                '<td width="48%">' + row['despesa'] + '</td>' +
                '<td width="30%">' + "R$ " + valorFormatDespesa + '</td>' +
                '<td width="5%><a href="" id="' + row['id'] + '" onclick="onDelete( ' +
                row['id'] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
                '</tr>'
              );

              somaDespesa += parseFloat(row['valor'].replace(",", "."));
              cont++;
            } else if ((window.location.pathname === "/public/despesas.html") && (conf == false)) {
              document.getElementById("somaDespesas").innerText = "";

              $("#tbDespesas tbody tr").remove();

            }
          }

          valorFormatDespesa = formataValor((somaDespesa).toFixed(2).replace('.', ','));

          $("#somaDespesas").html(valorFormatDespesa);

        }, function (transaction, error) {
          alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
      });
    } catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
    }
  })
}
let contar = 0;
// CONSULTA BANCO DADOS, CRIAR LINHA, EXIBIR TELA ENTRADA CAIXA.
function queryAndUpdateOverviewLancaEntrada() {

  convertMes();

  let basemesPag = document.getElementById("comparaDt").innerText.slice(0, 7);

  let query = 'SELECT * FROM TbEntradas;';



  try {

    let dtDia;
    let dtMes;
    let dtMesAlt;
    let dtAno;
    let dtFormt;
    let somaEntrada = 0.00;
    let formatasomaEntrada;
    let conf = false;

    localDB.transaction(function (transaction) {

      transaction.executeSql(query, [], function (transaction, results) {

        $("#tbEntrada tbody tr").remove();

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          let verif = row['data'].slice(0, 7) == basemesPag ? true : false;

          if (verif == true) {

            conf = true;

            dtDia = row['data'].substr(8, 10);
            dtMes = row['data'].substr(4, 5);
            dtMesAlt = dtMes.substr(1, 2);
            dtAno = row['data'].substr(2, 2);

            dtFormt = (dtDia + "/" + dtMesAlt);

            let valorFormat = row['valor'];

            $('#tbEntrada > tbody').append(
              '<tr>' +
              '<td width="22%">' + dtFormt + '</td>' +
              '<td width="48%">' + row['entrada'] + '</td>' +
              '<td width="30%">' + "R$ " + valorFormat + '</td>' +
              '<td width="5%><a href="" id="' + row['id'] + '" onclick="onDeleteEntrada( ' +
              row['id'] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
              '</tr>'
            );
            somaEntrada += parseFloat(row['valor'].replace(",", "."));


          } else if ((window.location.pathname === "/public/entrada.html") && (conf == false)) {
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

// // 3. FUNÇAO DE TRATAMENTO E STATUS.

// Tratando erros
errorHandler = function (transaction, error) {
  alert("Erro: " + error.message);
  return true;
}

nullDataHandler = function (transaction, results) {
}

// TOTAL DE LINHA SEM REFATORAR 01/12/2017=  514
// TOTAL DE LINHA REFATARADO  01/12/2014 = 380