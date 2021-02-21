angular.module('passMonthServices', ['ngResource'])
.factory('pass', function($q){

  let pass = {};
  const dtFull = new Date();
  let dtMes = dtFull.getMonth();
  let dtAno = dtFull.getFullYear();

  pass.Month = ($returnNext) => {
    
    const nextPage = 1;
    const returnPage = 0;

    return $q((res, rej) => {
      try { 
        $returnNext == returnPage && dtMes >= 0 && dtMes <= 11 ? --dtMes : null;
        $returnNext == nextPage && dtMes >= 0 && dtMes <= 11 ? ++dtMes : null;
        $returnNext == returnPage && dtMes == -1 ? ((dtMes = 11), --dtAno) : null;
        $returnNext == nextPage && dtMes == 12 ? ((dtMes = 0), ++dtAno) : null;
        $returnNext != nextPage && $returnNext != returnPage ? rej(message) : false;
        
        const anoMesDia = GetDateFormat.anoFullMesExtDiaParams(mesExt[dtMes], dtAno);
        const dt = anoMesDia.split('-')
        res({
          'anoMesDia': anoMesDia,
          'mesExt': GetDateFormat.mesExtAnoParams(mesExt[dtMes], dtAno),
          'formatDate': new Date(parseInt(dt[0]), parseInt(dt[1] -1), parseInt(dt[2]))
        })
      }catch{
        rej({message: 'Error: FACTORY PASS MONTH, falha ao formatar data!'})
      }
    })
  },
  pass.MonthInitial = () => {
    return $q((res, rej) => {
      try{
        dtMes = dtFull.getMonth();
        dtAno = dtFull.getFullYear();
        dtDia = dtFull.getDate();       

        res({
          'mesExt': GetDateFormat.mesExtAnoParams(mesExt[dtMes], dtAno),
          'anoMesDia': GetDateFormat.anoFullMesExtDiaParams(mesExt[dtMes], dtAno)
        })
      }catch{
        rej({message: 'Error: FACTORY PASS MONTH INICIAL, falha ao formatar data inicial!'})
      }
    })
  }

  return pass;
})