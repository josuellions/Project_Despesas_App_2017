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
		valor = valor.replace('.',',');

		$( '#tbDespesas > tbody' ).append (
																				'<tr>' + '<td>' + despesas.dt_desp + '</td>' +
																					'<td>' + despesas.text_desp + '</td>' +
																					'<td>' + "R$ " + valor + '</td>' +
																				'</tr>'
																				);
		
		valorTotal = ( parseFloat( valorTotal ) + parseFloat( despesas.val_desp ) ) ;
		valorTotal = valorTotal.toFixed( 2 );
		valorTotal = valorTotal.replace('.',',');
		
		$( "#valTotal").html( "R$ " + valorTotal );

		$( '#dtDespesa' ).focus( );
	});
});

//Select campo number
$( "#valDespesa" ).click(function( ) {
	$( '#valDespesa').select( );
}) 

//FUNÇÃO DATA DE REFERENCIA
function formataData (  ) {
	dt = new Date( )
	let dia = dt.getDate( );
	let mes = dt.getMonth( );
	let ano = dt.getFullYear( );

	if(dia.toString( ).length == 1 ) dia = '0' + dia;
	if(mes.toString( ).length == 1 ) mes = '0' + mes;

	 return ano + "-" +  mes + "-" + dia;
}

function defineMes( ){
	let recebeDt = new Date( );
	let mes = recebeDt.getMonth( );
	let ano = recebeDt.getFullYear( );

	switch(mes) {
		case 0 : 
							mes = "JAN";
							break;
		case 1 :
							mes = "FEV";
							break;
		case 2 :
							mes = "MAR";
							break;
		case 3 :
							mes = "ABR";
							break;
		case 4 :
							mes = "MAI";
							break;
		case 5 :
							mes = "JUN";
							break;
		case 6 :
							mes = "JUL";
							break;
		case 7 :
							mes = "AGO";
							break;
		case 8 :
							mes = "SET";
							break;
		case 9 :
							mes = "OUT";
							break;
		case 10 :
							mes = "NOV";
							break;
		case 11 : 
							mes = "DEZ";
							break;
	}

	return mes + "/" + ano;

}
// function dtReferencia( ) {
	$('#dtReference').html( defineMes( ) );
// }

// const data= new Date( );
$('#dtDespesa').val(formataData( ));












// Controle de Versão
$( "#contVer").html("Versão beta 0.0.2 - 03/10/2017");


//Nome Desenvolvedor
$( "#nomeDeveloper").html("&copy 2017 - Josuel A. Lopes");

//Nome Empresa Desenvolvedora
$( "#nomeEmpresa").html("&reg Seven Solutions Tecnologic");