// proyecto/src/componentes/registro.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc }                   from 'firebase/firestore';
import { auth, db }                      from '../firebaseConfig.js';
import mostrarLogin                      from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Registro</h2>
    <input id="nombre"   placeholder="Nombre" /><br/>
    <input id="correo"   placeholder="Correo" /><br/>
    <input id="contrasena" type="password" placeholder="Contraseña" /><br/>
    <input id="fecha"    placeholder="Fecha de nacimiento" /><br/>
    <input id="telefono" placeholder="Teléfono" /><br/>
    <button id="btnRegistro">Registrarse</button>
  `;

  document.getElementById('btnRegistro').onclick = async () => {
    const nombre    = document.getElementById('nombre').value;
    const correo    = document.getElementById('correo').value;
    const contrasena= document.getElementById('contrasena').value;
    const fecha     = document.getElementById('fecha').value;
    const telefono  = document.getElementById('telefono').value;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, correo, contrasena);
      // Usa la colección "usuarios"
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid:      user.uid,
        correo,
        nombre,
        fecha,
        telefono,
        ganados:  0,
        perdidos: 0
      });
      alert('Registro exitoso');
      mostrarLogin();
    } catch (e) {
      console.error(e);
      alert('Error al registrarse: ' + e.message);
    }
  };
}
