/**
 * CONTROLADOR – Guardián de páginas protegidas
 * Si no hay sesión, redirige al login. Si hay, muestra la página.
 */
(async function () {
  const LOGIN = 'app/views/auth/login.html';
  const session = await AuthModel.getSession();

  if (!session) {
    location.replace(LOGIN);
    return;
  }

  const user = session.user;
  const nombre = (user.user_metadata && user.user_metadata.nombre) || 'Usuario';

  document.querySelectorAll('[data-user-nombre]').forEach((el) => (el.textContent = nombre));
  document.querySelectorAll('[data-user-email]').forEach((el) => (el.textContent = user.email));
  document.querySelectorAll('[data-user-id]').forEach((el) => (el.textContent = user.id));
  document.querySelectorAll('[data-user-created]').forEach((el) => {
    el.textContent = new Date(user.created_at).toLocaleString('es-CO');
  });

  const btn = document.getElementById('btn-logout');
  if (btn) {
    btn.addEventListener('click', async () => {
      await AuthModel.signOut();
      location.replace(LOGIN);
    });
  }

  document.body.classList.remove('oculto');
})();
