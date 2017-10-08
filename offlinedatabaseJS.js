var localDB = null;

function onInit(comp){
    try {
        if (!window.openDatabase) {
            alert("Erro: Seu navegador não permite banco de dados.");
        }
        else {
            initDB( );
            createTables( );

            // let pathname = (window.location.pathname).substr(1); // Retorna só o path

            let compara = comp;

            if( compara == 1 ) {
                queryAndUpdateOverviewDesp( );
                alert("QueryDesp")
            }else{
                queryAndUpdateOverview( );
                alert("QueryVizual")
            }
        }
    } 
    catch (e) {
        if (e == 2) {
            // updateStatus("Erro: Versão de banco de dados inválida.");
            alert("Erro: Versão de banco de dados inválida.");
        }
        else {
            // updateStatus("Erro: Erro desconhecido: " + e + ".");
            alert("Erro: Erro desconhecido: " + e + ".");
        }
        return;
    }
}
 
function initDB(){
    var shortName = 'bdDespesas';
    var version = '1.0';
    var displayName = 'BdGestorDespesas';
    var maxSize = 65536; // Em bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}
 
function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS TbDespesas(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, data VARCHAR NOT NULL, despesa VARCHAR NOT NULL, valor VARCHAR NOT NULL);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            // updateStatus("Tabela 'TbDespesas' status: OK.");
        });
    } 
    catch (e) {
        updateStatus("Erro: Data base 'TbDespesas' não criada " + e + ".");
        return;
    }
}
 
//2. Query e visualização de Update
function onUpdate(){
    var id = document.itemtextareaDisp.id.value;
    var data = document.itemtextareaDisp.data.value;
    var despesa = document.itemtextareaDisp.despesa.value;
    var valor = document.itemtextareaDisp.valor.value;

    if (despesa == "" || data == "" || valor == "" ) {
        updateStatus("'Data' e 'Despesa' são campos obrigatórios!");
    }
    else {
        var query = "update TbDespesas set data=?, despesa=?, valor=? where id=?;";
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
        } 
        catch (e) {
            updateStatus("Erro: UPDATE não realizado " + e + ".");
        }
    }
}
 
function onDelete(){
    var id = document.itemtextareaDisp.id.value;
    
    var query = "delete from TbDespesas where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Erro: Delete não realizado.");
                }
                else {
                    updateForm("", "", "");
                    updateStatus("Linhas deletadas:" + results.rowsAffected);
                    queryAndUpdateOverview();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Erro: DELETE não realizado " + e + ".");
    }
    
}
 
function onCreate(){
    var data = document.getElementById("dtDespesa").value;
    var despesa = document.getElementById("textDespesa").value;
    let valor = document.getElementById("valDespesa").value;

    // console.log( data, despesa, valor)

    if ( data == "" || despesa == "" || valor == "") {
        // updateStatus("Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");
        alert( "Erro: 'Data', 'Despesa' e 'Valor' são campos obrigatórios!");

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
                        // updateForm("", "", "");
                        // updateStatus("Inserção realizada, linha id: " + results.insertId);
                        // queryAndUpdateOverview();
                        // queryAndUpdateOverviewDesp( );
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
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
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
   
}
 

function queryAndUpdateOverview(){
 
 //Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
 
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
    
 //Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM TbDespesas;";
    try {

        let dtDia; 
        let dtMes; 
        let dtMesAlt;
        let dtAno; 
        let dtFormt;

        $( "#itemData").html(" Data " + "  |  " + "  Despesas  " + "  |  " + "  Valor " + "\n" +
            "======================");

        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
 										li.setAttribute("id", row['id']);
                    li.setAttribute("class", "date col-xs-12");
                    li.setAttribute("onclick", "onSelect(this)");


                    dtDia = row['data'].substr(8,10);
                    dtMes = row['data'].substr(4,5);
                    dtMesAlt = dtMes.substr(1,2);
                    dtAno = row['data'].substr(2,2);

                    dtFormt = ( dtDia + "/" + dtMesAlt + " | " + row['despesa'] + " | " + "R$ " + row['valor']); //+ "/" + dtAno;
                    
                    var liText = document.createTextNode( dtFormt );
                    li.appendChild(liText);
                    
                    document.getElementById("itemData").appendChild(li);

    // document.getElementById( "textareaDisp").innerHTML += row['id'] + "  |  " + row['data'] + "  |  " + row['despesa'] + "\n";

                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: SELECT não realizado " + e + ".");
    }
}

function queryAndUpdateOverviewDesp(){
 
 //Remove as linhas existentes para inserção das novas
    var dataRows = $("tbody > tr").length;

    while (dataRows.length > 0) {
        row = dataRows[0];
        $("#tbDespesas > tbody > tr").removeChild(row);
    };
    
 //Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM TbDespesas;";
    try {

        let dtDia; 
        let dtMes; 
        let dtMesAlt;
        let dtAno; 
        let dtFormt;

        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    // var li = document.createElement("li");
                    //                     li.setAttribute("id", row['id']);
                    // li.setAttribute("class", "date col-xs-12");
                    // li.setAttribute("onclick", "onSelect(this)");


                    dtDia = row['data'].substr(8,10);
                    dtMes = row['data'].substr(4,5);
                    dtMesAlt = dtMes.substr(1,2);
                    dtAno = row['data'].substr(2,2);

                    dtFormt = ( dtDia + "/" + dtMesAlt );
                    
                    // var liText = document.createTextNode( dtFormt );
                    // li.appendChild(liText);
                    
                    // document.getElementById("itemData").appendChild(li);


            $( '#tbDespesas > tbody' ).append (
                                    '<tr>' + '<td width="22%">' + dtFormt + '</td>' +
                                        '<td width="48%">' + row[ 'despesa' ] + '</td>' +
                                        '<td width="30%">' + "R$ " + row['valor' ] + '</td>' +
                                    '</tr>'
                                    );

    // document.getElementById( "textareaDisp").innerHTML += row['id'] + "  |  " + row['data'] + "  |  " + row['despesa'] + "\n";

                }
            }, function(transaction, error){
                updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        alert("Error: SELECT não realizado " + e + ".");
    }
}


 
// 3. Funções de tratamento e status.
 
// Tratando erros
 
errorHandler = function(transaction, error){
    updateStatus("Erro: " + error.message);
    return true;
}
 
nullDataHandler = function(transaction, results){
}
 
// Funções de update
 
function updateForm(dt, desp, val){

    // document.itemForm.dt.value = dt;
    // document.itemForm.desp.value = desp;
    // document.itemForm.val.value = val;

    // document.itemTbody.dt.value = dt;
    // document.itemTbody.desp.value = desp;
    // document.itemTbody.val.value = val;
}
 
// function updateStatus(status){
//     document.getElementById('status').innerHTML = status;
// }