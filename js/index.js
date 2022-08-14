document.addEventListener("DOMContentLoaded", function(){

    let usuario = localStorage.getItem('email');
    
    if(usuario == null) {
        alert("no hay nadie logeado");
        location.href="login.html"
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
          Swal.fire(
            'Cerrando sesión',
            ''
          )
            location.href="login.html"
            localStorage.clear();
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