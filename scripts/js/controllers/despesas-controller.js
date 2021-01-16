angular
.module('todoApp')
.controller('DespesasController', 
function($scope, $http, despesaAction){

  $scope.despesas = {};
  $scope.despesaValorTotal = {};

  convertMes();
  const dtConsulta = dtConsultaBD();

  //MOVER PARA MODULO PROPRIO
  const ExibirListaView = (dados) => {
    let despesasFormat = [];
    let somaDespesa = 0.00;
    $.each(dados, (id, row) => {
      despesasFormat.push({
        id: row.id,
        nome: row.despesa,
        date: fotmatDateView(row.data),
        valor: formataValor(row.valor),
        status: row.statusDesp //> 0 ? true : false
      })
      somaDespesa += convertSomarValor(row.valor);
    })
    $scope.despesas = despesasFormat;
    $scope.despesaValorTotal = convertValorView(somaDespesa);
  }
  //limparTableVisualizar("tbDespesas > tbody > tr");

  despesaAction.index(queryAll.selectDespStatusDt, [dtConsulta.inicio, dtConsulta.fim])
  .then((res) => {
    console.log('SUCESSS RETURN API')
    ExibirListaView(res)
  }).catch((err)=> {
    console.log(err)
  })
});