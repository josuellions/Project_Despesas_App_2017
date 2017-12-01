// CRIAR BANCO LOCAL WEB
let localDB = null;

function onInit(comp){
        
const alertErroNavegador = "Erro: Seu navegador não permite banco de dados.";

  try {
   
    !window.openDatabase ? alert( alertErroNavegador ) : ( initDB( ), createTables( ) );
      
     comp === 1 ? queryAndUpdateOverviewDesp( ) : false
      comp === 2 ? queryAndUpdateOverviewLancaEntrada( ) : false
        comp === 3 ? ( queryAndUpdateOverview( ), queryAndUpdateOverviewEntrada( ) ) : false
  } catch (e) {
  
    const alertErroVersaoBd = "Erro: Versão de banco de dados inválida.";
    const alertErroDesconhecido = "Erro: Erro desconhecido: ";

    e == 2 ? alert( alertErroVersaoBd ) : alert( alertErroDesconhecido + e + "." );
    
    return;
  }
}
 
function initDB(){
  
  let shortName = 'bdDespesas';
  
  let version = '1.0';
  
  let displayName = 'BdGestorDespesas';
  
  let maxSize = 65536; // Em bytes
  
  localDB = window.openDatabase(shortName, version, displayName, maxSize);
}
 

function createTables(){

  let criarTb = [
        'CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);',
     
        'CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);'
    ];
 
  criarTb.forEach( function( query, id ) {

    try {
      localDB.transaction( function( transaction ) {
        transaction.executeSql( query, [], nullDataHandler, errorHandler );
      } );

    } catch (e) {
        alert("Erro: Data base 'TbDespesas' não criada " + e + ".");
        return;
    }
  } );
}

// REMOVE DADOS BANCO, TELA ADD DESPESAS
function onDelete( id ){

  let query = "delete from TbDespesas where id=?;";

  try {
    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [id], function(transaction, results){
        !results.rowsAffected ? updateStatus("Erro: Delete não realizado.") : location.reload( );
      }, errorHandler);
    });
  }catch (e) {
    updateStatus("Erro: DELETE não realizado " + e + ".");
  }
}

// REMOVER DADOS DO BANCO TELA ENTRADA DE CAIXA
function onDeleteEntrada( id ){

  let query = "delete from TbEntradas where id=?;";

  try {
    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [id], function(transaction, results){
        !results.rowsAffected ? updateStatus("Erro: Delete não realizado.") : location.reload( );
      }, errorHandler);
    });
  } catch (e) {
      updateStatus("Erro: DELETE não realizado " + e + ".");
  }
}
 
// CRIAR DADOS NO BANCO, TELA ADD DESPESAS 
function onCreate( ){

  let data = document.getElementById("dtDespesa").value;
  let despesa = document.getElementById("selectDespesas").value;
  let valor = document.getElementById("valDespesa").value;

  if ( data == "" || despesa == "" || valor == "" || valor < 0 ) {
    valor < 0 ?  $("#valDespesa").select() : alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
  } else {
    var query = "insert into TbDespesas (data, despesa, valor) VALUES (?, ?, ?);";
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [data, despesa, valor], function(transaction, results){
              !results.rowsAffected ? updateStatus("Erro: Inserção não realizada") : location.reload( );
            }, errorHandler);
        });
    }catch (e) {
      updateStatus("Erro: INSERT não realizado " + e + ".");
    }
  }
}

// INSERIR DADOS NO BANCO TELA ENTRADA CAIXA
function onCreateEntrada(){
 
  let data = document.getElementById("dtEntrada").value;
  let entrada = document.getElementById("textEntrada").value;
  let valor = document.getElementById("valEntrada").value;

    if ( data == "" || entrada == "" || valor == "" || valor < 0 ) {
        valor < 0 ?  $("#valEntrada").select() : alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
    }
    else {
        let query = "insert into TbEntradas (data, entrada, valor) VALUES (?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [data, entrada, valor], function(transaction, results){
                    !results.rowsAffected ? updateStatus("Erro: Inserção não realizada") :
                      location.reload( );
                }, errorHandler);
            });
        } catch (e) {
          updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
}
 
