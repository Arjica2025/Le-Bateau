
document.addEventListener('DOMContentLoaded', () => {
  const lista = document.getElementById('listaReservas');
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  reservas.forEach(fecha => {
    const li = document.createElement('li');
    li.textContent = fecha;
    lista.appendChild(li);
  });
});

function guardarReserva() {
  const fecha = document.getElementById('fechaReserva').value;
  if (!fecha) {
    alert('Por favor selecciona una fecha');
    return;
  }
  const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
  if (reservas.includes(fecha)) {
    alert('Esta fecha ya está reservada');
    return;
  }
  reservas.push(fecha);
  localStorage.setItem('reservas', JSON.stringify(reservas));
  const li = document.createElement('li');
  li.textContent = fecha;
  document.getElementById('listaReservas').appendChild(li);
  alert('Reserva guardada');
}
