angular.module('todoApp').controller('EntradaController',
function($scope, entradaAction, alertAction, formatDate, formatValor, pass){
  //$scope.comparaDt = '';
  $scope.formEntrada = {};
  $scope.formEntrada.date = new Date();
  $scope.entradaValorTotal = 0.0;
  $scope.listaEntradas  = [
    {
     'id': 1 ,
     'nome': 'Salario-01',
    },
    {
     'id': 2 ,
     'nome': 'Salario-02',
    },
    {
     'id': 3 ,
     'nome': 'Adiantamento-03',
    },
    {
     'id': 4 ,
     'nome': 'Adiantamento-04',
    },
    {
     'id': 5 ,
     'nome': 'Poupança',
    },
    {
     'id': 6 ,
     'nome': 'Vendas diversas',
    },
    {
     'id': 7 ,
     'nome': 'Outros recursos',
    },
   ]

   $scope.update = true;
   $scope.btnSave = '';
   $scope.btnUpdate = 'hidden';
   $scope.optiondel = 'hidden';
   $scope.titleOptions = 'Del'
   $scope.entradas = {};

   $scope.titulo = 'Adicionar Entrada';
   $scope.classSubTitulo = 'alinharMes';
   $scope.passmes = true;

  /*Limpar Table e campos Form */
  const LimparCamposForm = () =>{
    $scope.entradas = {};
    $scope.formEntrada = {};
    $scope.formEntrada.date = new Date();
    ListaComTimeOut()
  }

  /*INDEX -Formatar dados para exibir na table view */
  const ExibirListaView = (dados) => {
    let entradaFormat = [];
    let somaEntrada = 0;
    
    for(let row of dados ){
      entradaFormat.push({
        id: row.id,
        nome: row.entrada,
        dateBd: row.dtLanc,
        dateView: formatDate.dtView(row.data),
        valor: row.valor.toFixed(2),
      })
      somaEntrada += parseFloat(row.valor); 
    }

    $scope.entradas = entradaFormat;
    $scope.entradaValorTotal = formatValor.ptBr(somaEntrada.toFixed(2).replace('.',','))
    formatValor.moneyMask();
  }

  /*COPY - Copiar entradas caixa mês anterior */
  const  CopyMesAnterior = (getDataInicio, response) => {
    const date = new Date(getDataInicio);
    const dtMesAnteriorFormat = GetDateFormat.mesExtAnoParams(mesExt[date.getMonth()], date.getFullYear())

    alertAction.question(`Adicionar entrada caixa, com base no mês anterior, "${dtMesAnteriorFormat}"?`,
    action.copyEntrada, {dados: response, date: dtMesAnteriorFormat})
    .catch((err) => {
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }

  /*COPY - Buscar entradas de caixa do mês anterior, se o mês atual não possuir lançamentos e copiar */
  const BuscarDadosMesAnterior = (getDataInicio) => {
    
    entradaAction.indexMesAnterior(getDataInicio).then((res) => {
      
      if(res.length === 0){
        return
      }
      
      CopyMesAnterior(getDataInicio, res)

    }).catch((err) => {
      alertAction.error(err.message).catch((err) =>{
        alert(err.message);
      })
    })
  }

   /*DELETE - Recarrega a lista quando deletar uma entrada caixa*/
  const RenderizarViewEntradaDelete = (getEntrada) => {
    $scope.btnSave = '';
    $scope.btnUpdate = 'hidden';
    $scope.formEntrada = {};
    $scope.formEntrada.date = new Date();  
    $scope.entradas.splice($scope.entradas.indexOf(getEntrada), 1)
    $scope.entradaValorTotal = formatValor.ptBr(formatValor.subtrair($scope.entradaValorTotal, getEntrada.valor));
    
    alertAction.success(`Sucesso: "${getEntrada.nome}" foi excuido!`)
  }

  /* Action Entrada - CRUD */
  const Actions = () => {
    /*CREATE - criar Entrada Caixa */
    const createEntrada = () => {
      entradaAction.create($scope.formEntrada).then((res) => {
        LimparCamposForm();
      }).catch((err) => {
        alertAction.error(err.message).catch((err) =>{
          alert(err.message)
        })
      })
    };
    /*INDEX - listar Entradas Caixa */
    const indexEntrada = () => {
      formatDate.dtConsultaDB().then((response) => {
        entradaAction.index([response.inicio, response.fim]).then((res) => {

          if(res.length === 0){
            BuscarDadosMesAnterior(response.inicio);
            $scope.despesaValorTotal = '0,00';
            return;
          }
          ExibirListaView(res)
        }).catch((err) => {
            alertAction.error(err.message).catch((err) => {
            alert(err)
          })
        })
      }).catch((err) => {
          alertAction.error(err.message).catch((err) => {
          alert(err)
        })
      })
    }
    /*UPDATE - atualizar dados Entrada Caixa */
    const updateEntrada = () => {
      entradaAction.update($scope.formEntrada).then((res) => {
        alertAction.success('Entrada de Caixa atualizada com sucesso');
        LimparCamposForm();
        OptionActionCancel();
      }).catch((err) => {
        alertAction.error(err.message).catch((err) => {
          alert(err.message)
        })
      })
    }
    /*COPY - create copiando dados do mês anterio Entrada Caixa */
    const copyEntrada = (getDados) => {
      entradaAction.copy(getDados.dados).then((res) => {
        ListaComTimeOut();
        alertAction.info(`${res.message} "${getDados.date}"`).catch((err) => {
          alertAction.error(err.message).catch((err) => {
            alert(err.message)
          })
        })
      }).catch((err) =>{
        alertAction.error(err.message).catch((err) =>{
          alert(err.message)
        })
      })
    }
    /*DELETE - excluir dados Entrada de Caixa */
    const deleteEntrada = (getDados) => {
      entradaAction.delete(getDados.dados).then(() => {
        RenderizarViewEntradaDelete(getDados.dados);
      }).catch((err) => {
        alertAction.error(err.message).catch((err) => {
          alert(err.message)
        })
      })
    }

    return {
      createEntrada,
      indexEntrada,
      updateEntrada,
      copyEntrada,
      deleteEntrada,
    }
  }

  const action = Actions();
  
  /*INDEX - Exibir Lista Entradas Caixa com Delay*/
  const ListaComTimeOut = () => {
    setTimeout(() => {
      action.indexEntrada();
      formatValor.moneyMask();
    }, 5); 
  }

  //action.indexEntrada();
  ListaComTimeOut();

  /*UPDATE - Opção para editar Entrada Caixa - clicando sobre nome Entrada Caixa */
  const OptionActionEdit = (getEntrada) =>{
    
    $scope.editCancel = 'edit-cancel'
    $scope.titleOptions = ''
    $scope.optiondel = '';
    
    $scope.btnSave = 'hidden'
    $scope.btnUpdate = '';

    $scope.formEntrada = {
      id: getEntrada.id,
      nome: getEntrada.nome,
      valor: formatValor.ptBr(parseFloat(getEntrada.valor).toFixed(2).replace('.',',')),
      date: new Date(`${getEntrada.dateBd} 00:00:00`)
    }
    
    $("#valEntrada").click(() => {
      $("#valEntrada").select();
    });
  }

  /*UPDATE - Cancelar opção de editar Entrada Caixa - Botão header table */
  const OptionActionCancel = () => {
    $scope.editCancel = ''
    $scope.titleOptions = 'Del'
    $scope.optiondel = 'hidden';
    
    $scope.btnSave = ''
    $scope.btnUpdate = 'hidden';

    $scope.formEntrada = {
      date: new Date()
    }
  }

  /*UPDATE - Exibir alert confimação para atualizar dados Entrada Caixa */
  const AlertUpdateEntrada = () => {
    dados = {
      message: `Deseja atualizar Entrada Caixa "${$scope.formEntrada.nome}"?`,
      //valor: formatValor.bancoDados($scope.formEntrada.valor),
      action: action.updateEntrada
    }

    alertAction.question(dados.message, dados.action, '').catch((err) => {
      alertAction.error(err.message).catch((err) => {
        alert(err.message)
      })
    })
  }

  /*Validar campos do FORM */
  const ValidaCampos = () => {
  
    let entrada = String($scope.formEntrada.nome).length;
    let valor = String($scope.formEntrada.valor);
    let date = String($scope.formEntrada.date);

    if(valor === 'undefined' || valor.length === 0 || entrada === 0 || $scope.formEntrada.nome === undefined ||   date.length === 0 || date === 'undefined') {
      
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

  //CREATE | UPDATE - Submit Form Entrada Caixa
  $scope.submeter =() => {

    if(!ValidaCampos()) {
      return
    }

    if($scope.formEntrada.id > 0) {
      AlertUpdateEntrada();
      return;
    }

    action.createEntrada();
  }

  //UPDATE - Ação submit update Entrada Caixa
  $scope.onUpdateEntrada = (getUpdate, getEntrada) => {
    $scope.update = !getUpdate;
    OptionActionEdit(getEntrada);
  }

  //UPDATE - Ação para cancelar update Entrada Caixa
  $scope.onUpdateEntradaCancel = (getUpdate) => {
    $scope.update = !getUpdate;
    OptionActionCancel();
  }

  //DELETE - Ação para deletar Entrada Caixa */
  $scope.submitDelete = (entrada) => {
    alertAction.question(`Deseja excluir entrada caixa "${entrada.nome}"?`, action.deleteEntrada, {dados: entrada})
    .catch((err) => {
      alertAction.error((err.message)).catch((err) =>{
        alert(err.message)
      })
    })
  }

  /*Iniciar Mês no header - MM/yyyy */
  pass.MonthInitial()
  .then((res) => {
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia; //VERIFICAR SE ESTA USANDO
    ListaComTimeOut();
  })
  .catch((err) => {
    alert(err)
})

/*Avançar ou voltar Mẽs do SubMenu  - passar mês | MES/ANO => JAN/2020  */
$scope.submitPassames = ($returnNext) => {
  pass.Month($returnNext)
  .then((res) => {
    $scope.entradas = {};
    $scope.subtitulo = res.mesExt;
    $scope.comparaDt = res.anoMesDia;
    $scope.formEntrada.date = res.formatDate;
    
    ListaComTimeOut();
  })
  .catch((err) => {
    alertAction.error(err.message).catch((err) =>{
      alert(err.message);
    })
  })
}
})
