import { auth, db } from '../firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default async function mostrarPerfil() {
  const app = document.getElementById('app');
  if (!app) throw new Error("No se encontró el elemento #app");

  app.innerHTML = `<h2>Perfil del Usuario</h2><p id="cargando">Cargando...</p>`;

  const user = auth.currentUser;
  if (!user) {
    app.innerHTML = '<p>Error: Usuario no autenticado</p>';
    return;
  }

  const uid = user.uid;
  const ref = doc(db, 'usuarios', uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    app.innerHTML = '<p>Usuario no encontrado</p>';
    return;
  }

  const {
    nombre = '',
    fecha = '',
    telefono = '',
    ganados = 0,
    perdidos = 0
  } = snap.data();

  app.innerHTML = `
    <h2>Perfil del Usuario</h2>
    <div style="display:flex; flex-direction:column; gap:10px; max-width:400px;">
      <input id="nombre"   placeholder="Nombre"               value="${nombre}" />
      <input id="fecha"    placeholder="Fecha de nacimiento" value="${fecha}" />
      <input id="telefono" placeholder="Teléfono"            value="${telefono}" />
      <input type="number" name="ganados"  placeholder="Ganados"  value="${ganados}" disabled />
      <input type="number" name="perdidos" placeholder="Perdidos" value="${perdidos}" disabled />
      <button id="guardar">Guardar cambios</button>
    </div>
  `;
   
  document.getElementById("guardar").addEventListener("click", async () => {
    const nuevoNombre   = document.getElementById("nombre").value;
    const nuevaFecha    = document.getElementById("fecha").value;
    const nuevoTelefono = document.getElementById("telefono").value;

    try {
      await updateDoc(ref, {
        nombre: nuevoNombre,
        fecha: nuevaFecha,
        telefono: nuevoTelefono
      });
      alert('Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar los datos');
    }
  });
}

// Llamamos a la función al cargar el módulo
mostrarPerfil();
