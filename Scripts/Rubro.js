let _lstRubros;

class Rubro {
  constructor() {
    this.id = 0;
    this.nombre = "";
  }

  static TraerTodos() {
    _lstRubros = JSON.parse(localStorage.getItem("__lstRubros"));
    if (_lstRubros == undefined || _lstRubros == null) {
      _lstRubros = [];
      localStorage.setItem("__lstRubros", JSON.stringify(_lstRubros));
    }
    return _lstRubros;
  }

  static TraerTodosXBusqueda(busqueda) {
    let lstResult = [];
    if (_lstRubros != undefined && _lstRubros.length > 0) {
      for (let index = 0; index < _lstRubros.length; index++) {
        let minuscula = _lstRubros[index].nombre.toLowerCase();
        if (minuscula.indexOf(busqueda.toLowerCase()) > -1) {
          lstResult.push(_lstRubros[index]);
        }
      }
    }
    return lstResult;
  }

  static TraerUno(id) {
    _lstRubros == undefined && this.TraerTodos();
    const result = _lstRubros.filter((elemento) => elemento.id == id);
    return result[0];
  }

  static BorrarTodos() {
    _lstRubros = [];
    localStorage.setItem("__lstRubros", JSON.stringify(_lstRubros));
  }

  Guardar() {
    if (this.id == 0) {
      this.id = _lstRubros?.length + 1;
      _lstRubros.push(this);
    } else {
      for (let index = 0; index < _lstRubros.length; index++) {
        if (_lstRubros[index].id == this.id) {
          this.id = parseInt(this.id);
          _lstRubros.splice(index, 1, this);
        }
      }
    }
    localStorage.setItem("__lstRubros", JSON.stringify(_lstRubros));
  }

  // Tools
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
          " class='btn btn-secondary' data-Evento='eventoRubroSeleccionado' onclick='SeleccionRubro(this)'>" +
          item.id +
          " </a></td>";
        str += "    <td class='text-start pl-1'>" + item.nombre + "</td>";
        str += "</tr>";
      }
      str += "    </tbody>";
    }
    return str;
  }
  static ArmarCombo(lista, IdSelect) {
    let str = "";
    str += '<select style="width: 100%;" id="idRubroSelected">';
    str += '    <option value="0">Seleccione</option>';
    if (lista?.length > 0) {
      for (let item of lista) {
        let selected = "";
        if (IdSelect == item.id) {
          selected = "selected";
        }
        str +=
          " <option value='" +
          item.id +
          "' " +
          selected +
          ">" +
          item.nombre +
          "</option>";
      }
      str += "</select>";
    }
    return str;
  }
}

function SeleccionRubro(MiElemento) {
  try {
    let elemento = document.getElementById(MiElemento.id);
    let buscado = _lstRubros.filter((entidad) => entidad.id == MiElemento.id);
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
