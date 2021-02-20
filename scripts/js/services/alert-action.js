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
        let questionAction = action;
        
        $('#ModalQuestion').modal('toggle');
        $("#questionAviso").html(`${message}`);
        
        const LimparDadosQuestion = () => {
          questionAction = null;
          action = null;
          getDados = null;
          message = null;
        }
      
        XmodalQuestionCancelaElement.addEventListener('click', (event) => { 
          event.preventDefault();
          
          //console.log("X")
          LimparDadosQuestion ();
          return false
        });
      
        ModalQuestionCancelaElement.addEventListener('click', (event) => {
          event.preventDefault();
          //console.log("CANCEL")
          LimparDadosQuestion ();
          return false
        }) 

        ModalQuestionConfirmaElemtent.addEventListener('click', (event) => {
          event.preventDefault();
          //console.log("CONFIRME")
          //action(getDados);
          questionAction(getDados);
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

        return true
        
      }catch{
        rej({message: 'Erro: FACTORY SERVICES ALERT, falha ao exibir o alert info!'})
      }
    })
  },
  service.error = (message) => {
    return $q((res, rej) => {
      try{
        console.log(message)
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