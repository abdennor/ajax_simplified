const ajaxRequest = (url,data,errors,success,type="POST") => {
      $.ajax({
        url : url,
        type: type,
        data : data,
        processData: false,
        contentType: false,
        success:function(data){
          var error = false;
          for(const serror of errors ){
              var error_key = Object.keys(serror)[0];
              if( error_key === data) {
                error = serror[error_key];
              }
          }
          if(error){
              swal("Oops...", ""+error+" !", "error");
          }else{
              swal("Très Bien ! ", ""+success.message+"", "success");
              switch(success.action.type){
                  case "MODALHIDE":
                    $("#"+success.action.elements.modal_hide_id).modal('hide')
                    break;
                  case "SHOWNEXT":
                    $("#"+success.action.elements.modal_hide_id).modal('hide')
                    $("#"+success.action.elements.modal_show_id).modal('show')
                    break;
                  case "HIDDEN":
                    $("#"+success.action.elements.div_hide_id).addClass('hidden')
                    $("#"+success.action.elements.div_show_id).removeClass('hidden')
                    break;      
                  default:
                    break;

              }
              if(success.action.reload == true){
                setTimeout(()=>{
                  location.reload();
                },success.action.timeout);
              }
          }
        }
      });
    }
    const success = {
      message : 'hello world',
      action : {
        type: "MODALHIDE",
        elements:{modal_hide_id: 'edit_compagnie'},
        reload : false,
        timeout: 500
      }
    }
    const errors = [
      {no_dir_Com_name:"Ajouter le Nom du la Compagnie"},
      {no_dir_Com_abreviation:"Ajouter l'abreviation  du la Compagnie"},
      {no_dir_Com_phone:"Ajouter le phone du la Compagnie"},
      {no_dir_Com_id: 'no_id'}
    ]        
    ajaxRequest("?edit_company",form_data,errors,success)   
