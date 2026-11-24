/**
 * MODELO – Cliente de Supabase
 * Crea una única conexión usando las credenciales de config/config.js
 */
(function () {
  const { createClient } = window.supabase;
  window.sb = createClient(
    window.APP_CONFIG.SUPABASE_URL,
    window.APP_CONFIG.SUPABASE_ANON_KEY
  );
})();
