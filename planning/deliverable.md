# Web App - Servicios de IA/ML

## Descripcion
Plataforma web profesional para vender servicios de Inteligencia Artificial y Machine Learning.

**Servicios ofrecidos:**
- Desarrollo de chatbots y asistentes IA
- Modelos de Machine Learning personalizados
- Automatizacion de procesos con IA
- Consultoria y asesoria tecnica en IA

**Modelo de negocio:** 3 planes (Basico, Pro, Enterprise)

## Arquitectura

```
                            USUARIO
                               |
                               v
                    +------------------+
                    |   AWS Amplify    |
                    |   (Hosting)      |
                    +--------+---------+
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
    +---------+----+ +-------+------+ +-----+-------+
    |   NextJS     | |   API Routes | |   Stripe    |
    |   Frontend   | |   Backend    | |   (Pagos)   |
    |   Tailwind   | +-------+------+ +-------------+
    +--------------+         |
                             |
         +-------------------+-------------------+
         |           |           |               |
         v           v           v               v
    +--------+  +--------+  +--------+     +--------+
    |Cognito |  |DynamoDB|  |   S3   |     |  SES   |
    | (Auth) |  | (Data) |  |(Files) |     |(Email) |
    +--------+  +--------+  +--------+     +--------+
```

## Stack Tecnologico

| Componente | Tecnologia | Proposito |
|------------|------------|-----------|
| Framework | NextJS 14 + App Router | Frontend y API routes |
| Estilos | Tailwind CSS | UI responsive |
| Hosting | AWS Amplify | Deploy automatico |
| Auth | Amazon Cognito | Usuarios y sesiones |
| Database | Amazon DynamoDB | Datos de usuarios, proyectos |
| Storage | Amazon S3 | Archivos y entregables |
| Email | Amazon SES | Notificaciones |
| Pagos | Stripe | Checkout y suscripciones |

## Estado Actual
- Fase: Planificacion
- Progreso: 0/12 items (0%)

## Paginas de la Web

**Publicas:**
- `/` - Inicio (hero, servicios, testimonios)
- `/services` - Catalogo de 3 planes con precios
- `/portfolio` - Proyectos anteriores
- `/blog` - Articulos sobre IA
- `/contact` - Formulario de contacto

**Autenticadas (cliente):**
- `/login`, `/register` - Autenticacion
- `/dashboard` - Resumen del cliente
- `/dashboard/projects` - Lista de proyectos
- `/dashboard/projects/[id]` - Detalle y entregables

**Admin:**
- `/admin` - Metricas y resumen
- `/admin/projects` - Gestionar proyectos
- `/admin/clients` - Lista de clientes
- `/admin/sales` - Historial de ventas

## Decisiones Tecnicas

| Decision | Eleccion | Justificacion |
|----------|----------|---------------|
| Base de datos | DynamoDB | Serverless, escala automatica, bajo costo inicial |
| Auth | Cognito | Integrado con AWS, maneja verificacion email |
| Pagos | Stripe | Estandar industria, no hay equivalente bueno en AWS |
| IA en la web | No incluido | Se puede agregar Bedrock despues si se necesita |

## Proximos Pasos
1. Configurar infraestructura AWS (Cognito, DynamoDB, S3, SES)
2. Crear proyecto NextJS con Amplify
3. Implementar autenticacion
