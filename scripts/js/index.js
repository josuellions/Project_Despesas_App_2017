$( document ).ready(function( ) {
	$( "#btnExec" ).click( function( ) {
		// alert("OK")
		document.getElementById( "textareaDisp" ).innerHTML = 
		"15/09/2017 - Mercado   - R$ 200,00\n" +
		"25/09/2017 - Mercado   - R$ 300,00\n" +
		"10/09/2017 - Mercado   - R$ 500,00\n" +
		"05/09/2017 - Mercado   - R$  90,00\n" 
		;

		document.getElementById( "textareaEntra" ).innerHTML = 
		"05/09/2017 - Salario-01 - R$ 5.200,00\n" + 
		"05/09/2017 - Seguro     - R$ 1.900,00\n" 
		;
		// $( "#textExibir" ).slideDown( "slow").delay( 1000 ).slideUp( "slow");
		// $( "#textareaExibir" ).slideDown( "slow" ).delay( 5000 ).slideUp( "slow");
	} );
} );

// Atualiza, recarrega a página
// function atualiza( ) {
// 	window.location.reload( );
// }


//Abre outra página
// window.open( 'visualiza.html',	'janela' );

// Recarrega outra pagina na mesma aba
// window.addEventListener("load", function( ) {
	$("#btnAddDesp").click( function ( ) {
		window.location.replace( 'despesas.html',	'janela' );
	} );
// } );

// window.addEventListener("load", function( ) {
	$("#btnAddEntra").click( function ( ) {
		window.location.replace( 'entrada.html',	'janela' );
	} );
// } );


// window.addEventListener("load", function( ) {
	$("#btnVisual").click( function ( ) {
		window.location.replace( 'visualiza.html',	'janela' );
	} );
// } );

// window.addEventListener("load", function( ) {
	$("#btnRelator").click( function ( ) {
		alert( " Em Desenvolvimento !!!")
	} );
// } );

$("#btnHome").click( function ( ) {
	window.location.replace( 'index.html', 'janela' );
});

// Amarzenar soma das tabelas
let valorTotal = 0.00;
let valor = 0.00;

$( document ).ready(function( ) {
	$( "#btnDesp" ).click( function ( ) {
		
		// alert("Nova despesas");
		let campos = [
						document.getElementById( 'dtDespesa' ),
						document.getElementById( 'textDespesa'),
						document.getElementById( 'valDespesa'),
						// document.getElementById( 'radioPend'),
						// document.getElementById( 'radioPg')
			];

		let despesas = {
			dt_desp : campos[0].value,
			text_desp : campos[1].value,
			val_desp : campos[2].value,
			// radio_pend : campos[3].value,
			// radio_pg : campos[4].value
		}
		// console.log( despesas);
		// document.getElementById("dtDespesas").innerHTML = despesas.dt_desp;
		// document.getElementById("despDespesas").innerHTML =	despesas.text_desp;
		// document.getElementById("valDespesas").innerHTML ="R$ " + despesas.val_desp; 

		// document.getElementById( 'tbmenuDesp').style.display = 'all';

		valor =  parseFloat(despesas.val_desp).toFixed( 2 );


		$( '#tbDespesas > tbody' ).append (
																				'<tr>' + '<td>' + despesas.dt_desp + '</td>' +
																					'<td>' + despesas.text_desp + '</td>' +
																					'<td>' + "R$ " + valor + '</td>' +
																				'</tr>'
																				);
		valorTotal = ( parseFloat( valorTotal ) + parseFloat( despesas.val_desp ) ) ;

		// console.log(valorTotal);
		
		$( "#valTotal").html( "R$ " + valorTotal.toFixed( 2 ) );

		$( '#dtDespesa' ).focus( );
	});
});

//Select campo number
$( "#valDespesa" ).click(function( ) {
	$( '#valDespesa').select( );
}) 

// Controle de Versão
$( "#contVer").html("Versão beta 0.0.2 - 30/09/2017");


//Nome Desenvolvedor
$( "#nomeDeveloper").html("&copy 2017 - Josuel A. Lopes");

//Nome Empresa Desenvolvedora
$( "#nomeEmpresa").html("&reg Seven Solutions Tecnologic");