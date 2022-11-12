function login (){
    let email = document.getElementById('email').value;
    let clave = document.getElementById('password').value;

    //Verificar si están todos los datos ingresados
    if(email==="" & clave===""){
        document.getElementById('email').classList.add('error');
        document.getElementById('password').classList.add('error');
        Swal.fire('Debe ingresar datos')

    }
    else if (clave===""){
        document.getElementById('password').classList.add('error');
        Swal.fire('Debe ingresar contraseña');
        document.getElementById('email').classList.remove('error');
    }
    else if(email==="") {
        document.getElementById('email').classList.add('error');
        Swal.fire('Debe ingresar email');
       document.getElementById('password').classList.remove('error');
    }//si todo bien
    else {
        localStorage.setItem('email',email);
        location.href='index.html';
    }
}

//Funcione en el botón
document.addEventListener('DOMContentLoaded', ()=>{

    document.getElementById('inicio').addEventListener('click', event=>{
        login(); 
    })
})