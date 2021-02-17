angular.module('formatValorServices', ['ngResource'])
.factory('formatValor', function($q){

  let format = {};

  format.ptBr = (valor) => {
    
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

  }
  

  return format;
})