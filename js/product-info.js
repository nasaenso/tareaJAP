let productsInfoArray = [];
let commentsArray = [];

let productID = localStorage.getItem('productID');

// para mostrar la informacion del producto
function showProductsInfoList(array){
    
    let htmlContentToAppend = "";
        htmlContentToAppend += `
                
        <div> 
        <h4 class="mb-4" >Información del producto</h4>

            <div>
                <h4 class="m-0">Precio</h4>
                <p> ${array.currency} ${array.cost}</p>
            </div>
            <div>
                <h4 class="m-0">Descripción</h4>
                <p> ${array.description}</p>
            </div>
            <div>
                <h4 class="m-0">Categoría</h4>
                <p> ${array.category}</p>
            </div>
            <div>
                <h4 class="m-0">Cantidad de vendidos</h4>
                <p> ${array.soldCount}</p>
            </div>
        </div>
        `;
        document.getElementById("products-list-info-container").innerHTML = htmlContentToAppend;
}

// para mostrar las imagenes
function mostrarImagenes(array){

    let imagenes = "";
        imagenes +=`

            <div class="carousel-item active" data-bs-interval="10000">
            <img src="${array.images[0]}" class="d-block w-100" alt="Imágen de ejemplo del producto">
            </div>

            <div class="carousel-item" data-bs-interval="2000">
            <img src="${array.images[1]}" class="d-block w-100" alt="Imágen de ejemplo del producto">
            </div>

            <div class="carousel-item">
            <img src="${array.images[2]}" class="d-block w-100" alt="Imágen de ejemplo del producto">
            </div>

            <div class="carousel-item">
            <img src="${array.images[3]}" class="d-block w-100" alt="Imágen de ejemplo del producto">
            </div>
            `;

            document.getElementById("imagenes").innerHTML = imagenes;

}

function mostrarComments(array){
    let comentarios = "";
    for (let comentario of array){
    
        comentarios += `
            
                <li class="list-group-item">
                    <b>${comentario.user}</b> - ${comentario.dateTime} -  ${puntuacion(comentario.score)} <br>
                    ${comentario.description}
                </li>
        `
    }
    document.getElementById("comentarios").innerHTML = comentarios;
}

function puntuacion(array){
    let estrellas ="";
    
    for (let i = 1; i <= 5; i++){
        if(i <= array){
            estrellas += `<i class="fa fa-star checked"></i>`;
            
        }else {
            estrellas += `<i class="fa fa-star"></i>`;
        } 
    }
    return estrellas;
}

document.addEventListener("DOMContentLoaded", function(e){
   
    INFO_URL = PRODUCT_INFO_URL + productID + EXT_TYPE;
    COMMENTS_URL = PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE;
   
    getJSONData(INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            productsInfoArray = resultObj.data;
            showProductsInfoList(productsInfoArray);

            mostrarImagenes(productsInfoArray)
            document.getElementById('nombreProduct').innerHTML = productsInfoArray.name;
        }
    });

    getJSONData(COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            commentsArray = resultObj.data;
            mostrarComments(commentsArray);

        }
    });
});