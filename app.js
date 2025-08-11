
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
  const hora = document.getElementById('horaReserva').value;
  const usuario = localStorage.getItem('usuario');

  if (!fecha || !hora) {
    alert('Por favor selecciona fecha y hora');
    return;
  }

  // Validar horario
  if (hora < "09:00" || hora > "21:00") {
    alert('Las reservas solo pueden ser entre 09:00 y 21:00');
    return;
  }

  let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  if (reservas.find(r => r.fecha === fecha && r.hora === hora)) {
    alert('Esta fecha y hora ya están reservadas');
    return;
  }

  reservas.push({ fecha, hora, usuario });
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();
}

function mostrarReservas() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = '';
  const usuario = localStorage.getItem('usuario');
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

  reservas.forEach((r, index) => {
    const fechaObj = new Date(r.fecha + 'T' + r.hora);
    const fechaFormateada = ('0' + fechaObj.getDate()).slice(-2) + '/' +
                            ('0' + (fechaObj.getMonth() + 1)).slice(-2) + '/' +
                            fechaObj.getFullYear() + ' ' +
                            ('0' + fechaObj.getHours()).slice(-2) + ':' +
                            ('0' + fechaObj.getMinutes()).slice(-2);
    const li = document.createElement('li');
    li.textContent = fechaFormateada + ' → ' + r.usuario;
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
"""
