let firstName = document.getElementById('firstName');
let firstSurname = document.getElementById('firstSurname');
let emailProfile = document.getElementById('emailProfile');
let secondName = document.getElementById('secondName');
let secondSurname = document.getElementById('secondSurname');
let phoneNumber = document.getElementById('phoneNumber');
let btnSave = document.getElementById('save');
let btnDelete = document.getElementById('delete');
let info = {};
let srcData = document.getElementById('image').src;
let evaluate = false;

function verification(event){
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }
    else {
        saveProfileInfo();
        Swal.fire({
            title: '¡Sus datos se han guardado con éxito!',
            icon: 'success',
            showConfirmButton: false,
            // confirmButtonColor: '#3085d6',
            // confirmButtonText: 'OK'
            timer: 2000
            }).then((
                //result
                ) => {
            // if (result.isConfirmed) {
                document.getElementById('form').submit();
            //  }
        })     
    }
form.classList.add('was-validated'); 
}

function checkinfo(){
    if(info != null){
        firstName.value = info.firstName;
        firstSurname.value = info.firstSurname;
        secondName.value = info.secondName
        secondSurname.value = info.secondSurname;
        phoneNumber.value = info.phoneNumber;
        btnSave.innerHTML="Guardar cambios";
    }
}

function saveProfileInfo(){
    if(firstName.value != "" && firstSurname.value != "" && emailProfile.value != ""){
        
        info.firstName = firstName.value
        info.firstSurname = firstSurname.value
        info.emailProfile = emailProfile.value;
        info.secondName = secondName.value;
        info.secondSurname = secondSurname.value
        info.phoneNumber = phoneNumber.value;
        
        localStorage.setItem('profileInfo',JSON.stringify(info));
    }
}



document.addEventListener('DOMContentLoaded', ()=>{
    
    document.getElementById('alertImg').style.display = "none";
    document.getElementById('delete').style.display = "none";
    document.getElementById('save').style.display = "none";
    document.getElementById('file').style.display = "none";
    document.getElementById('cancel').style.display = "none";  



    let profilePic = localStorage.getItem('pfp');
    
    if (profilePic != null){
        document.getElementById('image').src =  JSON.parse(localStorage.getItem('pfp'));
    }

    let email = localStorage.getItem('email');
    emailProfile.value = email;
    
    // por si hay algo en el local
    info = JSON.parse(localStorage.getItem('profileInfo'));

    // para que me muestre los datos
    checkinfo();
    // por si no hay nada en el local
    if (info == null){
        info = {};
    }

    document.getElementById('editBtn').addEventListener('click', ()=>{
        document.getElementById('save').style.display = "block";
        document.getElementById('delete').style.display = "block"
        document.getElementById('file').style.display = "block";
        document.getElementById('cancel').style.display = "block"; 
        document.getElementById('editBtn').style.display = "none"; 
    })

    document.getElementById('save').addEventListener('click', event=>{
        verification(event);

        if(evaluate){
            localStorage.setItem('pfp',JSON.stringify(srcData));
        }

        document.getElementById('alertImg').style.display = "none";

    })
    document.getElementById('delete').addEventListener('click', ()=>{ 
        localStorage.removeItem('profileInfo');
        localStorage.removeItem('pfp');
        location.reload()
    })
    document.getElementById('cancel').addEventListener('click', ()=>{
        location.reload();
    })

    document.getElementById('file').addEventListener('change', ()=>{
        
            let filesSelected = document.getElementById("file").files;
            if (filesSelected.length > 0) {
                let fileToLoad = filesSelected[0];
                let fileReader = new FileReader();
            
                fileReader.onload = function(fileLoadedEvent) {
                srcData = fileLoadedEvent.target.result; // <--- data: base64
                document.getElementById('image').src = srcData;
            }
            evaluate = true;
            fileReader.readAsDataURL(fileToLoad);
            document.getElementById('alertImg').style.display = "block";
            }
          
          
    })
})