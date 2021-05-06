angular.module('todoApp').controller('InformacoesController',
function($scope){
    $scope.titulo = 'Controle Despesas';
    $scope.classSubTitulo = 'subtitulo-menu alinharMes';
    $scope.subtitulo = 'Informações'
    $scope.passmes = false;

    $scope.information = [
			{
				title: 'Entrada Caixa',
				caption: 'Lançamentos entrada de caixa',
				text: 'Exemplo: salário, comissão, vale alimentação, vale transporte e outros.',
				visible: true
			},
			{
				title: 'Despesas',
				caption: 'Lançamentos gastos com despesas',
				text: `Exemplo: almoço, mercado, roupas, farmácia,
				 transporte, conta luz, água, telefone, TV por assinatura e outros.`,
				visible: true,
			},
			{
				title: 'Investimentos',
				caption: 'Lançamentos investimento',
				text: `Lancamento é realizado na tela despesa, para identificar o investimento, adiciona a sigla "IN-nome investimento".
				Exemplo: IN-Aplicações, IN-Poupança, IN-CDB, IN-CDI, IN-Poupança"`,
				visible: true,
			},
			{
				title: 'Visualizar',
				caption: 'Vizualização laçamentos entrada e despesas',
				text: `Exibe os lançamentos já adicionados, para conferência, 
				calculando a soma de entrada e subtraindo pela soma total das despesas, exibindo o resultado.`,
				visible: true,
			},
			{
				title: 'Relatório',
				caption: 'Vizualização relatório entrada e despesas em gráficos',
				text: `Relatório gráfico total entrada de caixa, calculo da porcentagem utilizada do valor total entrada com base nos gastos 
				com e lançamentos das depesas. Gráfico e calculo da porcentagem dos lançamentos das despesas. Porcentagem geral do saldo.`,
				visible: true,
			},
			{
				title: 'Informações',
				caption: 'Informações do Aplicativo - APP',
				text: `Ajuda, exemplos das funcionalidades e usabilidade da aplicação.`,
				visible: true,
			},
			{
				title: 'Sobre',
				caption: 'Informações da versão, desenvolvedor e desenvolvimento',
				text: `Versão atual do aplicativo, Informações desenvolvedor, contato, linguagens de programação e desenvolvimento.`,
				visible: false,
			}
    ]
})
