let cartInfoArray = [];
let totalnum = 0;
let envio = 0.05;

let typeOfPayment = "";

// para agregar los productos del local al carrito
function addedProduct(array){
    let added = "";
    added = JSON.parse(localStorage.getItem('addedProductArray'))
    if (added != null){

        for (let product of added){
            array.push(product);
        }
    }
}

// para calcular el subtotal
function subtotal(id, unitCost){
    let count= document.getElementById(id).value;
    let subtotal = count * unitCost;

    document.getElementById('idSub'+id).innerHTML = " " + subtotal;
    // para que se ejecuten cuando hago el cambio
    sumaSubtotal();
    tiposDeEnvios();
    total();
}

// para mostrar los productos en la tabla
function showCartProducts(array){
    let showOnHTML ="";
    for(let i=0; i<array.length; i++){
        let product = array[i];
        showOnHTML +=`
        <div class="row border-start border-bottom m-0">
            <div class="col-lg-2 col-md-2 col-12 border-top border-end">
                <p class="d-md-none mt-2 fs-5 border-bottom fst-italic">Artículo ${i+1}</p>
                <img src="${product.image}" class="p-3 img-fluid">
            </div>

            <div class="col-lg-2 col-md-2 col-12 border-top border-end ">
                <p class="d-md-none mt-2 fw-bold">Nombre: </p>
                <p class="mt-3">${product.name}</p>
            </div>

            <div class="col-lg-3 col-md-3 col-12 border-top border-end">
                <p class="d-md-none mt-2 fw-bold">Costo: </p>
                <p class="mt-3">${product.currency} <span>${product.unitCost}</span></p>
            </div>

            <div class="col-lg-2 col-md-2 col-12 border-top border-end">
                <p class="d-md-none mt-2 fw-bold">Cantidad: </p>
                <div class="d-flex justify-content-center mt-3 mb-2">
                    <input class="cartSizing form-control number" type="number" id="${product.id}" onchange="subtotal(${product.id}, ${product.unitCost})" value="${product.count}" min="1">
                </div>
            </div>

            <div class="col-lg-3 col-md-3 col-12 border-top border-end">
                <p class="d-md-none mt-2 fw-bolder">Subtotal: </p>
                <div class="mt-3 mb-2">
                    <b>${product.currency} <span id="${'idSub'+product.id}" name="subFinal">${product.unitCost}</span></b>
                </div>
            </div>
        </div>
        <div class="col-12 d-md-none mb-4"></div>

        `
    }
    // para mostrar el botón y esconder el cart
    if(array.length >=5){
        document.getElementById('btnCollapse').classList.remove('d-md-none');
        document.getElementById('unCollapse').classList.remove('d-md-block');
    }

    document.getElementById('cart').innerHTML = showOnHTML;   
}
// para calcular el subtotal de costos
function sumaSubtotal(){

    let subFinales = document.getElementsByName('subFinal');
    let currency = document.getElementsByTagName('b');
    
    for (let i=0; i< subFinales.length; i++){
            let elementArrayCurrency = (currency[i].innerHTML);
            let elementArraySub = parseFloat(subFinales[i].innerHTML);
            
        if(elementArrayCurrency.includes('UY')){

                totalnum += elementArraySub / 40;
            }else {
                totalnum += elementArraySub;
            }
    }
    document.getElementById('sub').innerHTML = Math.round(totalnum);
    totalnum=0;
}
// para calcular los costos de envio
function tiposDeEnvios(){
    let cost = document.getElementById('sub').innerHTML;

    let finalCost = (cost * envio);
    document.getElementById('finalCost').innerHTML = Math.round(finalCost);

    //Para que se ejecute cuando eligo los diferentes tipos de envío
    total();
}
// para calcular el total de costos
function total(){
    let cost2 = parseFloat(document.getElementById('finalCost').innerHTML);
    let cost1 = parseFloat(document.getElementById('sub').innerHTML);

    let cost3 = cost1 + cost2;
    document.getElementById('total').innerHTML = cost3;
}
//Para validar la modal
function validation(){
    let verificationModal = document.getElementById('feedbackPayment');
    let accNumber = document.getElementById('accNumber');
    let securityCode = document.getElementById('securityCode');
    let expirationDate = document.getElementById('expirationDate');
    let cardNumber = document.getElementById('cardNumber');
    let invalid=document.getElementById("invalid");
    
    let bool = true;

    if(accNumber.value != "" && typeOfPayment == "bank"){
        verificationModal.innerHTML="Transferencia bancaria";
        invalid.style.display = "none"
        verificationModal.style.display = "block"
        
        bool=true;

    }else if(securityCode.value != "" && expirationDate.value != "" && cardNumber.value != "" && typeOfPayment == "card"){
        verificationModal.innerHTML="Targeta de crédito";
        invalid.style.display = "none"
        verificationModal.style.display = "block"

        bool = true;
    }else {
        invalid.style.display = "block"
        verificationModal.style.display = "none"
        bool=false;
    }
    return bool;
}
//para cambiar lo que dice el botón 
function textBtnCollapse(){
    let btnCollapse = document.getElementById('btnCollapse');
    let array = document.getElementsByName('btnCollapse');

    for(let i =0; i < array.length; i++){
        array[i].addEventListener('click',()=>{

            if(btnCollapse.innerHTML == "Mostrar carrito"){
                btnCollapse.innerHTML = "Esconder carrito";
            }else{
                btnCollapse.innerHTML = "Mostrar carrito"
            }
        })
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    // url
    const CART_URL= CART_INFO_URL + 25801 +EXT_TYPE;
    
    getJSONData(CART_URL).then(function(resultObj){

        if (resultObj.status === "ok"){
        
            cartInfoArray = resultObj.data.articles;
            addedProduct(cartInfoArray);

            showCartProducts(cartInfoArray);
            sumaSubtotal();
            tiposDeEnvios();
            total();
            textBtnCollapse(); 
        }

    });
    document.getElementById('options').addEventListener('click', event=>{
        switch (event.target.getAttribute("id")) {
            case 'premium':
                envio = 0.15;
                tiposDeEnvios();
              break;
            case 'express':
                envio = 0.07
                tiposDeEnvios();
            break;
            case 'standard':
                envio = 0.05;
                tiposDeEnvios();
            break;
        }
    });

    document.getElementById('card').addEventListener('click',()=>{
        // cuando hago click en el pago por tarjeta, se me deshabilitan los campos de la transferencia bancaria y se me muestra
        // el texto selected
        accNumber.disabled = true
        securityCode.disabled = false;
        expirationDate.disabled = false; 
        cardNumber.disabled = false;

        typeOfPayment = "card";
        
    });
    document.getElementById('bank').addEventListener('click',()=>{
        // cuando hago click en el pago por transferencia, se me deshabilitan los campos de la tarjeta y se me muestra
        // el texto selected
        securityCode.disabled = true;
        expirationDate.disabled = true; 
        cardNumber.disabled = true;
        accNumber.disabled = false;

        typeOfPayment = "bank";
        
    });
    document.getElementById('save').addEventListener('click',()=>{
        validation();

    });
    document.getElementById('btnsubmit').addEventListener("click", event=>{
        if (!validation() || !form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }else {
            
            Swal.fire({
               
                footer: '<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_lg6lh7fp.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>',
                title: '¡Ha comprado con éxito!',
                showConfirmButton: false,
                
                timer: 2000
                }).then((
                    ) => {
                    document.getElementById('form').submit();
            })     
        }
        form.classList.add('was-validated');    
    });
    
    
});