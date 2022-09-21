let formulario;
let inputId;
let inputNombre;
let inputPrecio;
let inputCantidad;
let contenedorProductos;

class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre.toUpperCase();
    this.precio = precio;
    this.cantidad = cantidad;
  }
}

function inicializarElementos() {
  formulario = document.getElementById("formulario");
  inputId = document.getElementById("inputId");
  inputNombre = document.getElementById("inputNombreProducto");
  inputPrecio = document.getElementById("inputPrecio");
  inputCantidad = document.getElementById("inputCantidad");
  contenedorProductos = document.getElementById("contenedorProductos");
  botonVolver1 = document.getElementById("botonVolver1");
}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event);
  }
  
  function validarFormulario(event) { 
    event.preventDefault();
    let idProducto = inputId.value;
    let nombre = inputNombre.value;
    let precio = inputPrecio.value;
    let cantidad = inputCantidad.value;

    const idExiste = articulos.some((producto) => producto.id === idProducto);

    function DatosNoVacios(){
      return (idProducto != "" && nombre != "" && precio != "" && cantidad != "")
    }

    if(DatosNoVacios()){
      if (!idExiste) {
        let producto = new Producto(
          idProducto,
          nombre,
          parseFloat(precio),
          parseInt(cantidad)
        );
    
        articulos.push(producto);
        formulario.reset();
    
    pintarProductos();
    } else {
        alert("El id ya existe");
    }
    }
    else{
      alert("complete todos los datos")
    }  
}

function eliminarProducto(idProducto) {
    let columnaBorrar = document.getElementById(`columna-${idProducto}`);
    let indiceBorrar = articulos.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
  
    articulos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
  }

  function SumarCantidad(idProducto) {
    let indice = articulos.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
  
    articulos[indice]["cantidad"] += 1
    pintarProductos()
  }
  function RestarCantidad(idProducto) {
    let indice = articulos.findIndex(
      (producto) => Number(producto.id) === Number(idProducto)
    );
    
    if(articulos[indice]["cantidad"] == 0){
      alert("no hay stock que remover")
    }
    else{
      articulos[indice]["cantidad"] -= 1
    }
    pintarProductos()
  }
  

function pintarProductos() {
    contenedorProductos.innerHTML = "";
    articulos.forEach((producto) => {
      let column = document.createElement("div");
      column.className = "col-md-4 mt-3";
      column.id = `columna-${producto.id}`;
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
                      <button class="btn btn-primary p-3" id="botonMas-${producto.id}" >+</button>
                      <button class="btn btn-primary p-3" id="botonMenos-${producto.id}" >-</button>
                    </div>
                      <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                  </div>
              </div>`;
  
      contenedorProductos.append(column);
  
      let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
      botonEliminar.onclick = () => eliminarProducto(producto.id);

      let botonMas = document.getElementById(`botonMas-${producto.id}`);
      botonMas.onclick = () => SumarCantidad(producto.id);

      let botonMenos = document.getElementById(`botonMenos-${producto.id}`);
      botonMenos.onclick = () => RestarCantidad(producto.id);
    });
  }