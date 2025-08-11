# Le Bateau - Reservas

Aplicación web progresiva (PWA) para gestionar reservas entre propietarios.

## Características
- Registro de usuario.
- Reservas con **hora de inicio y hora de fin**.
- Validación de horarios (09:00–21:00) y no permitir que la hora de inicio sea mayor o igual que la de fin.
- Evita reservas solapadas en la misma fecha.
- Lista de reservas ordenada por fecha y hora.
- Botón para eliminar solo las reservas propias.
- Funciona offline (Service Worker con cache-first).
- Lista para instalar en iOS/Safari (incluye `apple-touch-icon`).

## Instalación en iOS (Safari)
1. Abrir la aplicación en Safari.
2. Pulsar el botón de **Compartir**.
3. Seleccionar **Añadir a pantalla de inicio**.

## Notas
- Usa `localStorage`, por lo que las reservas no se sincronizan entre dispositivos.
