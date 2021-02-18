angular
.module('todoApp')
.controller('DespesasController',
function($scope, $http, despesaAction, formatDate, formatValor, pass){
  $scope.id = 0;
  $scope.titleOptions = 'Pago';
  $scope.option = '',
  $scope.optiondel = 'hidden',

  $scope.formDespesa = {};
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

  $scope.update = true;
  $scope.btnSave = '';
  $scope.btnUpdate = 'hidden';
  $scope.formDespesa.date = new Date();

  $scope.passmes = true;
  $scope.classSubTitulo = 'alinharMes';

  //Select campo number - MOVE FACTORY
  /*const selectCampoValor = () => {
    setTimeout(() => {
      $("#valDespesa").click(() => {
        $("#valDespesa").select();
      });
      $("#valEntrada").click(() => {
        $("#valEntrada").select();
      });
    }, 25);
  };
*/
 
  //MOVE FACTORY
  /* ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA */
  const formatValorMoney = () => {
    setTimeout(() => {
      //console.log('formatValor')
      $(".money").mask("000.000.000.000,00", { reverse: true });
    }, 120);
  };

  //convertMes();
  //selectCampoValor();
  
  formatValorMoney();
  
  /*FORMATA VALOR PARA SOMAR*/
    const convertSomarValor = (valor) => {
      return parseFloat(valor.replace(",", "."));
    };

    /*FORMATA VALOR PARA VIEW*/
    const convertValorView = (valorView) => {
      return formatValor.ptBr(valorView.toFixed(2).replace(".", ","));
    };

  //MOVER PARA MODULO PROPRIO
  const ExibirListaView = (dados) => {
    let despesasFormat = [];
    let somaDespesa = 0.00;

    const ConvertStatus = (status) => {
      const Convert = {
        1: () => {
          return true;
        },
        0: () => {
          return false
        },
      }
      
      const convert = Convert[status]
      return convert();
    }

    $.each(dados, (id, row) => {
      despesasFormat.push({
        id: row.id,
        nome: row.despesa,
        dateBd:  row.data,
        dateView: fotmatDateView(row.data),
        valor: row.valor, //formatValor.ptBr(row.valor),
        status: ConvertStatus(row.statusDesp)
      })
      let valor = row.valor.replace('.','')

      somaDespesa += convertSomarValor(valor.replace(',','.'));
    })


    return {despesas: despesasFormat, total: convertValorView(somaDespesa)}
  }

  /*Lista despesas */
  const ListaDespesas = () => {
    //REMOVER - ALERT PARA LEMBRA DE FAZER TRATATIVA DO VALOR, 
    //VERSÃO ANTERIOR ESTA COM PONTO
    alert("FAZER TRATATIVA NO VALOR, VERSÃO ANTERIO ESTÁ COM PONTO!")

    formatDate.dtConsultaDB().then((response) =>{
      despesaAction.index([response.inicio, response.fim])
        .then((res) => {

          if(res.length == 0){
            BuscaDadosMesAnterio(response.inicio);
            return;
          }

          const respose = ExibirListaView(res)
          $scope.despesas =  respose.despesas
          $scope.despesaValorTotal = respose.total;

        }).catch((err)=> {
          alert(err.message)
        })
    }).catch((err) => {
      //console.log(err);
      alert(err.message)
    })
  }
  
  ListaDespesas();

  //Submit Checkbox Status
  $scope.checkedStatus = (id) => {
    
    const dados = {
      id,
      status: document.querySelector(`#checkbox${id}`).checked
    }

    despesaAction.updateStatus(dados)
    .then((res) => {
      return
    }).catch((err) => {
      alert(err.message)
    })
  }

    /*Copiar despesas mẽs anterior, se o mês atual não possuir lançamentos */
    const CopyMesAnterior = (dataInicio, response) =>{

      const date = new Date(dataInicio)
      const dtMesAnteriorFormat = GetDateFormat.mesExtAnoParams(mesExt[date.getMonth()], date.getFullYear())

      if( !confirm(`Adicionar despesas com base no mês anterior,\n "${dtMesAnteriorFormat}"?`) ){
        return;
      }

      despesaAction.copy(response).then((res) => {
        ListaDespesas();
        alert(`${res.message} \n"${dtMesAnteriorFormat}"`)
  
      }).catch((err) => {
        alert(err.message);
      })
    }

  /*Busca despesas mẽs anterior, se o mês atual não possuir lançamentos para copiar */
  const BuscaDadosMesAnterio = (dataInicio) =>{
    //console.log('SUCESSS RETURN API')
    despesaAction.indexMesAnterior(dataInicio).then((res) => {

      if(res.length === 0){
        return;
      }

      CopyMesAnterior(dataInicio, res)

    }).catch((err) => {
      alert(err.message);
    })
  }

  /*Opção para editar despesas - clicando sobre nome despesa */
  const OptionActionEdit = (despesa) => {
    $scope.titleOptions = '';
    $scope.option = 'hidden',
    $scope.optiondel = '',
    $scope.btnSave = 'hidden';
    $scope.btnUpdate = '';
    $scope.editCancel = 'edit-cancel'

    $scope.formDespesa.id = despesa.id;
    $scope.formDespesa.nome = despesa.nome;
    $scope.formDespesa.valor = despesa.valor;
    $scope.formDespesa.date = new Date(`${despesa.dateBd} 00:00:00`);
  }

  /*Cancelar opção de editar despesa - Botão header tabela */
  const OptionActionCancel = () => {
    $scope.titleOptions = 'Pago';
    $scope.option = '',
    $scope.optiondel = 'hidden',
    $scope.btnSave = '';
    $scope.btnUpdate = 'hidden';
    $scope.formDespesa = {}
    $scope.editCancel = ''

    $scope.formDespesa.date = new Date();
  }

  //Ação submit Update Despesas
  $scope.onUpdateDesp = (update, despesa) => { 
    
    $scope.update = !update;
    OptionActionEdit(despesa);
  }

  //Açao cancelar Updade Despesas
  $scope.onUpdateDespCancel = (update) => {
    $scope.update = !update;
    OptionActionCancel();
  }

  /*Recarrega a lista ao deletar uma despesa*/
  const RenderizarViewDespesaDelete = (despesa) => {
    const buscadespesa = $scope.despesas.indexOf(despesa)
    $scope.despesas.splice(buscadespesa, 1) //PARA REMOVER SOMENTE O SELECIONADO
    const totalValor = $scope.despesaValorTotal.replace('.', ''); //REFATORAR
    const recalcularTotal = (parseFloat(totalValor.replace(',','.')) - parseFloat(despesa.valor.replace(',','.')))//REFATORAR

    $scope.despesaValorTotal = convertValorView(recalcularTotal);
  
    $scope.btnSave = '';
    $scope.btnUpdate = 'hidden';
    $scope.formDespesa = {}
    
    $scope.formDespesa.date = new Date();
    $scope.despesas.length == 0 ? OptionActionCancel() : false;
  }

  /*DELETE despesas */
  $scope.submitDelete = (despesa) => {
    //const buscadespesa = $scope.despesas.find(despesa) // $scope.despesas.indexOf(despesa))
    
    if( !confirm(`Deseja excluir despesa? \n ${$scope.formDespesa.nome}`) ){
      return
    }

    despesaAction.delete(despesa)
    .then((res) => {
      alert(`${res.message} \n Despesa: ${despesa.nome}` )
      RenderizarViewDespesaDelete(despesa)
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  /*Limpar formulário despesa */
  const LimparCamposForm = () => {
    $scope.despesas = {};
    $scope.formDespesa = {};
    $scope.formDespesa.date = new Date();
    setTimeout(() => {
      ListaDespesas();
    }, 5)
  }

  /*CREATE - criar despesa */
  const CreateDespesa = () => {
    despesaAction.create($scope.formDespesa)
    .then((res) => {
      LimparCamposForm();
    })
    .catch((err)=> {
      alert(err.message)
    })
  }

  /*UPDATE, atualizar dados despesa */
  const UpdateDespesa = () => {

    if( !confirm(`Deseja atualizar despesa? \n ${$scope.formDespesa.nome}`) ){
       return
    }

    despesaAction.update($scope.formDespesa)
    .then((res) =>{
      LimparCamposForm();
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  //Submit Form Despesa
  $scope.submeter = () =>{

    if($scope.formDespesa.id > 0) {
      UpdateDespesa();
      return;
    } 
    CreateDespesa();
  }

  const dtFull = new Date();
  const dtMes = dtFull.getMonth();
  const  dtAno = dtFull.getFullYear();

  $scope.subtitulo = GetDateFormat.mesExtAnoParams(mesExt[dtMes], dtAno);
  $scope.comparaDt = GetDateFormat.anoFullMesExtDiaParams(mesExt[dtMes], dtAno);

  $scope.submitPassames = async ($returnNext) => {
    pass.Month($returnNext)
    .then((res, rej) => {
      $scope.subtitulo = res.mesExt;
      $scope.comparaDt = res.anoMesDia;
      
      const dt = res.anoMesDia.split('-')
      $scope.formDespesa.date = new Date(parseInt(dt[0]), parseInt(dt[1] -1), parseInt(dt[2]));
      
      setTimeout(() => {
          $scope.despesas = {};
          //OptionActionCancel();
          ListaDespesas();
        }, 60);
      })
      .catch((err) => {
        alert(err.message)
      })
    }
});
