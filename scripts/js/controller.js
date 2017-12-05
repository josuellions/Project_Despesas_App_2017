// Recarrega outra pagina na mesma aba
$("#btnAddDesp").click( function ( ) {
	window.location.replace( 'public/despesas.html',	'janela' );
} );

$("#btnAddEntra").click( function ( ) {
	window.location.replace( 'public/entrada.html',	'janela' );
} );

$("#btnVisual").click( function ( ) {
	window.location.replace( 'public/visualiza.html',	'janela' );
} );

$("#btnRelator").click( function ( ) {
	alert( " Em Desenvolvimento !!!")
} );

$("#btnHome").click( function ( ) {
	window.location.replace( '../index.html', 'janela' );
});

// BOTÃO MENU
$("#btnMenuEntra").click( function( ) {
	window.location.replace( 'entrada.html', 'janela' );
});

$("#btnMenuDesp").click( function( ) {
	window.location.replace( 'despesas.html', 'janela' );
});

$("#btnMenuVisual").click( function( ) {
	window.location.replace( 'visualiza.html', 'janela' );
});

$("#btnMenuRelator").click( function( ) {
	alert( "Em Desenvolvimento !!!" );
})


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

$( document ).ready( function ( ){ 

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

	//Select campo number
	$( "#valDespesa" ).click(function( ) {
		$( '#valDespesa').select( );
	}) 

	$( "#valEntrada" ).click(function( ) {
		$( '#valEntrada').select( );
	}) 

	//FUNÇÃO DATA DE REFERENCIA
	function formataData (  ) {
		dt = new Date( )
		let dia = dt.getDate( ), 
				mes = dt.getMonth( ), 
				ano = dt.getFullYear( );

		mes.toString( ).length < 10 ? mes = + parseInt( mes + 1 ) : false;

		dia.toString( ).length == 1 ? dia = '0' + dia : false;
		mes.toString( ).length == 1 ? mes = '0' + mes : false;

		return ano + "-" +  mes + "-" + dia;
	}

// DEFINIR DATA INICIAL CAMPO DATA
let dtInicial = ( ) => 
		$( "#dtEntrada" ).val( formataData( ) );
		$( "#dtDespesa").val(formataData( ) );

		// $( "#valEntrada").click( function( ){
		// 	$( "heightVisualizar").css({"overflow":"170px"});
		// })



dtInicial( );


// VARIÁVEIS GLOBAIS DEFINIR SELETOR MÊS
let recebeDt,	mesGlobal = 0, anoGlobal = 0;

	function defineMes( condicao ){

		let trocaMes = ( ) =>  { baseMes( mesGlobal, anoGlobal, condicao); } 

		let inicioMes = ( ) => {recebeDt = new Date( );
														mesGlobal = recebeDt.getMonth( );
														anoGlobal = recebeDt.getFullYear( );

														baseMes( mesGlobal, anoGlobal );
														
		}

		condicao ? trocaMes( ) : inicioMes(  );

	}

	function convertMes( recebMes, recebAno ){

		let mesExt = [ "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"	];

		return mesExt[ recebMes ] + "/" + recebAno;

	}

	// BOTÕES PASSAR MÊS 
	let baseMes = ( mes, ano, condicao ) =>  {

	condicao === 1 && mesGlobal >= 0 ? mesGlobal-- : false
		mesGlobal === -1 ? anoGlobal-- : false 
			mesGlobal === -1 ? mesGlobal = 11 :  false 
				mesGlobal--

	condicao === 2 && mesGlobal >= -1 ? mesGlobal++ : false 
	 mesGlobal === 11 ? anoGlobal++ : false
		mesGlobal === 11 ? mesGlobal = -1 : false 
		 mesGlobal++

	$( "#dtReference" ).html( convertMes( mesGlobal, anoGlobal ) );

}
	
	// AVANÇAR MÊS DE REFERÊNCIA
	$('#OpcaoMesEsquedo').mousedown( function( ) { defineMes( 1 ) } );
	$('#OpcaoMesDireito').mousedown( function( ) { defineMes( 2 ) } );

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

});