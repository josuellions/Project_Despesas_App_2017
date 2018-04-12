$(document).ready(() => {

	var Page = window.location.pathname;

	if (Page == '/index.html' || '/') {
		$("#btnInfo").click(() => {
			alert(" APLICATIVO CONTROLE DESPESAS \n" +
				"\t\t\t\t\t\t\tdiárias ou mensais \n\n" +
				"Entrada Caixa: \n" +
				"lançamentos de entra de caixa, \n" +
				"exemplo, salário, comisão, vale alimentação e outros.\n\n" +
				"Despesas: \n" +
				"lançamentos dos gastos com despesas, \n" +
				"exemplo, almoço, mercado, roupas e outros. \n\n" +
				"Visualizar: \n" +
				"vizualização dos laçamentos entrada e despesas lançados, \n\n" +
				"Relatório: \n" +
				"Em Desenvolvimento \n "
			);
		});

		//$('#menuMobile').css('display', 'inline');
		$("#btnInfo").css('display', 'none');
	} else {
		//	$('#menuMobile').css('display', 'inline');
		$("#btnInfo").css('display', 'none');
	}

	$("#btnSobre").click(() => {
		alert("\t\t\t\t INFORMAÇÕES DESENVOLVEDOR \n\n" +
			"Aplicativo:\n" +
			"Controle Despesas Mensal\n\n" +

			"Versão:\n" +
			"Versão beta 0.0.9 - AngularJS - 11/04/2018\n\n" +

			"Desenvolvedor: \n" +
			"Josuel A. Lopes \n\n" +

			"Contato: \n" +
			"Celular: 11 98273 8274 \n" +
			"email: josuel_lions@hotmail.com \n\n" +

			"Desenvolvimento e Programação: \n" +
			"Aplicativos Mobile App, Mobile Web, Web Sites e Descktops\n\n" +

			"Desenvolvimento de aplicações nas linguagens: \n" +
			"HTML5, CSS3, JavaScript, JQuery, \n" +
			"PHP, Laravel, Eloquent, \n " +
			"C#, PhoneGap, SQL, MySQL, \n " +
			"Linux e Microsoft"
		);
	});

	$(document).ready(() => {
		// EFEITO MENU SUPERIOR
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

		//Select campo number
		$("#valDespesa").click(() => { $('#valDespesa').select(); });

		$("#valEntrada").click(() => { $('#valEntrada').select(); });

		//FUNÇÃO DATA DE REFERENCIA
		let formataData = () => {

			dt = new Date();
			let dtdia = dt.getDate(),
				dtmes = dt.getMonth(),
				dtano = dt.getFullYear();

			dtmes.toString().length < 10 ? dtmes = + parseInt(dtmes + 1) : false;

			dtdia.toString().length == 1 ? dtdia = '0' + dtdia : false;
			dtmes.toString().length == 1 ? dtmes = '0' + dtmes : false;
			return dtano + "-" + dtmes + "-" + dtdia;
		}

		// DEFINIR DATA INICIAL CAMPO DATA
		let dtInicial = () => {

			$("#dtEntrada").val(formataData());
			$("#dtDespesa").val(formataData());
		}

		dtInicial();

		// VARIÁVEIS GLOBAIS DEFINIR SELETOR MÊS
		let recebeDt, mesGlobal = 0, anoGlobal = 0;

		let defineMes = (condicao) => {
			let trocaMes = () => { baseMes(mesGlobal, anoGlobal, condicao); }

			let inicioMes = () => {
				recebeDt = new Date();
				mesGlobal = recebeDt.getMonth();
				anoGlobal = recebeDt.getFullYear();
				baseMes(mesGlobal, anoGlobal);
			}
			condicao ? trocaMes() : inicioMes();
		}

		let convertMes = (recebMes, recebAno) => {
			let mesExt = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
			$(document).ready(() => {
				/*
				
								let verifURLdesp = false;
								let verifURLentrada = false;
								let verifURLvisualiza = false;
								let compURl = (window.location.pathname).toString();
								let verfDispositivo = compURl.slice(0, 19) === '/android_asset/www/' ? true : false;
				
								if (compURl !== '/android_asset/www/public/index.html' || '/') {
				
									if (verfDispositivo) {
										verifURLdesp = compURl === '/android_asset/www/public/despesas.html' ? true : false;
										verifURLentrada = compURl === '/android_asset/www/public/entrada.html' ? true : false;
										verifURLvisualiza = compURl === '/android_asset/www/public/visualiza.html' ? true : false;
									} else {
										verifURLdesp = compURl === '/public/despesas.html' ? true : false;
										verifURLentrada = compURl === '/public/entrada.html' ? true : false;
										verifURLvisualiza = compURl === '/public/visualiza.html' ? true : false;
				
									}
									verifURLdesp ? onInit(1) : false;
									verifURLentrada ? onInit(2) : false;
									verifURLvisualiza ? onInit(3) : false;
				
									//if(!verifURLdesp) {
									//alert("Informações não pode ser encontrada!");
								}
								*/
				onInit(1);
				onInit(2);
				onInit(3);

			});

			return mesExt[recebMes] + "/" + recebAno;

		}

		// BOTÕES PASSAR MÊS 
		let baseMes = (mes, ano, condicao) => {

			condicao === 1 && mesGlobal >= 0 ? mesGlobal-- : false
			mesGlobal === -1 ? anoGlobal-- : false
			mesGlobal === -1 ? mesGlobal = 11 : false
			mesGlobal--

			condicao === 2 && mesGlobal >= -1 ? mesGlobal++ : false
			mesGlobal === 11 ? anoGlobal++ : false
			mesGlobal === 11 ? mesGlobal = -1 : false
			mesGlobal++

			$("#dtReference").html(convertMes(mesGlobal, anoGlobal));

		}

		// AVANÇAR MÊS DE REFERÊNCIA
		var verificaMesRef = () => {
			mesRef = document.getElementById("dtReference").innerText;
			return mesRef;
		}

		if (verificaMesRef() != "Menu") {
			$('#OpcaoMesEsquerdo').mousedown(() => { defineMes(1), convertMes() });
			$('#OpcaoMesDireito').mousedown(() => { defineMes(2), convertMes() });

			// ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA
			$(document).ready(function () {
				$('.money').mask('000.000.000.000,00', { reverse: true });

				let teste = $(".money").change(function () {
					$(".valDespesa").html($(this).val().replace(/\D/g, ''))
				})
			});
		} else {
			return false;
		}

		// EXIBIR O MÊS DE REFENCIA
		$('#dtReference').html(defineMes());

		// DEFINIR O MÊS ATUAL NO INPUT DATA
		$('#dtDespesa').val(formataData());

	});

	// Controle de Versão
	$("#contVer").html("Versão beta 0.0.9-AngularJS - 11/04/2018");

	//Nome Desenvolvedor
	$("#nomeDeveloper").html("&copy 2017 - Josuel A. Lopes");

	//Nome Empresa Desenvolvedora
	$("#nomeEmpresa").html("&reg Seven Solutions Tecnologic");

	// $( "#btnSair").window.close( );

});