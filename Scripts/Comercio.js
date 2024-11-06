let _lstComercios;

class Comercio {
  constructor() {
    this.id = 0;
    this.nombre = "";
  }

  static TraerTodos() {
    _lstComercios = JSON.parse(localStorage.getItem("__lstComercios"));
     if (_lstComercios == undefined || _lstComercios == null) {
      _lstComercios = [];
      localStorage.setItem("__lstComercios", JSON.stringify(_lstComercios));
    }
    
    return _lstComercios;
  }

  static TraerTodosXBusqueda(busqueda) {
    let lstResult = [];
    if (_lstComercios != undefined && _lstComercios.length > 0) {
      for (let index = 0; index < _lstComercios.length; index++) {
        let minuscula = _lstComercios[index].nombre.toLowerCase();
        if (minuscula.indexOf(busqueda.toLowerCase()) > -1) {
          lstResult.push(_lstComercios[index]);
        }
      }
    }
    return lstResult;
  }

  static TraerUno(id) {
    _lstComercios == undefined && this.TraerTodos();
    const result = _lstComercios.filter((elemento) => elemento.id == id);
    return result[0];
  }

  static BorrarTodos() {
    _lstComercios = [];
    localStorage.setItem("__lstComercios", JSON.stringify(_lstComercios));
  }

  Guardar() {
    if (this.id == 0) {
      this.id = _lstComercios?.length + 1;
      _lstComercios.push(this);
    } else {
      for (let index = 0; index < _lstComercios.length; index++) {
        if (_lstComercios[index].id == this.id) {
          this.id = parseInt(this.id);
          _lstComercios.splice(index, 1, this);
        }
      }
    }
    localStorage.setItem("__lstComercios", JSON.stringify(_lstComercios));
  }

  static ArmarTabla(lista) {
    let str = "";
    str += "<table class='table table-striped'>";
    str += "    <thead class='thead-dark'>";
    str += "        <tr>";
    str += "            <th class='col-1 text-center'>#</th>";
    str += "            <th class='col-5 text-center'>Nombre</th>";
    str += "        </tr>";
    str += "    </thead>";
    if (lista?.length > 0) {
      str += "    <tbody>";
      for (let item of lista) {
        str += "<tr>";
        str +=
          "    <td class='text-center'><a href='#' id=" +
          item.id +
          " class='btn btn-secondary' data-Evento='eventoComercioSeleccionado' onclick='SeleccionComercio(this)'>" +
          item.id +
          " </a></td>";
        str += "    <td class='text-start pl-1'>" + item.nombre + "</td>";
        str += "</tr>";
      }
      str += "    </tbody>";
    }
    return str;
  }
}

function SeleccionComercio(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let buscado = _lstComercios.filter(
      (entidad) => entidad.id == MiElemento.id
    );
    let Seleccionado = buscado[0];
    if (Seleccionado != undefined) {
      let evento = elemento.getAttribute("data-Evento");
      let event = new CustomEvent(evento, { detail: Seleccionado });
      document.dispatchEvent(event);
    }
  } catch (e) {
    alert(e);
  }
}
