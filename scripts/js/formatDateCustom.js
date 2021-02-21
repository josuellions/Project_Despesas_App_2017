/*BASE MÊS VIEW FORMATO YYYY-MM-dd */
const basemesPag = () => { //1x usado InsertMesBaseAnterior
  //console.warn($("#comparaDt").text())
  return $("#comparaDt").text();
};

/*Funções DATA ou Format DATA */
const mesExtObj = {
  JAN(){
    return "01";
  },
  FEV(){
    return "02";
  },
  MAR(){
    return "03";
  },
  ABR(){
    return "04";
  },
  MAI(){
    return "05";
  },
  JUN(){
    return "06";
  },
  JUL(){
    return "07";
  },
  AGO(){
    return "08";
  },
  SET(){
    return "09";
  },
  OUT(){
    return "10";
  },
  NOV(){
    return "11";
  },
  DEZ(){
    return "12";
  },
  SELECT: (strMes) => {
    const response = mesExtObj[strMes];
    return response();
  }
};

const mesExt = ["JAN","FEV","MAR", "ABR", "MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

/*FORMATA DATA EM yyyy-mm-dd */
const GetDateFormat =  {
  anoFullMesDiaAtual: () =>{
      const dt = new Date();
      const dia = String(dt.getDate()).slice(-2);
      const ano = String(dt.getFullYear()).slice(-4);
      const mes = String(`0${dt.getMonth() + 1}`).slice(-2);

      return [ano, mes, dia].join('-');
  },
  anoFullMesExtDiaParams: (mesExt, ano) =>{ //yyyy-MM-dd
      const diaFormat = String('01').slice(-2);
      const mesFormat = String(mesExtObj.SELECT(mesExt)).slice(-2);

      return [ano, mesFormat, diaFormat].join('-');
  },
  anoFullMesExtDiaAtualParams: (diaAtual, mesExt, ano) =>{
    const diaFormat = String(`0${diaAtual}`).slice(-2);
    const mesFormat = String(mesExtObj.SELECT(mesExt)).slice(-2);

    return [ano, mesFormat, diaFormat].join('-');
  },
  anoFullMesDiaFormatBDParamsFull: (dia, mes, ano) =>{
    const diaFormat = String(`0${dia}`).slice(-2);
    const mesFormat = mes == 12 ? String(`0${1}`).slice(-2) : String(`0${parseInt(mes) + 1}`).slice(-2);
    const anoFormat = mes == 12 ? String(parseInt(ano) + 1) : ano
    return [anoFormat, mesFormat, diaFormat].join('-');
  },
  mesExtAnoParams: (mes, ano) =>{
    return [mes,ano].join('/');
  }
}

/* DEFINIR DATA RETORNA YYYY-MM-dd */
const formataData = () => { //4X em uso
  let dt = new Date();
  let dia = String(dt.getDate()).slice(-2);
  let mes = String(dt.getMonth()).slice(-2);
  let ano = String(dt.getFullYear()).slice(-4);
 
  
  ano = parseInt(mes) == 12 ? `${parseInt(ano) +1}` :ano;
  mes = parseInt(mes) < 11 ? `${parseInt(mes) +1}` : mes;
  
  const dtFomat = [ano, `0${mes}`.slice(-2), `0${dia}`.slice(-2)].join("-");
  
  //console.error(`>> DATA FORMAT' ${dtFomat}`)

  return dtFomat;
};

const SubtituloMenuNull = () => {
  const retonardt = formataData(); 
  const dtBaseMes = parseInt(retonardt.split('-')[1] -1);
  const dtBaseAno = retonardt.split('-')[0];
 
  setTimeout(() => {
    //$("#dtReference").text(GetDateFormat.mesExtAnoParams(mesExt[dtBaseMes], dtBaseAno))
    //$("#OpcaoMesEsquerdo").removeClass('ng-hide');
    //$("#OpcaoMesDireito").removeClass('ng-hide');
    //$("#comparaDt").text(retonardt);
  }, 60);

  return  retonardt;
}

const SubtituloMenuMesAno = (dtbasepag) => {
  const dtBaseMes = dtbasepag.split('/')[0];
  const dtBaseAno = dtbasepag.split('/')[1];
  
  const mesExtStr = mesExtObj[dtBaseMes];
  retonardt = [dtBaseAno, mesExtStr(),'01'].join('-');
  
  //$("#comparaDt").text(GetDateFormat.anoFullMesExtDiaParams(dtBaseMes, dtBaseAno));
  
  return retonardt;
}

const CheckSubtituloMenu = {
  0() {
    return SubtituloMenuNull();
  },
  8(dado) {
    return SubtituloMenuMesAno(dado)
  }
}

/*CONVERTE CAMPO MÊS FORMATO JAN/2021 */
const convertMes = () => { //9X emuso
  const dtbasepag = $("#dtReference").html();
  const checkSubmenu = (String(dtbasepag)
                        .replace('undefined',' ')
                        .replace('MENU',' ')
                        .trim().length)
  const CheckSubtituloMenuSelect = CheckSubtituloMenu[checkSubmenu];
 
  return CheckSubtituloMenuSelect(dtbasepag);
};

/*FORMATAR DATA INSERT BASE MÊS ANTERIO 
FORMATO YYYY-MM-dd subtraindo mês*/
const formatDataInsert = () => { //2x em uso
  //FOMATINSERT
  convertMes();

  let dtConsultaAlt = dtConsultaBD();
  

  let dtInicio = dtConsultaAlt.inicio;
  let dtFim = dtConsultaAlt.fim;

  let dtDiaInicio = dtInicio.slice(8, 10);
  let dtDiaFim = dtFim.slice(8);
  let dtMes =
    parseInt(dtInicio.slice(5, 7)) < 11
      ? "0" + (parseInt(dtInicio.slice(5, 7)) - 1)
      : dtInicio.slice(5, 7) - 1;
  let dtAno = dtInicio.slice(0, 4);

  dtMes == 00 ? ((dtMes = 12), (dtAno = dtAno - 1)) : false;

  dtInicio = [dtAno, dtMes, dtDiaInicio].join("-");
  dtFim = [dtAno, dtMes, dtDiaFim].join("-");

  dtConsultaAlt = { inicio: dtInicio, fim: dtFim };
  
//console.log('>> FORMAT INSERT')
//console.log(dtConsultaAlt)

  return dtConsultaAlt;
};

/*FORMATA DATA CONSULTA BD
FORMATO YYYY-MM-dd mês atual da view
*/
const dtConsultaBD = () => { //6x em uso
  const dtConsulta = {
    inicio: "",
    fim: "",
  };

  const dtBaseAtual = new Date();
  
  const comparaDtbase = document.getElementById("comparaDt");
  
  const anoMes = comparaDtbase == null
                  ? [dtBaseAtual.getFullYear(), dtBaseAtual.getMonth() + 1]
                  : comparaDtbase.innerText.split('-');

  const ano = anoMes[0];
  let mes = parseInt(anoMes[1]) < 10 ? `0${parseInt(anoMes[1])}` : anoMes[1];
  
  const primeiroDiaMes = new Date(ano, mes, 1).getDate();
  const ultimoDiaMes = new Date(ano, mes, 0).getDate();

  dtConsulta.inicio = [ano, mes, `0${primeiroDiaMes}`].join("-");
  dtConsulta.fim = [ano, mes, ultimoDiaMes].join("-");

  //console.log(`MES DB CONSULTA`) 
  //console.log(dtConsulta)

  return dtConsulta;
};

/*FORMATA DATA VIEWS FORMATO dd/MM */ //MOVIDO PARA FACTORY
/*const fotmatDateView = (dtAnoMesDia) => { //4x uso
  const dt = dtAnoMesDia.split('-');
  const dtFormatView = [dt[2].slice(-2), dt[1].slice(-2)].join("/");
  
  return dtFormatView;
};*/

/*FORMAT BUSCA MÊS ANTERIOR */
const FormatDataBuscaMesAnterior = (getDate) =>{
  const date = new Date(getDate)
  const dateFormat = [
    GetDateFormat.anoFullMesDiaFormatBDParamsFull(1, date.getMonth(), date.getFullYear()),
    GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear()),
  ]

  return dateFormat;
}

/*FORMAT DATA PARA BANCO DADOS */
const FormatDateParaBancoDados = (getDate) => {
  const date = new Date(getDate);

  return GetDateFormat.anoFullMesDiaFormatBDParamsFull(date.getDate(), date.getMonth(), date.getFullYear());
}
