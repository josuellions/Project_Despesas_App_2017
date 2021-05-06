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

  },
  format.bancoDados = (valor) => {
    /* TROCAR PONTO E VIRGULA PARA ENVIAR E SALVAR NO BANCO DADOS */
    let formatValor = valor.replace('.','').trim();
    formatValor = formatValor.replace(',','.');

    return formatValor;
  },
  format.moneyMask = () => {
    /* ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA */
    setTimeout(() => {
      //console.log('formatValor')
      $(".money").mask("000.000.000.000,00", { reverse: true });
    }, 60);
  },
  format.subtrair = (getTotal, getValor) => {
    let total = getTotal.replace('.','').trim();
    total = parseFloat(total.replace(',', '.')).toFixed(2);
    let valor = parseFloat(getValor.replace(',', '.')).toFixed(2);

    const response = (total - valor).toFixed(2)
    
    return response;
  }

  return format;
})