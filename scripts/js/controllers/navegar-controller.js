angular.module('todoApp').controller('NavegarController', function ($scope, $location) {

  $scope.mensagem = '';
  $scope.passmes = false;
  const dtCustom = { 0: 'JAN', 1: 'FEV', 2: 'MAR', 3: 'ABR', 4: 'MAI', 5: 'JUN', 6: 'JUL', 7: 'AGO', 8: 'SET', 9: 'OUT', 10: 'NOV', 11: 'DEZ' };
  const localPage = [
    {
      page: '/',
      titulo: 'Controle Despesas',
      subtitulo: 'MENU',
      passmes: false,
      dtFormat: null,
      IdCampo: null,
      IdInit: null,
    },
    {
      page: '/entrada',
      titulo: 'Adicionar Entrada',
      subtitulo: null,
      passmes: true,
      dtFormat: 1,
      IdCampo: 'dtEntrada',
      IdInit: 'entradaInit'
    },
    {
      page: '/despesas',
      titulo: 'Adicionar Despesas',
      subtitulo: null,
      passmes: true,
      dtFormat: 2,
      IdCampo: 'dtDespesa',
      IdInit: 'despesaInt'
    },
    {
      page: '/visualizar',
      titulo: 'Visualizar Despesas',
      subtitulo: null,
      passmes: true,
      dtFormat: 3,
      IdCampo: null,
      IdInit: 'visualizarInit'
    },
    {
      page: '/relatorio',
      titulo: 'Relatório Mensal',
      subtitulo: null,
      passmes: true,
      dtFormat: 3,
      IdCampo: null,
      IdInit: 'relatorioInit'
    },
    {
      page: '/informacoes',
      titulo: 'Controle Despesas',
      subtitulo: 'Informações',
      passmes: false,
      dtFormat: null,
      IdCampo: null,
      IdInit: null
    },
    {
      page: '/sobre',
      titulo: 'Controle Despesas',
      subtitulo: 'Sobre',
      passmes: false,
      dtFormat: null,
      IdCampo: null,
      IdInit: null
    },
  ];

  $scope.titleTop = {
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    contVer: 'v1.0.5 - AngularJS - 21/12/2018'
  };

  let dtFull = new Date();
  let dtMes = dtFull.getMonth();
  let dtAno = dtFull.getFullYear();
  let dtDia = dtFull.getDate();

  /* Formata data top */
  let dtFormat = (passMes, pageAtual, passAno) => {

    let recebDia = dtDia;
    let recebMes = dtMes;
    let dtFormatMes = null;

    dtFormatMes = dtCustom[dtMes] + '/' + passAno;
    $scope.subtitulo = dtFormatMes;
    recebMes = dtMes + 1;

    dtDia < 10 ? recebDia = "0" + dtDia : false;
    recebMes < 10 ? recebMes = "0" + recebMes : false;

    localPage.forEach(item => {

      if (pageAtual == item.page) {

        onInit(item.IdInit)
        $('#' + item.IdCampo).val(dtAno + '-' + recebMes + '-' + recebDia);
      }
    });

    setTimeout(() => {
      $("#comparaDt").html(dtFormatMes);
    }, 25);

  }

  /* Recebe o mês de referencia page */
  $scope.submit = function ($page) {

    $page == 0 && dtMes >= 0 && dtMes <= 11 ? --dtMes : false;
    $page == 1 && dtMes >= 0 && dtMes <= 11 ? ++dtMes : false;
    $page == 0 && dtMes == -1 ? (dtMes = 11, --dtAno) : false;
    $page == 1 && dtMes == 12 ? (dtMes = 0, ++dtAno) : false;

    dtFormat(dtMes, $location.$$path, dtAno)

  }

  /* ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA */
  let formatValor = () => {
    $(document).ready(function () {
      setTimeout(() => {
        $('.money').mask('000.000.000.000,00', { reverse: true });
      }, 100);
    });
  }

  // EFEITO MENU SUPERIOR
  let menuTop = () => {
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
  }

  //Select campo number
  let selectCampoValor = () => {
    setTimeout(() => {
      $("#valDespesa").click(() => { $('#valDespesa').select(); });
      $("#valEntrada").click(() => { $('#valEntrada').select(); });
    }, 25);
  }

  /* Carregar Views */
  let carregarPage = () => {

    localPage.forEach(item => {

      if ($location.$$path == item.page) {

        $scope.titulo = item.titulo;
        menuTop();

        if (item.passmes) {

          $scope.passmes = item.passmes;
          dtFormat(null, item.page, dtAno);
          selectCampoValor();
          formatValor();
          return;

        } else {
          $scope.subtitulo = item.subtitulo;

          setTimeout(() => {
            $('#dtReference').css('margin-left', '31%');
          }, 25);
        }
        return;
      }
    });
  }

  $scope.dadosApp = {
    nomeDeveloper: ' 2017 - Josuel A. Lopes',
    nomeEmpresa: ' Seven Solutions Tecnologic'
  }

  carregarPage();

})