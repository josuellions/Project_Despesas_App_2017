* {
	font-family: sans-serif;
}

/*DEFINIR COR DE FUNDO - 01 - Superio*/
.bg-01 {
	background-color: #474e5d;
	color: #ffffff;
	margin-top: -8.2%;
	position: fixed;
	width: 100%;
	z-index: 1;
}

/*DEFINIR COR DE FUNDO - 02 - Rodapé*/
.bg-02 {
	background-color: #474e5d;
	color: #ffffff;
	padding-top: 1%;
	margin-top: -1.5%;
	/*position: fixed;*/
	width: 100%;
	z-index: 1;
}

/*DEFINIR COR DE FUNDO - 03 - Titulo*/
.bg-03 {
	background-color: #737d93;
	color: #ffffff;
	margin-top: 4.3%;
	position: fixed;
	width: 100%;
	z-index: 2;
}

/*DEFINIR COR DE FUNDO - 04 - Mês Referencia*/
.bg-04 {
	background-color: #c5cad5;
	color: #ffffff;
	margin-top: 17.7%;
	position: fixed;
	width: 100%;
	z-index: 1;
}

/*ALINHAR TEXTO h1 - Texto Principal*/
.container-fluid > h1 {
	font-size: 2.7rem;
	width: 100%;
}

/*BOTÃO OPÇÃO MÊS*/
.spanOpcaoMesEsquedo {
	font-size: 2rem;
	float: left;
	color: white;
	text-align: right;
	margin-top: 3.5vh;
	width: 30%;
	position: fixed;
}

.spanOpcaoMesDireito {
	font-size: 2rem;
	float: right;
	color: white;
	text-align: right;
	margin-top: -4.2vh; 
	margin-right: 21vw;
	width: 25%;
	position: fixed;
}

/*ALINHA MÊS*/
.container-fluid >  .alinharMes {
	float: left;
	text-align: center;
	width: 43%;
	font-size: 2.5rem;
}

/*ALINHAR FORMULARIO DE DADOS*/
.container-fluid > div > div > .alinharFormDesp {
	float: left;
	margin-top: 35%;
	border: 200px 300px solid 2px red;
	margin-bottom: 28%;

}

/*BOTÃO ADICIONAR LINHA TABELA*/
.btnDesp {
	float: right;
	font-size: 2.5rem;
	text-align: center;
	margin-right: 1%;
	margin-bottom: 68%;
}

.container-fluid > div > div > div > span .dtDespesa {
	width: 22%;
	padding: .8%;
}

.container-fluid > div > div > div > span .listDespesa {
	width: 35vw;
	padding: .8%;
}

.container-fluid > div > div > div > span .valDespesa {
	width: 25%;
	text-align: right;
}

.container-fluid > div > div > div > span .radioPend{
	float: left;
	margin-left: 4%;
	margin-top: -4%;
}

.container-fluid > div > div > div > span .radioPg {
	float: left;
	margin-left: 30%;
	margin-top: -4%;
}
.container-fluid > div > div > div > .dtLabel {
	float: left;
}

.container-fluid > div > div > div > .despLabel {
	float: left;
	margin-left: 29%;
}

.container-fluid > div > div > div > .valLabel {
	float: left;
	margin-left: 18%;
}

.container-fluid > .textExibir  {
margin-left: -5%;
margin-top: 42%;
text-align: left;
}

/*.textExibir p {
	border: 2rem solid white;
	padding: 0;
	height: 5vh;
}*/

div.listExibDesp {
	margin-left: 0%;
	border: 2px solid white;
  padding: 0; 
  padding-top: 1%;
  margin-bottom: 5%; 
  margin-top: -5%; 
  width: 48%; 
  min-height: 240px;
	margin-left: -1%;
	font-size: .7rem;
	text-align: center;
}

.listDesp {
	padding-top: 4%;
	padding-left: 0%;
	text-align: left;
}

tbody.listDesp tr td {
	padding-left: 4%;
	margin-left: 2%;
	padding-top: 4%;
} 

div.listExibEntrada {
	border: 2px solid white;
  padding: 0%;
  padding-top: 1%;
  margin-bottom: 5%;
  margin-top: -5%;
  width: 48%;
  min-height: 20vh;
  margin-left: 5%;
	margin-bottom: 29%;
	font-size: .7rem;

}

div .textExib-Entrada {
	margin-left: 9%;
}

div.totalEntrada{
	border: 2px solid white;
  padding: 2%;
  margin-bottom: 5%;
  margin-top: -27%;
  width: 44vw;
  min-height: 5vh;
  margin-left: 5%;
	font-size: 1rem;

}

