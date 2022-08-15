document.addEventListener("DOMContentLoaded", function(){
    //verificar si o para logear
    let usuario = localStorage.getItem('email');
    
    if(usuario == null) {
      Swal.fire({
        title: 'No hay nadie ingresado',
        text: 'Por favor, inicie sesión',
        icon: 'error'
    }).then(function() {
        window.location = "login.html";
    });
    }
    
 document.getElementById('cierro').addEventListener('click', ()=>{
    
  Swal.fire({
    title: '¿Quiere cerrar sesión?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí'
  }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
        title: 'Cerrando sesión',
        icon: 'success'
      }).then(function() {
          window.location = "login.html";
          localStorage.clear();
        });
      }
    })
 })
 


    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

})