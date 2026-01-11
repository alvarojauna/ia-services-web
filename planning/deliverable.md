# Web App - Servicios de IA/ML

## Descripcion
Plataforma web profesional para vender servicios de Inteligencia Artificial y Machine Learning.

**Servicios ofrecidos:**
- Desarrollo de chatbots y asistentes IA
- Modelos de Machine Learning personalizados
- Automatizacion de procesos con IA
- Consultoria y asesoria tecnica en IA

**Modelo de negocio:** 3 planes (Basico €499, Pro €999, Enterprise €2499)

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
| Pagos | Stripe | Checkout y webhooks |

## Estado Actual
- Fase: Desarrollo
- Progreso: 10/12 items (83%)

### Items Completados
1. Infraestructura AWS (Cognito, DynamoDB, S3, SES)
2. Proyecto NextJS + Amplify
3. Autenticacion con Cognito
4. Integracion DynamoDB
5. Almacenamiento S3
6. Emails con SES
7. Paginas publicas (inicio, servicios, portfolio, blog, contacto)
8. Dashboard de cliente
9. Panel administrativo
10. Pagos con Stripe

### Items Pendientes
11. Testing end-to-end
12. Deploy a produccion

## Paginas de la Web

**Publicas:**
- `/` - Inicio (hero, servicios, testimonios)
- `/services` - Catalogo de 3 planes con precios y boton de pago
- `/portfolio` - Proyectos anteriores
- `/blog` - Articulos sobre IA
- `/blog/[slug]` - Detalle de articulo
- `/contact` - Formulario de contacto

**Autenticacion:**
- `/login` - Inicio de sesion
- `/register` - Registro de usuario
- `/verify` - Verificacion de email
- `/forgot-password` - Recuperar contrasena

**Dashboard Cliente:**
- `/dashboard` - Resumen del cliente
- `/dashboard/projects` - Lista de proyectos
- `/dashboard/projects/[id]` - Detalle con progreso y entregables
- `/dashboard/profile` - Perfil del usuario

**Panel Admin:**
- `/admin` - Dashboard con metricas
- `/admin/projects` - Gestionar proyectos (CRUD)
- `/admin/projects/new` - Crear nuevo proyecto
- `/admin/projects/[id]` - Editar proyecto y subir entregables
- `/admin/clients` - Lista de clientes
- `/admin/sales` - Historial de ventas

**Checkout:**
- `/checkout/success` - Pago completado
- `/checkout/cancel` - Pago cancelado

## API Routes

| Endpoint | Metodo | Descripcion |
|----------|--------|-------------|
| `/api/users` | GET | Obtener usuario |
| `/api/projects` | GET/POST | Listar/crear proyectos |
| `/api/projects/[id]` | GET/PUT/DELETE | CRUD proyecto |
| `/api/projects/[id]/deliverables` | POST | Agregar entregable |
| `/api/projects/[id]/deliverables/[id]` | DELETE | Eliminar entregable |
| `/api/blog` | GET | Listar articulos |
| `/api/blog/[slug]` | GET | Detalle articulo |
| `/api/reviews` | GET/POST | Resenas |
| `/api/contact` | POST | Enviar formulario contacto |
| `/api/upload` | POST | Obtener URL de upload S3 |
| `/api/checkout` | POST | Crear sesion Stripe |
| `/api/checkout/session` | GET | Obtener detalles sesion |
| `/api/webhooks/stripe` | POST | Webhook de Stripe |

## Flujo de Pago con Stripe

```
Usuario -> /services -> Click "Contratar"
                            |
                            v
                    ¿Autenticado?
                    /           \
                  No            Si
                  |              |
                  v              v
              /login        /api/checkout
                  |              |
                  v              v
              Redirect      Stripe Checkout
                  |              |
                  +------+-------+
                         |
                         v
                  Pago exitoso?
                  /           \
                 No           Si
                 |             |
                 v             v
          /checkout/cancel   Webhook recibe evento
                              |
                              v
                        - Crear proyecto en DynamoDB
                        - Enviar email confirmacion
                              |
                              v
                        /checkout/success
```

## Decisiones Tecnicas

| Decision | Eleccion | Justificacion |
|----------|----------|---------------|
| Base de datos | DynamoDB | Serverless, escala automatica, bajo costo inicial |
| Auth | Cognito | Integrado con AWS, maneja verificacion email |
| Pagos | Stripe | Estandar industria, facil integracion, webhooks |
| Storage | S3 + Presigned URLs | Seguro, upload directo desde cliente |
| Email | SES | Bajo costo, alta entregabilidad |

## Proximos Pasos
1. Configurar webhook en Stripe Dashboard
2. Agregar variables de entorno Stripe en AWS Amplify
3. Testing end-to-end de todos los flujos
4. Configurar dominio personalizado
5. Deploy a produccion
