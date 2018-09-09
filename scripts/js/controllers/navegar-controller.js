angular.module('todoApp').controller('NavegarController', function ($scope, $location, $routeParams, $http, $resource) {

  $scope.mensagem = '';
  $scope.passmes = false;
  const dtCustom = { 0: 'JAN', 1: 'FEV', 2: 'MAR', 3: 'ABR', 4: 'MAI', 5: 'JUN', 6: 'JUL', 7: 'AGO', 8: 'SET', 9: 'OUT', 10: 'NOV', 11: 'DEZ' };
  const localPage = { 0: '/', 1: '/despesas', 2: '/entrada', 3: '/visualizar', 4: '/relatorio' }

  $scope.titleTop = {
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    //imglogo: 'assets/img/logo_seven_antes.jpg'
    contVer: 'Versão beta 0.0.9d-AngularJS - 07/09/2018'
  };

  /* Formata data top */
  let dtFormat = (passMes, pageAtual) => {

    let dtMesFull = new Date();
    let recebMes = null;
    let dtMes = null;

    !passMes && pageAtual ? recebMes = dtMesFull.getMonth() : recebMes = passMes;

    $.each(dtCustom, (id, item) => {
      id == recebMes ? dtMes = item + '/' + dtMesFull.getFullYear() : false;
    });

    $scope.subtitulo = dtMes;

    passMes = passMes + 1;

    $location.$$path == localPage[1] ? onInit(1) : false;
    $location.$$path == localPage[1] && passMes >= 0 && passMes <= 9 ? $('#dtDespesa').val(dtMesFull.getFullYear() + '-0' + passMes + '-' + dtMesFull.getDate()) : false;
    $location.$$path == localPage[1] && passMes >= 10 ? $('#dtDespesa').val(dtMesFull.getFullYear() + '-' + passMes + '-' + dtMesFull.getDate()) : false;
    $location.$$path == localPage[2] ? onInit(2) : false;
    $location.$$path == localPage[2] && passMes >= 0 && passMes <= 9 ? $('#dtEntrada').val(dtMesFull.getFullYear() + '-0' + passMes + '-' + dtMesFull.getDate()) : false;
    $location.$$path == localPage[2] && passMes >= 10 ? $('#dtEntrada').val(dtMesFull.getFullYear() + '-' + passMes + '-' + dtMesFull.getDate()) : false;
    $location.$$path == localPage[3] ? onInit(3) : false;
    $location.$$path == localPage[3] && passMes >= 0 && passMes <= 9 ? $('#dtEntrada').val(dtMesFull.getFullYear() + '-0' + passMes + '-' + dtMesFull.getDate()) : false;
    $location.$$path == localPage[3] && passMes >= 10 ? $('#dtEntrada').val(dtMesFull.getFullYear() + '-' + passMes + '-' + dtMesFull.getDate()) : false;

    setTimeout(() => {
      $("#comparaDt").html(dtMes);
    }, 100);

  }

  /* Recebe o mês de referencia page */
  $scope.submit = function ($page) {

    let mes = $scope.subtitulo;
    let recebPass = $page;

    $.each(dtCustom, (id, item) => {

      item === mes.substr(0, 3) && recebPass == 0 && id >= 0 && id <= 11 ? dtFormat(--id) : false;
      item === mes.substr(0, 3) && recebPass == 1 && id >= 0 && id <= 11 ? dtFormat(++id) : false;
      item === mes.substr(0, 3) && recebPass == 0 && id == -1 ? dtFormat(id = 11) : false;
      item === mes.substr(0, 3) && recebPass == 1 && id == 12 ? dtFormat(id = 0) : false;
    })

  }

  /* ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA */
  let formatValor = () => {
    $(document).ready(function () {
      setTimeout(() => {
        $('.money').mask('000.000.000.000,00', { reverse: true });

        let teste = $(".money").change(function () {
          $(".valDespesa").html($(this).val().replace(/\D/g, ''))
        })
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
    }, 100);
  }

  //Select campo number
  let selectCampoValor = () => {
    setTimeout(() => {
      $("#valDespesa").click(() => { $('#valDespesa').select(); });
      $("#valEntrada").click(() => { $('#valEntrada').select(); });
    }, 100);
  }


  /* Carregar Views */
  let carregarPage = () => {

    if ($location.$$path == '/entrada') {

      $scope.titulo = 'Adicionar Entrada';
      $scope.passmes = true;
      selectCampoValor();
      formatValor();
      dtFormat(null, 2);
      menuTop();
      onInit(2)

    } else if ($location.$$path == '/despesas') {

      $scope.titulo = 'Adicionar Despesas';
      $scope.passmes = true;
      selectCampoValor();
      formatValor();
      dtFormat(null, 1);
      menuTop();
      onInit(1)

    } else if ($location.$$path == '/visualizar') {
      $scope.titulo = 'Visualizar Despesas';
      $scope.passmes = true;
      dtFormat(null, 3);
      menuTop();
      onInit(3)

    } else if ($location.$$path == '/relatorio') {

      $scope.mensagem = 'Relatorio, em desenvolvimento';

    } else if ($location.$$path == '/informacoes') {
      
      $scope.mensagem = 'Informações, em desenvolvimento';

    }
    else if ($location.$$path == '/sobre') {

      $scope.mensagem = 'Sobre nós, em desenvolvimento';

    } else if ($location.$$path == '/') {
      $scope.titulo = 'Controle Despesas';
      $scope.subtitulo = 'MENU';

      setTimeout(() => {
        $('#dtReference').css('margin-left', '31%');
      }, 100);

    }

  }

  $scope.dadosApp = {
    nomeDeveloper: ' 2017 - Josuel A. Lopes',
    nomeEmpresa: ' Seven Solutions Tecnologic'
  }

  carregarPage();


})

