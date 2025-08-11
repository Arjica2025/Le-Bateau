import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('reservaSection').style.display = 'block';
    mostrarReservas();
  }
});

window.guardarUsuario = function() {
  const nombre = document.getElementById('nombreUsuario').value.trim();
  if (!nombre) {
    alert('Por favor escribe tu nombre');
    return;
  }
  localStorage.setItem('usuario', nombre);
  document.getElementById('userSection').style.display = 'none';
  document.getElementById('reservaSection').style.display = 'block';
  mostrarReservas();
};

window.guardarReserva = async function() {
  const fecha = document.getElementById('fechaReserva').value;
  const horaInicio = document.getElementById('horaInicio').value;
  const horaFin = document.getElementById('horaFin').value;
  const usuario = localStorage.getItem('usuario');

  if (!fecha || !horaInicio || !horaFin) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (horaInicio < "09:00" || horaFin > "21:00" || horaInicio >= horaFin) {
    alert('Horario inválido (09:00-21:00 y fin mayor que inicio)');
    return;
  }

  const reservasRef = collection(db, 'reservas');
  const snapshot = await getDocs(reservasRef);
  const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const solapa = reservas.some(r =>
    r.fecha === fecha &&
    ((horaInicio < r.horaFin) && (horaFin > r.horaInicio))
  );

  if (solapa) {
    alert('La reserva se solapa con otra existente');
    return;
  }

  await addDoc(reservasRef, { fecha, horaInicio, horaFin, usuario });
};

function mostrarReservas() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = '';
  const usuario = localStorage.getItem('usuario');
  const reservasRef = collection(db, 'reservas');
  const q = query(reservasRef, orderBy('fecha'), orderBy('horaInicio'));
  onSnapshot(q, (snapshot) => {
    lista.innerHTML = '';
    snapshot.forEach(docSnap => {
      const r = docSnap.data();
      const li = document.createElement('li');
      li.textContent = `${r.fecha} ${r.horaInicio}-${r.horaFin} → ${r.usuario}`;
      if (r.usuario === usuario) {
        const btn = document.createElement('button');
        btn.textContent = '❌';
        btn.style.marginLeft = '10px';
        btn.onclick = async () => {
          await deleteDoc(doc(db, 'reservas', docSnap.id));
        };
        li.appendChild(btn);
      }
      lista.appendChild(li);
    });
  });
}
