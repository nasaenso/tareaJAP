//array donde se cargarán los datos recibidos:
let productsArray = [];
let listaFiltrada = undefined;
let valorMin = document.getElementById('min');
let valorMax = document.getElementById('max');

function filtrarPorPrecio(){
    
    let minCost = parseInt(valorMin.value);
    let maxCost= parseInt(valorMax.value);

    // asignar valor 
    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
    }
    else{
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
    }
    else{
        maxCost = undefined;
    }
    
    // Como filtrar en los 4 casos
    if (minCost == undefined && maxCost ==undefined){
        showProductsList(productsArray);

    }else if (minCost != undefined && maxCost == undefined){
        listaFiltrada = productsArray.filter(array => array.cost >= minCost);
        showProductsList(listaFiltrada);

    }else if(minCost == undefined && maxCost != undefined){
        listaFiltrada = productsArray.filter(array => array.cost <= maxCost);
        showProductsList(listaFiltrada);

    }else if(minCost != undefined && maxCost !=undefined){
        listaFiltrada = productsArray.filter(array => array.cost >= minCost && array.cost <= maxCost );
        showProductsList(listaFiltrada);
    }
}

 //como hacer el sort dependiendo de que lista tengamos
function sortSiFiltrado(array, criteria){
    if(listaFiltrada !== undefined){
        sortProducts(listaFiltrada, criteria);
    
    }else {
        sortProducts(array, criteria);
    }
}

//cual sort hacer
function sortProducts(array, criteria){
    if(criteria === "sortDesc") {
      array.sort((ant,sig)=>sig.cost-ant.cost);
    
    }else if (criteria ==="sortAsc"){
      array.sort((ant,sig)=>ant.cost-sig.cost);
    
    }else if (criteria ==="sortRel"){
        array.sort((ant,sig)=>sig.soldCount-ant.soldCount);
    }
    showProductsList(array);
  }

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){
    
    let htmlContentToAppend = "";
    for(let producto of array){ 

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ producto.name + ` - ` + producto.currency + ` ` + producto.cost +`</h4> 
                        
                        <p> `+ producto.description +`</p> 
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
    }
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
   
    url = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE;
   
    getJSONData(url).then(function(resultObj){
        if (resultObj.status === "ok"){
            
            productsArray = resultObj.data.products;
            showProductsList(productsArray);

            // Mostrar el nombre de la categoría
            let nombreCat = resultObj.data.catName;
            document.getElementById('nombreProduct').innerHTML = nombreCat;

        }
    });
    document.getElementById('filtrar').addEventListener('click',()=>{
        filtrarPorPrecio();

    });
    document.getElementById('limpiar').addEventListener('click',()=>{
        // Para que al darle a "limpiar" la lista vuelva a estar completa
        listaFiltrada= undefined;
        
        valorMax.value = "";
        valorMin.value = "";
        showProductsList(productsArray);
        

    });
    document.getElementById('sortDesc').addEventListener('click', ()=>{
        let criteria = "sortDesc"
        sortSiFiltrado(productsArray, criteria);
  
      });
      document.getElementById('sortAsc').addEventListener('click', ()=>{
        let criteria = "sortAsc"
        sortSiFiltrado(productsArray, criteria);

    });
      document.getElementById('sortRel').addEventListener('click', ()=>{
        let criteria = "sortRel"
        sortSiFiltrado(productsArray, criteria);

    });
    showProductsList(productsArray);

});