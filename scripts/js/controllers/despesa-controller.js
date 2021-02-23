angular
.module('todoApp')
.controller('DespesaController',
function($scope, $http, despesaAction, alertAction, formatDate, formatValor, pass){
  $scope.id = 0;
  $scope.titulo = 'Adicionar Despesas';
  $scope.titleOptions = 'Pago';
  $scope.option = '',
  $scope.optiondel = 'hidden',
  $scope.formDespesa = {};
  $scope.despesas = {};
  $scope.despesaValorTotal = '0,00';
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

  $editCancel = 'hidden';
  $scope.update = true;
  $scope.btnSave = '';
  $scope.btnUpdate = 'hidden';
  $scope.formDespesa.date = new Date();

  $scope.passmes = true;
  $scope.classSubTitulo = 'alinharMes';

  /* ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA */
  /*const formatValorMoney = () => { //MOVIDO PARA FACTORY format-valor
    setTimeout(() => {
      //console.log('formatValor')
      $(".money").mask("000.000.000.000,00", { reverse: true });
    }, 60);
  };*/

  /*const formatValorBD = (valor) => { //MOVIDO PARA FACTORY format-valor
    let formatValor = valor.replace('.','').trim();
    formatValor = formatValor.replace(',','.');

    //console.log("FORMAT VALOR")
    //console.log(formatValor)
    return formatValor//.replace(',','.')
  }*/

  //convertMes();
  //selectCampoValor();
  
  //formatValorMoney();
  //formatValor.moneyMask();

  /*FORMATA VALOR PARA SOMAR*/
  /*const convertSomarValor = (valor) => {
    return parseFloat(valor.replace(",", "."));
  };*/

  /*FORMATA VALOR PARA VIEW*/ //MOVIDO PARA FACTORY
  /*const convertValorView = (valorView) => {
    return formatValor.ptBr(valorView);
  };*/

  /*Limpar formulário despesa */
  const LimparCamposForm = () => {
    $scope.despesas = {};
    $scope.formDespesa = {};
    $scope.formDespesa.date = new Date();
    ListaDespesas();
  }

  /*INDEX - Formatar dados para exibir na table view */
  const ExibirListaView = (dados) => {
    let despesasFormat = [];
    let somaDespesa = 0;

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

    for(let row of dados) {
      despesasFormat.push({
        id: row.id,
        nome: row.despesa,
        dateBd:  row.dtLanc,
        dateView: formatDate.dtView(row.data),
        valor: row.valor.toFixed(2),
        status: ConvertStatus(row.statusDesp)
      })

      somaDespesa += parseFloat(row.valor);
    }

    $scope.despesas =  despesasFormat;
    $scope.despesaValorTotal = formatValor.ptBr(somaDespesa.toFixed(2).replace('.', ','));
    formatValor.moneyMask();

    //return {despesas: despesasFormat, total: formatValor.ptBr(somaDespesa.toFixed(2).replace('.', ','))}
  }

  /*COPY - Copiar despesas mẽs anterior, se o mês atual não possuir lançamentos */
  const CopyMesAnterior = (dataInicio, response) =>{

    const date = new Date(dataInicio)
    const dtMesAnteriorFormat = GetDateFormat.mesExtAnoParams(mesExt[date.getMonth()], date.getFullYear())

    alertAction.question(`Adicionar despesas com base no mês anterior,\n "${dtMesAnteriorFormat}"?`, 
    action.copyDespesa, {dados: response, date: dtMesAnteriorFormat})
    .catch((err) =>{
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  /*

    if( !confirm(`Adicionar despesas com base no mês anterior,\n "${dtMesAnteriorFormat}"?`) ){
      return;
    }

    despesaAction.copy(response).then((res) => {
      alert(`${res.message} \n"${dtMesAnteriorFormat}"`)
      ListaComTimeOut();
    }).catch((err) => {
      //alert(err.message);
      alertAction.error(err.message).then((res) =>{
        return;
      }).catch((err) =>{
        alert(err.message);
      })
    })
    */
  }

  /*COPY - Busca despesas mẽs anterior, se o mês atual não possuir lançamentos para copiar */
  const BuscarDadosMesAnterior = (dataInicio) =>{
        
    despesaAction.indexMesAnterior(dataInicio).then((res) => {

      if(res.length === 0){
        return;
      }

      CopyMesAnterior(dataInicio, res)

    }).catch((err) => {
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }

  /*DELETE - Recarrega a lista ao deletar uma despesa*/
  const RenderizarViewDespesaDelete = (despesa) => {

    let totalValor = $scope.despesaValorTotal.replace('.','').trim();
    let valor = despesa.valor.replace(',', '.');
    totalValor = totalValor.replace(',', '.');
    
    const recalcularTotal = (parseFloat(totalValor).toFixed(2) - parseFloat(valor).toFixed(2) )
    const buscadespesa = $scope.despesas.indexOf(despesa)
    
    $scope.despesas.splice(buscadespesa, 1) //PARA REMOVER SOMENTE O SELECIONADO
    $scope.btnSave = '';
    $scope.btnUpdate = 'hidden';
    $scope.formDespesa = {}
    
    $scope.formDespesa.date = new Date();
    $scope.despesas.length == 0 ? OptionActionCancel() : false;
    
    $scope.despesaValorTotal = formatValor.ptBr(parseFloat(recalcularTotal).toFixed(2).replace('.', ','))

    //setTimeout(() => {
      alertAction.success(`Sucesso: "${despesa.nome}" foi excuido!`);
    //}, 60);

  }

  /* Action Despesas CRUD */
  const Actions  = () => {
    /*CREATE - criar despesa */
    const createDespesa = () => {
      //$scope.formDespesa.valor = formatValor.bancoDados($scope.formDespesa.valor); //formatValorBD($scope.formDespesa.valor);
      formatDate
      despesaAction.create($scope.formDespesa)
      .then((res) => {
        LimparCamposForm();
      })
      .catch((err)=> {
        alertAction.error(err.message).catch((err) =>{
          alert(err.message);
        })
      })
    };
    /*UPDATE, atualizar dados despesa */
    const updateDespesa = () =>{
      //$scope.formDespesa.valor = getDados.valor;
      despesaAction.update($scope.formDespesa)
      .then((res) =>{
        alertAction.success("Despesa atualizada com sucesso");
        LimparCamposForm();
      })
      .catch((err) => {
        //alert(err.message)
        alertAction.error(err.message).catch((err) =>{
          alert(err.message);
        })
      })
    };
    /*COPY - create copiando dados do mês anterio das Despesas*/
    const copyDespesa = (getDados)=>{
      despesaAction.copy(getDados.dados).then((res) => {
        ListaComTimeOut();
        alertAction.info(`${res.message} \n"${getDados.date}"`).catch((err) => {
          alertAction.error(err.message).catch((err) =>{
            alert(err.message);
          })
        })
      }).catch((err) => {
        alertAction.error(err.message).catch((err) =>{
        alert(err.message);
        })
      })
    };
    /*DELETE - excluir dados Despesa */
    const deleteDespesa = (getDados) => {
      despesaAction.delete(getDados.dados)
      .then((res) => {
        //alert(`${res.message} \n Despesa: ${despesa.nome}` )
        RenderizarViewDespesaDelete(getDados.dados)
      })
      .catch((err) => {
        alertAction.error(err.message).catch((err) =>{
          alert(err.message);
        })
      })
    }

    return {
      copyDespesa,
      createDespesa,
      deleteDespesa,
      updateDespesa
    }
  }

  const action = Actions();

  /*INDEX - Lista despesas */
  const ListaDespesas = () => {
    formatDate.dtConsultaDB().then((response) =>{
      despesaAction.index([response.inicio, response.fim]).then((res) => {

          if(res.length === 0){
            BuscarDadosMesAnterior(response.inicio);
            $scope.despesaValorTotal = '0,00';
            return;
          }

          /*const respose = ExibirListaView(res)
          $scope.despesas =  respose.despesas
          $scope.despesaValorTotal = respose.total;
          //formatValorMoney();
          formatValor.moneyMask();*/
          ExibirListaView(res)

        }).catch((err)=> {
          alertAction.error(err.message).catch((err) =>{
            alert(err.message);
          })
        })
    }).catch((err) => {
      //console.log(err);
      //alert(err.message)
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }
  /*INDEX - Exibir Lista Despesas com Delay*/
  const ListaComTimeOut = () => {
    setTimeout(() => {
      ListaDespesas();
    }, 5);
  }

  /*UPDATE - Opção para editar despesas - clicando sobre nome despesa */
  const OptionActionEdit = (despesa) => {
    $scope.formDespesa = {};

    $scope.money = ''; //Verificar se está em uso excluir
    $scope.titleOptions = '';
    $scope.option = 'hidden',
    $scope.optiondel = '',
    $scope.btnSave = 'hidden';
    $scope.btnUpdate = '';
    $scope.editCancel = 'edit-cancel'

    $scope.formDespesa.id = despesa.id;
    $scope.formDespesa.nome = despesa.nome;
    $scope.formDespesa.valor = formatValor.ptBr(parseFloat(despesa.valor).toFixed(2).replace('.', ','));
    $scope.formDespesa.date = new Date(`${despesa.dateBd} 00:00:00`);
    
    $("#valDespesa").click(() => {
      $("#valDespesa").select();
    });
  }
  
  /*UPDATE - Cancelar opção de editar despesa - Botão header tabela */
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

  /*UPDATE - Exibir alert confimação para atualizar dados Despesa */
  const AlertUpdateDespesa = () => {
    dados = {
      message:`Deseja atualizar despesa "${$scope.formDespesa.nome}"?`,
      //valor: formatValor.bancoDados($scope.formDespesa.valor), //formatValorBD($scope.formDespesa.valor),
      action: action.updateDespesa,
    }
    alertAction.question(dados.message, dados.action,'').catch((err) =>{
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }

  /*Validar campos do FORM */
  const ValidCampos = () =>{
    let despesa = String($scope.formDespesa.nome).length;
    let valor = String($scope.formDespesa.valor);
    let date = String($scope.formDespesa.date);

    if(valor === 'undefined' || valor.length === 0 || despesa === 0 || $scope.formDespesa.nome === undefined ||   date.length === 0 || date === 'undefined') {
      alertAction.info('Vefique, Todos os Campos são Obrigatórios').then((res)=>{
        return false;
      }).catch((err) =>{
        alert(err.message)
        return false;
      })
      return false;
    }
    return true;
  }

  //CREATE | UPDATE - Submit Form Despesa
  $scope.submeter = () =>{
  
    if(!ValidCampos()){
      return
    }

    if($scope.formDespesa.id > 0) {
      AlertUpdateDespesa();
      return;
    } 

    action.createDespesa();
  }

  //UPDATE - Submit Checkbox Status
  $scope.checkedStatus = (id) => {
  
    const dados = {
      id,
      status: document.querySelector(`#checkbox${id}`).checked
    }

    despesaAction.updateStatus(dados)
    .then((res) => {
      return
    }).catch((err) => {
      //alert(err.message)
      alertAction.error(err.message).then((res) =>{
        return
      }).catch((err) =>{
        alert(err.message);
      })
    })
  }

  //UPDATE - Ação submit Update Despesas
  $scope.onUpdateDespesa = (update, despesa) => { 
    
    $scope.update = !update;
    OptionActionEdit(despesa);
  }

  //UPDATE - Açao cancelar Updade Despesas
  $scope.onUpdateDespCancel = (update) => {
    $scope.update = !update;
    OptionActionCancel();
  }

  /*DELETE - Ação para deletar despesas */
  $scope.submitDelete = (despesa) => {
    //const buscadespesa = $scope.despesas.find(despesa) // $scope.despesas.indexOf(despesa))
    
   /* if( !confirm(`Deseja excluir despesa? \n ${$scope.formDespesa.nome}`) ){
      return
    }*/
    
    //alertAction.question(`Deseja excluir despesa? \n ${$scope.formDespesa.nome}`, Despesa['delete'], {dados: despesa})
    alertAction.question(`Deseja excluir despesa? "${$scope.formDespesa.nome}"?`, action.deleteDespesa, {dados: despesa})
    .catch((err) =>{
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }

  /*Adicionar data inicial no Submenu - passar mês | MES/ANO => JAN/2020 */
  pass.MonthInitial()
  .then((res) => {
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia; //VERIFICAR SE ESTÁ USANDO
    ListaComTimeOut();
  })
  .catch((err) => {
    //alert(err.message)
    alertAction.error(err.message).then((res) =>{
      return;
    }).catch((err) =>{
      alert(err.message);
    })
  })

  /*Avançar ou voltar Mẽs do SubMenu  - passar mês | MES/ANO => JAN/2020 */
  $scope.submitPassames = ($returnNext) => {
    pass.Month($returnNext)
    .then((res) => {
      $scope.despesas = {};
      $scope.subtitulo = res.mesExt;
      $scope.comparaDt = res.anoMesDia;
      $scope.formDespesa.date = res.formatDate;
      
      ListaComTimeOut();
    })
    .catch((err) => {
      //alert(err.message)
      alertAction.error(err.message).then((res) =>{
        return
      }).catch((err) =>{
        alert(err.message);
      })
    })
  }
});
