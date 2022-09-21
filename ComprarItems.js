let carrito = []

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
            <p class="card-text">ID:
                <b>${producto.id}</b>
            </p>
            <p class="card-text">Nombre:
                <b>${producto.nombre}</b>
            </p>
            <p class="card-text">Precio:
                <b>${producto.precio}</b>
            </p>
            <p class="card-text">Cantidad:
                <b>FUERA DE STOCK</b>
            </p>
            </div>
            <div class="card-footer">
              <div>
                
            </div>
        </div>`
      }else{
        column.innerHTML = `
        <div class="card">
            <div class="card-body">
            <p class="card-text">ID:
                <b>${producto.id}</b>
            </p>
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
      }
      contenedorProductos.append(column);

      let botoncomprar = document.getElementById(`botoncomprar-${producto.id}`);
      botoncomprar.onclick = () => agregarAlCarrito(producto.id);
    });
  }

function pintarProductosCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
      let columnC = document.createElement("div");
      columnC.className = "col-md-4 mt-3";
      columnC.id = `columnaC-${producto.id}`;
      if (producto.cantidad == 0){
        columnC.innerHTML = `
        <div class="card">
            <div class="card-body">
            <p class="card-text">ID:
                <b>${producto.id}</b>
            </p>
            <p class="card-text">Nombre:
                <b>${producto.nombre}</b>
            </p>
            <p class="card-text">Precio:
                <b>${producto.precio}</b>
            </p>
            <p class="card-text">Cantidad:
                <b>FUERA DE STOCK</b>
            </p>
            </div>
            <div class="card-footer">
              <div>
                
            </div>
        </div>`
      }else{
        columnC.innerHTML = `
        <div class="card">
            <div class="card-body">
            <p class="card-text">ID:
                <b>${producto.id}</b>
            </p>
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
                      <button class="btn btn-primary p-3" id="botonMasC-${producto.id}" >+</button>
                      <button class="btn btn-primary p-3" id="botonMenosC-${producto.id}" >-</button>
                    </div>
                      <button class="btn btn-danger" id="botonEliminarC-${producto.id}" >Eliminar</button>
            </div>
        </div>`
      }
      contenedorProductos.append(column);

      let botonEliminarC = document.getElementById(`botonEliminarC-${producto.id}`);
      botonEliminarC.onclick = () => eliminarProductoC(producto.id);

      let botonMasC = document.getElementById(`botonMasC-${producto.id}`);
      botonMasC.onclick = () => SumarCantidadC(producto.id);

      let botonMenosC = document.getElementById(`botonMenosC-${producto.id}`);
      botonMenosC.onclick = () => RestarCantidadC(producto.id);
    });
}

function eliminarProductoC(idProducto) {
    let columnaBorrar = document.getElementById(`columnaC-${idProducto}`);
    let indiceBorrar = carrito.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
  
    carrito.splice(indiceBorrar, 1);
    columnaBorrar.remove();
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
    contenedorCarrito = document.getElementById("contenedorCarrito");
    pintarProductosCompra()
}

function agregarAlCarrito(idProducto){
    let indice = articulos.findIndex(
        (producto) => Number(producto.id) === Number(idProducto)
      );

    let indiceCarrito = carrito.findIndex(
        (producto) => Number(producto.id) === Number(idProducto)
    );

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