// proyecto/src/componentes/registro.js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc }                   from 'firebase/firestore';
import { auth, db }                      from '../firebaseConfig.js';
import mostrarLogin                      from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Registro</h2>
    <input type="text"    id="nombre"   placeholder="Nombre"><br>
    <input type="email"   id="correo"   placeholder="Correo electrónico"><br>
    <input type="password" id="contrasena" placeholder="Contraseña"><br>
    <input type="date"    id="fecha"    placeholder="Fecha de nacimiento"><br>
    <input type="tel"     id="telefono" placeholder="Teléfono"><br>
    <button id="btnRegistro">Registrarse</button>
    <p>¿Ya tienes cuenta? <a href="#" id="irLogin">Inicia sesión</a></p>
  `;

  document.getElementById("btnRegistro").addEventListener("click", async (e) => {
    e.preventDefault();
    const nombre    = document.getElementById("nombre").value;
    const correo    = document.getElementById("correo").value;
    const contrasena= document.getElementById("contrasena").value;
    const fecha     = document.getElementById("fecha").value;
    const telefono  = document.getElementById("telefono").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const uid = userCredential.user.uid;

      // Guardamos en la colección "users"
      await setDoc(doc(db, 'users', uid), {
        nombre,
        correo,
        fecha,
        telefono
      });

      alert('Usuario registrado correctamente');
      mostrarLogin();
    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    }
  });

  document.getElementById("irLogin").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarLogin();
  });
}
