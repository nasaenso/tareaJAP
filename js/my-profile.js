let firstName = document.getElementById('firstName');
let firstSurname = document.getElementById('firstSurname');
let emailProfile = document.getElementById('emailProfile');
let secondName = document.getElementById('secondName');
let secondSurname = document.getElementById('secondSurname');
let phoneNumber = document.getElementById('phoneNumber');
let info = {};
let srcData = "";
let defaultIMG = document.getElementById('image').src;
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
            timer: 2000
            }).then((
                ) => {
                document.getElementById('form').submit();
        })     
    }
form.classList.add('was-validated'); 
}
// para desabilitar los inputs
function disableExceptEmail(value){
    let array = document.getElementsByTagName('input');

    for(let i = 0; i < array.length; i++){

        array[i].disabled=value;
    }
    array[3].disabled=true;

}
// para mostrar los botónes
function displayBtns(save, cancel, edit, inputFile){
    document.getElementById('save').style.display = save;
    document.getElementById('cancel').style.display = cancel;
    document.getElementById('edit').style.display = edit;
    document.getElementById('inputFile').style.display = inputFile;
}

function checkinfo(){
    let profilePic = localStorage.getItem('pfp');
    
    if (profilePic != null){
        document.getElementById('image').src = JSON.parse(localStorage.getItem('pfp'));
    }
    // por si hay algo en el local
    info = JSON.parse(localStorage.getItem('profileInfo'));
    
    if(info != null){
        firstName.value = info.firstName;
        firstSurname.value = info.firstSurname;
        secondName.value = info.secondName
        secondSurname.value = info.secondSurname;
        phoneNumber.value = info.phoneNumber;

        disableExceptEmail(true);
        displayBtns("none", "none", "block", "none");

    }else{
        disableExceptEmail(false);
        displayBtns("block", "none", "none", "block");
    }
}
// para guardar los datos en el local
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

    let email = localStorage.getItem('email');
    emailProfile.value = email;
    
    checkinfo();
    
    document.getElementById('edit').addEventListener('click', ()=>{

        displayBtns("block", "block", "none", "block");
        disableExceptEmail(false);
    })

    document.getElementById('save').addEventListener('click', event=>{

        verification(event);

        if(evaluate){
            localStorage.setItem('pfp',JSON.stringify(srcData));
        }

    })
    // document.getElementById('delete').addEventListener('click', ()=>{ 
    //     localStorage.removeItem('profileInfo');
    //     localStorage.removeItem('pfp');
    //     location.reload()
    // })
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
        }
           
    })
})