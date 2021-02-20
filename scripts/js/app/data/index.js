angular.module('dataApp', ['ngResource', 'dataBase'])
.factory('bdquery', function($q, configDataBase){
  let bdquery ={};
  const dataBase = configDataBase();

  bdquery.index = (getQuery, getDados) => {
    //console.log(">> FACTORY QUERY")
    //console.log('>> LIST BD')
    //console.log(getQuery)
    //console.log(getDados)
    return $q((res, rej) => {
      try{
        dataBase.transaction((transaction) => {
          transaction.executeSql(getQuery, getDados, (transaction, results) =>{
            //console.log((results.rows))
            res(results.rows)
          })
        })
      }catch{
        rej({message: "Error: FACTORY QUERY INDEX, falha ao buscar dados no banco dados"})
      }
    })
  },
  bdquery.insert = (getQuery, getDados) => {
    
    return $q((res, rej) => {
      try{
        dataBase.transaction((transaction) => {
          transaction.executeSql(getQuery, getDados, (transaction, results) =>{
            if(!results.rowsAffected){ 
              throw 'Erro';
            }
            //console.log(">> FACTORY QUERY INSERT")
            //console.log(results.rows)
            res(results.rows) //{"message": "Sucesso, informações salvas!"})
          })
        })
      }catch{
        rej({message: 'Error: FACTORY QUERY INSERT, falha ao adicionar dados'})
      }
    })
  },
  bdquery.update = (getQuery, getDados) =>{
    return $q((res, rej) => {
      try{
        //console.log('>> UPDATE STATUS BD')
        //console.log(getQuery)
        //console.log(getDados)
        dataBase.transaction((transaction) => {
          transaction.executeSql(getQuery, getDados, (transaction, results) => {
            if(!results.rowsAffected) {
              //rej({message: 'Error: FACTORY QUERY UPDATE, falha ao atualizar dados'})
              throw 'Error';
            }
              res(results.rows)
          })
        })
      }catch{
        rej({'Error': 'FACTORY QUERY UPDATE, falha ao atualizar dados'})
      }
    })
  },
  bdquery.delete = (getQuery, getDados) =>{
    return $q((res, rej) => {
      //console.log('>> DELETE BD')
      //console.log(getQuery)
      //console.log(getDados)
      try{
        dataBase.transaction((transaction) => {
          transaction.executeSql(getQuery, getDados, (transaction, results) => {
            if(!results.rowsAffected){
             throw 'Error'
            }
              res({message: 'Success: dados excluidos.'})//results.rows)
          })
        })
      }
      catch{
        rej({message: 'Error: FACTORY QUERY DELETE, falha ao excluir dados'})
      }
    })
  }

  return bdquery
})