// VARIÁVEL GLOBAL PARA EFETUAR CALCULO TELA VISUALIZAR
let somaDespesa = 0.0;

// CONSULTA BANCO DADOS DESPESAS
function queryAndUpdateOverview( ){
 
  let query = "SELECT * FROM TbDespesas;";
  try {

    let dtDia; 
    let dtMes; 
    let dtMesAlt;
    let dtAno; 
    let dtFormt;
   
    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [], function(transaction, results){

        for (let i = 0; i < results.rows.length; i++) {
        
          let row = results.rows.item(i);
          let td = document.createElement( "td" );

					td.setAttribute("id", row['id']);
          td.setAttribute("class", "date col-xs-12");
          td.setAttribute("onclick", "onSelect(this)");

          dtDia = row['data'].substr(8,10);
          dtMes = row['data'].substr(4,5);
          dtMesAlt = dtMes.substr(1,2);
          dtAno = row['data'].substr(2,2);

          dtFormt = ( dtDia + "/" + dtMesAlt );

          somaDespesa += row[ 'valor' ];

          $("#visualizaDesp").append( 
            "<tr>" +
              "<td>" + dtFormt  + "</td>" +
              "<td>" + row[ 'despesa' ]  + "</td>" +
              "<td>" + "R$ " + row['valor'].toFixed(2).replace('.',',') + "</td>" +
            "</tr>"
          );
        }

        $( "#totalDespesas").append( somaDespesa.toFixed( 2 ).replace('.',',') ).css( "text-align", "right" );
        $( "#calculototalDespesas" ).append( somaDespesa.toFixed( 2 ).replace('.',',') ).css( "text-align", "right" );

      }, function(transaction, error){
          updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
     });
    });
  } catch (e) {
    updateStatus("Error: SELECT não realizado " + e + ".");
  }
}

