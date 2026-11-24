/**
 * CONTROLADOR – Login y registro
 * Conecta la vista (login.html) con el modelo (authModel.js).
 */
(function () {
  const DASHBOARD = '../../../dashboard.html';
  const $ = (id) => document.getElementById(id);

  function mostrarMensaje(texto, tipo) {
    const caja = $('mensaje');
    caja.textContent = texto;
    caja.className = 'alert ' + (tipo || 'error');
    caja.hidden = false;
  }

  function limpiarMensaje() {
    $('mensaje').hidden = true;
  }

  function cambiarTab(tab) {
    limpiarMensaje();
    const esLogin = tab === 'login';
    $('form-login').hidden = !esLogin;
    $('form-register').hidden = esLogin;
    $('tab-login').className = esLogin ? 'active' : '';
    $('tab-register').className = esLogin ? '' : 'active';
  }

  $('tab-login').addEventListener('click', (e) => { e.preventDefault(); cambiarTab('login'); });
  $('tab-register').addEventListener('click', (e) => { e.preventDefault(); cambiarTab('register'); });

  // Si ya hay sesión activa, ir directo al dashboard
  AuthModel.getSession().then((s) => { if (s) location.replace(DASHBOARD); });

  // ---- Iniciar sesión ----
  $('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    limpiarMensaje();
    const email = $('login-email').value.trim();
    const password = $('login-password').value;
    const { error } = await AuthModel.signIn(email, password);
    if (error) return mostrarMensaje(error.message, 'error');
    location.href = DASHBOARD;
  });

  // ---- Registrarse ----
  $('form-register').addEventListener('submit', async (e) => {
    e.preventDefault();
    limpiarMensaje();
    const nombre = $('reg-nombre').value.trim();
    const email = $('reg-email').value.trim();
    const password = $('reg-password').value;
    const confirmar = $('reg-confirm').value;

    if (password.length < 6) return mostrarMensaje('La contraseña debe tener mínimo 6 caracteres.', 'error');
    if (password !== confirmar) return mostrarMensaje('Las contraseñas no coinciden.', 'error');

    const { data, error } = await AuthModel.signUp(email, password, nombre);
    if (error) return mostrarMensaje(error.message, 'error');

    if (data.session) {
      location.href = DASHBOARD;
    } else {
      cambiarTab('login');
      mostrarMensaje('Cuenta creada. Revisa tu correo para confirmarla e inicia sesión.', 'ok');
    }
  });
})();
