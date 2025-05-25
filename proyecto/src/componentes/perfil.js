// proyecto/src/componentes/perfil.js
import { auth, db }                from '../firebaseConfig.js';
import { doc, getDoc, updateDoc }  from 'firebase/firestore';

export default async function mostrarPerfil() {
  const app = document.getElementById('app');
  if (!app) throw new Error('Falta el contenedor #app');

  // Verifica que haya sesión
  const user = auth.currentUser;
  if (!user) {
    app.innerHTML = '<p>Error: Usuario no autenticado</p>';
    return;
  }

  // Estado de carga
  app.innerHTML = '<p>Cargando perfil…</p>';

  // Referencia a tu colección "usuarios"
  const ref = doc(db, 'usuarios', user.uid);

  try {
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      app.innerHTML = '<p>Usuario no encontrado</p>';
      return;
    }

    // Desestructura tus campos
    const {
      nombre   = '',
      fecha    = '',
      telefono = '',
      ganados  = 0,
      perdidos = 0
    } = snap.data();

    // Renderiza el formulario
    app.innerHTML = `
      <h2>Perfil del Usuario</h2>
      <div style="display:flex; flex-direction:column; gap:10px; max-width:400px;">
        <label>Nombre   <input id="nombre"   value="${nombre}"   /></label>
        <label>Fecha    <input id="fecha"    value="${fecha}"    /></label>
        <label>Teléfono <input id="telefono" value="${telefono}" /></label>
        <label>Ganados  <input id="ganados"  value="${ganados}"  disabled /></label>
        <label>Pérdidos <input id="perdidos" value="${perdidos}" disabled /></label>
        <button id="guardar">Guardar cambios</button>
      </div>
    `;

    // Listener para actualizar
    document.getElementById('guardar').addEventListener('click', async () => {
      try {
        await updateDoc(ref, {
          nombre:   document.getElementById('nombre').value,
          fecha:    document.getElementById('fecha').value,
          telefono: document.getElementById('telefono').value
        });
        alert('Perfil actualizado');
      } catch (e) {
        console.error(e);
        alert('Error al guardar: ' + e.message);
      }
    });
  } catch (e) {
    console.error(e);
    app.innerHTML = '<p>Error al cargar datos</p>';
  }
}
