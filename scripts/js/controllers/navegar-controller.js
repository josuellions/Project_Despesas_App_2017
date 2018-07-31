angular.module('todoApp').controller('NavegarController', function ($scope, $location, $routeParams, $http, $resource) {

  $scope.mensagem = '';
  $scope.passmes = false;
  const dtCustom = { 0: 'JAN', 1: 'FEV', 2: 'MAR', 3: 'ABR', 4: 'MAI', 5: 'JUN', 6: 'JUL', 7: 'AGO', 8: 'SET', 9: 'OUT', 10: 'NOV', 11: 'DEZ' };

  $scope.titleTop = {
    imglogoalt: 'Logo Seven',
    imglogotitle: 'Logo Seven',
    //imglogo: 'assets/img/logo_seven_antes.jpg'
    contVer: 'Versão beta 0.0.9a-AngularJS - 27/07/2018'
  };

  /* Formata data top */
  let dtFormat = (passMes) => {

    setTimeout(() => {

      let dtMesFull = new Date();
      //dtMesFull = dtMesFull.getMonth();
      let recebMes;

      passMes ? recebMes = passMes : recebMes = dtMesFull.getMonth();

      console.log(passMes)

      $.each(dtCustom, (id, item) => {
        id == recebMes ? dtMes = item + '/' + dtMesFull.getFullYear() : 'MENU';
      });

      $scope.subtitulo = dtMes;

    }, 100);

  }

  /* Recebe o mês de referencia page */
  $scope.submit = function ($page) {

    let mes = $scope.subtitulo;
    let recebPass = $page;

    $.each(dtCustom, (id, item) => {
      item === mes.substr(0, 3) && !recebPass && id > 0 && id <= 11 ? dtFormat(--id) : false;
      item === mes.substr(0, 3) && recebPass && id > 0 && id <= 11 ? dtFormat(++id) : false;

      item === mes.substr(0, 3) && !recebPass && id == -1 ? dtFormat(0) : false;
      //item === mes.substr(0, 3) && recebPass && id == 0 ? dtFormat(id = 11) : false;
      item === mes.substr(0, 3) && recebPass && id > 11 ? dtFormat(id = 0) : false;

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
      //$scope.subtitulo = dtMes; //'JUL/2018';
      $scope.passmes = true;
      selectCampoValor();
      formatValor();
      dtFormat();

      menuTop();

    } else if ($location.$$path == '/despesas') {

      $scope.titulo = 'Adicionar Despesas';
      //$scope.subtitulo = dtMes;
      $scope.passmes = true;
      selectCampoValor();
      formatValor();
      dtFormat();
      menuTop();

    } else if ($location.$$path == '/visualizar') {
      $scope.titulo = 'Visualizar Despesas';
      //$scope.subtitulo = dtMes;
      $scope.passmes = true;
      dtFormat();
      menuTop();

    } else if ($location.$$path == '/relatorio') {

      $scope.mensagem = 'Relatorio, em desenvolvimento';

    } else if ($location.$$path == '/informacoes') {

      $scope.mensagem = 'Informações, em desenvolvimento';

    }
    else if ($location.$$path == '/sobre') {

      $scope.mensagem = 'Sobre, em desenvolvimento';

    } else if ($location.$$path == '/') {
      $scope.titulo = 'Controle Despesas';
      $scope.subtitulo = 'MENU';
      dtFormat();

      setTimeout(() => {
        $('#dtReference').css('margin-left', '31%');
      }, 100);

    }
  }

  carregarPage();


  $scope.dadosApp = {
    nomeDeveloper: ' 2017 - Josuel A. Lopes',
    nomeEmpresa: ' Seven Solutions Tecnologic'
  }

})

