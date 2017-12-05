// DEFINIR DATA 
function formataData (  ) {
  dt = new Date( )
  let dia = dt.getDate( ), 
      mes = dt.getMonth( ), 
      ano = dt.getFullYear( );

  mes.toString( ).length < 10 ? mes = + parseInt( mes + 1 ) : false;

  dia.toString( ).length == 1 ? dia = '0' + dia : false;
  mes.toString( ).length == 1 ? mes = '0' + mes : false;

  return ano + "-" +  mes + "-" + dia;
}

function formataValor ( valor ) {

  let valorFormatado;
  let cont = valor.length > 6 && valor.length < 9 ? valor.length - 6 : false;
             ( ( valor.length > 6 ) && (valor.length < 9 ) ) ? valorFormatado = valor.substr(0,cont) + "." + valor.substr( cont++ ) : false 

       cont = valor.length > 8 && valor.length < 12 ? valor.length - 9 : false;
             valor.length > 8 && valor.length < 12 ? valorFormatado = valor.substr(0,2 ) + "." + valor.substr(2,3) + "." + valor.substr(5)  : false

      return valorFormatado ? valorFormatado : valor;
}

function convertMes( ){

  let retonardt;
  let dtBasepg = document.getElementById("dtReference").innerHTML.substr(0,3);
  let dtBaseAno = document.getElementById("dtReference").innerHTML.substr(4);

  let mesExt = [ "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ" ];

  mesExt.forEach( function(campo, id ){

    id <= 9 ? (id = "0"+ ++id) : ++id; 
  
    dtBasepg == campo ? ( retonardt = dtBaseAno + "-" + id + "-01" )  : false
     
  })

  return retonardt;
}

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
        'CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor FLOAT NOT NULL);',
     
        'CREATE TABLE IF NOT EXISTS TbEntradas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, dtLanc VARCHAR NOT NULL, data VARCHAR NOT NULL, entrada VARCHAR NOT NULL, valor FLOAT NOT NULL);'
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

let retComp;

// CHECK POSSUI DADOS NO BANCO
function checkBd ( comp ) {
onInit( this.comp );
  let query = "SELECT * FROM TbEntradas;";
  let dtbase; 
  let dtbaseAno; 
  
  try {
    function comparar( retComp ) {

    localDB.transaction(function(transaction){
    
      transaction.executeSql(query, [], function(transaction, results){

        for (let i = 0; i < results.rows.length; i++) {

          let row = results.rows.item(i);

          this.dtbase = row['dtLanc'].substr(0,7);
          this.dtbaseAno = convertMes( ).substr(0,7);
          
          // this.dtbaseAno = 0;  
          // comp_01 == comp_02 ? onInit( this.comp ) : false;
          // console.log(  dtbase == dtbaseAno ? onInit( this.comp ) : false);
          // console.log(this.dtbase, this.dtbaseAno)
         retComp =  comparaMes( this.dtbase, this.dtbaseAno)
         console.log(retComp)
          
        }
        // this.retComp = comparaMes( this.dtbase, this.dtbaseAno)

      }, function(transaction, error){  
          alert("Erro: " + error.code + "<br>Mensagem: " + error.message);
        });
    });
console.log( this.retComp )
    return this.retComp;
  }
  } catch (e) {
    alert("Error: SELECT não realizado " + e + ".");
  }
  // console.log( comparar( ) )
return comparar( );
}

function comparaMes ( comp_01, comp_02 ) {
// console.log(comp_01 == comp_02 ? true : false)
  return comp_01 == comp_02 ? true  : false;
}

$("#OpcaoMesEsquedo").click( function( ) {
  checkBd( 3 )  ;
})

