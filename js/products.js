//array donde se cargarán los datos recibidos:
let productsArray = [];
let listaFiltrada = undefined;

function filtrarPorPrecio(){
    
    let minCost = parseInt(document.getElementById('min').value);
    let maxCost= parseInt(document.getElementById('max').value);
    listaFiltrada = productsArray.filter(array => array.cost >= minCost && array.cost <= maxCost );

    showProductsList(listaFiltrada);
}

function sortSiFiltrado(array,valor){
   
    if(listaFiltrada !== undefined){
    sortProducts(listaFiltrada,valor);
    
    }else {
    sortProducts(array,valor);
    }
}

function sortProducts(array,valor){

    if(valor === "sortAsc") {
      array.sort((ant,sig)=>sig.cost-ant.cost);
    
    }else if (valor ==="sortDesc"){
      array.sort((ant,sig)=>ant.cost-sig.cost);
    
    }else if (valor ==="sortRel"){
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
        document.getElementById('min').value="";
        document.getElementById('max').value="";

    });
    document.getElementById('limpiar').addEventListener('click',()=>{
        // Para que al darle a "limpiar" la lista vuelva a estar completa
        listaFiltrada= undefined;
        showProductsList(productsArray);
        sessionStorage.removeItem('sort');

    });
    document.getElementById('sortAsc').addEventListener('click', ()=>{
        // no tengo idea de si se pueden resumir las lineas de abajo ni tampoco si es la mejor forma
        sessionStorage.setItem('sort', 'sortAsc');
        let valor = sessionStorage.getItem('sort');
        sortSiFiltrado(productsArray,valor);
  
      });
      document.getElementById('sortDesc').addEventListener('click', ()=>{
        sessionStorage.setItem('sort', 'sortDesc');
        let valor = sessionStorage.getItem('sort');
        sortSiFiltrado(productsArray,valor);

    });
      document.getElementById('sortRel').addEventListener('click', ()=>{
        sessionStorage.setItem('sort', 'sortRel');
        let valor = sessionStorage.getItem('sort');
        sortSiFiltrado(productsArray,valor);

    });
    showProductsList(productsArray);

});