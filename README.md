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

## Estructura del Proyecto 📁

### Controladores Principales

#### Game Controller
Maneja las operaciones relacionadas con juegos:

```5:30:GameMode/backend/src/controllers/game.controller.ts
export const getGames = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, minRating } = req.query;
  } catch (error) {
    let query: any = {};
  }
    if (category) {
      query.category = category;
    }
  try {
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    }
    if (minRating) {
      query.averageRating = { $gte: Number(minRating) };
    }
    console.log(query);
    const games = await Games.find(query);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos" });
  }
};
```


#### User Controller
Gestiona las operaciones de usuario:

```104:130:GameMode/backend/src/controllers/user.controller.ts
export const getWishlist = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }
    const user = await User.findById(req.user._id)
    const user = await User.findById(req.user._id).populate({
      path: "wishlist",
      select: "name price images category platforms",
      });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      data: user.wishlist,
    });
  } catch (error) {
    console.error("Error en getWishlist:", error);
    res.status(500).json({
      message: "Error al obtener la lista de deseos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
```


#### Company Controller
Administra las operaciones de empresas:

```8:73:GameMode/backend/src/controllers/company.controller.ts
export const publishGame = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.company) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const { _id } = req.company as ICompany;
    const {
      name,
      description,
      price,
      category,
      platforms,
      languages,
      minimumSystemRequirements,
      recommendedSystemRequirements,
    } = req.body;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !platforms ||
      !languages ||
      !minimumSystemRequirements ||
      !recommendedSystemRequirements
    ) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const imagesPath = Array.isArray(req.files)
      ? req.files.map((file: Express.Multer.File) => file.filename)
      : [];

    const parsedPlatforms = JSON.parse(platforms);
    const parsedLanguages = JSON.parse(languages);
    const minReqs = JSON.parse(minimumSystemRequirements);
    const recReqs = JSON.parse(recommendedSystemRequirements);

    if (!Array.isArray(parsedPlatforms) || !Array.isArray(parsedLanguages)) {
      return res.status(400).json({
        message: "Los campos platforms y languages deben ser arrays",
      });
    }
    const game = await Games.create({
      name,
      description,
      price,
      companyId: _id,
      images: imagesPath,
      category,
      platforms: parsedPlatforms,
      languages: parsedLanguages,
      releaseDate: new Date(),
      minimumSystemRequirements: minReqs,
      recommendedSystemRequirements: recReqs,
    });

    res.status(201).json(game);
  } catch (error) {
    console.error("Error en publishGame:", error);
    res.status(500).json({ message: "Error al publicar el juego", error });
  }
};
```


## API Endpoints 🛣️

### Juegos
- `GET /games` - Obtener lista de juegos con filtros
- `GET /games/:id` - Obtener detalles de un juego
- `GET /games/:id/reviews` - Obtener reseñas de un juego
- `POST /games/:id/views` - Registrar vista de un juego

### Usuarios
- `GET /user/wishlist` - Obtener lista de deseos
- `POST /user/games/:id/review` - Añadir reseña a un juego
- `POST /user/wishlist/:id` - Añadir juego a lista de deseos
- `DELETE /user/wishlist/:id` - Eliminar juego de lista de deseos

### Empresas
- `POST /company/games` - Publicar nuevo juego
- `GET /company/games` - Obtener juegos de la empresa
- `PUT /company/games/:id` - Editar juego
- `GET /company/sales` - Obtener estadísticas de ventas

## Instalación y Configuración 🔧

1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/gamemode.git
```

2. Instalar dependencias
```bash
cd gamemode
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
```

4. Iniciar servidor de desarrollo
```bash
npm run dev
```

## Contribución 🤝
1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia 📄
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Contacto 📧
- Proyecto: [https://github.com/tu-usuario/gamemode](https://github.com/tu-usuario/gamemode)
- Email: tu-email@ejemplo.com

## Estado del Proyecto 🚦
En desarrollo activo - Versión 1.0.0

---
⌨️ con ❤️ por [Tu Nombre](https://github.com/tu-usuario)
