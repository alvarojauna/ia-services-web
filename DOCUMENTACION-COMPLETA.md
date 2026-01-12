# Documentacion Completa: IA Services Web App

## Indice

1. [Vision General](#1-vision-general)
2. [Stack Tecnologico](#2-stack-tecnologico)
3. [Estructura del Proyecto](#3-estructura-del-proyecto)
4. [Configuracion AWS](#4-configuracion-aws)
5. [Sistema de Autenticacion](#5-sistema-de-autenticacion)
6. [Base de Datos DynamoDB](#6-base-de-datos-dynamodb)
7. [Almacenamiento S3](#7-almacenamiento-s3)
8. [Sistema de Emails SES](#8-sistema-de-emails-ses)
9. [Integracion de Pagos Stripe](#9-integracion-de-pagos-stripe)
10. [Tipos TypeScript](#10-tipos-typescript)
11. [Servicios de Negocio](#11-servicios-de-negocio)
12. [Componentes React](#12-componentes-react)
13. [Paginas y Rutas](#13-paginas-y-rutas)
14. [API Endpoints](#14-api-endpoints)
15. [Flujos de Datos](#15-flujos-de-datos)
16. [Configuracion y Deploy](#16-configuracion-y-deploy)
17. [Variables de Entorno](#17-variables-de-entorno)
18. [Arquitectura General](#18-arquitectura-general)
19. [Estado del Proyecto](#19-estado-del-proyecto)

---

## 1. Vision General

### Proposito

**IA Services** es una plataforma web profesional tipo SaaS (Software as a Service) B2B para vender servicios de Inteligencia Artificial y Machine Learning. La aplicacion ofrece:

- **Landing page** atractiva con presentacion de servicios
- **Catalogo de servicios** con 3 planes de precios
- **Blog** con articulos sobre IA
- **Portfolio** de proyectos completados
- **Sistema de autenticacion** completo para clientes
- **Dashboard de cliente** para seguimiento de proyectos
- **Panel administrativo** para gestion de proyectos y clientes
- **Sistema de pagos** integrado con Stripe
- **Entrega de archivos** mediante S3

### Modelo de Negocio

```
Cliente visita web
       |
       v
Ve planes disponibles (Basico/Pro/Enterprise)
       |
       v
Se registra y paga via Stripe
       |
       v
Se crea proyecto automaticamente
       |
       v
Admin gestiona y entrega archivos
       |
       v
Cliente descarga entregables desde dashboard
```

---

## 2. Stack Tecnologico

### Frontend

| Tecnologia | Version | Proposito |
|-----------|---------|-----------|
| Next.js | 16.1.1 | Framework React con App Router |
| React | 19.2.3 | Biblioteca UI |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Estilos utilitarios |
| Framer Motion | 12.25.0 | Animaciones fluidas |

### Backend (Serverless)

| Tecnologia | Proposito |
|-----------|-----------|
| Next.js API Routes | Endpoints REST |
| AWS Cognito | Autenticacion de usuarios |
| AWS DynamoDB | Base de datos NoSQL |
| AWS S3 | Almacenamiento de archivos |
| AWS SES | Envio de emails |
| Stripe | Procesamiento de pagos |

### AWS SDK Dependencies

```json
{
  "@aws-sdk/client-cognito-identity-provider": "^3.966.0",
  "@aws-sdk/client-dynamodb": "^3.966.0",
  "@aws-sdk/client-s3": "^3.966.0",
  "@aws-sdk/client-ses": "^3.966.0",
  "@aws-sdk/lib-dynamodb": "^3.966.0",
  "@aws-sdk/s3-request-presigner": "^3.966.0",
  "aws-amplify": "^6.15.9"
}
```

### Otras Dependencias

```json
{
  "stripe": "^20.1.2",
  "framer-motion": "^12.25.0",
  "react-intersection-observer": "^10.0.0",
  "uuid": "^13.0.0"
}
```

---

## 3. Estructura del Proyecto

```
web-app/
|-- public/                          # Archivos estaticos
|   |-- favicon.ico
|
|-- src/
|   |-- app/                         # Next.js App Router
|   |   |-- (auth)/                  # Grupo de rutas de autenticacion
|   |   |   |-- login/page.tsx
|   |   |   |-- register/page.tsx
|   |   |   |-- verify/page.tsx
|   |   |   |-- forgot-password/page.tsx
|   |   |   |-- layout.tsx
|   |   |
|   |   |-- (protected)/             # Rutas protegidas (requieren auth)
|   |   |   |-- dashboard/
|   |   |   |   |-- page.tsx         # Dashboard principal
|   |   |   |   |-- layout.tsx
|   |   |   |   |-- profile/page.tsx
|   |   |   |   |-- projects/
|   |   |   |       |-- page.tsx     # Lista de proyectos
|   |   |   |       |-- [projectId]/page.tsx
|   |   |   |-- layout.tsx
|   |   |
|   |   |-- admin/                   # Panel administrativo
|   |   |   |-- page.tsx             # Dashboard admin
|   |   |   |-- layout.tsx
|   |   |   |-- clients/page.tsx
|   |   |   |-- projects/
|   |   |   |   |-- page.tsx
|   |   |   |   |-- new/page.tsx
|   |   |   |   |-- [projectId]/page.tsx
|   |   |   |-- sales/page.tsx
|   |   |
|   |   |-- api/                     # API Routes (Backend)
|   |   |   |-- blog/route.ts
|   |   |   |-- checkout/route.ts
|   |   |   |-- checkout/session/route.ts
|   |   |   |-- contact/route.ts
|   |   |   |-- email/route.ts
|   |   |   |-- projects/route.ts
|   |   |   |-- projects/[projectId]/route.ts
|   |   |   |-- projects/[projectId]/deliverables/route.ts
|   |   |   |-- projects/[projectId]/deliverables/[deliverableId]/route.ts
|   |   |   |-- reviews/route.ts
|   |   |   |-- upload/route.ts
|   |   |   |-- users/route.ts
|   |   |   |-- webhooks/stripe/route.ts
|   |   |
|   |   |-- blog/                    # Paginas publicas de blog
|   |   |   |-- page.tsx
|   |   |   |-- [slug]/page.tsx
|   |   |
|   |   |-- checkout/
|   |   |   |-- success/page.tsx
|   |   |   |-- cancel/page.tsx
|   |   |
|   |   |-- contact/page.tsx
|   |   |-- portfolio/page.tsx
|   |   |-- services/page.tsx
|   |   |-- page.tsx                 # Home/Landing
|   |   |-- layout.tsx               # Root layout
|   |   |-- globals.css
|   |
|   |-- components/                  # Componentes React
|   |   |-- animations/
|   |   |   |-- AnimatedCounter.tsx
|   |   |   |-- FadeInOnScroll.tsx
|   |   |   |-- SkeletonLoader.tsx
|   |   |   |-- StaggerContainer.tsx
|   |   |   |-- index.ts
|   |   |-- ui/
|   |   |   |-- FileUpload.tsx
|   |   |-- AdminGuard.tsx
|   |   |-- CheckoutButton.tsx
|   |   |-- Footer.tsx
|   |   |-- Header.tsx
|   |   |-- ProtectedRoute.tsx
|   |
|   |-- contexts/                    # React Contexts
|   |   |-- AuthContext.tsx
|   |
|   |-- lib/                         # Logica auxiliar
|   |   |-- animations.ts
|   |   |-- auth.ts                  # Funciones Cognito
|   |   |-- aws-config.ts            # Configuracion AWS
|   |   |-- dynamodb.ts              # Cliente DynamoDB
|   |   |-- s3.ts                    # Cliente S3
|   |   |-- ses.ts                   # Cliente SES
|   |   |-- stripe.ts                # Configuracion Stripe
|   |   |-- services/
|   |       |-- blog.ts
|   |       |-- projects.ts
|   |       |-- reviews.ts
|   |       |-- users.ts
|   |       |-- index.ts
|   |
|   |-- types/
|       |-- index.ts                 # Definiciones TypeScript
|
|-- planning/                        # Documentacion del proyecto
|   |-- prd.json                     # Product Requirements
|   |-- deliverable.md
|   |-- lessons-learned.md
|
|-- .claude/                         # Configuracion Claude Code
|-- package.json
|-- tsconfig.json
|-- next.config.ts
|-- eslint.config.mjs
|-- postcss.config.mjs
|-- amplify.yml                      # Deploy en AWS Amplify
|-- README.md
|-- CLAUDE.md
```

---

## 4. Configuracion AWS

### Archivo: `src/lib/aws-config.ts`

```typescript
export const awsConfig = {
  region: process.env.AWS_REGION || 'eu-north-1',

  cognito: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  },

  dynamodb: {
    tables: {
      users: 'ia-services-users',
      projects: 'ia-services-projects',
      blog: 'ia-services-blog',
      reviews: 'ia-services-reviews',
    },
  },

  s3: {
    bucket: 'ia-services-files-916707935254',
  },

  ses: {
    fromEmail: 'alvarojauna100@gmail.com',
    region: 'eu-north-1',
  },
};
```

### Region Principal

- **eu-north-1** (Estocolmo) para todos los servicios AWS

---

## 5. Sistema de Autenticacion

### 5.1 Cognito Integration

**Archivo:** `src/lib/auth.ts`

#### Funciones Principales

```typescript
// Registro de usuario
registerUser(email: string, password: string, name: string): Promise<SignUpResult>

// Confirmacion de email (codigo de verificacion)
confirmRegistration(email: string, code: string): Promise<void>

// Login
loginUser(email: string, password: string): Promise<AuthUser>

// Logout
logoutUser(): Promise<void>

// Obtener usuario actual
getCurrentAuthUser(): Promise<AuthUser | null>

// Verificar si esta autenticado
isAuthenticated(): Promise<boolean>

// Solicitar reset de password
requestPasswordReset(email: string): Promise<void>

// Confirmar reset de password
confirmPasswordReset(email: string, code: string, newPassword: string): Promise<void>

// Obtener token JWT para API calls
getAuthToken(): Promise<string | null>

// Reenviar codigo de verificacion
resendVerificationCode(email: string): Promise<void>
```

### 5.2 AuthContext

**Archivo:** `src/contexts/AuthContext.tsx`

```typescript
interface AuthContextType {
  // Estado
  user: AuthUser | null;
  loading: boolean;
  error: string | null;

  // Metodos
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<{needsConfirmation: boolean}>;
  confirmEmail: (email: string, code: string) => Promise<boolean>;
  resendCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<boolean>;
  clearError: () => void;
}
```

#### Uso en Componentes

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <LoginPrompt />;

  return <Dashboard user={user} />;
}
```

### 5.3 Flujo de Registro

```
1. Usuario llena formulario en /register
   |-- email, password, name

2. registerUser() -> Cognito crea cuenta
   |-- Estado: UNCONFIRMED

3. Cognito envia email con codigo (6 digitos)

4. Usuario redirigido a /verify?email=xxx

5. confirmRegistration(email, code)
   |-- Estado: CONFIRMED

6. Redirige a /dashboard
```

### 5.4 Flujo de Login

```
1. Usuario en /login
   |-- email, password

2. loginUser(email, password)
   |-- Cognito valida credenciales
   |-- Retorna tokens (access, id, refresh)

3. AuthContext actualiza user state

4. Redirige a /dashboard
```

### 5.5 Flujo de Recuperacion de Password

```
1. Usuario en /forgot-password
   |-- Ingresa email

2. requestPasswordReset(email)
   |-- Cognito envia codigo

3. Usuario recibe codigo por email

4. confirmPasswordReset(email, code, newPassword)
   |-- Password actualizado

5. Redirige a /login
```

---

## 6. Base de Datos DynamoDB

### 6.1 Cliente DynamoDB

**Archivo:** `src/lib/dynamodb.ts`

```typescript
// Operaciones CRUD genericas

// Obtener un item por key
getItem<T>(tableName: string, key: Record<string, string>): Promise<T | null>

// Crear o actualizar item completo
putItem<T>(tableName: string, item: T): Promise<void>

// Actualizar propiedades especificas
updateItem(
  tableName: string,
  key: Record<string, string>,
  updates: Record<string, unknown>
): Promise<void>

// Eliminar item
deleteItem(tableName: string, key: Record<string, string>): Promise<void>

// Query por indice secundario
queryByIndex<T>(
  tableName: string,
  indexName: string,
  keyName: string,
  keyValue: string
): Promise<T[]>

// Scan completo de tabla
scanTable<T>(tableName: string): Promise<T[]>
```

### 6.2 Tablas

| Tabla | Partition Key | Sort Key | Proposito |
|-------|---------------|----------|-----------|
| ia-services-users | userId | - | Perfiles de usuario |
| ia-services-projects | projectId | - | Proyectos contratados |
| ia-services-blog | postId | - | Articulos del blog |
| ia-services-reviews | reviewId | - | Resenas de clientes |

### 6.3 Indices Secundarios

```
ia-services-projects:
  - clientId-index: Para buscar proyectos por cliente

ia-services-blog:
  - slug-index: Para buscar posts por slug URL

ia-services-users:
  - email-index: Para buscar usuarios por email
```

---

## 7. Almacenamiento S3

### 7.1 Cliente S3

**Archivo:** `src/lib/s3.ts`

```typescript
// Obtener URL firmada para subir archivo
getUploadUrl(
  key: string,           // Ruta en S3
  contentType: string,   // MIME type
  expiresIn: number = 3600  // Segundos de validez
): Promise<string>

// Obtener URL firmada para descargar
getDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string>

// Eliminar archivo
deleteFile(key: string): Promise<void>

// Generar ruta de archivo
getFileKey(
  userId: string,
  folder: string,
  fileName: string
): string
// Retorna: "{userId}/{folder}/{timestamp}-{fileName}"
```

### 7.2 Estructura de Carpetas en S3

```
Bucket: ia-services-files-916707935254
|
|-- {userId}/
    |-- projects/
    |   |-- 1736599200000-app-code.zip
    |   |-- 1736599300000-documentation.pdf
    |
    |-- uploads/
    |   |-- 1736599400000-logo.png
    |
    |-- blog/
        |-- 1736599500000-cover-image.jpg
```

### 7.3 Flujo de Upload

```
1. Cliente solicita URL de upload
   POST /api/upload
   { userId, folder, fileName, contentType }

2. Server genera pre-signed URL
   getUploadUrl(key, contentType)

3. Server retorna { uploadUrl, fileKey }

4. Cliente hace PUT directo a S3
   PUT uploadUrl
   Body: archivo binario
   Headers: Content-Type

5. Archivo queda en S3

6. Cliente guarda fileKey en base de datos
   (Para referenciar el archivo)
```

### 7.4 Flujo de Download

```
1. Cliente solicita URL de download
   GET /api/upload?fileKey=xxx

2. Server genera pre-signed URL
   getDownloadUrl(fileKey)

3. Cliente descarga desde URL
   (URL valida por 1 hora)
```

---

## 8. Sistema de Emails SES

### 8.1 Cliente SES

**Archivo:** `src/lib/ses.ts`

```typescript
interface EmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

sendEmail(params: EmailParams): Promise<void>
```

### 8.2 Configuracion

```
From Email: alvarojauna100@gmail.com
Region: eu-north-1
```

### 8.3 Casos de Uso

| Evento | Email Enviado |
|--------|--------------|
| Registro completado | Bienvenida al usuario |
| Pago exitoso | Confirmacion de compra |
| Proyecto actualizado | Notificacion de progreso |
| Proyecto completado | Aviso de entregables listos |
| Formulario de contacto | Notificacion al admin |

### 8.4 Ejemplo de Email HTML

```typescript
const html = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #2563eb;">Confirmacion de Compra</h1>
    <p>Hola ${name},</p>
    <p>Tu compra del plan <strong>${planName}</strong> ha sido procesada.</p>
    <p>Monto: <strong>EUR ${amount}</strong></p>
    <p>Puedes ver el estado de tu proyecto en tu dashboard.</p>
    <a href="https://tu-dominio.com/dashboard"
       style="background: #2563eb; color: white; padding: 12px 24px;
              text-decoration: none; border-radius: 6px;">
      Ir al Dashboard
    </a>
  </div>
`;
```

---

## 9. Integracion de Pagos Stripe

### 9.1 Configuracion

**Archivo:** `src/lib/stripe.ts`

```typescript
import Stripe from 'stripe';

// Singleton pattern
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-12-18.acacia',
    });
  }
  return stripeInstance;
}
```

### 9.2 Planes Disponibles

```typescript
export const PLANS = {
  basic: {
    id: 'basic',
    name: 'Basico',
    price: 499,      // EUR 4.99 (en centavos)
    description: 'Ideal para empezar',
    features: [
      'Chatbot simple',
      '1 revision',
      'Documentacion basica',
      'Soporte por email',
      'Entrega en 2 semanas'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 999,      // EUR 9.99
    description: 'Para negocios en crecimiento',
    features: [
      'Todo lo del plan Basico',
      'Integracion con APIs',
      '3 revisiones',
      'Documentacion completa',
      'Soporte prioritario',
      'Entrega en 1 semana'
    ]
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2499,     // EUR 24.99
    description: 'Soluciones a medida',
    features: [
      'Todo lo del plan Pro',
      'Consultoria dedicada',
      'Revisiones ilimitadas',
      'Soporte 24/7',
      'SLA garantizado',
      'Entrega express'
    ]
  }
};
```

### 9.3 Flujo de Checkout

```
1. Usuario click "Contratar" en /services
   |
   v
2. CheckoutButton envia POST /api/checkout
   { plan: 'pro', userId, userEmail }
   |
   v
3. API crea sesion de Stripe Checkout
   stripe.checkout.sessions.create({
     mode: 'payment',
     line_items: [...],
     success_url: '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
     cancel_url: '/checkout/cancel',
     metadata: { userId, plan, planName, amount }
   })
   |
   v
4. Usuario redirigido a Stripe (hosted checkout)
   |
   v
5. Usuario completa pago con tarjeta
   |
   v
6. Stripe envia webhook a /api/webhooks/stripe
   Evento: checkout.session.completed
   |
   v
7. Webhook procesa el evento:
   - Extrae metadata
   - Crea proyecto en DynamoDB
   - Envia email de confirmacion
   |
   v
8. Usuario redirigido a /checkout/success
   Muestra confirmacion de compra
```

### 9.4 Webhook Handler

```typescript
// POST /api/webhooks/stripe

// Eventos manejados:
// - checkout.session.completed -> Crear proyecto
// - payment_intent.payment_failed -> Log error

if (event.type === 'checkout.session.completed') {
  const session = event.data.object;
  const { userId, plan, planName, amount } = session.metadata;

  // Crear proyecto
  await createProject({
    projectId: uuidv4(),
    clientId: userId,
    name: `Proyecto ${planName}`,
    description: `Servicio contratado: Plan ${planName}`,
    plan: plan as 'basic' | 'pro' | 'enterprise',
    status: 'pending',
    progress: 0,
    amount: parseInt(amount),
    stripePaymentId: session.payment_intent,
    deliverables: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Enviar email
  await sendEmail({
    to: session.customer_email,
    subject: `Confirmacion de compra - Plan ${planName}`,
    html: `...`
  });
}
```

---

## 10. Tipos TypeScript

### Archivo: `src/types/index.ts`

### 10.1 User

```typescript
export interface User {
  userId: string;
  email: string;
  name: string;
  company?: string;
  role: 'client' | 'admin';
  createdAt: string;      // ISO timestamp
  updatedAt: string;
}
```

### 10.2 Project

```typescript
export type ProjectStatus =
  | 'pending'       // Esperando inicio
  | 'in_progress'   // En desarrollo
  | 'review'        // En revision del cliente
  | 'completed'     // Finalizado
  | 'cancelled';    // Cancelado

export interface Project {
  projectId: string;
  clientId: string;         // FK -> User
  name: string;
  description: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: ProjectStatus;
  progress: number;         // 0-100
  amount: number;           // EUR
  stripePaymentId?: string;
  deliverables: Deliverable[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

### 10.3 Deliverable

```typescript
export interface Deliverable {
  id: string;
  name: string;
  description?: string;
  fileKey: string;          // Referencia en S3
  fileType: string;         // MIME type
  fileSize: number;         // Bytes
  uploadedAt: string;
}
```

### 10.4 BlogPost

```typescript
export interface BlogPost {
  postId: string;
  slug: string;             // URL-friendly
  title: string;
  excerpt: string;          // Resumen corto
  content: string;          // Contenido completo (markdown)
  coverImage?: string;      // URL de imagen
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 10.5 Review

```typescript
export interface Review {
  reviewId: string;
  projectId: string;        // FK -> Project
  clientId: string;         // FK -> User
  clientName: string;
  rating: number;           // 1-5
  comment: string;
  approved: boolean;        // Solo se muestran aprobadas
  createdAt: string;
}
```

### 10.6 Plan

```typescript
export interface Plan {
  id: 'basic' | 'pro' | 'enterprise';
  name: string;
  price: number;            // EUR centavos
  description: string;
  features: string[];
  stripePriceId?: string;
}
```

### 10.7 ContactForm

```typescript
export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  plan?: string;
  message: string;
}
```

---

## 11. Servicios de Negocio

### 11.1 User Service

**Archivo:** `src/lib/services/users.ts`

```typescript
// CRUD basico
createUser(data: Omit<User, 'userId' | 'createdAt' | 'updatedAt'>): Promise<User>
getUserById(userId: string): Promise<User | null>
getUserByEmail(email: string): Promise<User | null>
updateUser(userId: string, updates: Partial<User>): Promise<void>
deleteUser(userId: string): Promise<void>
getAllUsers(): Promise<User[]>

// Sincronizacion con Cognito
getOrCreateUser(cognitoId: string, email: string, name: string): Promise<User>
```

### 11.2 Project Service

**Archivo:** `src/lib/services/projects.ts`

```typescript
// CRUD basico
createProject(data: Omit<Project, 'projectId' | 'createdAt' | 'updatedAt'>): Promise<Project>
getProjectById(projectId: string): Promise<Project | null>
getProjectsByClientId(clientId: string): Promise<Project[]>
updateProject(projectId: string, updates: Partial<Project>): Promise<void>
deleteProject(projectId: string): Promise<void>
getAllProjects(): Promise<Project[]>

// Gestion de entregas
addDeliverable(projectId: string, deliverable: Omit<Deliverable, 'id' | 'uploadedAt'>): Promise<Deliverable>
removeDeliverable(projectId: string, deliverableId: string): Promise<void>

// Transiciones de estado
updateProjectStatus(projectId: string, status: ProjectStatus, progress?: number): Promise<void>
```

#### Maquina de Estados del Proyecto

```
                    +------------+
                    |  pending   |
                    +-----+------+
                          |
                          v
                   +------+-------+
                   | in_progress  |
                   +------+-------+
                          |
              +-----------+-----------+
              |                       |
              v                       v
        +-----+------+         +------+-----+
        |   review   |         | cancelled  |
        +-----+------+         +------------+
              |
              v
        +-----+------+
        | completed  |
        +------------+
```

### 11.3 Blog Service

**Archivo:** `src/lib/services/blog.ts`

```typescript
// CRUD
createBlogPost(data: Omit<BlogPost, 'postId' | 'createdAt' | 'updatedAt'>): Promise<BlogPost>
getBlogPostById(postId: string): Promise<BlogPost | null>
getBlogPostBySlug(slug: string): Promise<BlogPost | null>
updateBlogPost(postId: string, updates: Partial<BlogPost>): Promise<void>
deleteBlogPost(postId: string): Promise<void>
getAllBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>
getBlogPostsByTag(tag: string): Promise<BlogPost[]>

// Utilidades
generateSlug(title: string): string
// "Mi Primer Articulo" -> "mi-primer-articulo"
```

### 11.4 Reviews Service

**Archivo:** `src/lib/services/reviews.ts`

```typescript
// CRUD
createReview(data: Omit<Review, 'reviewId' | 'createdAt'>): Promise<Review>
getReviewById(reviewId: string): Promise<Review | null>
getReviewsByProjectId(projectId: string): Promise<Review[]>
updateReview(reviewId: string, updates: Partial<Review>): Promise<void>
deleteReview(reviewId: string): Promise<void>
getAllReviews(approvedOnly?: boolean): Promise<Review[]>

// Moderacion
approveReview(reviewId: string): Promise<void>

// Display
getApprovedReviewsForDisplay(): Promise<Review[]>  // Top 10
```

---

## 12. Componentes React

### 12.1 Header

**Archivo:** `src/components/Header.tsx`

```typescript
// Navegacion principal sticky
// - Logo "IA Services"
// - Links: Servicios, Portfolio, Blog, Contacto
// - Condicional:
//   - Si autenticado: "Mi Dashboard", "Cerrar sesion"
//   - Si no: "Iniciar sesion", "Registrarse"

function Header() {
  const { user, logout } = useAuth();
  // ...
}
```

### 12.2 Footer

**Archivo:** `src/components/Footer.tsx`

```typescript
// Pie de pagina con:
// - Descripcion de la empresa
// - Links organizados por seccion
// - Informacion de contacto
// - Copyright
```

### 12.3 ProtectedRoute

**Archivo:** `src/components/ProtectedRoute.tsx`

```typescript
// Wrapper para rutas que requieren autenticacion

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;

  return <>{children}</>;
}
```

### 12.4 AdminGuard

**Archivo:** `src/components/AdminGuard.tsx`

```typescript
// Proteccion adicional para rutas de admin
// Solo permite acceso a emails especificos

const ADMIN_EMAILS = ['alvarojauna100@gmail.com'];

function AdminGuard({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
```

### 12.5 CheckoutButton

**Archivo:** `src/components/CheckoutButton.tsx`

```typescript
interface Props {
  plan: 'basic' | 'pro' | 'enterprise';
  highlighted?: boolean;  // Estilo destacado para plan recomendado
}

function CheckoutButton({ plan, highlighted }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        plan,
        userId: user.userId,
        userEmail: user.email
      })
    });

    const { url } = await response.json();
    window.location.href = url;  // Redirige a Stripe
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Procesando...' : 'Contratar'}
    </button>
  );
}
```

### 12.6 FileUpload

**Archivo:** `src/components/ui/FileUpload.tsx`

```typescript
interface Props {
  onUpload: (file: File, fileKey: string) => void;
  userId: string;
  folder: 'projects' | 'uploads' | 'blog';
  accept?: string;  // MIME types
  maxSize?: number; // Bytes
}

function FileUpload({ onUpload, userId, folder, accept, maxSize }: Props) {
  // Drag & drop zone
  // Preview de archivo
  // Progress bar durante upload
  // Validacion de tipo y tamano
}
```

### 12.7 Componentes de Animacion

**Carpeta:** `src/components/animations/`

#### FadeInOnScroll

```typescript
interface Props {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;      // Animar solo una vez
  threshold?: number;  // % visible para activar
}

// Anima elementos cuando entran en viewport
```

#### AnimatedCounter

```typescript
interface Props {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;    // Ej: "EUR "
  suffix?: string;    // Ej: "%"
  decimals?: number;
}

// Contador numerico animado con spring
```

#### SkeletonLoader

```typescript
interface Props {
  width?: string;
  height?: string;
  rounded?: boolean;
}

// Placeholder animado durante carga
```

#### StaggerContainer

```typescript
interface Props {
  children: React.ReactNode;
  staggerDelay?: number;
}

// Anima hijos secuencialmente
```

---

## 13. Paginas y Rutas

### 13.1 Paginas Publicas

| Ruta | Archivo | Descripcion |
|------|---------|-------------|
| `/` | `app/page.tsx` | Landing page con hero, servicios, testimonios |
| `/services` | `app/services/page.tsx` | Catalogo de planes con precios |
| `/portfolio` | `app/portfolio/page.tsx` | Galeria de proyectos completados |
| `/blog` | `app/blog/page.tsx` | Lista de articulos |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Articulo individual |
| `/contact` | `app/contact/page.tsx` | Formulario de contacto |

### 13.2 Paginas de Autenticacion

| Ruta | Archivo | Descripcion |
|------|---------|-------------|
| `/login` | `app/(auth)/login/page.tsx` | Formulario de login |
| `/register` | `app/(auth)/register/page.tsx` | Formulario de registro |
| `/verify` | `app/(auth)/verify/page.tsx` | Verificacion de email |
| `/forgot-password` | `app/(auth)/forgot-password/page.tsx` | Recuperar password |

### 13.3 Dashboard de Cliente (Protegido)

| Ruta | Archivo | Descripcion |
|------|---------|-------------|
| `/dashboard` | `app/(protected)/dashboard/page.tsx` | Resumen con stats |
| `/dashboard/projects` | `app/(protected)/dashboard/projects/page.tsx` | Lista de proyectos |
| `/dashboard/projects/[id]` | `app/(protected)/dashboard/projects/[projectId]/page.tsx` | Detalle de proyecto |
| `/dashboard/profile` | `app/(protected)/dashboard/profile/page.tsx` | Perfil y settings |

### 13.4 Panel Admin

| Ruta | Archivo | Descripcion |
|------|---------|-------------|
| `/admin` | `app/admin/page.tsx` | Dashboard con metricas |
| `/admin/projects` | `app/admin/projects/page.tsx` | Gestion de proyectos |
| `/admin/projects/new` | `app/admin/projects/new/page.tsx` | Crear proyecto |
| `/admin/projects/[id]` | `app/admin/projects/[projectId]/page.tsx` | Editar proyecto |
| `/admin/clients` | `app/admin/clients/page.tsx` | Lista de clientes |
| `/admin/sales` | `app/admin/sales/page.tsx` | Historial de ventas |

### 13.5 Checkout

| Ruta | Archivo | Descripcion |
|------|---------|-------------|
| `/checkout/success` | `app/checkout/success/page.tsx` | Pago exitoso |
| `/checkout/cancel` | `app/checkout/cancel/page.tsx` | Pago cancelado |

---

## 14. API Endpoints

### 14.1 Autenticacion y Usuarios

#### GET /api/users
```
Response: {
  success: boolean,
  data: User[]
}
```

#### POST /api/users
```
Body: {
  email: string,
  name: string,
  role?: 'client' | 'admin'
}

Response: {
  success: boolean,
  data: User
}
```

### 14.2 Proyectos

#### GET /api/projects
```
Query: ?clientId=xxx o ?userId=xxx

Response: {
  success: boolean,
  projects: Project[]
}
```

#### POST /api/projects
```
Body: {
  clientId: string,
  name: string,
  description?: string,
  plan: 'basic' | 'pro' | 'enterprise',
  amount?: number
}

Response: {
  success: boolean,
  data: Project
}
```

#### GET /api/projects/[projectId]
```
Response: {
  success: boolean,
  project: Project
}
```

#### PUT /api/projects/[projectId]
```
Body: Partial<Project>

Response: {
  success: boolean
}
```

#### DELETE /api/projects/[projectId]
```
Response: {
  success: boolean
}
```

### 14.3 Deliverables

#### POST /api/projects/[projectId]/deliverables
```
Body: {
  name: string,
  fileKey: string,
  fileSize: number,
  fileType: string,
  description?: string
}

Response: {
  success: boolean,
  deliverable: Deliverable
}
```

#### DELETE /api/projects/[projectId]/deliverables/[deliverableId]
```
Response: {
  success: boolean
}
```

### 14.4 File Upload

#### POST /api/upload
```
Body: {
  userId: string,
  folder: 'projects' | 'uploads' | 'blog',
  fileName: string,
  contentType: string
}

Response: {
  success: boolean,
  data: {
    uploadUrl: string,   // Pre-signed S3 URL
    fileKey: string      // Para guardar en BD
  }
}
```

#### GET /api/upload?fileKey=xxx
```
Response: {
  success: boolean,
  data: {
    downloadUrl: string
  }
}
```

### 14.5 Checkout

#### POST /api/checkout
```
Body: {
  plan: 'basic' | 'pro' | 'enterprise',
  userId: string,
  userEmail: string
}

Response: {
  success: boolean,
  sessionId: string,
  url: string          // Redirect URL
}
```

#### GET /api/checkout/session?session_id=xxx
```
Response: {
  success: boolean,
  session: {
    customerEmail: string,
    planName: string,
    amount: number,
    status: 'paid' | 'unpaid'
  }
}
```

### 14.6 Webhook

#### POST /api/webhooks/stripe
```
Headers: {
  stripe-signature: string
}

Body: Stripe Event

Eventos manejados:
- checkout.session.completed
- payment_intent.payment_failed
```

### 14.7 Blog

#### GET /api/blog
```
Query: ?published=true

Response: {
  success: boolean,
  posts: BlogPost[]
}
```

### 14.8 Reviews

#### GET /api/reviews
```
Query: ?approved=true

Response: {
  success: boolean,
  reviews: Review[]
}
```

#### POST /api/reviews
```
Body: {
  projectId: string,
  clientId: string,
  clientName: string,
  rating: number,
  comment: string
}

Response: {
  success: boolean,
  review: Review
}
```

### 14.9 Contact

#### POST /api/contact
```
Body: {
  name: string,
  email: string,
  company?: string,
  plan?: string,
  message: string
}

Response: {
  success: boolean,
  message: string
}
```

### 14.10 Email

#### POST /api/email
```
Body: {
  to: string | string[],
  subject: string,
  html: string,
  text?: string
}

Response: {
  success: boolean
}
```

---

## 15. Flujos de Datos

### 15.1 Flujo Completo de Compra

```
+----------------+     +----------------+     +----------------+
|    CLIENTE     |     |    SERVIDOR    |     |   SERVICIOS    |
+----------------+     +----------------+     +----------------+
        |                      |                      |
        | 1. Click "Contratar" |                      |
        |--------------------->|                      |
        |                      |                      |
        |                      | 2. POST /api/checkout|
        |                      |--------------------->|
        |                      |                      |
        |                      |    3. Crear sesion   |
        |                      |<- - - - - - - - - - -| Stripe
        |                      |                      |
        | 4. Redirect URL      |                      |
        |<---------------------|                      |
        |                      |                      |
        | 5. Usuario en Stripe |                      |
        |--------------------------------------------->|
        |                      |                      |
        |    6. Pago completado|                      |
        |<---------------------------------------------|
        |                      |                      |
        |                      | 7. Webhook           |
        |                      |<---------------------| Stripe
        |                      |                      |
        |                      | 8. Crear proyecto    |
        |                      |--------------------->| DynamoDB
        |                      |                      |
        |                      | 9. Enviar email      |
        |                      |--------------------->| SES
        |                      |                      |
        | 10. /checkout/success|                      |
        |--------------------->|                      |
        |                      |                      |
        | 11. Confirmacion     |                      |
        |<---------------------|                      |
```

### 15.2 Flujo de Entrega de Archivos

```
+----------------+     +----------------+     +----------------+
|     ADMIN      |     |    SERVIDOR    |     |   SERVICIOS    |
+----------------+     +----------------+     +----------------+
        |                      |                      |
        | 1. Selecciona archivo|                      |
        |--------------------->|                      |
        |                      |                      |
        |                      | 2. POST /api/upload  |
        |                      |--------------------->|
        |                      |                      |
        |                      | 3. Pre-signed URL    |
        |                      |<- - - - - - - - - - -| S3
        |                      |                      |
        | 4. uploadUrl + fileKey                      |
        |<---------------------|                      |
        |                      |                      |
        | 5. PUT directo a S3  |                      |
        |--------------------------------------------->| S3
        |                      |                      |
        | 6. Upload completado |                      |
        |<---------------------------------------------|
        |                      |                      |
        | 7. POST deliverable  |                      |
        |--------------------->|                      |
        |                      | 8. Actualizar proyecto|
        |                      |--------------------->| DynamoDB
        |                      |                      |
        | 9. Confirmacion      |                      |
        |<---------------------|                      |


+----------------+     +----------------+     +----------------+
|    CLIENTE     |     |    SERVIDOR    |     |   SERVICIOS    |
+----------------+     +----------------+     +----------------+
        |                      |                      |
        | 1. Ve deliverable    |                      |
        |--------------------->|                      |
        |                      |                      |
        | 2. Click "Descargar" |                      |
        |--------------------->|                      |
        |                      |                      |
        |                      | 3. GET /api/upload?fileKey=xxx
        |                      |--------------------->|
        |                      |                      |
        |                      | 4. Pre-signed URL    |
        |                      |<- - - - - - - - - - -| S3
        |                      |                      |
        | 5. downloadUrl       |                      |
        |<---------------------|                      |
        |                      |                      |
        | 6. Descarga directa  |                      |
        |--------------------------------------------->| S3
```

### 15.3 Flujo de Autenticacion

```
REGISTRO:
  /register -> Cognito SignUp -> Email verification -> /verify -> /dashboard

LOGIN:
  /login -> Cognito SignIn -> JWT tokens -> AuthContext -> /dashboard

PASSWORD RESET:
  /forgot-password -> Request code -> Email -> Confirm reset -> /login
```

---

## 16. Configuracion y Deploy

### 16.1 Next.js Config

**Archivo:** `next.config.ts`

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configuracion base
};

export default nextConfig;
```

### 16.2 TypeScript Config

**Archivo:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 16.3 ESLint Config

**Archivo:** `eslint.config.mjs`

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/", "out/", "build/"]
  }
];

export default eslintConfig;
```

### 16.4 Amplify Deploy

**Archivo:** `amplify.yml`

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        # Inyectar variables de entorno en build
        - echo "NEXT_PUBLIC_COGNITO_USER_POOL_ID=$NEXT_PUBLIC_COGNITO_USER_POOL_ID" >> .env.production
        - echo "NEXT_PUBLIC_COGNITO_CLIENT_ID=$NEXT_PUBLIC_COGNITO_CLIENT_ID" >> .env.production
        - echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" >> .env.production
        - echo "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" >> .env.production
        - echo "APP_AWS_ACCESS_KEY_ID=$APP_AWS_ACCESS_KEY_ID" >> .env.production
        - echo "APP_AWS_SECRET_ACCESS_KEY=$APP_AWS_SECRET_ACCESS_KEY" >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 16.5 Scripts NPM

**Archivo:** `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

---

## 17. Variables de Entorno

### Variables Requeridas

```env
# AWS General
AWS_REGION=eu-north-1
APP_AWS_ACCESS_KEY_ID=AKIA...
APP_AWS_SECRET_ACCESS_KEY=...

# Cognito (publicas - expuestas al cliente)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=eu-north-1_XXXXXXXX
NEXT_PUBLIC_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX

# DynamoDB
DYNAMODB_TABLE_USERS=ia-services-users
DYNAMODB_TABLE_PROJECTS=ia-services-projects
DYNAMODB_TABLE_BLOG=ia-services-blog
DYNAMODB_TABLE_REVIEWS=ia-services-reviews

# S3
S3_BUCKET_NAME=ia-services-files-916707935254

# SES
SES_FROM_EMAIL=alvarojauna100@gmail.com
SES_REGION=eu-north-1

# Stripe
STRIPE_SECRET_KEY=sk_live_... o sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... o pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Variables Opcionales

```env
# URLs (para emails, redirects)
NEXT_PUBLIC_APP_URL=https://tu-dominio.com

# Desarrollo
NODE_ENV=development
```

---

## 18. Arquitectura General

### Diagrama de Arquitectura

```
                         +---------------------------+
                         |      USUARIO FINAL        |
                         |    (Navegador Web)        |
                         +------------+--------------+
                                      |
                                      | HTTPS
                                      v
+-------------------------------------------------------------------------+
|                           AWS AMPLIFY                                    |
|                    (Hosting + CDN + CI/CD)                              |
+-------------------------------------------------------------------------+
                                      |
                                      v
+-------------------------------------------------------------------------+
|                         NEXT.JS APPLICATION                              |
|                                                                          |
|  +------------------+  +------------------+  +----------------------+    |
|  |   PAGES (SSR)    |  |   COMPONENTS     |  |    API ROUTES        |    |
|  |                  |  |                  |  |                      |    |
|  | - Landing        |  | - Header         |  | - /api/checkout      |    |
|  | - Services       |  | - Footer         |  | - /api/projects      |    |
|  | - Dashboard      |  | - ProtectedRoute |  | - /api/users         |    |
|  | - Admin          |  | - CheckoutButton |  | - /api/upload        |    |
|  | - Blog           |  | - FileUpload     |  | - /api/webhooks      |    |
|  +------------------+  +------------------+  +----------------------+    |
|                                                         |                |
|  +------------------+  +------------------+              |                |
|  |    CONTEXTS      |  |    LIB/SERVICES  |<-------------+                |
|  |                  |  |                  |                              |
|  | - AuthContext    |  | - users.ts       |                              |
|  |                  |  | - projects.ts    |                              |
|  +------------------+  | - blog.ts        |                              |
|                        | - reviews.ts     |                              |
|                        +------------------+                              |
+-------------------------------------------------------------------------+
                |              |              |              |
                v              v              v              v
         +----------+   +----------+   +----------+   +----------+
         |  COGNITO |   | DYNAMODB |   |    S3    |   |   SES    |
         |  (Auth)  |   |  (Data)  |   | (Files)  |   | (Email)  |
         +----------+   +----------+   +----------+   +----------+

                                  +----------+
                                  |  STRIPE  |
                                  | (Pagos)  |
                                  +----------+
```

### Capas de la Aplicacion

```
+-------------------------------------------------------------+
|                    PRESENTATION LAYER                        |
|  (React Components, Pages, Layouts, CSS)                    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                    APPLICATION LAYER                         |
|  (AuthContext, API Routes, Hooks, Utils)                    |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                     SERVICE LAYER                            |
|  (users.ts, projects.ts, blog.ts, reviews.ts)               |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                  INFRASTRUCTURE LAYER                        |
|  (dynamodb.ts, s3.ts, ses.ts, auth.ts, stripe.ts)          |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                    EXTERNAL SERVICES                         |
|  (AWS Cognito, DynamoDB, S3, SES, Stripe)                   |
+-------------------------------------------------------------+
```

---

## 19. Estado del Proyecto

### Progreso General

- **Items completados:** 11 de 18
- **Porcentaje:** 61%

### Funcionalidades Implementadas

| Funcionalidad | Estado | Detalles |
|--------------|--------|----------|
| Infraestructura AWS | OK | Cognito, DynamoDB, S3, SES configurados |
| Proyecto NextJS | OK | App Router, TypeScript, Tailwind |
| Autenticacion | OK | Login, registro, verificacion, password reset |
| Base de datos | OK | CRUD completo en DynamoDB |
| Almacenamiento | OK | Upload/download con pre-signed URLs |
| Emails | OK | SES configurado y funcional |
| Paginas publicas | OK | Landing, services, portfolio, blog, contact |
| Dashboard cliente | OK | Resumen, proyectos, perfil |
| Panel admin | OK | Dashboard, proyectos, clientes, ventas |
| Pagos Stripe | OK | Checkout completo con webhooks |
| Blog | OK | CRUD y visualizacion publica |

### Pendiente

| Funcionalidad | Estado | Prioridad |
|--------------|--------|-----------|
| Tests E2E | Pendiente | Alta |
| Deploy produccion | Pendiente | Alta |
| Optimizaciones SEO | Pendiente | Media |
| Analytics | Pendiente | Baja |

---

## Apendice: Comandos Utiles

### Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para produccion
npm run build

# Iniciar servidor de produccion
npm start

# Linting
npm run lint
```

### AWS CLI (opcional)

```bash
# Ver tablas DynamoDB
aws dynamodb list-tables --region eu-north-1

# Ver contenido de bucket S3
aws s3 ls s3://ia-services-files-916707935254

# Ver usuarios de Cognito
aws cognito-idp list-users --user-pool-id eu-north-1_XXXXXXXX
```

### Stripe CLI (desarrollo)

```bash
# Escuchar webhooks localmente
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger eventos de prueba
stripe trigger checkout.session.completed
```

---

## Notas Finales

Este proyecto implementa una arquitectura moderna y escalable usando servicios serverless de AWS. Las principales ventajas son:

1. **Escalabilidad automatica** - DynamoDB, S3, SES escalan segun demanda
2. **Costo por uso** - Solo pagas por lo que usas
3. **Mantenimiento minimo** - Sin servidores que administrar
4. **Seguridad integrada** - Cognito maneja autenticacion de forma segura
5. **Deploy automatico** - Amplify CI/CD desde repositorio

Para cualquier duda o mejora, consulta la documentacion oficial de cada servicio utilizado.
