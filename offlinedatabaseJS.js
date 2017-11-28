let localDB = null;

function onInit(comp){
  try {
   
    if (!window.openDatabase) {
   
        alert("Erro: Seu navegador não permite banco de dados.");
    
    } else {
      
      initDB( );
      createTables( );

      let compara = comp;

      if( compara == 1 ) {

        queryAndUpdateOverviewDesp( );

      } else if  ( comp == 2 ) {

        queryAndUpdateOverviewLancaEntrada( );

      } else {

         queryAndUpdateOverview( );
         queryAndUpdateOverviewEntrada( )

      }
    }
  
  } catch (e) {
    
    if (e == 2) {

      alert("Erro: Versão de banco de dados inválida.");

    } else {
     
      alert("Erro: Erro desconhecido: " + e + ".");
    
    }
    
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
  let queryDespesa = 
    'CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
    'data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);';
 
  let queryEntrada = 
    'CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,' +
    'data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);';
    
    try {
      localDB.transaction( function( transaction ) {
        transaction.executeSql( queryDespesa, [], nullDataHandler, errorHandler );
      } );

      localDB.transaction( function( transaction ) {
        transaction.executeSql( queryEntrada, [], nullDataHandler, errorHandler );
      } );
  
    } catch (e) {
        updateStatus("Erro: Data base 'TbDespesas' não criada " + e + ".");
        return;
    }
}
 
//2. Query e visualização de Update
function onUpdate(){
  let id = document.itemtextareaDisp.id.value;
  let data = document.itemtextareaDisp.data.value;
  let despesa = document.itemtextareaDisp.despesa.value;
  let valor = document.itemtextareaDisp.valor.value;

  if (despesa == "" || data == "" || valor == "" ) {
    updateStatus("'Data' e 'Despesa' são campos obrigatórios!");
  }
  else {
    let query = "update TbDespesas set data=?, despesa=?, valor=? where id=?;";
    try {
      localDB.transaction(function(transaction){
        transaction.executeSql(query, [data, despesa, valor, id], function(transaction, results){
          if (!results.rowsAffected) {
            updateStatus("Erro: Update não realizado.");
          }
          else {
            updateForm("", "", "");
            updateStatus("Update realizado:" + results.rowsAffected);
            queryAndUpdateOverview();
          }
        }, errorHandler);
      });
    
    }catch (e) {
        updateStatus("Erro: UPDATE não realizado " + e + ".");
    }
  }
}
 
function onDelete( id ){

  var id =  id;

  let query = "delete from TbDespesas where id=?;";

  try {
    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [id], function(transaction, results){
        if (!results.rowsAffected) {
            updateStatus("Erro: Delete não realizado.");
        }
        else {
            location.reload( );
        }
      }, errorHandler);
    });
 
  }catch (e) {
    updateStatus("Erro: DELETE não realizado " + e + ".");
  }
}

function onDeleteEntrada( id ){

  var id =  id;
  
  let query = "delete from TbEntradas where id=?;";

  try {
    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [id], function(transaction, results){
        if (!results.rowsAffected) {
            updateStatus("Erro: Delete não realizado.");
        }
        else {
            location.reload( );
        }
      }, errorHandler);
    });
 
  }catch (e) {
    updateStatus("Erro: DELETE não realizado " + e + ".");
  }
}
 
function onCreate(){

  let data = document.getElementById("dtDespesa").value;
  let despesa = document.getElementById("selectDespesas").value;
  let valor = document.getElementById("valDespesa").value;

    if ( data == "" || despesa == "" || valor == "" || valor < 0 ) {

      valor < 0 ?  $("#valDespesa").select() : alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
    }
    else {
        var query = "insert into TbDespesas (data, despesa, valor) VALUES (?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [data, despesa, valor], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        location.reload( );
                    }
                }, errorHandler);
            });
        
        }catch (e) {
         
          updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
}

