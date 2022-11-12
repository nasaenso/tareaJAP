const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
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
      text: 'Por favor, inicie sesión',
      icon: 'error',
      confirmButton: false
    }).then(function() {
      window.location = "login.html";
      });

      // por si ingresó los datos en el perfil
  }else if (username != null && username.firstName != "" && username.firstSurname != "" ){
    document.getElementById('nombreUsuario').innerHTML = username.firstName+"_"+username.firstSurname;
    
  }else{
    // por si no ingreso los datos en el perfil
    // para que se vea solo la parte que hay antes del "@" del email del usuario
    username = email.split("@");
    // Mostrar nombre del usuario
    document.getElementById('nombreUsuario').innerHTML = username[0];
  }


 // Botón de cerrar sesión 
 document.getElementById('cierro').addEventListener('click', ()=>{
  Swal.fire({
    title: '¿Quiere cerrar sesión?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
        title: '¡Sesión cerrada con éxito!',
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