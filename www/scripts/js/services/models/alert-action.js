angular.module('alertServices', ['ngResource'])
.factory('alertAction', function($q){

  let service = {};
 
  const XmodalQuestionCancelaElement = document.querySelector('#XmodalQuestionCancela')
  const ModalQuestionCancelaElement = document.querySelector('#ModalQuestionCancela')
  const ModalQuestionConfirmaElemtent = document.querySelector('#ModalQuestionConfirma')
  const ModalSuccessElement = document.querySelector('#ModalSuccess');
  
  service.success = (message) => {
    return $q((res, rej) => {
      try{
        $('#ModalSuccess').modal('toggle');
        $("#avisos").html(`${message}`);
       
        const id = setTimeout(() => {
          $("#avisos").html(' ');
          $('#ModalSuccess').modal('toggle');
          window.clearTimeout(id);
        }, 1800);

        ModalSuccessElement.addEventListener('click', (event) =>{
          event.preventDefault();
          window.clearTimeout(id);
        })
      }
      catch{
        rej({message: 'Erro: FACTORY SERVICES ALERT, falha ao exibir o alert sucesso!'})
      }
    })
  },
  service.question = (message, action, getDados) => {
   return $q((res, rej) => {
     try{
        const LimparDadosQuestion = () => {
            action = null;
            getDados = null;
            message = null;
        }

        $('#ModalQuestion').modal('toggle');
        $("#questionAviso").html(`${message}`);
      
        XmodalQuestionCancelaElement.addEventListener('click', (event) => { 
          event.preventDefault();
          LimparDadosQuestion ();
          return false
        });
      
        ModalQuestionCancelaElement.addEventListener('click', (event) => {
          event.preventDefault();
          LimparDadosQuestion ();
          return false
        }) 

        ModalQuestionConfirmaElemtent.addEventListener('click', (event) => {
          event.preventDefault();
          action !== null && action(getDados);
          LimparDadosQuestion ();

          return true
        }) 
      }catch{
        rej({message: 'Erro: FACTORY SERVICES ALERT, falha ao exibir o alert question!'})
      }
    })
  },
  service.info =  (message) => {
    return $q((res, rej) => {
      try{
        $('#ModalInfo').modal('toggle');
        $("#infoAvisos").html(`${message}`);

        res(true)
        
      }catch{
        rej({message: 'Erro: FACTORY SERVICES ALERT, falha ao exibir o alert info!'})
      }
    })
  },
  service.error = (message) => {
    return $q((res, rej) => {
      try{
        $('#ModalError').modal('toggle');
        $("#errorAvisos").html(`${message}`);
        
        return 
      }
      catch{
        rej({message: 'Erro: FACTORY SERVICES ALERT, falha ao exibir o alert sucesso!'})
      }
    })
  }

  return service;
})
