(function( $ ) {

	$( "#btnExec" ).click( function ( ) {

	var settings = {
	  // "async": true,
	  // "crossDomain": true,
	  "url": "http://21.21.21.5:3000/listarDespesas",
	  "method": "GET",
	  "headers": {
	    "content-type": "application/x-www-form-urlencoded",
	    "cache-control": "no-cache",
	    "postman-token": "6bd2addd-31eb-2d48-861d-d2df933ed986"
	  }
	}

	$( '#textareaDisp').html( "" );

	$.ajax(settings).done(function (response) {
		// console.log("ok")
	  // console.log(response);
			
			 $.each(response, function( id,value){

	  	// console.log(value.data_ent);

	  	data = value.data_ent.substr( 0, 10)

	  	dtDia = data.substr( 8,9)
			dtMes = data.substr(4,5);
			dtMesAlt = dtMes.substr(1,2)
			dtAno = data.substr(2,2)

			dtFormt = dtDia + "/" + dtMesAlt + "/" + dtAno;
			// console.log(dtFormt);

	  	valorFormat =  parseFloat(value.valor_ent).toFixed( 2 ).replace('.',',')

	  	$( '#textareaDisp' ).append ( dtFormt + "   |   " +
																	value.despesa_ent +  "       |       " +
																	"R$ " + valorFormat  +
																	"\n"
																	);
	  })

			// let campos = [
			// 				document.getElementById( 'dtDespesa' ),
			// 				document.getElementById( 'textDespesa'),
			// 				document.getElementById( 'valDespesa'),
			// 				// document.getElementById( 'radioPend'),
			// 				// document.getElementById( 'radioPg')
			// 	];

			// let despesas = {
			// 	dt_desp : campos[0].value,
			// 	text_desp : campos[1].value,
			// 	val_desp : campos[2].value,
			// 	// radio_pend : campos[3].value,
			// 	// radio_pg : campos[4].value
			// }
			// // console.log( despesas);
			// // document.getElementById("dtDespesas").innerHTML = despesas.dt_desp;
			// // document.getElementById("despDespesas").innerHTML =	despesas.text_desp;
			// // document.getElementById("valDespesas").innerHTML ="R$ " + despesas.val_desp; 

			// // document.getElementById( 'tbmenuDesp').style.display = 'all';

			// valor =  parseFloat(despesas.val_desp).toFixed( 2 );
			// valor = valor.replace('.',',');
			// dtDia = despesas.dt_desp.substr(8,10)
			// dtMes = despesas.dt_desp.substr(4,5);
			// dtMesAlt = dtMes.substr(1,2)
			// dtAno = despesas.dt_desp.substr(2,2)

			// dtFormt = dtDia + "/" + dtMesAlt + "/" + dtAno;

			// $( '#tbDespesas > tbody' ).append (
			// 																		'<tr>' + '<td width="22%">' + dtFormt + '</td>' +
			// 																			'<td width="48%">' + despesas.text_desp + '</td>' +
			// 																			'<td width="30%">' + "R$ " + valor + '</td>' +
			// 																		'</tr>'
			// 																		);
			
			// valorTotal = ( parseFloat( valorTotal ) + parseFloat( despesas.val_desp ) ) ;
			// valorTotal = valorTotal.toFixed( 2 );
			// valorTotal = valorTotal.replace('.',',');
			
			$( "#valTotal").html( "R$ " + valorTotal );
			
			$( '#valDespesa').val( "0.00" );	

			$( '#dtDespesa' ).focus( );

		});

	});
	
})(jQuery);