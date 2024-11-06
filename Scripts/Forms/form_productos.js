// Declaro las variables del DOM
// Buscador
let txtBusqueda = document.querySelector("#txtBusqueda");
let btnBusqueda = document.querySelector("#btnBusqueda");
let btnNuevo = document.querySelector("#btnNuevo");
// Entidad
let txtNombre = document.querySelector("#txtNombre");
let txtUnidad = document.querySelector("#txtUnidad");
let txtDescripcion = document.querySelector("#txtDescripcion");
let cboRubros = document.querySelector("#cboRubros");

let idEntidad = document.querySelector("#idEntidad");
let btnGuardar = document.querySelector("#btnGuardar");
// Tabla
let divTabla = document.querySelector("#tblEntidades");
let btnBorrarTodos = document.querySelector("#btnBorrarTodos");

// Inicio de  Página
ArmarTabla(Producto.TraerTodos());
ArmarCombo(Rubro.TraerTodos(), "");
LimpiarEntidad();

// Eventos Mouse
btnBusqueda.addEventListener("click", (evt) => {
  let lista = Producto.TraerTodosXBusqueda(txtBusqueda.value);
  if (lista.length > 0) {
    divTabla.innerHTML = Producto.ArmarTabla(lista);
  }
});
btnGuardar.addEventListener("click", () => {
  GuardarEntidad();
});
btnNuevo.addEventListener("click", () => {
  LimpiarEntidad();
});
btnBorrarTodos.addEventListener("click", () => {
  Producto.BorrarTodos();
  ArmarTabla();
});

// Eventos Teclado
txtNombre.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Producto.TraerTodos());
  }
});
txtDescripcion.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Producto.TraerTodos());
  }
});
txtUnidad.addEventListener("keyup", (evt) => {
  // Si presiona el Enter desde el txt lo guarda
  if (evt.keyCode == 13) {
    GuardarEntidad();
    ArmarTabla(Producto.TraerTodos());
  }
});

// Eventos Personalizados
document.addEventListener(
  "eventoProductoSeleccionado",
  function (objResultante) {
    LlenarEntidad(objResultante.detail);
  }
);

// Tabla
function ArmarTabla(lista) {
  divTabla.innerHTML = Producto.ArmarTabla(lista);
}
// Combo
function ArmarCombo(lista, seleccionado) {
  cboRubros.innerHTML = Rubro.ArmarCombo(lista, seleccionado);
}
// Entidad
function LimpiarEntidad() {
  idEntidad.textContent = "0";
  txtNombre.value = "";
  txtDescripcion.value = "";
  txtUnidad.value = "";
  txtNombre.focus();
}
function LlenarEntidad(objArray) {
  idEntidad.textContent = objArray.id;
  txtNombre.value = objArray.nombre;
}
function GuardarEntidad() {
  try {
    ValidarEntidad();
    let obj = new Producto();
    if (idEntidad.textContent != "") {
      obj.id = idEntidad.textContent;
    }
    obj.nombre = txtNombre.value;
    obj.descripcion = txtDescripcion.value;
    obj.unidad = txtUnidad.value;
    obj.idRubro = document.getElementById("idRubroSelected").value;
    obj.Guardar();
    ArmarTabla(Producto.TraerTodos());
    LimpiarEntidad();
  } catch (error) {
    alert(error);
  }
}
function ValidarEntidad() {
  let error = "";
  if (txtNombre?.value.length == 0) {
    error += "Debe completar el nombre.\n";
  }
  if (txtUnidad?.value.length == 0) {
    error += "Debe completar la Unidad.\n";
  }
  if (document.getElementById("idRubroSelected").value == 0) {
    error += "Debe seleccionar el Rubro.\n";
  }
  if (error.length > 0) {
    let result =
      "Debe corregir los siguientes errores para guardar los cambios\n\n" +
      error;
    throw result;
  }
}
