let _lstProductos;

class Producto {
  constructor(Id, IdRubro, Nombre, Descripcion, Unidad) {
    this.id = Id;
    this.idRubro = IdRubro;
    this.nombre = Nombre;
    this.descripcion = Descripcion;
    this.unidad = Unidad;
  }

  static TraerTodos() {
    _lstProductos = JSON.parse(localStorage.getItem("__lstProductos"));
    if (_lstProductos == undefined) {
      _lstProductos = [];
      localStorage.setItem("__lstProductos", JSON.stringify(_lstProductos));
    }
    return _lstProductos;
  }

  static TraerTodosXBusqueda(busqueda) {
    let lstResult = [];
    if (_lstProductos != undefined && _lstProductos.length > 0) {
      for (let index = 0; index < _lstProductos.length; index++) {
        let minuscula = _lstProductos[index].nombre.toLowerCase();
        if (minuscula.indexOf(busqueda.toLowerCase()) > -1) {
          lstResult.push(_lstProductos[index]);
        }
      }
    }
    return lstResult;
  }

  static TraerUno(id) {
    _lstProductos == undefined && this.TraerTodos();
    const result = _lstProductos.filter((elemento) => elemento.id == id);
    return result[0];
  }

  static BorrarTodos() {
    _lstProductos = [];
    localStorage.setItem("__lstProductos", JSON.stringify(_lstProductos));
  }

  Guardar() {
    if (this.id == 0) {
      this.id = _lstProductos?.length + 1;
      _lstProductos.push(this);
    } else {
      for (let index = 0; index < _lstProductos.length; index++) {
        if (_lstProductos[index].id == this.id) {
          this.id = parseInt(this.id);
          _lstProductos.splice(index, 1, this);
        }
      }
    }
    localStorage.setItem("__lstProductos", JSON.stringify(_lstProductos));
  }

  // Tools
  static ArmarTabla(lista) {
    let str = "";
    str += "<table class='table table-striped'>";
    str += "    <thead class='thead-dark'>";
    str += "        <tr>";
    str += "            <th scope='col'>#</th>";
    str += "            <th scope='col'>Nombre</th>";
    str += "            <th scope='col'>Rubro</th>";
    str += "            <th scope='col'>Unidad</th>";
    str += "        </tr>";
    str += "    </thead>";
    if (lista?.length > 0) {
      str += "    <tbody>";
      for (let item of lista) {
        str += "<tr>";
        str += "    <td>" + item.id + "</td>";
        str += "    <td>" + item.nombre + "</td>";
        str += "    <td>" + Rubro.TraerUno(item.idRubro).nombre + "</td>";
        str += "    <td>" + item.unidad + "</td>";
        str += "</tr>";
      }
      str += "    </tbody>";
    }
    return str;
  }
}
