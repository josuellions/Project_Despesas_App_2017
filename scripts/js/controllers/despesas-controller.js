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
  const formatValorMoney = () => {
    setTimeout(() => {
      //console.log('formatValor')
      $(".money").mask("000.000.000.000,00", { reverse: true });
    }, 120);
  };

  //convertMes();
  formatValorMoney();
  //selectCampoValor();
  
  //let dtConsulta =dtConsultaBD();  
  
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
      //console.log(row.statusDesp)

      despesasFormat.push({
        id: row.id,
        nome: row.despesa,
        dateBd:  row.data,
        dateView: fotmatDateView(row.data),
        valor: formatValor.ptBr(row.valor),
        status: ConvertStatus(row.statusDesp)
      })
      somaDespesa += convertSomarValor(row.valor);
    })

    return {despesas: despesasFormat, total: convertValorView(somaDespesa)}
  }

  const ListaDespesas = () => {
    formatDate.dtConsultaDB().then((response) =>{
      //console.log("CONTROLLER RETURN")
      //console.log(response)
      despesaAction.index([response.inicio, response.fim])
        .then((res) => {
          //console.log('SUCESSS RETURN API')
          const respose = ExibirListaView(res)
          $scope.despesas =  respose.despesas
          $scope.despesaValorTotal = respose.total;
        }).catch((err)=> {
          alert(err.message)
        })
    })
  }
  
  ListaDespesas();

  //Submit Checkbox Status
  $scope.checkedStatus = (id) => {
    //console.log(">>CHECKBOX")
    //console.log(id)
    
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

  const OptionActionEdit = (despesa) => {
    $scope.titleOptions = '';
    $scope.option = 'hidden',
    $scope.optiondel = '',
    $scope.btnSave = 'hidden';
    $scope.btnUpdate = '';
    $scope.editCancel = 'edit-cancel'

    console.log('>> SUBMIT UPDATE DESPESA TRUE')
    console.log(despesa)
    //console.log({id, dateBd, nome, valor})
    //$scope.id = id;
    //$scope.dtLancamento = dateBd
    $scope.formDespesa.nome = despesa.nome;
    $scope.formDespesa.date = new Date(`${despesa.dateBd} 00:00:00`);
    //const dtFormat = GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear())
    $scope.formDespesa.valor = despesa.valor;
  }

  const OptionActionCancel = () => {
    //console.log('>> SUBMIT UPDATE DESPESA FALSE')
    $scope.titleOptions = 'Pago';
    $scope.option = '',
    $scope.optiondel = 'hidden',
    $scope.btnSave = '';
    $scope.btnUpdate = 'hidden';
    $scope.formDespesa = {}
    $scope.editCancel = ''

    $scope.formDespesa.date = new Date();
  }

  //Submit Update Despesas
  $scope.onUpdateDesp = (update, despesa) => { //id, dateBd, nome, valor) => {
    
    console.log('>> SUBMIT UPDATE DESPESA SELECT')
    
    $scope.update = !update;
    OptionActionEdit(despesa);
  }

  $scope.onUpdateDespCancel = (update) => {
    $scope.update = !update;
    OptionActionCancel();
  }

  const RenderizarViewDespesaDelete = (despesa) => {
    const buscadespesa = $scope.despesas.indexOf(despesa)
    $scope.despesas.splice(buscadespesa, 1) //PARA REMOVER SOMENTE O SELECIONADO

    $scope.btnSave = '';
    $scope.btnUpdate = 'hidden';
    $scope.formDespesa = {}

    $scope.formDespesa.date = new Date();

    $scope.despesas.length == 0 ? OptionActionCancel() : false;
  }

  $scope.submitDelete = (despesa) => {
//**DELETE
    //const buscadespesa = $scope.despesas.find(despesa) // $scope.despesas.indexOf(despesa))
    
    despesaAction.delete(despesa)
    .then((res) => {
      alert(`${res.message} Despesa: ${despesa.nome}` )
      RenderizarViewDespesaDelete(despesa)
    })
    .catch((err) => {
      alert(err.message)
    })
    
    
  }

    //Submit Form Despesa
  $scope.submeter = () =>{
    //console.log('>> SUBMIT FORM DESPESA')
    //const despesa = $scope.formDespesa;
    //const buscadespesa = $scope.despesas.indexOf(despesa)
    //$scope.despesas.splice(buscadespesa, 1) //PARA REMOVER SOMENTE O SELECIONADO

    //console.log('>> SUBMIT FORM DESPESA FULL')
    despesaAction.create($scope.formDespesa)//queryAll.selectDespStatusDt, [dtConsulta.inicio, dtConsulta.fim])
    .then((res) => {
      $scope.despesas = {};
      $scope.formDespesa = {};
      $scope.formDespesa.date = new Date();
      setTimeout(() => {
        ListaDespesas();
        //alert("Message: Foi salvo com sucesso!")
      }, 5)
    })
    .catch((err)=> {
      alert(err.message)
    })
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
      
      setTimeout(() => {
          $scope.despesas = {};
          ListaDespesas();
        }, 60);
      })
      .catch((err) => {
        alert(err.message)
      })
    }
});
