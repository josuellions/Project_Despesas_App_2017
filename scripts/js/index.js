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

$("#btnInfo").click( function ( ) {
	alert( " APLICATIVO CONTROLE DESPESAS \n" +
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

$("#btnSobre").click( function ( ) {
	alert( "\t\t\t\t INFORMAÇÕES DESENVOLVEDOR \n\n" +
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


// EFEITO MENU SUPERIOR
$( "#btnMenu" ).click( function ( ) {

	$( "#liMenu" ).slideToggle( function( ) {

		$( this ).click(function( ) {

			$( "#liMenu" ).animate( ).slideDown( 700 );

			$( this ).ready( function ( ) { 

				$( "#liMenu" ).animate( ).slideUp( 700 );
			});
		});
	});

	$( "body" ).mousedown( function( ) {
		$( "#liMenu" ).animate( ).slideUp( 700 );
	});

});


// Amarzenar soma das tabelas
// let valorTotal = 0.00;
// let valor = 0.00;

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
$( "#contVer").html("Versão beta 0.0.7 - Bd offline - 27/11/2017");

//Nome Desenvolvedor
$( "#nomeDeveloper").html("&copy 2017 - Josuel A. Lopes");

//Nome Empresa Desenvolvedora
$( "#nomeEmpresa").html("&reg Seven Solutions Tecnologic");

// $( "#btnSair").window.close( );
