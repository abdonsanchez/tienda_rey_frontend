const API_URL = 'http://localhost:8080/api/articulos';

let editando = false;
let articuloEditadoId = null;

// Cargar artículos al iniciar
window.addEventListener('DOMContentLoaded', listarArticulos);

// Listar artículos (versión con cards)
function listarArticulos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('contenedorArticulos');
      contenedor.innerHTML = '';
      data.forEach(articulo => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${articulo.nombre}</h5>
              <p class="card-text">ID: ${articulo.id}</p>
              <p class="card-text">Precio: $${articulo.precio.toFixed(2)}</p>
              <button class="btn btn-warning btn-sm me-2 btn-editar" data-id="${articulo.id}">Editar</button>
              <button class="btn btn-danger btn-sm btn-eliminar" data-id="${articulo.id}">Eliminar</button>
            </div>
          </div>
        `;
        contenedor.appendChild(card);
      });

      // Eventos botones eliminar
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.getAttribute('data-id');
          eliminarArticulo(id);
        });
      });

      // Eventos botones editar
      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.getAttribute('data-id');
          cargarArticuloParaEditar(id);
        });
      });
    })
    .catch(err => console.error('Error al cargar artículos:', err));
}

// Crear o actualizar artículo
document.getElementById('formArticulo').addEventListener('submit', function (e) {
  e.preventDefault();

  const nuevoArticulo = {
    nombre: document.getElementById('nombre').value,
    precio: parseFloat(document.getElementById('precio').value)
  };

  if (editando) {
    // Actualizar
    fetch(`${API_URL}/${articuloEditadoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoArticulo)
    })
      .then(res => {
        if (res.ok) {
          resetFormulario();
          listarArticulos();
        } else {
          alert('Error al actualizar artículo');
        }
      })
      .catch(err => console.error('Error al actualizar:', err));
  } else {
    // Crear
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoArticulo)
    })
      .then(res => {
        if (res.ok) {
          resetFormulario();
          listarArticulos();
        } else {
          alert('Error al agregar artículo');
        }
      })
      .catch(err => console.error('Error al agregar:', err));
  }
});

// Cargar datos al formulario para editar
function cargarArticuloParaEditar(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(articulo => {
      document.getElementById('nombre').value = articulo.nombre;
      document.getElementById('precio').value = articulo.precio;
      editando = true;
      articuloEditadoId = id;
      document.getElementById('btnGuardar').textContent = 'Guardar Cambios';
    })
    .catch(err => console.error('Error al cargar artículo:', err));
}

// Eliminar artículo
function eliminarArticulo(id) {
  if (!confirm('¿Estás seguro de eliminar este artículo?')) return;

  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        listarArticulos();
      } else {
        alert('Error al eliminar artículo');
      }
    })
    .catch(err => console.error('Error al eliminar:', err));
}

// Limpiar formulario y estado
function resetFormulario() {
  document.getElementById('formArticulo').reset();
  editando = false;
  articuloEditadoId = null;
  document.getElementById('btnGuardar').textContent = 'Agregar Artículo';
}
