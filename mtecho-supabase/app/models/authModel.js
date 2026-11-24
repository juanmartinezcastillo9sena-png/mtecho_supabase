/**
 * MODELO – Autenticación
 * Solo habla con Supabase. No toca el HTML.
 */
window.AuthModel = {
  signUp(email, password, nombre) {
    return window.sb.auth.signUp({
      email,
      password,
      options: { data: { nombre } }
    });
  },

  signIn(email, password) {
    return window.sb.auth.signInWithPassword({ email, password });
  },

  signOut() {
    return window.sb.auth.signOut();
  },

  async getSession() {
    const { data } = await window.sb.auth.getSession();
    return data.session;
  }
};
