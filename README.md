# Reyes&Friends-App

<div align="center">

![Reyes&Friends Logo](https://github.com/user-attachments/assets/46a61f38-9e31-458d-aa43-3bfec13c7dc7)

Repositorio oficial de la web de Reyes&Friends, desarrollada con tecnologías modernas tanto en el frontend como en el backend, diseñada para ofrecer una experiencia robusta y escalable.

</div>

<p align="center">
    <a href="LICENSE">Ver licencia del proyecto</a>
</p>

## Tech Stack

### Front-end:

<div align="center">

[![React](https://img.shields.io/badge/React-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Refine](https://img.shields.io/badge/Refine-24292f?logo=refine&logoColor=white)](https://refine.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

### Back-end:

<div align="center">

[![Python](https://img.shields.io/badge/Python-blue?logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-black?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Flask-CORS](https://img.shields.io/badge/Flask--CORS-yellow?logo=python&logoColor=white)](https://flask-cors.readthedocs.io/)
[![Flask-Mail](https://img.shields.io/badge/Flask--Mail-green?logo=python&logoColor=white)](https://pythonhosted.org/Flask-Mail/)
[![pymongo](https://img.shields.io/badge/pymongo-brightgreen?logo=mongodb&logoColor=white)](https://pymongo.readthedocs.io/)
[![gunicorn](https://img.shields.io/badge/gunicorn-009688?logo=gunicorn&logoColor=white)](https://gunicorn.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ed?logo=docker&logoColor=white)](https://www.docker.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 📁 Estructura del proyecto

```
/back/reyesandfriends-back   # Backend
        ├── Dockerfile
        ├── docker-compose.yaml
        ├── requirements.txt
        └── ...
/front/reyesandfriends.cl    # Frontend
        ├── package.json
        ├── tailwind.config.js
        └── ...
```

---

## 🛠️ ¿Cómo levantar el proyecto?

### Requisitos previos

- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/).
- Tener configuradas las variables de entorno (`.env`) en ambos proyectos, puedes usar los archivos `.env.example` como referencia.

### Backend

```bash
cd back/reyesandfriends-back
cp .env.example .env
docker compose up --build
```

El backend estará disponible en [http://localhost:5006](http://localhost:5006).

### Frontend

```bash
cd front/reyesandfriends.cl
cp .env.example .env 
npm install
npm run dev
```

El frontend estará disponible en [http://localhost:5173](http://localhost:5173) (puerto por defecto de Vite).

---

## 📝 Notas

- El entorno back-end está preparado para ejecutarse en contenedores Docker, facilitando la integración y el despliegue continuo, especialmente en producción.

- Puedes personalizar las variables de entorno para conectar con tu propia base de datos o servidor de correo.

---

El código fuente de este proyecto puede ser utilizado para la creación de otros, pero está prohibido utilizar la marca, imagen o logo de Reyes&Friends, por favor revisar <a href="LICENSE">LICENSE</a>.
