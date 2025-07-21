const API_URL_PEDIDOS = 'http://localhost:8080/api/pedidos';
const API_URL_CLIENTES = 'http://localhost:8080/api/clientes';
const API_URL_ARTICULOS = 'http://localhost:8080/api/articulos';

let articulosSeleccionados = [];

// Al iniciar la página
window.addEventListener('DOMContentLoaded', () => {
  cargarClientes();
  cargarArticulos();
  listarPedidos();
});

// Cargar clientes en el <select>
function cargarClientes() {
  fetch(API_URL_CLIENTES)
    .then(res => res.json())
    .then(clientes => {
      const select = document.getElementById('clienteId');
      select.innerHTML = '<option value="">Seleccione un cliente</option>';
      clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = `${cliente.id} - ${cliente.nombre}`;
        select.appendChild(option);
      });
    });
}

// Cargar artículos en el <select>
function cargarArticulos() {
  fetch(API_URL_ARTICULOS)
    .then(res => res.json())
    .then(articulos => {
      const select = document.getElementById('articuloId');
      select.innerHTML = '<option value="">Seleccione un artículo</option>';
      articulos.forEach(articulo => {
        const option = document.createElement('option');
        option.value = articulo.id;
        option.textContent = `${articulo.id} - ${articulo.nombre}`;
        select.appendChild(option);
      });
    });
}

// Agregar artículo a la lista del pedido
document.getElementById('agregarArticulo').addEventListener('click', () => {
  const articuloId = parseInt(document.getElementById('articuloId').value);
  const cantidad = parseInt(document.getElementById('cantidad').value);

  if (!articuloId || !cantidad || cantidad <= 0) {
    alert('Seleccione un artículo y una cantidad válida.');
    return;
  }

  // Verificar duplicado
  if (articulosSeleccionados.some(a => a.articuloId === articuloId)) {
    alert('El artículo ya fue agregado.');
    return;
  }

  const select = document.getElementById('articuloId');
  const nombre = select.options[select.selectedIndex].textContent.split(' - ')[1];

  articulosSeleccionados.push({
    articuloId,
    nombre,
    cantidad
  });

  mostrarArticulosSeleccionados();

  // Reset campos
  document.getElementById('articuloId').value = '';
  document.getElementById('cantidad').value = '';
});

// Mostrar tabla de artículos seleccionados
function mostrarArticulosSeleccionados() {
  const tbody = document.querySelector('#tablaArticulosSeleccionados tbody');
  tbody.innerHTML = '';
  articulosSeleccionados.forEach(a => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${a.articuloId}</td>
      <td>${a.nombre}</td>
      <td>${a.cantidad}</td>
    `;
    tbody.appendChild(fila);
  });
}

// Registrar pedido
function registrarPedido() {
  const clienteId = parseInt(document.getElementById('clienteId').value);

  if (!clienteId || articulosSeleccionados.length === 0) {
    alert('Debe seleccionar un cliente y agregar al menos un artículo.');
    return;
  }

  const pedido = {
    cliente: { id: clienteId },
    pedidoArticulos: articulosSeleccionados.map(item => ({
      articulo: { id: item.articuloId },
      cantidad: item.cantidad
    }))
  };

  fetch(API_URL_PEDIDOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido)
  })
    .then(res => {
      if (!res.ok) throw new Error('Error al registrar el pedido');
      return res.json();
    })
    .then(() => {
      document.getElementById('formPedido').reset();
      articulosSeleccionados = [];
      mostrarArticulosSeleccionados();
      listarPedidos();
    })
    .catch(err => console.error('Error al registrar pedido:', err));
}

// Mostrar pedidos existentes
function listarPedidos() {
  fetch(API_URL_PEDIDOS)
    .then(res => res.json())
    .then(pedidos => {
      const tbody = document.querySelector('#tablaPedidos tbody');
      tbody.innerHTML = '';
      pedidos.forEach(pedido => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.cliente?.nombre || 'Desconocido'}</td>
          <td>${pedido.fecha ? new Date(pedido.fecha).toLocaleDateString() : 'N/A'}</td>
          <td>${pedido.pedidoArticulos.map(pa => pa.articulo?.nombre || 'N/A').join(', ')}</td>
          <td>${pedido.pedidoArticulos.map(pa => pa.cantidad).join(', ')}</td>
        `;
        tbody.appendChild(fila);
      });
    })
    .catch(err => console.error('Error al cargar pedidos:', err));
}
