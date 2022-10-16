let productsInfoArray = [];
let commentsArray = [];
let addedProductToCart = [];

let productID = localStorage.getItem('productID');

// para que al hacer un nuevo comentario, solo se vea lo de antes del "@"
let email = localStorage.getItem('email');
let username = email.split("@");


//Para mostrar la informacion del producto
function showProductsInfoList(array){
    
    let htmlContentToAppend = "";
        htmlContentToAppend += `
                
        <div class=""> 
        <h4 class="mb-4" >Información del producto</h4>

            <div>
                <h5 class="m-0">Precio</h5>
                <p> ${array.currency} ${array.cost}</p>
            </div>
            <div>
                <h5 class="m-0">Descripción</h5>
                <p> ${array.description}</p>
            </div>
            <div>
                <h5 class="m-0">Categoría</h5>
                <p> ${array.category}</p>
            </div>
            <div>
                <h5 class="m-0">Cantidad de vendidos</h5>
                <p> ${array.soldCount}</p>
            </div>
        </div>
        `;
        document.getElementById("products-list-info-container").innerHTML = htmlContentToAppend;
}

//Para mostrar las imagenes
function mostrarImagenes(array){

    let imagenenInicial = "";
    let imagenes ="";

    imagenenInicial =`

            <div class="carousel-item active" data-bs-interval="10000">
            <img src="${array.images[0]}" class="d-block w-100" alt="Imágen de ejemplo del producto">
            </div>
        `;

    for(let i = 1; i < array.images.length; i++){
        let img = array.images[i];
        imagenes +=`

            <div class="carousel-item" data-bs-interval="2000">
            <img src="${img}" class="d-block w-100" alt="Imágen de ejemplo del producto">
            </div>
        `
    }
    document.getElementById("imagenes").innerHTML =  imagenenInicial + imagenes;
}

//Para mostrar los comentarios
function mostrarComments(array){
    let comentarios = "";
    for (let i=0; i<array.length; i++){
        let comentario=array[i]
    
        comentarios += `
            
            <li class="list-group-item">
                <div><b>${comentario.user}</b> - ${comentario.dateTime} -  ${puntuacion(comentario.score)}</div>
                ${comentario.description}
            </li>
        `
    }
    document.getElementById("comentarios").innerHTML = comentarios;

}

//Para que se vea la fecha
function date(){
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let day =date.getDate();

    if(hour < 10) { hour = '0' + hour; }
    if(minutes < 10) { minutes = '0' + minutes; }
    if(seconds < 10) { seconds = '0' + seconds; }

    if(day < 10) { day = '0' + day; }
    if(month < 10) { month = '0' + month; }

    let dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    return dateTime;
}

// Para mostrar los nuevos comentarios
function newComment(array){
    let description = document.getElementById('opinion').value;
    let user = username[0];
    let score =  document.getElementById('score').value
    let dateTime = date();

    array.push({user, score, description, dateTime});
    mostrarComments(array);   
}

//Para que ponga 5 estrellitas y vea cuales están marcadas
function puntuacion(array){
    let estrellas ="";
    
    for (let i = 1; i <= 5; i++){
        if(i <= array){
            estrellas += `<i class="fas fa-star checked"></i>`;
            
        }else {
            estrellas += `<i class="far fa-star checked"></i>`;
        } 
    }
    return estrellas;
}

function relatedProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

function productosRelacionados(array){
    let showRelatedProducts ="";
    
    for (let product of array.relatedProducts){
        showRelatedProducts +=`
            <div class="mb-0 cursor-active" onclick="relatedProductID(${product.id})">
                            
                <h6 class="mt-1">${product.name}</h6>
                <img src="${product.image}" class="tamaño mx-auto d-block">
            </div> 
        `
    }
    document.getElementById('relatedProducts').innerHTML=showRelatedProducts;
}

// para agregar los productos al localStorage
function addProduct(array){
    
    // hice este para que no me repita el que viene por defecto
    let peugeot = {name: "Peugeot 208", image: "img/prod50924_1.jpg", unitCost: 15200, count: 1, currency: "USD",id: 50924}
    newProductObject = {};

    newProductObject.name = array.name;
    newProductObject.image = array.images[0];
    newProductObject.unitCost = array.cost;
    newProductObject.count = 1;
    newProductObject.currency = array.currency;
    newProductObject.id = array.id;
    
    let compareArray = JSON.stringify(addedProductToCart);
    let compareNewObject = JSON.stringify(newProductObject.id);
    

    if (!(compareArray.includes(compareNewObject) || compareNewObject == peugeot.id)){

        addedProductToCart.push(newProductObject);
        localStorage.setItem("addedProductArray", JSON.stringify(addedProductToCart));
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;
    INFO_URL = PRODUCT_INFO_URL + productID + EXT_TYPE;
    
    // por si hay algo en el local
    addedProductToCart = JSON.parse(localStorage.getItem('addedProductArray'));
    
    // por si no hay nada en el local
    if (addedProductToCart == null){
        addedProductToCart = [];
    }
        
    getJSONData(INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            productsInfoArray = resultObj.data;
            showProductsInfoList(productsInfoArray);

            //Mostrar el nombre del producto
            mostrarImagenes(productsInfoArray)
            document.getElementById('nombreProduct').innerHTML = productsInfoArray.name;

            productosRelacionados(productsInfoArray);
        }
    });

    getJSONData(COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            commentsArray = resultObj.data;
            mostrarComments(commentsArray);
        }
        document.getElementById('enviar').addEventListener('click', ()=>{
            newComment(commentsArray);
            document.getElementById('opinion').value="";

        });
        document.getElementById('addToCart').addEventListener('click', ()=>{
            addProduct(productsInfoArray);
            
        })
    });
});