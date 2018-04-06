// Recarrega outra pagina na mesma aba
$("#btnAddDesp").click(function () {
	window.location.replace('public/despesas.html', 'janela');
});

$("#btnAddEntra").click(function () {
	window.location.replace('public/entrada.html', 'janela');
});

$("#btnVisual").click(function () {
	window.location.replace('public/visualiza.html', 'janela');
});

$("#btnRelator").click(function () {
	alert(" Em Desenvolvimento !!!")
});

$("#btnHome").click(function () {
	window.location.replace('../index.html', 'janela');
});

// BOTÃO MENU
$("#btnMenuEntra").click(function () {
	window.location.replace('entrada.html', 'janela');
});

$("#btnMenuDesp").click(function () {
	window.location.replace('despesas.html', 'janela');
});

$("#btnMenuVisual").click(function () {
	window.location.replace('visualiza.html', 'janela');
});

$("#btnMenuRelator").click(function () {
	alert("Em Desenvolvimento !!!");
})

$("#btnInfo").click(function () {
	alert(" APLICATIVO CONTROLE DESPESAS \n" +
		"\t\t\t\t\t\t\tdiárias ou mensais \n\n" +
		"Entrada Caixa: \n" +
		"Aqui lançamos entra de caixa, \n" +
		"exemplo, salário, comisão, vale alimentação e outros.\n\n" +
		"Despesas: \n" +
		"Aqui lançamos os gastos com despesas, \n" +
		"exemplo, almoço, mercado, roupas e outros. \n\n" +
		"Visualizar: \n" +
		"Aqui podemos vizualizar os laçamentos entrada e despesas lançados, \n\n" +
		"Relatório: \n" +
		"Em Desenvolvimento \n "
	);
});

