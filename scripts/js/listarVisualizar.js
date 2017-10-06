jQuery.support.cors = true;

(function( $ ) {

	$( "#btnExec" ).click( function ( ) {

		var settings = {
		  // "async": true,
		  // "crossDomain": true,
		  "url": "http://21.21.21.5:3000/listarVizualizar",
		  "method": "GET",
		  "headers": {
		    "content-type": "application/x-www-form-urlencoded",
		    "cache-control": "no-cache",
		    "postman-token": "5838c817-1acc-916d-490f-ea034601cd1e"
		  }
		}

		// console.log(settings.url)
		// if(settings != true){  alert("ok");}


		$( '#textareaDisp').html( "" );

		$.ajax(settings).done(function (response) {
		  //  console.log(response);
			 // console.log("ok")

				 $.each(response, function( id,value){

			  	// console.log(value.data_ent);

			  	data = this.data_ent.substr( 0, 10)

			  	dtDia = data.substr( 8,9)
					dtMes = data.substr(4,5);
					dtMesAlt = dtMes.substr(1,2)
					dtAno = data.substr(2,2)

					dtFormt = dtDia + "/" + dtMesAlt + "/" + dtAno;
					// console.log(dtFormt);

			  	valorFormat =  parseFloat(this.valor_ent).toFixed( 2 ).replace('.',',')

			  	$( '#textareaDisp' ).append ( dtFormt + "   |   " +
																			this.despesa_ent +  "       |       " +
																			"R$ " + valorFormat  +
																			"\n"
																			);
		  });

		});

	});
	
})(jQuery);