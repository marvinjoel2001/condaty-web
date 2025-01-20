# Marketplace de Condominios

Una aplicación web construida con Next.js que permite a los residentes de condominios publicar y gestionar productos y servicios.

# Características

- 🛍️ Listado de productos y servicios
- 🔍 Filtrado por categorías (productos/servicios)
- 🔎 Búsqueda por nombre y descripción
- ✨ Interfaz moderna y responsive
- 🔒 Autenticación de usuarios
- 📱 Gestión de productos (crear, editar, eliminar)
- 🏘️ Organización por condominios

# Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Una API backend corriendo (por defecto en localhost:3001)

# Configuración del Entorno

1. Clona el repositorio:

git clone <tu-repositorio>
cd <nombre-del-proyecto>

Instala las dependencias:

bash

npm install

Crea un archivo .env.local en la raíz del proyecto:

env
NEXT_PUBLIC_API_URL=http://localhost:3001
Desarrollo Local
Para iniciar el servidor de desarrollo:

bash

npm run dev


# 
La aplicación estará disponible en http://localhost:3000
Estructura del Proyecto
├── app/                  # Directorio principal de la aplicación
│   ├── dashboard/       # Rutas protegidas del dashboard
│   └── ...
├── components/          # Componentes reutilizables
├── lib/                 # Utilidades y configuraciones
├── hooks/              # Custom hooks
├── store/              # Estado global (Zustand)
└── types/              # Definiciones de TypeScript
Tecnologías Principales

Next.js 14 (App Router)
TypeScript
Tailwind CSS
Zustand (manejo de estado)
Axios (cliente HTTP)

Despliegue
La aplicación está optimizada para despliegue en Vercel. Para desplegar:

Sube tu código a GitHub
Conecta tu repositorio en Vercel
Configura las variables de entorno en Vercel:

NEXT_PUBLIC_API_URL: URL de tu API en producción



Variables de Entorno
Variable                           Descripción              Requerida
NEXT_PUBLIC_API_URLURL del backend    API                      Sí