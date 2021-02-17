angular.module('passMonthServices', ['ngResource'])
.factory('pass', function($q){

  let pass = {};
  let message = {'message': 'Error: FACTORY PASS MONTH, falha ao formatar data!'}
  const dtFull = new Date();
  let dtMes = dtFull.getMonth();
  let dtAno = dtFull.getFullYear();
  let dtDia = dtFull.getDate();


  pass.Month = ($returnNext) => {
    
    const nextPage = 1;
    const returnPage = 0;

    return $q((res, rej) => {

      $returnNext == returnPage && dtMes >= 0 && dtMes <= 11 ? --dtMes : null;
      $returnNext == nextPage && dtMes >= 0 && dtMes <= 11 ? ++dtMes : null;
      $returnNext == returnPage && dtMes == -1 ? ((dtMes = 11), --dtAno) : null;
      $returnNext == nextPage && dtMes == 12 ? ((dtMes = 0), ++dtAno) : null;
      $returnNext != nextPage && $returnNext != returnPage ? rej(message) : false;
      
      res({
       'mesExt': GetDateFormat.mesExtAnoParams(mesExt[dtMes], dtAno),
       'anoMesDia': GetDateFormat.anoFullMesExtDiaParams(mesExt[dtMes], dtAno)
      }),
      rej(message)
    })
  }

  return pass;
})