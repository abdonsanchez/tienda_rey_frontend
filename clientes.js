const API_URL = 'http://localhost:8080/api/clientes';

let editando = false;
let clienteEditadoId = null;

// Cargar clientes al iniciar
window.addEventListener('DOMContentLoaded', listarClientes);

// Listar clientes
function listarClientes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('contenedorClientes');
      contenedor.innerHTML = '';

      data.forEach(cliente => {
        const card = document.createElement('div');
        card.className = 'card col-md-4';

        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${cliente.nombre}</h5>
            <p class="card-text">${cliente.email}</p>
            <button class="btn btn-sm btn-warning me-2 btn-editar" data-id="${cliente.id}">Editar</button>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${cliente.id}">Eliminar</button>
          </div>
        `;

        contenedor.appendChild(card);
      });

      // Botones editar
      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.getAttribute('data-id');
          cargarClienteParaEditar(id);
        });
      });

      // Botones eliminar
      document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', e => {
          const id = e.target.getAttribute('data-id');
          eliminarCliente(id);
        });
      });
    })
    .catch(err => console.error('Error al cargar clientes:', err));
}

// Crear o actualizar cliente
document.getElementById('formCliente').addEventListener('submit', e => {
  e.preventDefault();

  const nuevoCliente = {
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  if (editando) {
    // Actualizar
    fetch(`${API_URL}/${clienteEditadoId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(nuevoCliente)
    })
      .then(res => {
        if (res.ok) {
          resetFormulario();
          listarClientes();
        } else {
          alert('Error al actualizar cliente');
        }
      })
      .catch(err => console.error('Error al actualizar cliente:', err));
  } else {
    // Crear
    fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(nuevoCliente)
    })
      .then(res => {
        if (res.ok) {
          resetFormulario();
          listarClientes();
        } else {
          alert('Error al agregar cliente');
        }
      })
      .catch(err => console.error('Error al agregar cliente:', err));
  }
});

// Cargar datos al formulario para editar
function cargarClienteParaEditar(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(cliente => {
      document.getElementById('nombre').value = cliente.nombre;
      document.getElementById('email').value = cliente.email;
      editando = true;
      clienteEditadoId = id;
      document.getElementById('btnGuardar').textContent = 'Guardar Cambios';
    })
    .catch(err => console.error('Error al cargar cliente:', err));
}

// Eliminar cliente
function eliminarCliente(id) {
  if (!confirm('¿Estás seguro de eliminar este cliente?')) return;

  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.ok) {
        listarClientes();
      } else {
        alert('Error al eliminar cliente');
      }
    })
    .catch(err => console.error('Error al eliminar cliente:', err));
}

// Limpiar formulario y estado
function resetFormulario() {
  document.getElementById('formCliente').reset();
  editando = false;
  clienteEditadoId = null;
  document.getElementById('btnGuardar').textContent = 'Agregar Cliente';
}