// CONSULTA BANCO DADOS DESPESAS
function queryAndUpdateOverviewEntrada( ){
 
  let query = "SELECT * FROM TbEntradas;";
  let queryDespesas = "SELECT * FROM TbDespesas;";
  
  try {

    let dtDia; 
    let dtMes; 
    let dtMesAlt;
    let dtAno; 
    let dtFormt;
    let somaEntrada = 0.0;
    let resut = 0.0;

    localDB.transaction(function( transaction ){
    
      transaction.executeSql(query, [], function( transaction, results ){
         
        for (let i = 0; i < results.rows.length; i++) {
        
          let row = results.rows.item(i);
          let td = document.createElement( "td" );

          td.setAttribute("id", row['id']);
          td.setAttribute("class", "date col-xs-12");
          td.setAttribute("onclick", "onSelect(this)");


          dtDia = row['data'].substr(8,10);
          dtMes = row['data'].substr(4,5);
          dtMesAlt = dtMes.substr(1,2);
          dtAno = row['data'].substr(2,2);

          dtFormt = ( dtDia + "/" + dtMesAlt );

          somaEntrada += row[ 'valor' ];
          
          $("#visualizaEntrada").append( 
            "<tr>" +
              "<td>" + dtFormt  + "</td>" +
              "<td>" + row[ 'entrada' ]  + "</td>" +
              "<td>" + "R$ " + row['valor'].toFixed(2).replace('.',',') + "</td>" +
            "</tr>"
          );
        }

        $( "#totalEntrada").append( somaEntrada.toFixed( 2 ).replace('.',',') ).css( "text-align", "right" );
        $( "#calculototalEntrada" ).append( somaEntrada.toFixed( 2 ).replace('.',',') ).css( "text-align", "right" );

        resut = somaEntrada - somaDespesa;

        if( resut <= 0 ) {
          $( "#calculosomaGeral" ).append( ( resut ).toFixed(2 ).replace('.',',') ).css( "text-align", "right" );
          $( "#calculosomaGeral" ).css( "color", "red"  );
        } else {
          $( "#calculosomaGeral" ).append( ( resut ).toFixed(2 ).replace('.',',') ).css( "text-align", "right" );
        }
      }, function(transaction, error){
            updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
    });
  } catch (e) {
    updateStatus("Error: SELECT não realizado " + e + ".");
  }
}

// CONSULTA BANCO DADOS, CRIA NOVAS LINHAS NA TABELA, TELA ADD DESPESAS.
function queryAndUpdateOverviewDesp( ){
 
  let query = "SELECT * FROM TbDespesas;";
  
  try {

    let dtDia; 
    let dtMes; 
    let dtMesAlt;
    let dtAno; 
    let dtFormt;
    let somaDespesa = 0.0;

    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [], function(transaction, results){
          
        for (let i = 0; i < results.rows.length; i++) {
      
          let row = results.rows.item(i);

          dtDia = row['data'].substr(8,10);
          dtMes = row['data'].substr(4,5);
          dtMesAlt = dtMes.substr(1,2);
          dtAno = row['data'].substr(2,2);

          dtFormt = ( dtDia + "/" + dtMesAlt );
          
          $( '#tbDespesas > tbody' ).append (
            '<tr>' + 
                '<td width="22%">' + dtFormt + '</td>' +
                '<td width="48%">' + row[ 'despesa' ] + '</td>' +
                '<td width="30%">' + "R$ " + row['valor' ].toFixed(2).replace('.',',') + '</td>' +
                '<td width="5%><a href="" id="' + row[ 'id' ] + '" onclick="onDelete( ' +
                row[ 'id' ] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
            '</tr>'
            );
          somaDespesa += row[ 'valor' ];
          }
        $( "#somaDespesas" ).html( somaDespesa.toFixed(2).replace('.',',') );

      }, function(transaction, error){
          updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  } catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
  }
}

// CONSULTA BANCO DADOS, CRIAR LINHA, EXIBIR TELA ENTRADA CAIXA.
function queryAndUpdateOverviewLancaEntrada( ){

let query = "SELECT * FROM TbEntradas;";

  try {

    let dtDia; 
    let dtMes; 
    let dtMesAlt;
    let dtAno; 
    let dtFormt;
    let somaEntrada = 0.0;

    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [], function(transaction, results){
        
        for (let i = 0; i < results.rows.length; i++) {
        
          let row = results.rows.item(i);

          dtDia = row['data'].substr(8,10);
          dtMes = row['data'].substr(4,5);
          dtMesAlt = dtMes.substr(1,2);
          dtAno = row['data'].substr(2,2);

          dtFormt = ( dtDia + "/" + dtMesAlt );

          $( '#tbEntrada > tbody' ).append (
            '<tr>' + 
                '<td width="22%">' + dtFormt + '</td>' +
                '<td width="48%">' + row[ 'entrada' ] + '</td>' +
                '<td width="30%">' + "R$ " + row['valor' ].toFixed(2).replace('.',',') + '</td>' +
                '<td width="5%><a href="" id="' + row[ 'id' ] + '" onclick="onDeleteEntrada( ' + 
                row[ 'id' ] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
            '</tr>'
          ); 
        somaEntrada += row['valor' ];
        }
        $( "#valTotal").html( somaEntrada.toFixed( 2 ).replace('.',',') );
      }, function(transaction, error){
            updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
    });
  } catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
  }
}
 
// // 3. FUNÇAO DE TRATAMENTO E STATUS.
 
// Tratando erros
errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}
 
nullDataHandler = function(transaction, results){
}

// TOTAL DE LINHA SEM REFATORAR 01/12/2017=  514
// TOTAL DE LINHA REFAROTARADO  01/12/2014 = 380