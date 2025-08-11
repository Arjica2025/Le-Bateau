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
  const horaInicio = document.getElementById('horaInicio').value;
  const horaFin = document.getElementById('horaFin').value;
  const usuario = localStorage.getItem('usuario');

  if (!fecha || !horaInicio || !horaFin) {
    alert('Por favor completa fecha, hora de inicio y hora de fin');
    return;
  }

  // Validar horario
  if (!validarHorario(horaInicio) || !validarHorario(horaFin)) {
    alert('Las reservas solo pueden ser entre 09:00 y 21:00');
    return;
  }

  if (horaInicio >= horaFin) {
    alert('La hora de inicio debe ser anterior a la hora de fin');
    return;
  }

  let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');

  // Validar solapamientos
  if (reservas.find(r => r.fecha === fecha && seSolapan(r.horaInicio, r.horaFin, horaInicio, horaFin))) {
    alert('Ya existe una reserva que se solapa con este horario');
    return;
  }

  const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  reservas.push({ id, fecha, horaInicio, horaFin, usuario });
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();
}

function validarHorario(hora) {
  return hora >= "09:00" && hora <= "21:00";
}

function seSolapan(inicio1, fin1, inicio2, fin2) {
  return inicio1 < fin2 && inicio2 < fin1;
}

function mostrarReservas() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = '';
  const usuario = localStorage.getItem('usuario');
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]')
    .sort((a, b) => (a.fecha + a.horaInicio).localeCompare(b.fecha + b.horaInicio));

  reservas.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.fecha} ${r.horaInicio}–${r.horaFin} → ${r.usuario}`;
    if (r.usuario === usuario) {
      const btn = document.createElement('button');
      btn.textContent = '❌';
      btn.style.marginLeft = '10px';
      btn.onclick = () => borrarReserva(r.id);
      li.appendChild(btn);
    }
    lista.appendChild(li);
  });
}

function borrarReserva(id) {
  let reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  reservas = reservas.filter(r => r.id !== id);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  mostrarReservas();
}
