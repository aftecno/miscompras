// Declaro las variables del DOM
// Buscador
let txtBusqueda = document.querySelector("#txtBusqueda");
let btnBusqueda = document.querySelector("#btnBusqueda");
let btnNuevo = document.querySelector("#btnNuevo");
// Entidad
let txtNombre = document.querySelector("#txtNombre");
let idEntidad = document.querySelector("#idEntidad");
let btnGuardar = document.querySelector("#btnGuardar");
// Tabla
let divTabla = document.querySelector("#tblEntidades");
let btnBorrarTodos = document.querySelector("#btnBorrarTodos");

// Inicio de  Página
ArmarTabla(Rubro.TraerTodos());
LimpiarEntidad();

// Eventos Mouse
btnBusqueda.addEventListener("click", (evt) => {
  
  let lista = Rubro.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista.length > 0) {
    divTabla.innerHTML = Rubro.ArmarTabla(lista);
  }
});
btnGuardar.addEventListener("click", () => {
  GuardarEntidad();
});
btnNuevo.addEventListener("click", () => {
  LimpiarEntidad();
});
btnBorrarTodos.addEventListener("click", () => {
  Rubro.BorrarTodos();
  ArmarTabla();
});

// Eventos Teclado
txtNombre.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Rubro.TraerTodos());
  }
});

// Eventos Personalizados
document.addEventListener(
  "eventoRubroSeleccionado",
  function (objResultante) {
    LlenarEntidad(objResultante.detail);
  }
);

// Tabla
function ArmarTabla(lista) {
  divTabla.innerHTML = Rubro.ArmarTabla(lista);
}
// Entidad
function LimpiarEntidad() {
  idEntidad.textContent = "0";
  txtNombre.value = "";
  txtNombre.focus();
}
function LlenarEntidad(objArray) {
  idEntidad.textContent = objArray.id;
  txtNombre.value = objArray.nombre;
}
function GuardarEntidad() {
  try {
    ValidarEntidad();
    let obj = new Rubro();
    if (idEntidad.textContent != "") {
      obj.id = idEntidad.textContent;
    }
    obj.nombre = txtNombre.value;
    obj.Guardar();
    ArmarTabla();
    LimpiarEntidad();
  } catch (error) {
    alert(error);
  }
}
function ValidarEntidad() {
  if (txtNombre?.value.length == 0) {
    throw "Debe completar el nombre";
  }
}
