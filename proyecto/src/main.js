// src/main.js
import { onAuthStateChanged } from 'firebase/auth';
import { auth }              from './firebaseConfig.js';

function renderMenu(user) {
  const menu = document.getElementById('menu');
  menu.innerHTML = ''; 
  const opciones = user
    ? ['Home','Original','Perfil','Logout']
    : ['Login','Registro'];

  opciones.forEach(texto => {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.addEventListener('click', async () => {
      // Dinámicamente importamos el módulo correcto
      const módulo = await import(`./componentes/${texto.toLowerCase()}.js`);
      módulo.default();
    });
    menu.appendChild(btn);
  });
}

onAuthStateChanged(auth, user => {
  renderMenu(user);
  // Arranque inicial
  const inicio = user ? 'home' : 'login';
  import(`./componentes/${inicio}.js`).then(m => m.default());
});
