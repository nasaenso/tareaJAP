//array donde se cargarán los datos recibidos:
let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showProductsList(array){

    let htmlContentToAppend = "";
    //Nombre de la categoria
    document.getElementById('nombreProduct').innerHTML = array.catName;
    for(let producto of array.products){ 
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
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend; 

    }
}

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(LIST_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);

        }
    });
});

// Botón de cerrar sesión
document.getElementById('cierro').addEventListener('click', ()=>{
    
    Swal.fire({
      title: '¿Quiere cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí'
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
          title: '¡Sesión cerrada con éxito!',
          icon: 'success'
        }).then(function() {
            window.location = "login.html";
            localStorage.clear();
          });
        }
      })
   })
 