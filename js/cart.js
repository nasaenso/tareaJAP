let cartInfoArray = [];

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
}

function showCartProducts(array){
    let showOnHTML ="";
    for(let i=0; i<array.length; i++){
        let product = array[i];
        
        showOnHTML +=`
            
            <tr>
                <td class="cartSizing">
                    <div><img src="${product.image}" class="mx-auto d-block cartSizing"></div>
                </td>
               
                <td>${product.name}</td>
                <td>${product.currency} <span>${product.unitCost}</span></td>
                <td>
                    <div class="d-flex justify-content-center">
                        <input class="cartSizing form-control" type="number" id="${product.id}" onchange="subtotal(${product.id}, ${product.unitCost})" value="${product.count}" min="1">
                    </div>
                </td>
                <td><b>${product.currency}<span id="${'idSub'+product.id}">${product.unitCost}</span></b></td>
            </tr> 
        `
    }
    document.getElementById('cart').innerHTML = showOnHTML;
}

document.addEventListener('DOMContentLoaded',()=>{
    // url
    const CART_URL= CART_INFO_URL + 25801 +EXT_TYPE 
    
    getJSONData(CART_URL).then(function(resultObj){

        if (resultObj.status === "ok"){
            
            cartInfoArray = resultObj.data.articles;
            addedProduct(cartInfoArray);

            showCartProducts(cartInfoArray);
        }
    })
})