div.listExibCalculos {
	border: 2px solid white;
  padding: 2%;
  padding-top: 4%;
  margin-bottom: 5%;
  margin-top: -7%;
  width: 44vw;
  min-height: 13.5vh;
  margin-left: 5%;
	margin-bottom: 29%;
	font-size: 1rem;

}

div.listExibCalculos tr th {
	padding-bottom: 5%;
}

div.totalDespesas {
	border: 2px solid white;
  padding: 2%;
  margin-bottom: 5%;
  margin-top: -20vh;
  width: 44vw;
  min-height: 5vh;
  margin-left: -1%;
	font-size: 1rem;
}


/*TEXTAREA DESPESAS - Tela Visualizar*/
.container-fluid > div > .despesa {
	width: 150px;
	height: 200px;
	padding:  2%;
	padding-top: 2%;
	font-size: .7rem;
	font-style: bold;
}

thead.theadDesp  tr th {
	text-align: center;
	margin-left: 1%;
	background-color: lightgray;
	font-size: 1rem;
}

thead.theadEntrada tr th {
	text-align: center;
	margin-left: 1%;
	background-color: lightgray;
	font-size: 1rem;
}

.listEntrada {
	padding-top: 4%;
	padding-left: 0%;
	text-align: left;
}

tbody.listEntrada tr td {
	padding-left: 4%;
	margin-left: 2%;
	margin-left: 2%;
	padding-top: 4%;
}

.container-fluid > .tbmenuDesp {
	display: none;
}

/*TEXTAREA ENTRADA - Tela Visualizar*/
.container-fluid > div > .entrada {
	width: 155px;
	height: 200px;
	padding:  2%;
	padding-top: 2%;
	font-size: .7rem;
	font-style: bold;
}

/*BOTÃO VISUALIZAR - Tela Visualizar Despesas*/
.container-fluid > button {
	/*float: left;*/
	margin-left: 35%;
	margin-top: 10%;
	height: 40px;
	margin-bottom: 15.5%;
}

/*ALINHA BOTÕES PAGINA INICIAL*/
.container-fluid > .menuInicial {
	margin-top: 45.5%;
	margin-bottom: -1%;
}

/*ALINHA BOTÕES PAGINA INICIAL*/
.container-fluid > .btnAlingDesp {
	float: left;
	margin-top: 60%;
	margin-bottom: 16.5%;
}

/*BOTÕES DA PAGINA INICIAL*/
.container-fluid > div > .btnDesp  {
	width: 100%;
	height: 50px;
	border-radius: 4%;
	text-align: center;
	padding: 5%;
	margin-bottom: 5%;
	font-size: 2rem;
}

.container-fluid > .contVer {
	padding: 0;
	float: left;
	margin-top: -4%;
	margin-left: 18%; 
	text-align: left;
	font-size: 1rem;
	position: fixed;
}

.tbDespfoot {
	float: left;
	margin-top: -62%;
}


/*BOTÃO MENU HOME*/
.btnMenu {
	float: right;
	margin-top: -10.5%;
	font-size: 3rem;
	position: fixed;
	z-index: 2;

}

/*ICONE REMOVER*/
span.glyphicon.glyphicon-trash {
	font-size: 1.7rem;
	color: red;
	opacity: .3;
	margin-right: 1vh;
	z-index: 0;
}


footer.footerIndex {
	width: 100%;
	margin: 0;
	margin-top: -4vh;
	/*height: 20vh;*/
	position: fixed;
}


/*FOOTER TELA ENTRADA CAIXA*/
footer.footerEntrada {
	margin: 0;
	margin-top: -5.4vh !important;
	height: 20vh !important;
}

/*FOOTER TELA DESPESAS*/
footer.footerDespesas {
	margin: 0;
	margin-top: -5.4vh !important;
	height: 20vh !important;
}

/*FOOTER TELA VISUALIZAR*/
footer.footerVisualizar {
	margin: 0;
	width: 100%;
	margin-top: 93vh !important;
	/*height: 20vh !important;*/
	position: fixed;
	margin-bottom: 0;
}

img {
	float: left;
	margin-top: 0.7%;
	margin-left: -3.7%;
	border-radius: 10%;
	padding-bottom: 0.7%;
	width: 20%;
}

.heightVisualizar {
	position: fixed;
	height: 576px;
	max-height: 680px !important;
}

/*ICONE DO APP*/
.iconeSeven {
	border-radius: 50%;
}