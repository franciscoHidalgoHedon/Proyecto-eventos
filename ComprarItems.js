let carrito = []
let listaCarrito
let pieCarrito
let botonComprarFinal

class ProductoCarrito {
    constructor(id, nombre, precio, cantidad) {
      this.id = id;
      this.nombre = nombre.toUpperCase();
      this.precio = precio;
      this.cantidad = cantidad;
    }
  }

function pintarProductosCompra() {
    contenedorProductos.innerHTML = "";
    articulos.forEach((producto) => {
      let column = document.createElement("div");
      column.className = "col-md-4 mt-3";
      column.id = `columna-${producto.id}`;
      if (producto.cantidad == 0){
        column.innerHTML = `
        <div class="card">
            <div class="card-body">
            <p class="card-text">Nombre:
                <b>${producto.nombre}</b>
            </p>
            <p class="card-text">Precio:
                <b>${producto.precio}</b>
            </p>
            <p class="card-text">Cantidad:
                <b>FUERA DE STOCK</b>
            </p>
            </div>`
            contenedorProductos.append(column);
      }else{
        column.innerHTML = `
        <div class="card">
            <div class="card-body">
            <p class="card-text">Nombre:
                <b>${producto.nombre}</b>
            </p>
            <p class="card-text">Precio:
                <b>${producto.precio}</b>
            </p>
            <p class="card-text">Cantidad:
                <b>${producto.cantidad}</b>
            </p>
            </div>
            <div class="card-footer">
            <div>
            <button class="btn btn-primary" id="botoncomprar-${producto.id}">comprar</button>
            </div>
            </div>
        </div>`
        contenedorProductos.append(column);
        let botoncomprar = document.getElementById(`botoncomprar-${producto.id}`);
            botoncomprar.onclick = () => agregarAlCarrito(producto.id);
      }
      
    });
  }

function pintarProductosCarrito() {
  
  if(carrito["length"] == 0){
    listaCarrito.innerHTML = "<h5> Vacío </h5>"
    
  }else{
    listaCarrito.innerHTML = "";
    
    carrito.forEach((producto) => {
      let item = document.createElement("li")
      item.id = `itemLista-${producto.id}`
      item.className = "col-md-4 mt-3"
      item.innerHTML = `${producto.nombre}
      <ul>
      precio: ${producto.precio}
      </ul>
      <ul>
      cantidad: ${producto.cantidad}
      </ul>
      <button class="btn btn-danger" id="botonBorrarCarrito-${producto.id}"> eliminar </button>
      </ul>
      `
      let botonComprarr = document.createElement("button")

      listaCarrito.append(item)

      let botonEliminarC = document.getElementById(`botonBorrarCarrito-${producto.id}`);
      botonEliminarC.onclick = () => eliminarProductoC(producto.id);
    })
  }
}

function eliminarProductoC(idProducto) {
    let indiceArt = articulos.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
    let indiceBorrar = carrito.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );

    articulos[indiceArt]["cantidad"] += carrito[indiceBorrar]["cantidad"]
    carrito.splice(indiceBorrar, 1);
    pintarProductosCarrito()
    pintarProductosCompra()
  }

  function SumarCantidadC(idProducto) {
    let indice = carrito.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
  
    carrito[indice]["cantidad"] += 1
    pintarProductos()
  }
  function RestarCantidadC(idProducto) {
    let indice = carrito.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
    
    if(carrito[indice]["cantidad"] == 0){
      alert("no hay stock que remover")
    }
    else{
      carrito[indice]["cantidad"] -= 1
    }
    pintarProductos()
  }

function IniciarMenuCompra(){
    contenedorProductos = document.getElementById("contenedorProductos");
    listaCarrito = document.getElementById("listaCarrito");
    pieCarrito = document.getElementById("pieCarrito")
    botonVolver2 = document.getElementById("botonVolver2");
    botonComprarFinal = document.getElementById("botonComprarFinal");
    pintarProductosCompra()
}

function agregarAlCarrito(idProducto){
    let indice = articulos.findIndex(
        (producto) => Number(producto.id) === Number(idProducto)
      );

    let indiceCarrito = carrito.findIndex(
        (producto) => Number(producto.id) === Number(idProducto)
    );

    if(articulos[indice]["cantidad"] == 0){
      alert("no hay stock que remover")
    }
    else{
      articulos[indice]["cantidad"] -= 1
      pintarProductosCompra()
    }

    if(indiceCarrito == -1){
        carrito.push(
         new ProductoCarrito(
            idProducto,
            articulos[indice]["nombre"],
            articulos[indice]["precio"],
            1
         )
        )
    }else{
        carrito[indiceCarrito]["cantidad"] += 1
    }

    pintarProductosCarrito()
}

function Presupuesto(){
  if (carrito["length"] == 0){
      alert("El Carrito Está Vacío")
  }
  else{
      carrito = []
      pintarProductosCarrito()
      alert("Gracias por comprar en Vajillas.com")
  }
}