function onCreateEntrada(){
 
  let data = document.getElementById("dtEntrada").value;
  let entrada = document.getElementById("textEntrada").value;
  let valor = document.getElementById("valEntrada").value;

    if ( data == "" || entrada == "" || valor == "" || valor < 0 ) {

        valor < 0 ?  $("#valEntrada").select() : alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
    }
    else {
        var query = "insert into TbEntradas (data, entrada, valor) VALUES (?, ?, ?);";
        try {
            localDB.transaction(function(transaction){
                transaction.executeSql(query, [data, entrada, valor], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Erro: Inserção não realizada");
                    }
                    else {
                        location.reload( );
                    }
                }, errorHandler);
            });
        
        } catch (e) {
          
          updateStatus("Erro: INSERT não realizado " + e + ".");
        }
    }
}
 
function onSelect(htmlLIElement){
 var id = htmlLIElement.getAttribute("id");
 
 query = "SELECT * FROM TbDespesas where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['data'], row['despesa'], row['valor']);
                
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    
    } catch (e) {
    
      updateStatus("Error: SELECT não realizado " + e + ".");
    
    }
   
}
 
// VARIÁVEL GLOBAL PARA EFETUAR CALCULO TELA VISUALIZAR
let somaDespesa = 0.0;

function queryAndUpdateOverview( ){
 
  //Realiza a leitura no banco e cria novas linhas na tabela.
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
              "<td>" + "R$ " + row['valor'].toFixed(2) + "</td>" +
            "</tr>"
          );
        }

        $( "#totalDespesas").append( somaDespesa.toFixed( 2 ) ).css( "text-align", "right" );
        $( "#calculototalDespesas" ).append( somaDespesa.toFixed( 2 ) ).css( "text-align", "right" );

      }, function(transaction, error){
          updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
     });
    });
  
  } catch (e) {

    updateStatus("Error: SELECT não realizado " + e + ".");
  
  }
}

//Realiza a leitura no banco e cria novas linhas na tabela.
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
              "<td>" + "R$ " + row['valor'].toFixed(2) + "</td>" +
            "</tr>"
          );
        }

        $( "#totalEntrada").append( somaEntrada.toFixed( 2 ) ).css( "text-align", "right" );
        $( "#calculototalEntrada" ).append( somaEntrada.toFixed( 2 ) ).css( "text-align", "right" );

        resut = somaEntrada - somaDespesa;

        if( resut <= 0 ){

          $( "#calculosomaGeral" ).append( ( resut ).toFixed(2 ) ).css( "text-align", "right" );
          $( "#calculosomaGeral" ).css( "color", "red"  );
        
        } else {

          $( "#calculosomaGeral" ).append( ( resut ).toFixed(2 ) ).css( "text-align", "right" );
        }

      }, function(transaction, error){
            updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
    });

  } catch (e) {
    
    updateStatus("Error: SELECT não realizado " + e + ".");
  
  }
}

//Realiza a leitura no banco e cria novas linhas na tabela.
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
                '<td width="30%">' + "R$ " + row['valor' ].toFixed(2) + '</td>' +
                '<td width="5%><a href="" id="' + row[ 'id' ] + '" onclick="onDelete( ' +
                row[ 'id' ] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
            '</tr>'
            );

           somaDespesa += row[ 'valor' ];

          }

        $( "#somaDespesas" ).html( somaDespesa.toFixed(2) );

      }, function(transaction, error){
          updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
      });
    });
  
  } catch (e) {
  
    alert("Error: SELECT não realizado " + e + ".");
  
  }
}

//Realiza a leitura no banco e cria novas linhas na tabela.
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
                '<td width="30%">' + "R$ " + row['valor' ].toFixed(2) + '</td>' +
                '<td width="5%><a href="" id="' + row[ 'id' ] + '" onclick="onDeleteEntrada( ' + 
                row[ 'id' ] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
            '</tr>'
          ); 

        somaEntrada += row['valor' ];

        }

        $( "#valTotal").html( somaEntrada.toFixed( 2 ) );

      }, function(transaction, error){
            updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
    });
  } 
  catch (e) {
      alert("Error: SELECT não realizado " + e + ".");
  }
}
 
// 3. FUNÇAO DE TRATAMENTO E STATUS.
 
// Tratando erros
errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}
 
nullDataHandler = function(transaction, results){
}