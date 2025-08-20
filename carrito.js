let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar producto
function agregarAlCarrito(nombre, precio, imagen = '') {
  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarrito();
}

// Guardar en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizar vista carrito
function actualizarCarrito() {
  const carritoDiv = document.getElementById('carrito-items');
  if (!carritoDiv) return;

  carritoDiv.innerHTML = '';
  let total = 0;

  carrito.forEach((item, i) => {
    total += item.precio * item.cantidad;

    const div = document.createElement('div');
    div.className = 'flex justify-between items-center border-b border-gray-700 py-1';

    div.innerHTML = `
      <span>${item.nombre}</span>
      <div class="flex items-center gap-2">
        <button onclick="cambiarCantidad(${i}, -1)" class="bg-gray-700 px-2 rounded">-</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidad(${i}, 1)" class="bg-gray-700 px-2 rounded">+</button>
        <span class="text-yellow-400">$${(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
        <button onclick="eliminarProducto(${i})" class="bg-red-500 px-2 rounded text-white">x</button>
      </div>
    `;
    carritoDiv.appendChild(div);
  });

  const totalSpan = document.getElementById('carrito-total');
  if (totalSpan) {
    totalSpan.textContent = `$${total.toLocaleString('es-CO')}`;
  }
}

// Cambiar cantidad
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
  actualizarCarrito();
}

// Eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

// Mostrar/ocultar carrito
function toggleCarrito() {
  document.getElementById('carrito').classList.toggle('hidden');
  actualizarCarrito();
}

// Inicializar
document.addEventListener('DOMContentLoaded', actualizarCarrito);
