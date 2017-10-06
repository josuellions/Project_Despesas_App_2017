// Recarrega outra pagina na mesma aba
$("#btnAddDesp").click( function ( ) {
	window.location.replace( 'despesas.html',	'janela' );
} );

$("#btnAddEntra").click( function ( ) {
	window.location.replace( 'entrada.html',	'janela' );
} );

$("#btnVisual").click( function ( ) {
	window.location.replace( 'visualiza.html',	'janela' );
} );

$("#btnRelator").click( function ( ) {
	alert( " Em Desenvolvimento !!!")
} );

$("#btnHome").click( function ( ) {
	window.location.replace( 'index.html', 'janela' );
});

// Amarzenar soma das tabelas
let valorTotal = 0.00;
let valor = 0.00;

$( document ).ready(function( ) {
	$( "#btnDesp" ).click( function ( ) {
		
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
		dtDia = despesas.dt_desp.substr(8,10)
		dtMes = despesas.dt_desp.substr(4,5);
		dtMesAlt = dtMes.substr(1,2)
		dtAno = despesas.dt_desp.substr(2,2)

		dtFormt = dtDia + "/" + dtMesAlt + "/" + dtAno;

		$( '#tbDespesas > tbody' ).append (
																				'<tr>' + '<td width="22%">' + dtFormt + '</td>' +
																					'<td width="48%">' + despesas.text_desp + '</td>' +
																					'<td width="30%">' + "R$ " + valor + '</td>' +
																				'</tr>'
																				);
		
		valorTotal = ( parseFloat( valorTotal ) + parseFloat( despesas.val_desp ) ) ;
		valorTotal = valorTotal.toFixed( 2 );
		valorTotal = valorTotal.replace('.',',');
		
		$( "#valTotal").html( "R$ " + valorTotal );
		
		$( '#valDespesa').val( "0.00" );	

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

	if(mes.toString( ).length < 10 ) mes = + parseInt( mes + 1 );

	if(dia.toString( ).length == 1 ) dia = '0' + dia;
	if(mes.toString( ).length == 1 ) mes = '0' + mes;

	 return ano + "-" +  mes + "-" + dia;
}

function defineMes( ){
	let recebeDt = new Date( );
	let mes = recebeDt.getMonth( );
	let ano = recebeDt.getFullYear( );

	let mesExt = [ "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"	];

	return mes = mesExt[mes] + "/" + ano;;

}

// EXIBIR O MÊS DE REFENCIA
$('#dtReference').html( defineMes( ) );

// DEFINIR O MÊS ATUAL NO INPUT DATA
$('#dtDespesa').val(formataData( ));

// Controle de Versão
$( "#contVer").html("Versão beta 0.0.3 - 05/10/2017");

//Nome Desenvolvedor
$( "#nomeDeveloper").html("&copy 2017 - Josuel A. Lopes");

//Nome Empresa Desenvolvedora
$( "#nomeEmpresa").html("&reg Seven Solutions Tecnologic");

// $( "#btnSair").window.close( );