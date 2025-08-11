
document.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('reservaSection').style.display = 'block';
    mostrarReservas();
  }
});

function guardarUsuario() {
  const nombre = document.getElementById('nombreUsuario').value.trim();
  if (!nombre) {
    alert('Por favor escribe tu nombre');
    return;
  }
  localStorage.setItem('usuario', nombre);
  document.getElementById('userSection').style.display = 'none';
  document.getElementById('reservaSection').style.display = 'block';
  mostrarReservas();
}

function guardarReserva() {
  const fecha = document.getElementById('fechaReserva').value;
  const usuario = localStorage.getItem('usuario');
  if (!fecha) {
    alert('Por favor selecciona una fecha');
    return;
  }
  let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  if (reservas.find(r => r.fecha === fecha)) {
    alert('Esta fecha ya está reservada');
    return;
  }
  reservas.push({ fecha, usuario });
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();
}

function mostrarReservas() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = '';
  const usuario = localStorage.getItem('usuario');
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  reservas.forEach((r, index) => {
    const li = document.createElement('li');
    li.textContent = r.fecha + ' → ' + r.usuario;
    if (r.usuario === usuario) {
      const btn = document.createElement('button');
      btn.textContent = '❌';
      btn.style.marginLeft = '10px';
      btn.onclick = () => borrarReserva(index);
      li.appendChild(btn);
    }
    lista.appendChild(li);
  });
}

function borrarReserva(index) {
  let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  reservas.splice(index, 1);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();
}
