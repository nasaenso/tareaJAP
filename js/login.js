function login (){
    let email = document.getElementById('email').value;
    let clave = document.getElementById('password').value;

    if(email==="" & clave===""){
        document.getElementById('email').classList.add('error');
        document.getElementById('password').classList.add('error');
        Swal.fire('Debe ingresar datos')

    }
    else if (clave===""){
        document.getElementById('password').classList.add('error');
        Swal.fire('Debe ingresar contraseña')

    }
    else if(email==="") {
        document.getElementById('email').classList.add('error');
        Swal.fire('Debe ingresar email')
    }
    else {
        localStorage.setItem('email',email);
        location.href='index.html';
    }
}

document.addEventListener('DOMContentLoaded', ()=>{

    document.getElementById('inicio').addEventListener('click', ()=>{
        login();
        
    })
})