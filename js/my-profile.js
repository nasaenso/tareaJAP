let firstName1 = document.getElementById('firstName');
let firstSurname1 = document.getElementById('firstSurname');
let emailProfile1 = document.getElementById('emailProfile');
let secondName1 = document.getElementById('secondName');
let secondSurname1 = document.getElementById('secondSurname');
let phoneNumber1 = document.getElementById('phoneNumber');
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

        firstName1.value = info.firstName;
        firstSurname1.value = info.firstSurname;
        secondName1.value = info.secondName
        secondSurname1.value = info.secondSurname;
        phoneNumber1.value = info.phoneNumber;

        disableExceptEmail(true);
        displayBtns("none", "none", "block", "none");

    }else{
        disableExceptEmail(false);
        displayBtns("block", "none", "none", "block");
    }
}
// para guardar los datos en el local
function saveProfileInfo(){
    if(firstName1.value != "" && firstSurname1.value != "" && emailProfile1.value != ""){
        console.log(info)
        
        info.firstName = firstName1.value
        info.firstSurname = firstSurname1.value
        info.emailProfile = emailProfile1.value;
        info.secondName = secondName1.value;
        info.secondSurname = secondSurname1.value
        info.phoneNumber = phoneNumber1.value;
        
        localStorage.setItem('profileInfo',JSON.stringify(info));
    }
}

document.addEventListener('DOMContentLoaded', ()=>{

    let email = localStorage.getItem('email');
    emailProfile1.value = email;
    
    checkinfo();
    // por si no hay nada en el local
    if (info == null){
        info = {};
    }
    
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