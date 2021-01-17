angular
  .module("todoApp")
  .controller("NavegarController", function ($scope, $location) {
    $scope.mensagem = "";
    $scope.passmes = false;
  
    const dtFull = new Date();
    let dtMes = dtFull.getMonth();
    let dtAno = dtFull.getFullYear();
    let dtDia = dtFull.getDate();

    //VERIFICAR SE NECESSARIO - quando refatorar tudo para ANGULARJS
    const Campos = (page, titulo, subtitulo, passmes, dtFormat, IdCampo, IdInit) =>{
      return {page,titulo, subtitulo, passmes, dtFormat, IdCampo, IdInit}
    }
    //VERIFICAR SE NECESSARIO - quando refatorar tudo para ANGULARJS
    const localPage = {
      home ()  {
        return Campos('/home', 'Controle Despesas', 'MENU', false, null, null,null)
      },
      entrada () {
        return Campos('/entrada', 'Adicionar Entrada', null, true, 1, 'dtEntrada', 'entradaInit')
      },
      despesas(){
        return Campos('/despesas', 'Adicionar Despesas', null, true, 2, 'dtDespesa', 'despesaInt')
      },
      visualizar(){
          return Campos('/visualizar', 'Visualizar Despesas', null, true, 3, null, 'visualizarInit')
      },
      relatorio()
      {
        return Campos('/relatorio', 'Relatório Mensal', null, true, 3, null, 'relatorioInit')
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

    $scope.titleTop = {
      comparaDt:'',
      imglogoalt: 'Logo Seven',
      imglogotitle: 'Logo Seven',
      contVer: 'v1.0.7l - AngularJS - 10/01/2021', //MOVE FACTOY VERSÂO
      dtLancamento: String(GetDateFormat.anoFullMesDiaAtual(dtDia))
    };

    // EFEITO MENU SUPERIOR - MOVE FACTORY
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

    /* Formata data top menu top
    @passMes = nome da view que estava anteriormente
    @pageAtual = view que estiver exibindo
    @passAno = ano exibido na view
    */
    const DtFormatView = (passMes, pageAtual, passAno) => {
      const camposPage =  localPage[pageAtual.split('/')[1]];
      const itensCamposPage = camposPage();

      $scope.subtitulo = GetDateFormat.mesExtAnoParams(mesExt[dtMes],passAno);
      $scope.comparaDt = GetDateFormat.anoFullMesExtDiaParams(mesExt[dtMes],passAno);
      $scope.dtLancamento = String(GetDateFormat.anoFullMesExtDiaAtualParams(dtDia, mesExt[dtMes], passAno));

      //REMOVER QUANDO ALTERAR PARA FACTORY TUDO QUE ESTA EM offilinedatab
      $("#dtReference").text($scope.subtitulo);
      
      //REMOVER QUANDO REFATORAR PARA ANGUARJS
      onInit(itensCamposPage.IdInit); 
    };

    /* Recebe o mês de referencia page */
    $scope.submit = function ($page) {

      $page == 0 && dtMes >= 0 && dtMes <= 11 ? --dtMes : null;
      $page == 1 && dtMes >= 0 && dtMes <= 11 ? ++dtMes : null;
      $page == 0 && dtMes == -1 ? ((dtMes = 11), --dtAno) : null;
      $page == 1 && dtMes == 12 ? ((dtMes = 0), ++dtAno) : null;

      DtFormatView(dtMes, $location.$$path, dtAno);

    };

   const carregarPage = () => {

    const camposPage =  localPage['home'];
    const itensCamposPage = camposPage();

    menuTop();
    $scope.titulo = itensCamposPage.titulo;
    $scope.subtitulo = itensCamposPage.subtitulo;

    setTimeout(() => {
      $("#dtReference").addClass('subtitulo-menu');
    }, 60);
  }

  ////MOVE FACTOY VERSÂO
  $scope.dadosApp = {
    nomeDeveloper: " 2017 - Josuel A. Lopes",
    nomeEmpresa: " Seven Solutions Tecnologic",
  };

  carregarPage();
    
});
