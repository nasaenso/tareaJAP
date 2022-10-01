let productsInfoArray = [];
let commentsArray = [];

let productID = localStorage.getItem('productID');

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
    for (let comentario of array){
    
        comentarios += `
            
            <li class="list-group-item">
                <div><b>${comentario.user}</b> - ${comentario.dateTime} -  ${puntuacion(comentario.score)}</div>
                ${comentario.description}
            </li>
        `
    }
    document.getElementById("comentarios").innerHTML = comentarios;
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
                            
                <h6>${product.name}</h6>
                <img src="${product.image}" class="tamaño mx-auto d-block">
            </div> 
        `
    }
    document.getElementById('relatedProducts').innerHTML=showRelatedProducts;
}

document.addEventListener("DOMContentLoaded", function(e){
    COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;
    INFO_URL = PRODUCT_INFO_URL + productID + EXT_TYPE;
    
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
        })
    });
});