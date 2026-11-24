# MTecho Supabase – Autenticación (MVC)

Proyecto web (HTML/CSS/JS) para el sistema de arriendo de apartamentos MTecho, con registro, login y cierre de sesión usando Supabase Auth.

## Estructura MVC
- `app/models/` – conexión a Supabase y funciones de autenticación
- `app/controllers/` – lógica de login/registro y protección de páginas
- `app/views/auth/login.html` – vista de inicio de sesión y registro
- `dashboard.html`, `apartamentos.html`, `contratos.html`, `perfil.html` – páginas protegidas

## Configuración
1. Copia `config/config.example.js` a `config/config.js`.
2. Pega tu `SUPABASE_URL` y tu publishable key (Supabase → Project Settings → API).
3. Abre `index.html` con Live Server (VS Code) o desde XAMPP (`htdocs`).

`config/config.js` está en `.gitignore` y no se sube al repositorio.
