<div align="center">
    
# Reyes&Friends-App

![Reyes&Friends Logo](https://github.com/user-attachments/assets/46a61f38-9e31-458d-aa43-3bfec13c7dc7)

Repositorio oficial de la web de Reyes&Friends, desarrollada con tecnologías modernas tanto en el frontend como en el backend, diseñada para ofrecer una experiencia robusta y escalable.

</div>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/-Ver%20licencia%20del%20proyecto-8b0000?style=for-the-badge" alt="Licencia del proyecto" />
  </a>
</p>


## Tech Stack

### Front-end:

<div align="center">

<img src="https://skillicons.dev/icons?i=react,typescript,tailwindcss" alt="Front-end Stack" width="300"/>

</div>

### Back-end:

<div align="center">

<img src="https://skillicons.dev/icons?i=python,flask,mysql,docker" alt="Back-end Stack" width="400"/>

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