$("#btnSobre").click(function () {
	alert("\t\t\t\t INFORMAÇÕES DESENVOLVEDOR \n\n" +
		"Aplicativo:\n" +
		"Controle Despesas Mensal\n\n" +

		"Versão:\n" +
		"Versão beta 0.0.7 - Bd offline - 27/11/2017\n\n" +

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

$(document).ready(function () {

	// EFEITO MENU SUPERIOR
	$("#btnMenu").click(function () {

		$("#liMenu").slideToggle(function () {

			$(this).click(function () {

				$("#liMenu").animate().slideDown(700);

				$(this).ready(function () {

					$("#liMenu").animate().slideUp(700);
				});
			});
		});

		$("body").mousedown(function () {
			$("#liMenu").animate().slideUp(700);
		});

	});

	//Select campo number
	$("#valDespesa").click(function () {
		$('#valDespesa').select();
	})

	$("#valEntrada").click(function () {
		$('#valEntrada').select();
	})

	//FUNÇÃO DATA DE REFERENCIA
	function formataData() {
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

		// $( "#valEntrada").click( function( ){
		// 	$( "heightVisualizar").css({"overflow":"170px"});
		// })
	}

	dtInicial();

	// VARIÁVEIS GLOBAIS DEFINIR SELETOR MÊS
	let recebeDt, mesGlobal = 0, anoGlobal = 0;

	function defineMes(condicao) {

		let trocaMes = () => { baseMes(mesGlobal, anoGlobal, condicao); }

		let inicioMes = () => {
			recebeDt = new Date();
			mesGlobal = recebeDt.getMonth();
			anoGlobal = recebeDt.getFullYear();

			baseMes(mesGlobal, anoGlobal);

		}

		condicao ? trocaMes() : inicioMes();

	}

	function convertMes(recebMes, recebAno) {

		let mesExt = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

		
		onInit(1);
		onInit(2);
		onInit(3);

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
	let verificaMesRef = () => {
		mesRef = document.getElementById("dtReference").innerText;
		return mesRef;
	}

	if (verificaMesRef() != "Menu") {
		$('#OpcaoMesEsquerdo').mousedown(() => { defineMes(1), convertMes() });
		$('#OpcaoMesDireito').mousedown(() => { defineMes(2), convertMes() });
	} else {
		return false;
	}

	// EXIBIR O MÊS DE REFENCIA
	$('#dtReference').html(defineMes());

	// DEFINIR O MÊS ATUAL NO INPUT DATA
	$('#dtDespesa').val(formataData());

});

// Controle de Versão
$("#contVer").html("Versão beta 0.0.8 - Bd offline - 16/03/2018");

//Nome Desenvolvedor
$("#nomeDeveloper").html("&copy 2017 - Josuel A. Lopes");

//Nome Empresa Desenvolvedora
$("#nomeEmpresa").html("&reg Seven Solutions Tecnologic");

// $( "#btnSair").window.close( );

// ADICIONA PONTO E VIRGULA AO DIGITAR VALOR TELA DESPESA E ENTRADA
let verfPag = ((window.location.pathname) === "/index.html" || (window.location.pathname) === "/" ) ? true : false

if (!verfPag){
	$(document).ready(function () {
		$('.money').mask('000.000.000.000,00', { reverse: true });

		let teste = $(".money").change(function () {
			$(".valDespesa").html($(this).val().replace(/\D/g, ''))
		})
	});
}
///TESTE COM FALHA
// let formatValor = ( e, obj ) => {

// 	if( e.keycode != 8 || e.keycode != 46 ) {

// 		obj.value.length == 1 ? obj.value = ("0,0" + obj.value) : false;
// 		obj.value.length == 5 && obj.value.substr(0,3) == "0,0" ? obj.value = "0," + obj.value.substr(3) : false;
// 		obj.value.length == 5 && obj.value.substr(0,2) == "0," ? obj.value = obj.value[2] + "," + obj.value.substr(3) : false
// 		obj.value.length == 5 && obj.value.substr(0,2) != "0," ? obj.value = obj.value[0] + obj.value[2] + "," + obj.value.substr(3) : false
// 		obj.value.length == 6 ? obj.value = obj.value.substr(0,2) + obj.value[3]  + "," + obj.value.substr(4) : false
// 		obj.value.length == 7 ? obj.value = obj.value[0] + "." + obj.value[1] + obj.value[2] + obj.value[4] + "," + obj.value.substr(5) : false
// 		obj.value.length == 9 ? obj.value = obj.value[0] + obj.value[2] + "." + obj.value[3] +  obj.value[4] + obj.value[6] +  "," + obj.value.substr(7)  : false	
// 		obj.value.length == 10 ? obj.value = obj.value[0] + obj.value[1] + obj.value[3] + "." +  obj.value[4] + obj.value[5] + obj.value[7] + "," + obj.value.substr(8)  : false

// 	}

/*$(document).ready(function () {
	$('#valDespesa').mask('000.000.000.000,00');
})

$(document).ready(function () {
	$('#valDespesa').priceFormat({
		prefix: 'R$ ',
		centsSeparator: ',',
		thousandsSeparator: '.'
	});
});

$(document).ready( function () {
	$("#valDespesa").maskMoney({
		symbol: 'R$ ',
		showSymbol: true, thousands: '.', decimal: ',', symbolStay: true
	});
})
*/

	/*
$(document).ready(function () {
	$("#valDespesa").change(function () {
		var banco = $(this).val();
			$(".money").val('');
		$(".money").mask('000.000.000.000,00', { reverse: true });
	})
})

//TESTADOS - ERRO
//$(document).ready(function (event) {
//	$('#valDespesa').mask('000,00');
//});

// }
//$(document).ready( () => {
//	$("#valDespesa").maskMoney({thousands:'', decimal:'.'});
//}); 

//$("#valDespesa").mask({symbol: 'US$ ', thousands:'.', decimal:',', symbolStay: true});
//$("#").mask({symbol: 'R$ ', thousands:'.', decimal:',', symbolStay: true});

/*
$("#valDespesa").maskMoney({
 
  // The symbol to be displayed before the value entered by the user
  prefix: 'US$ ',
 
  // The suffix to be displayed after the value entered by the user(example: "1234.23 €").
  suffix: "",
 
  // Delay formatting of text field until focus leaves the field
  formatOnBlur: false,
 
  // Prevent users from inputing zero
  allowZero: false,
 
  // Prevent users from inputing negative values
  allowNegative: true,
 
  // Allow empty input values, so that when you delete the number it doesn't reset to 0.00.
  allowEmpty: false,
 
  // Select text in the input on double click
  doubleClickSelection: true,

	// Select all text in the input when the element fires the focus event.
  selectAllOnFocus: false,
 
  // The thousands separator
  thousands: '.',
 
  // The decimal separator
  decimal: '.' ,
 
  // How many decimal places are allowed
  precision: 2,
 
  // Set if the symbol will stay in the field after the user exits the field.
  affixesStay : false,
 
  // Place caret at the end of the input on focus
  bringCaretAtEndOnFocus: true

});
*/
