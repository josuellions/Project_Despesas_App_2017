angular
  .module('apiApp', ['ngResource', 'dataApp']) //'dataBase'])
  .factory('api', function ($q, bdquery) {
    //, configDataBase ) {

    let api = {};

    const accessServerAPI = (url, method, data) => {
      var settings = {
        async: false,
        crossDomain: false,
        url: url,
        type: method,
        dataType: 'json',
        data: JSON.stringify(data), //$(data).serialize()
        headers: {
          'content-type': 'application/json', //'application/x-www-form-urlencoded',
          'cache-control': 'no-cache',
        },
      };

      return $.ajax(settings).done(function (res) {
        //console.log(">>RES API")
        //console.log(res)
        return res;
      });
    };

    api.conectionAPI = (getConextion) => {
      return $q((res, rej) => {
        try {
          //res($http.get(`http://${getConextion}/connection`))
          res(accessServerAPI(`http://${getConextion}/connection`, 'GET'));
        } catch {
          rej({ message: 'Error: FACTORY API CONECTION, falha ao conectar' });
        }
      });
    };
    api.listaBackupsdAPI = (getConextion) => {
      return $q((res, rej) => {
        try {
          //res($http.get(`http://${getConextion}/backup/download`))
          const response = accessServerAPI(
            `http://${getConextion}/backup/lists`,
            'GET'
          );
          res({
            data: response.responseJSON,
          });
        } catch {
          rej({
            message:
              'Error: FACTORY API CONECTION, falha ao buscar dados na API',
          });
        }
      });
    };
    api.downloadLocal = (getQuery) => {
      return $q((res, rej) => {
        try {
          res(bdquery.restaureLocal(getQuery));
        } catch {
          rej({ message: 'Error: FACTORY API DOWNLOAD LOCAL, ler dados JSON' });
        }
      });
    };
    api.downloadAPI = (getConextion, getFile) => {
      return $q((res, rej) => {
        try {
          //res($http.get(`http://${getConextion}/backup/download`))
          const response = accessServerAPI(
            `http://${getConextion}/backup/download`,
            'POST',
            { file: getFile }
          );
          res({
            data: response.responseJSON,
          });
        } catch {
          rej({
            message:
              'Error: FACTORY API CONECTION, falha ao buscar dados na API',
          });
        }
      });
    };
    api.uploadAPI = (getConextion, getData) => {
      const dataEncodeBase64 = btoa(JSON.stringify(getData));

      return $q((res, rej) => {
        try {
          //res($http.get(`http://${getConextion}/backup/download`))
          //res("OK");
          const response = accessServerAPI(
            `http://${getConextion}/backup/upload`,
            'POST',
            //getData
            { data: dataEncodeBase64 }
          );
          res({
            data: response.responseJSON,
          });
        } catch {
          rej({
            message:
              'Error: FACTORY API CONECTION, falha enviar dados para API',
          });
        }
      });
    };
    api.index = (getQuery, getDados) => {
      return $q((res, rej) => {
        try {
          res(bdquery.index(getQuery, getDados));
        } catch {
          rej({ message: 'Error: FACTORY API INDEX, falha ao lista dados' });
        }
      });
    };
    api.create = (getQuery, getDados) => {
      return $q((res, rej) => {
        try {
          res(bdquery.insert(getQuery, getDados));
        } catch {
          rej({ message: 'Error: FACTORY API CREATE, falha ao salvar dados' });
        }
      });
    };
    api.update = (getQuery, getDados) => {
      return $q((res, rej) => {
        try {
          res(bdquery.update(getQuery, getDados));
        } catch {
          rej({
            message: 'Error: FACTORY API UPDATE, falha ao atualizar dados',
          });
        }
      });
    };
    api.delete = (getQuery, getDados) => {
      return $q((res, rej) => {
        try {
          res(bdquery.delete(getQuery, getDados));
        } catch {
          rej({ message: 'Error: FACTORY API DELETE, falha ao excluir dados' });
        }
      });
    };

    return api;
  });
