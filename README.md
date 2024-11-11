# GameMode 🎮

## Descripción

GameMode es una plataforma de marketplace de videojuegos que permite a las empresas desarrolladoras publicar y vender sus juegos, mientras que los usuarios pueden descubrir, comprar y gestionar su biblioteca de juegos.

## Características Principales 🚀

### Para Usuarios

- Exploración de juegos con filtros avanzados (categoría, precio, calificación)
- Sistema de reseñas y calificaciones
- Lista de deseos personalizada
- Biblioteca de juegos comprados
- Sistema de comentarios en juegos

### Para Empresas

- Panel de control para gestión de juegos
- Estadísticas detalladas de ventas y engagement
- Gestión de publicaciones de juegos
- Seguimiento de métricas (vistas, wishlist, conversión)

## Tecnologías Utilizadas 💻

- Backend: Node.js con Express y TypeScript
- Base de datos: MongoDB con Mongoose
- Autenticación: JWT
- Manejo de archivos: Multer

## Instalación y Configuración 🔧

### Backend

1. Navegar al directorio del backend

```bash
git clone https://github.com/martinnbejarano/GameMode.git
cd gamemode/backend
```

2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar el archivo `.env` con las siguientes variables:

```env
PORT=3000
DB_URI=mongodb://localhost:27017/gamemode
JWT_SECRET=tu_secret_key
FRONTEND_URL=http://localhost:5173
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_password_email
```

4. Configurar TypeScript y ESLint

```bash
# Instalar dependencias de desarrollo si no están instaladas
npm install -D typescript @types/node @types/express

# Inicializar configuración de TypeScript
npx tsc --init
```

5. Estructura de directorios del backend

```
backend/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.ts
├── dist/
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── eslint.config.js
```

6. Iniciar servidor de desarrollo

```bash
npm run dev

npm start
```

7. Verificar instalación

El servidor estará corriendo en `http://localhost:3000`. Puedes probar la API con:

```bash
curl http://localhost:3000/api/health
```

### Frontend

// ... (resto del contenido existente) ...

## Contribución 🤝

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Estado del Proyecto 🚦

En desarrollo activo - Versión 1.0.0

---

⌨️ con ❤️ por GameMode
