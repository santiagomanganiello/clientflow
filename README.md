# ClientFlow

Mini CRM para freelancers y pequeños negocios. Permite registrar clientes, mantener notas y organizar seguimientos comerciales para reducir oportunidades olvidadas.

## Problema que resuelve

Un freelancer puede perder oportunidades por no recordar con quién habló, qué se acordó o cuándo debe volver a contactar a un potencial cliente.

## Usuario objetivo

Freelancers y pequeños prestadores de servicios que necesitan un CRM simple, sin la complejidad de plataformas empresariales.

## Alcance del MVP
 
Registro e inicio de sesión.
 
CRUD de clientes con nombre, email opcional, teléfono opcional, empresa opcional y estado comercial.
 
Estados iniciales sugeridos: potencial, contactado, negociación y cliente.
 
Notas asociadas a cada cliente.
 
Seguimientos con descripción, fecha límite y estado pendiente/completado.
 
Búsqueda y filtro por estado.
 
Dashboard con total de clientes, oportunidades abiertas y seguimientos pendientes/vencidos.
 
Interfaz responsive con estados de carga, error, vacío y confirmaciones.
 
Tests de flujos críticos, documentación y demo desplegada.
 
## Fuera del alcance inicial
 
Integraciones con IA, pagos, facturación o WhatsApp.
 
Organizaciones, equipos y roles complejos.
 
Microservicios, Kubernetes o Redis.
 
Notificaciones externas y automatizaciones complejas.
 
Regla de alcance: no añadir funcionalidades nuevas hasta completar el flujo principal y desplegar una versión funcional.
 
# 4. Stack tecnológico previsto
 
| **Área** | **Elección inicial** |
| --- | --- |
| **Frontend** | React + TypeScript + Vite + Tailwind CSS |
| **Backend** | Node.js + TypeScript + Express |
| **Base de datos** | PostgreSQL |
| **ORM/migraciones** | Prisma |
| **Validación** | Zod |
| **Tests** | Vitest + Supertest |
| **Entorno local** | Docker Compose |
| **CI** | GitHub Actions: instalación, lint y tests |

## Requisitos

- Node.js 20 o superior
- pnpm (se fija con Corepack, ver abajo)
- Docker Desktop (o Docker Engine + Compose v2)

## Puesta en marcha

```bash
git clone https://github.com/santiagomanganiello/clientflow.git
cd clientflow

# Versión de pnpm fijada en package.json
corepack enable
pnpm install --frozen-lockfile

# Variables de entorno
cp .env.example .env   # en Windows PowerShell: Copy-Item .env.example .env

# Base de datos
docker compose up -d
pnpm exec prisma migrate deploy
pnpm exec prisma generate
```

Verificación:

```bash
docker compose ps          # db debe aparecer como (healthy)
pnpm exec prisma migrate status   # debe responder "Database schema is up to date"
```

## Variables de entorno

| Variable | Uso |
|---|---|
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT` | Configuran el contenedor de PostgreSQL |
| `DATABASE_URL` | Conexión de Prisma y de la aplicación |

La URL repite usuario, contraseña, puerto y base. Si cambiás alguno de los `POSTGRES_*`, actualizá también `DATABASE_URL`.

## Comandos útiles

| Comando | Descripción |
|---|---|
| `docker compose down` | Detiene la base y conserva los datos |
| `docker compose down -v` | Detiene la base y borra los datos (entorno limpio) |
| `pnpm exec prisma migrate dev --name <nombre>` | Crea una migración desde cambios en el schema |
| `pnpm exec prisma migrate deploy` | Aplica migraciones pendientes (CI y producción) |
| `pnpm exec prisma studio` | Abre una interfaz para explorar los datos |