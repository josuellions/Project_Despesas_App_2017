angular
.module('todoApp')
.controller('DespesasController', 
function($scope, $http, despesaAction){

  $scope.despesas = {};
  $scope.despesaValorTotal = {};
  $scope.listaDespesas = [{
    'id': 1,
    'nome':'Luz',
    },
    {
    'id': 2,
    'nome':'Agua',
    },
    {
    'id': 3,
    'nome':'Telefone',
    },
    {
    'id': 4,
    'nome':'NET/TV/Internet',
    },
    {
    'id': 5,
    'nome':'Mercado',
    },
    {
    'id': 6,
    'nome':'Sacolão',
    },
    {
    'id': 7,
    'nome':'Açougue',
    },
    {
    'id': 8,
    'nome':'Padaria',
    },
    {
    'id': 9,
    'nome':'Farmacia',
    },
    {
    'id': 10,
    'nome':'Seguro',
    },
    {
    'id': 11,
    'nome':'Financiamento',
    },
    {
    'id': 12,
    'nome': 'Adicionar Nova Depesa',
    }
  ]

  //Select campo number - MOVE FACTORY
  const selectCampoValor = () => {
    setTimeout(() => {
      $("#valDespesa").click(() => {
        $("#valDespesa").select();
      });
      $("#valEntrada").click(() => {
        $("#valEntrada").select();
      });
    }, 25);
  };

  //MOVE FACTORY
  /* ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA */
  const formatValor = () => {
    setTimeout(() => {
      console.log('formatValor')
      $(".money").mask("000.000.000.000,00", { reverse: true });
    }, 120);
  };

  convertMes();
  formatValor();
  selectCampoValor();
  
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