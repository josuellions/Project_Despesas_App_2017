angular.module('apiApp', ['ngResource', 'dataApp' ])//'dataBase'])
.factory('api', function ($q, bdquery ) {//, configDataBase ) {
  
  let api = {};

  const accessServerAPI = (url, method) => {

    var settings = {
      'async': false,
      'crossDomain': false,
      'url': url,
      'method': method,
      'headers': {
        'content-type': 'application/x-www-form-urlencoded',
        'cache-control': 'no-cache',
      }
    }

    return $.ajax(settings).done(function (res) {
      return res
    });
  }

  api.downloadLocal = (getQuery) =>{
    return $q((res, rej) => {
      try{
        res(bdquery.restaureLocal(getQuery))
      }catch{
        rej({message: 'Error: FACTORY API DOWNLOAD LOCAL, ler dados JSON'})
      }
    })
  },
  api.conectionAPI = (getConextion) =>{
    return $q((res, rej) => {
      try{
        //res($http.get(`http://${getConextion}/connection`))
        res(accessServerAPI(`http://${getConextion}/connection`, 'GET'))
      }catch{
        rej({message: 'Error: FACTORY API CONECTION, falha ao conectar'})
      }
    })
  },
  api.downloadAPI = (getConextion) =>{
    return $q((res, rej) => {
      try{
        //res($http.get(`http://${getConextion}/backup/download`))
        const response = accessServerAPI(`http://${getConextion}/backup/download`, 'GET')
        res({
          data: response.responseJSON
        })
      }catch{
        rej({message: 'Error: FACTORY API CONECTION, falha ao buscar dados'})
      }
    })
  },
  api.index = (getQuery, getDados ) =>{
    return $q((res, rej) => {
      try{
        res(bdquery.index(getQuery, getDados))
      } catch {
        rej({message: 'Error: FACTORY API INDEX, falha ao lista dados'})
      }
    })
  },
  api.create = (getQuery, getDados) => {
    return $q((res, rej) => {
      try{
        res(bdquery.insert(getQuery, getDados))
      } catch {
        rej({message: 'Error: FACTORY API CREATE, falha ao salvar dados'})
      }
    })
  },
  api.update = (getQuery, getDados) => {
    return $q((res, rej) =>{
      try{
        res(bdquery.update(getQuery, getDados))
      } catch {
        rej({message: 'Error: FACTORY API UPDATE, falha ao atualizar dados'})
      }
    })
  }
  api.delete = (getQuery, getDados) => {
    return $q((res, rej) => {
      try{
        res(bdquery.delete(getQuery, getDados))
      } catch {
        rej({message: 'Error: FACTORY API DELETE, falha ao excluir dados'})
      }
    })
  }

  return api
})
