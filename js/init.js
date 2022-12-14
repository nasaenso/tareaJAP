const CATEGORIES_URL ="https://japceibal.github.io/emercado-api/cats/cat.json"; 
                      //"http://localhost:3000/cat.json";
                      
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
                            //"http://localhost:3000/publish.json";

const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"; 
                      //"http://localhost:3000/cats_products/";

const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
                        //"http://localhost:3000/products/";

const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
                                  //"http://localhost:3000/products_comments/";

const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
                      //"http://localhost:3000/user_cart/";

const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
                    //"http://localhost:3000/buy.json";

const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(){
  let email = localStorage.getItem('email');
  let username = JSON.parse(localStorage.getItem('profileInfo'));
  
  // Verificar si hay usuario ingresado
  if(email == null) {
    Swal.fire({
      title: 'No hay nadie ingresado',
      text: 'Por favor, inicie sesi??n',
      icon: 'error',
      confirmButton: false
    }).then(function() {
      window.location = "login.html";
      });

      // por si ingres?? los datos en el perfil
  }else if (username != null && username.firstName != "" && username.firstSurname != "" ){
    document.getElementById('nombreUsuario').innerHTML = username.firstName+"_"+username.firstSurname;
    
  }else{
    // por si no ingreso los datos en el perfil
    // para que se vea solo la parte que hay antes del "@" del email del usuario
    username = email.split("@");
    // Mostrar nombre del usuario
    document.getElementById('nombreUsuario').innerHTML = username[0];
  }


 // Bot??n de cerrar sesi??n 
 document.getElementById('cierro').addEventListener('click', ()=>{
  Swal.fire({
    title: '??Quiere cerrar sesi??n?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'S??',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
        title: '??Sesi??n cerrada con ??xito!',
        icon: 'success'
      })
        localStorage.removeItem('email');
        localStorage.removeItem('profileInfo');
        localStorage.removeItem('pfp');
        localStorage.removeItem('addedProductArray');
        setTimeout(() => {
          window.location = "login.html";
        }, 1500);
      }
    })
  })
})