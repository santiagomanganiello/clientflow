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