angular
  .module("todoApp")
  .controller("MenuController", function ($scope, $location, formatDate, pass) {
    
    $scope.passmes = false;
    $scope.comparaDt ='';
    $scope.subtitulo = '';
    $scope.dtLancamento =''; 
    $scope.classSubTitulo = '';
  
    const dtFull = new Date();
    let dtMes = dtFull.getMonth();
    let dtAno = dtFull.getFullYear();
    let dtDia = dtFull.getDate();

    //VERIFICAR SE NECESSARIO - quando refatorar tudo para ANGULARJS
   /* const Campos = (page, titulo, subtitulo, passmes, dtFormat, IdCampo, IdInit) =>{
      return {page,titulo, subtitulo, passmes, dtFormat, IdCampo, IdInit}
    }*/
    //VERIFICAR SE NECESSARIO - quando refatorar tudo para ANGULARJS
    /*const localPage = {
      home ()  {
        return Campos('/home', 'Controle Despesas', 'MENU', false, null, null,null)
      },
      entrada () {
        return Campos('/entrada', 'Adicionar Entrada', null, true, 1, 'dtEntrada', null) //'entradaInit')
      },
      despesas(){
        return Campos('/despesas', '', null, true, 2, 'dtDespesa', null) //'despesaInt')
      },
      visualizar(){
          return Campos('/visualizar', 'Visualizar Despesas', null, true, 3, null, null) //'visualizarInit')
      },
      relatorio()
      {
        return Campos('/relatorio', 'Relatório Mensal', null, true, 3, null, null) //'relatorioInit')
      },
      informacoes()
      {
        return Campos('/informacoes', 'Controle Despesas', 'Informações', false, null, null, null)
      },
      backup()
      {
        return Campos('/backup', 'Controle Despesas', 'Backup', false, null, null,null)
      },
      sobre()
      {
        return Campos('/sobre', 'Controle Despesas', 'Sobre', false, null, null, null)
      },
    }
*/

    /* Formata data top menu top
    @passMes = nome da view que estava anteriormente
    @pageAtual = view que estiver exibindo
    @passAno = ano exibido na view
    */
    /* MOVIDO PARA FACTORY PASS-MONTH
    const DtFormatView = (passMes, pageAtual, passAno) => {
      const camposPage =  localPage[pageAtual.split('/')[1]];
      //const itensCamposPage = camposPage();
  
      
      $scope.passmes = true;
      $scope.classSubTitulo = '';
      $scope.subtitulo = GetDateFormat.mesExtAnoParams(mesExt[dtMes],passAno);
      $scope.comparaDt = GetDateFormat.anoFullMesExtDiaParams(mesExt[dtMes],passAno);
      $scope.dtLancamento = String(GetDateFormat.anoFullMesExtDiaAtualParams(dtDia, mesExt[dtMes], passAno));
      
      //REMOVER QUANDO ALTERAR PARA FACTORY TUDO QUE ESTA EM offilinedatab
      //  $("#dtReference").addClass('subtitulo-menu'); //alinharMes
      //$("#dtReference").text($scope.subtitulo);
      //$("#comparaDt").text($scope.comparaDt)
      //formatDate.dtConsultaDB();

      //REMOVER QUANDO REFATORAR PARA ANGUARJS
      //onInit(itensCamposPage.IdInit); //USAR SOMENTE COM JSPURO SEM ANGULAR
    
      
    };*/

    /* Recebe o mês de referencia page */
    /* MOVIDO PARA FACTORY PASSMONTH
    $scope.submitPassames = function ($returnNext) {
      const nextPage = 1;
      const returnPage = 0;
      $returnNext == returnPage && dtMes >= 0 && dtMes <= 11 ? --dtMes : null;
      $returnNext == nextPage && dtMes >= 0 && dtMes <= 11 ? ++dtMes : null;
      $returnNext == returnPage && dtMes == -1 ? ((dtMes = 11), --dtAno) : null;
      $returnNext == nextPage && dtMes == 12 ? ((dtMes = 0), ++dtAno) : null;
      
      $scope.subtitulo = '';
      console.log("PASSA MES")
      
      DtFormatView(dtMes, $location.$$path, dtAno);

    };
    */

    // EFEITO MENU HANBURG SUPERIOR - MOVE FACTORY
    const menuTop = () => {
      setTimeout(() => {
        $("#btnMenu").click(() => {
          $("#liMenu").slideToggle(() => {
            $(this).click(() => {
              $("#liMenu").animate().slideDown(700);
              $(this).ready(() => {
                $("#liMenu").animate().slideUp(700);
              });
            });
          });
          $("body").mousedown(() => {
            $("#liMenu").animate().slideUp(700);
          });
        });
      }, 25);
    };

    const CarregarPage = () => {
      $scope.subtitulo = '';
      let page = ($location.$$path).replace('/','').trim();
      
      
      if(page.length == 0){
        page = 'home'
        $scope.passmes = false;
        $scope.classSubTitulo = 'subtitulo-menu';
    
        $scope.titulo = 'Controle Despesas' //itensCamposPage.titulo;
        $scope.subtitulo = 'MENU'; //itensCamposPage.subtitulo;
        $scope.comparaDt = '';
        return
     } 
    
    //$scope.titulo = 'Controle Despesas' //itensCamposPage.titulo;
    //$scope.subtitulo = 'MENU'; //itensCamposPage.subtitulo;
    //$scope.comparaDt = '';
    
    menuTop();
    
    //const camposPage =  localPage[page];
    //const itensCamposPage = camposPage();
    //setTimeout(() => {
    //  $("#dtReference").addClass('subtitulo-menu'); //alinharMes
    //}, 60);
    //console.log('HOME')
  }

  ////MOVE FACTOY VERSÂO
  //Dados footer
  $scope.dadosApp = {
    nomeDeveloper: " 2017 - Josuel A. Lopes",
    nomeEmpresa: " Seven Solutions Tecnologic",
  };

  //Dados Menu Top e controle versão
  $scope.titleTop = {
    comparaDt:'',
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    contVer: 'v1.0.7n - AngularJS - 10/01/2021', //MOVE FACTOY VERSÂO
    dtLancamento: String(GetDateFormat.anoFullMesDiaAtual(dtDia))
  };


  CarregarPage();
    
});