// if ( checkBd( ) ) {
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

    let dtLancamento = formataData( );

    let data = document.getElementById("dtDespesa").value;
    let despesa = document.getElementById("selectDespesas").value;
    let valor = document.getElementById("valDespesa").value;

    if ( data == "" || despesa == "" || valor == "" || valor < 0 ) {
      valor < 0 ?  $("#valDespesa").select() : alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
    } else {
      var query = "insert into TbDespesas (dtLanc, data, despesa, valor) VALUES (?, ?, ?, ?);";
      try {
          localDB.transaction(function(transaction){
              transaction.executeSql(query, [dtLancamento, data, despesa, valor], function(transaction, results){
                !results.rowsAffected ? updateStatus("Erro: Inserção não realizada") : location.reload( );
              }, errorHandler);
          });
      }catch (e) {
        updateStatus("Erro: INSERT não realizado " + e + ".");
      }
    }
  }

  // INSERIR DADOS NO BANCO TELA ENTRADA CAIXA
  function onCreateEntrada( ){

    let dtLancamento = formataData( );
   
    let data = document.getElementById("dtEntrada").value;
    let entrada = document.getElementById("textEntrada").value;
    let valor = document.getElementById("valEntrada").value;

      if ( data == "" || entrada == "" || valor == "" || valor < 0 ) {
          valor < 0 ?  $("#valEntrada").select() : alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
      }
      else {
          let query = "insert into TbEntradas (dtLanc, data, entrada, valor) VALUES (?, ?, ?, ?);";
          try {
              localDB.transaction(function(transaction){
                  transaction.executeSql(query, [dtLancamento, data, entrada, valor], function(transaction, results){
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
  let somaDespesaVisuzaliza = 0.0;
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
      let valorFormat;

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
            valorFormat = formataValor( row['valor'].toFixed(2).replace('.',',') );          

            $("#visualizaDesp").append( 
              "<tr>" +
                "<td>" + dtFormt  + "</td>" +
                "<td>" + row[ 'despesa' ]  + "</td>" +
                "<td>" + "R$ " + valorFormat + "</td>" +
              "</tr>"
            );
          }

          somaDespesaVisuzaliza = somaDespesa;

          somaDespesa = formataValor( somaDespesa.toFixed( 2 ).replace('.',',') )

          $( "#totalDespesas").append( somaDespesa ).css( "text-align", "right" );
          $( "#calculototalDespesas" ).append( somaDespesa ).css( "text-align", "right" );

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

 console.log("aqui")  
   
    let query = "SELECT * FROM TbEntradas;";
    
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

            verificaBd = convertMes( dtAno, dtMes );
            verificaPg = checkBd()
            console.log("Bd => " + verificaBd, "Pg => " + verificaPg)

            dtFormt = ( dtDia + "/" + dtMesAlt );

            somaEntrada += row[ 'valor' ];

            valorFormat = formataValor( row['valor'].toFixed(2).replace('.',',') );

            $("#visualizaEntrada").append( 
              "<tr>" +
                "<td>" + dtFormt  + "</td>" +
                "<td>" + row[ 'entrada' ]  + "</td>" +
                "<td>" + "R$ " + valorFormat + "</td>" +
              "</tr>"
            );
          }
          result = somaEntrada - somaDespesaVisuzaliza;
          result = formataValor( result.toFixed(2 ).replace( '.',',' ) );

          somaEntrada =formataValor( somaEntrada.toFixed( 2 ).replace('.',',') );

          $( "#totalEntrada").append( somaEntrada ).css( "text-align", "right" );
          $( "#calculototalEntrada" ).append( somaEntrada ).css( "text-align", "right" );

          let comp =( 0 ).toFixed(2).replace('.',',');

          if( result <= comp  ) {
            $( "#calculosomaGeral" ).append( result ).css( {"text-align": "right", "color": "red" } );
          } else {
            $( "#calculosomaGeral" ).append( result ).css( "text-align", "right" );
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

            let valorFormat = formataValor( row['valor' ].toFixed(2).replace('.',',') );
            
            $( '#tbDespesas > tbody' ).append (
              '<tr>' + 
                  '<td width="22%">' + dtFormt + '</td>' +
                  '<td width="48%">' + row[ 'despesa' ] + '</td>' +
                  '<td width="30%">' + "R$ " + valorFormat + '</td>' +
                  '<td width="5%><a href="" id="' + row[ 'id' ] + '" onclick="onDelete( ' +
                  row[ 'id' ] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
              '</tr>'
              );
            somaDespesa += row[ 'valor' ];
            }
          valorFormat = formataValor( somaDespesa.toFixed(2).replace('.',',') );
          $( "#somaDespesas" ).html( valorFormat );

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

            let valorFormat = formataValor( row['valor' ].toFixed(2).replace('.',',') );

            $( '#tbEntrada > tbody' ).append (
              '<tr>' + 
                  '<td width="22%">' + dtFormt + '</td>' +
                  '<td width="48%">' + row[ 'entrada' ] + '</td>' +
                  '<td width="30%">' + "R$ " + valorFormat + '</td>' +
                  '<td width="5%><a href="" id="' + row[ 'id' ] + '" onclick="onDeleteEntrada( ' + 
                  row[ 'id' ] + ' )"><span class="glyphicon glyphicon-trash"></a></span></td>' +
              '</tr>'
            ); 
          somaEntrada += row['valor' ];
          }
          valorFormat = formataValor( somaEntrada.toFixed( 2 ).replace('.',',') );
          $( "#valTotal").html( valorFormat );
        }, function(transaction, error){
              updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
          });
      });
    } catch (e) {
        alert("Error: SELECT não realizado " + e + ".");
    }
 }
//   } 
// });

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