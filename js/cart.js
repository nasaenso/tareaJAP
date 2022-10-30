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
            
            <tr>
                <td class="cartSizing">
                    <div><img src="${product.image}" class="mx-auto d-block img-fluid"></div>
                </td>
               
                <td>${product.name}</td>
                <td>${product.currency} <span>${product.unitCost}</span></td>
                <td>
                    <div class="d-flex justify-content-center">
                        <input class="cartSizing form-control number" type="number" id="${product.id}" onchange="subtotal(${product.id}, ${product.unitCost})" value="${product.count}" min="1">
                    </div>
                </td>
                <td><b>${product.currency}<span id="${'idSub'+product.id}" class="subFinal">${product.unitCost}</span></b></td>
            </tr> 
        `
    }

    document.getElementById('cart').innerHTML = showOnHTML;   
}
// para calcular el subtotal de costos
function sumaSubtotal(){

    let subFinales = document.getElementsByClassName('subFinal');
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
    document.getElementById('sub').innerHTML = totalnum;
    totalnum=0;
}
// para calcular los costos de envio
function tiposDeEnvios(){
    let cost = document.getElementById('sub').innerHTML;

    let finalCost = (cost * envio);
    document.getElementById('finalCost').innerHTML = finalCost;

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
            
        }
    });
    document.getElementById('options').addEventListener('click', (e)=>{
        switch (e.target.getAttribute("id")) {
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
    // document.getElementById('premium').addEventListener('click',()=>{
    //     envio = 15;
    //     tiposDeEnvios();
    // });
    // document.getElementById('express').addEventListener('click',()=>{
    //     envio = 7
    //     tiposDeEnvios();
    // });
    // document.getElementById('standard').addEventListener('click',()=>{
    //     envio = 5;
    //     tiposDeEnvios();
    // });
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
                title: '¡Ha comprado con éxito!',
                icon: 'success',
                showConfirmButton: false,
                // confirmButtonColor: '#3085d6',
                // confirmButtonText: 'OK'
                timer: 1500
                }).then((
                    //result
                    ) => {
                // if (result.isConfirmed) {
                    document.getElementById('form').submit();
                //  }
            })     
        }
        form.classList.add('was-validated');    
    });
    
});