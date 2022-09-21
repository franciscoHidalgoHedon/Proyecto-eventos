


function iniciarElemSesion() {
  formulario2 = document.getElementById("formSesion");
  inputUser = document.getElementById("inputUser");
  inputContraseña = document.getElementById("inputContraseña");
  botonVolverS = document.getElementById("botonVolverS");
}

  function EventosSesión() {
    formulario2.onsubmit = (event) => validarFormSesion(event);
  }

  function validarFormSesion(event) { 
    event.preventDefault();
    let User = inputUser.value;
    let Contraseña = inputContraseña.value;

    function DatosNoVacios(){
      return (User != "" && Contraseña != "")
    }

    if(DatosNoVacios()){
      if(User.toUpperCase() == UsuarioAdmin && Contraseña == ContraseñaAdmin){
        alert("Bienvenido Admin!")
        MenuInventario()
      }else{
        alert("Datos Incorrectos")
      }
    }else{
      alert("complete todos los datos")
    }  
}