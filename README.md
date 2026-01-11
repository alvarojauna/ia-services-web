# Guía Conceptual: Cómo Funciona una Web App Moderna con AWS

## Antes de Empezar: ¿Qué es una Web App?

Una **web app** es una aplicación que vive en internet y se accede desde un navegador. A diferencia de una página web estática (como un blog simple), una web app:

- Tiene **usuarios** que se registran y hacen login
- **Guarda datos** de cada usuario
- **Procesa información** (no solo la muestra)
- Puede **enviar emails**, **cobrar pagos**, **usar IA**, etc.

Ejemplos de web apps: Gmail, Notion, Spotify Web, Twitter/X, ChatGPT.

---

## La Gran Imagen: Frontend vs Backend

Imagina un restaurante:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RESTAURANTE                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   SALA (Frontend)                    COCINA (Backend)               │
│   ─────────────────                  ───────────────────            │
│   • Lo que ve el cliente             • Donde se prepara todo        │
│   • Mesas, menú, decoración          • Ingredientes, recetas        │
│   • El mesero (interfaz)             • Chef, almacén, caja          │
│                                                                      │
│   El cliente NO entra a la           El cliente NO ve esto,         │
│   cocina, solo ve la sala            pero es donde pasa la magia    │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

En una web app:

| Restaurante | Web App | Qué hace |
|-------------|---------|----------|
| Sala | **Frontend** | Lo que ve el usuario en su navegador |
| Cocina | **Backend** | Servidores que procesan datos |
| Menú | **UI/Interfaz** | Botones, formularios, páginas |
| Mesero | **API** | Comunica frontend con backend |
| Almacén | **Base de datos** | Donde se guardan los datos |
| Caja registradora | **Pagos (Stripe)** | Procesa transacciones |
| Recetas | **Lógica de negocio** | Las reglas de tu app |

---

## Anatomía de una Web App

```
                                    INTERNET
                                        │
                                        ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│    TU COMPUTADORA                        SERVIDORES (La Nube / AWS)          │
│    ══════════════                        ══════════════════════════          │
│                                                                               │
│    ┌─────────────┐                      ┌─────────────────────────┐          │
│    │  NAVEGADOR  │ ───── Internet ────► │      TU WEB APP         │          │
│    │  (Chrome)   │                      │   (vive en Amplify)     │          │
│    └─────────────┘                      └───────────┬─────────────┘          │
│                                                     │                         │
│    Lo que TÚ ves                                    │ habla con               │
│    (Frontend)                                       ▼                         │
│                                         ┌─────────────────────────┐          │
│                                         │   SERVICIOS DE AWS      │          │
│                                         │                         │          │
│                                         │  • Cognito (usuarios)   │          │
│                                         │  • DynamoDB (datos)     │          │
│                                         │  • S3 (archivos)        │          │
│                                         │  • Bedrock (IA)         │          │
│                                         │  • SES (emails)         │          │
│                                         └─────────────────────────┘          │
│                                                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Los Componentes Explicados Uno por Uno

### 1. NextJS - El Constructor de tu App

**¿Qué es?**
NextJS es como los planos y la estructura de un edificio. Es el "framework" (marco de trabajo) que te permite construir tu web app.

**Analogía:**
Imagina que quieres construir una casa. Podrías:
- Opción A: Hacer todo desde cero (cortar árboles, hacer ladrillos, etc.)
- Opción B: Usar materiales prefabricados y un sistema de construcción probado

NextJS es la Opción B. Te da:
- Sistema de páginas ya resuelto
- Manera de conectar con servidores
- Optimizaciones de velocidad
- Estructura organizada

**¿Cómo funciona?**
```
Tu proyecto NextJS:

📁 mi-app/
├── 📁 app/                    ← Aquí van tus PÁGINAS
│   ├── page.tsx              ← Página principal (tuapp.com/)
│   ├── 📁 login/
│   │   └── page.tsx          ← Página de login (tuapp.com/login)
│   ├── 📁 dashboard/
│   │   └── page.tsx          ← Dashboard (tuapp.com/dashboard)
│   └── 📁 api/               ← Tu "cocina" - el backend
│       └── 📁 users/
│           └── route.ts      ← Endpoint para manejar usuarios
├── 📁 components/            ← Piezas reutilizables (botones, cards, etc.)
└── 📁 lib/                   ← Código auxiliar (conexiones a AWS, etc.)
```

**Lo importante:**
- Cada carpeta en `app/` = una URL en tu web
- Los archivos `page.tsx` = lo que ve el usuario
- Los archivos en `api/` = código que corre en el servidor (el usuario no lo ve)

---

### 2. AWS Amplify - Tu Casero en Internet

**¿Qué es?**
Amplify es donde "vive" tu web app en internet. Es el servicio de hosting.

**Analogía:**
Tienes una tienda (tu app). Necesitas un local donde ponerla. Amplify es como alquilar un local en un centro comercial (AWS), donde:
- Te dan el espacio
- Se encargan de la luz y el agua (servidores funcionando)
- Te dan una dirección (URL)
- Si viene mucha gente, el local se agranda automáticamente

**¿Cómo funciona?**

```
TU COMPUTADORA                              AMPLIFY (AWS)
─────────────────                           ─────────────────

1. Escribes código
   en tu compu
        │
        ▼
2. Subes a GitHub ──────────────────────►  3. Amplify detecta
   (tu código)                                 cambios
                                                   │
                                                   ▼
                                            4. Amplify construye
                                               tu app automáticamente
                                                   │
                                                   ▼
5. Usuarios acceden ◄─────────────────────  Tu app está VIVA
   a tuapp.com                              en internet
```

**El flujo simplificado:**
1. Conectas tu repositorio de GitHub a Amplify
2. Cada vez que subes código nuevo, Amplify lo detecta
3. Amplify construye y despliega tu app automáticamente
4. Tu app está disponible en una URL (ej: `mi-app.amplifyapp.com`)

---

### 3. Amazon Cognito - El Portero de tu App

**¿Qué es?**
Cognito maneja todo lo relacionado con usuarios: registro, login, contraseñas, sesiones.

**Analogía:**
Cognito es como el sistema de seguridad de un edificio de oficinas:
- **Registro** = Darte de alta como empleado, crear tu credencial
- **Login** = Pasar tu credencial por el lector
- **Sesión** = El tiempo que estás "dentro" antes de que te pida credencial de nuevo
- **Logout** = Salir del edificio
- **Recuperar contraseña** = Pedir credencial nueva porque perdiste la tuya

**¿Cómo funciona?**

```
USUARIO                         TU APP                         COGNITO
───────                         ──────                         ───────

1. "Quiero registrarme"
   email: juan@mail.com    ──────────────────────────────►
   password: ****                                          2. Cognito guarda
                                                              el usuario
                           ◄──────────────────────────────
                                                           3. "OK, envié código
                                                              de verificación"

4. "Mi código es 123456"   ──────────────────────────────►
                                                           5. Cognito verifica
                           ◄──────────────────────────────
                                                           6. "Usuario verificado"

7. "Quiero hacer login"    ──────────────────────────────►
   email: juan@mail.com                                    8. Cognito verifica
   password: ****                                             credenciales
                           ◄──────────────────────────────
                                                           9. "Aquí tienes un
                                                              TOKEN de acceso"

10. Usuario ya puede
    acceder a páginas
    protegidas (dashboard,
    perfil, etc.)
```

**¿Qué es un TOKEN?**
Es como un pase VIP temporal. Cuando haces login correcto, Cognito te da un token (un texto largo encriptado) que demuestra que eres tú. Tu navegador guarda ese token y lo envía cada vez que pides algo al servidor.

```
Sin token:  "Quiero ver mi dashboard"  →  "¿Quién eres? NO."
Con token:  "Quiero ver mi dashboard   →  "Ah, eres Juan. Aquí tienes."
             [adjunto mi token]"
```

---

### 4. Base de Datos - La Memoria de tu App

**¿Qué es?**
La base de datos es donde se guardan TODOS los datos de tu app: usuarios, posts, productos, configuraciones, etc.

**Analogía:**
Es como un archivador gigante y muy organizado donde guardas información y puedes encontrarla rápidamente.

**Dos opciones en AWS:**

#### Opción A: DynamoDB (NoSQL)
```
Imagina una hoja de Excel muy flexible:

┌────────────────────────────────────────────────────────┐
│  ID        │  Tipo      │  Datos                       │
├────────────────────────────────────────────────────────┤
│  USER#123  │  perfil    │  {nombre: "Juan", edad: 25}  │
│  USER#123  │  config    │  {tema: "oscuro"}            │
│  POST#456  │  post      │  {titulo: "Hola", autor: 123}│
│  POST#456  │  likes     │  {total: 42}                 │
└────────────────────────────────────────────────────────┘

Características:
✓ Muy rápido
✓ Escala infinitamente
✓ Flexible (cada fila puede tener datos diferentes)
✗ No es bueno para relaciones complejas
```

#### Opción B: RDS PostgreSQL (SQL)
```
Imagina tablas Excel relacionadas:

TABLA: Usuarios                    TABLA: Posts
┌─────┬────────┬─────────┐        ┌─────┬──────────┬──────────┐
│ id  │ nombre │ email   │        │ id  │ titulo   │ autor_id │
├─────┼────────┼─────────┤        ├─────┼──────────┼──────────┤
│ 1   │ Juan   │ j@m.com │        │ 1   │ "Hola"   │ 1        │
│ 2   │ María  │ m@m.com │        │ 2   │ "Adiós"  │ 1        │
└─────┴────────┴─────────┘        │ 3   │ "Test"   │ 2        │
                                   └─────┴──────────┴──────────┘
        ▲                                              │
        └──────────────── se relacionan ───────────────┘

Características:
✓ Relaciones claras entre datos
✓ Consultas complejas fáciles
✓ Familiar si conoces SQL
✗ Escalar es más complicado
```

**¿Cuál elegir?**
- **DynamoDB**: Apps simples, mucho tráfico, datos sin muchas relaciones
- **RDS PostgreSQL**: Apps con datos relacionados (usuarios tienen posts, posts tienen comentarios, etc.)

**Mi recomendación para empezar:** PostgreSQL con Prisma (un ORM que hace todo más fácil)

---

### 5. Amazon S3 - El Almacén de Archivos

**¿Qué es?**
S3 es donde guardas archivos: imágenes de perfil, documentos, videos, PDFs, etc.

**Analogía:**
Es como Google Drive o Dropbox, pero para tu app. Un almacén infinito donde puedes guardar cualquier archivo.

**¿Por qué no guardar archivos en la base de datos?**
```
BASE DE DATOS                          S3
─────────────                          ──

Guardar una imagen de 5MB              Guardar una imagen de 5MB
aquí haría todo MUY lento              aquí es instantáneo y barato

La DB es para DATOS                    S3 es para ARCHIVOS
(texto, números, fechas)               (imágenes, videos, documentos)
```

**¿Cómo funciona el upload?**

```
USUARIO              TU APP (Backend)              S3
───────              ────────────────              ──

1. "Quiero subir
    mi foto de perfil"
         │
         ▼
2. Selecciona archivo
   del computador
         │
         ▼
3. Tu app pide a S3:
   "Dame permiso temporal  ─────────────────────►
    para que este usuario
    suba un archivo"
                          ◄─────────────────────  4. S3: "OK, aquí tienes
                                                     una URL especial
                                                     válida por 1 hora"
5. El navegador sube
   el archivo DIRECTO    ─────────────────────────────────────────►
   a S3 (no pasa por                                              │
   tu servidor)                                                    ▼
                                                     6. Archivo guardado
                                                        en S3
7. Tu app guarda en DB:
   "El avatar de Juan
    está en s3://fotos/juan.jpg"
```

**¿Por qué este proceso "raro"?**
- Si el archivo pasara por tu servidor, gastarías recursos y sería lento
- Con la "URL especial" (presigned URL), el usuario sube directo a S3
- Tu servidor solo da el permiso, no maneja el archivo

---

### 6. Amazon Bedrock - Inteligencia Artificial

**¿Qué es?**
Bedrock te da acceso a modelos de IA como Claude, Llama, Mistral, etc. Es como tener ChatGPT dentro de tu app.

**Analogía:**
Imagina que puedes contratar expertos por minuto:
- **Claude**: Experto en razonamiento y análisis (el más listo)
- **Llama**: Experto generalista y económico
- **Mistral**: Experto rápido para tareas simples
- **Stable Diffusion**: Artista que genera imágenes

**¿Cómo funciona?**

```
USUARIO                    TU APP                      BEDROCK
───────                    ──────                      ───────

1. Usuario escribe:
   "Resúmeme este texto..."
         │
         ▼
2. Tu app recibe
   el mensaje
         │
         ▼
3. Tu app envía a Bedrock:  ───────────────────────►
   "Modelo: Claude                                    4. Bedrock procesa
    Prompt: Resúmeme..."                                 con IA
                                                            │
                            ◄───────────────────────        ▼
                                                      5. Respuesta:
                                                         "El texto habla
                                                          de..."
6. Tu app muestra
   la respuesta al usuario
```

**Tipos de uso comunes:**

| Uso | Modelo recomendado | Ejemplo |
|-----|-------------------|---------|
| Chat inteligente | Claude Sonnet | Asistente de tu app |
| Tareas simples | Llama 8B / Mistral | Clasificar, extraer datos |
| Análisis profundo | Claude Sonnet | Analizar documentos |
| Generar imágenes | Stable Diffusion | Crear avatares, arte |
| Búsqueda semántica | Titan Embeddings | "Buscar posts similares" |

**¿Por qué Bedrock y no usar OpenAI directamente?**
- Facturación unificada en AWS
- Tus datos no salen de tu cuenta AWS
- Puedes cambiar de modelo fácilmente
- Más barato a escala

---

### 7. Amazon SES - El Cartero Digital

**¿Qué es?**
SES (Simple Email Service) envía emails desde tu app: bienvenida, recuperar contraseña, notificaciones, etc.

**Analogía:**
Es como tener tu propia oficina de correos. Tú diseñas las cartas y SES las entrega.

**¿Por qué no usar Gmail?**
```
GMAIL                                  SES
─────                                  ───
• Límite de 500 emails/día            • Millones de emails
• Se ve como "enviado por Juan"       • Se ve como "enviado por TuApp"
• No es profesional                   • Dominio propio (hola@tuapp.com)
• Puede ir a spam                     • Alta entregabilidad
• Gratis pero limitado                • $0.10 por 1000 emails
```

**¿Cómo funciona?**

```
EVENTO EN TU APP              TU BACKEND                    SES
────────────────              ──────────                    ───

1. Usuario se registra
         │
         ▼
2. Tu app decide:
   "Hay que enviar
    email de bienvenida"
         │
         ▼
3. Tu app llama a SES:   ──────────────────────────►
   "Envía este email                                  4. SES envía
    a juan@mail.com                                      el email
    con este contenido"
                                                            │
                                                            ▼
                                                     BANDEJA DE ENTRADA
                                                     DEL USUARIO
                                                     ┌─────────────────┐
                                                     │ De: TuApp       │
                                                     │ Asunto: ¡Bienve-│
                                                     │ nido!           │
                                                     └─────────────────┘
```

**Emails típicos que enviarás:**
- Verificar email al registrarse
- Recuperar contraseña
- Notificaciones ("Alguien comentó en tu post")
- Transaccionales ("Tu pago fue procesado")
- Marketing (newsletters) - ¡con cuidado del spam!

---

### 8. Stripe - La Caja Registradora

**¿Qué es?**
Stripe procesa pagos: tarjetas de crédito, suscripciones, reembolsos, etc.

**Nota:** Stripe NO es de AWS, pero es el estándar de la industria. No hay equivalente bueno en AWS para pagos de usuarios.

**Analogía:**
Stripe es como un cajero automático + banco + contador:
- Recibe el dinero de tus clientes
- Te lo deposita en tu cuenta
- Maneja impuestos y facturas
- Se encarga de toda la seguridad

**¿Por qué no cobrar directamente?**

```
SIN STRIPE                              CON STRIPE
──────────                              ──────────

Tú tendrías que:                        Stripe se encarga de:
• Manejar datos de tarjetas            • Toda la seguridad PCI
  (MUY peligroso legalmente)           • Validar tarjetas
• Conectar con cada banco              • Detectar fraude
• Manejar fraudes                      • Reembolsos
• Cumplir regulaciones PCI             • Suscripciones recurrentes
• Impuestos internacionales            • Impuestos automáticos

= Meses de trabajo                      = 3 líneas de código
= Riesgo legal enorme                  = Ellos asumen el riesgo
```

**¿Cómo funciona una compra?**

```
USUARIO                  TU APP                 STRIPE              TU BANCO
───────                  ──────                 ──────              ────────

1. Click "Comprar
   Plan Pro $10/mes"
         │
         ▼
2. Tu app pide a Stripe:  ─────────────►
   "Crea sesión de pago"               3. Stripe crea
                                          página de pago
         │◄────────────────────────────
         │    URL de pago
         ▼
4. Usuario va a la
   página de Stripe
   (sale de tu app
    momentáneamente)
         │
         ▼
5. Usuario ingresa
   tarjeta en Stripe      ─────────────►
   (TÚ NUNCA VES                       6. Stripe cobra
    EL NÚMERO)                            la tarjeta
                                              │
7. Stripe redirige       ◄─────────────       │
   a tu app                                   │
   "Pago exitoso"                             │
         │                                    ▼
         ▼                              Días después...
8. Tu app activa                              │
   el Plan Pro                                ▼
   para el usuario                     8. Dinero llega
                                          a tu banco
                                          ($10 - 2.9% fee)
```

**Conceptos clave de Stripe:**

| Concepto | Qué es | Ejemplo |
|----------|--------|---------|
| **Product** | Lo que vendes | "Plan Pro" |
| **Price** | Cuánto cuesta | "$10/mes" |
| **Customer** | Tu usuario en Stripe | juan@mail.com |
| **Subscription** | Pago recurrente | Plan Pro de Juan |
| **Checkout Session** | Página de pago temporal | checkout.stripe.com/xxx |
| **Webhook** | Stripe te avisa de eventos | "El pago fue exitoso" |

---

### 9. Tailwind CSS - El Decorador

**¿Qué es?**
Tailwind es una forma de dar estilo (colores, tamaños, espacios) a tu app.

**Analogía:**
En vez de escribir instrucciones largas de decoración:
```
"Quiero un botón que sea azul, con esquinas redondeadas,
 padding de 16px arriba y abajo, 24px a los lados,
 que cuando pases el mouse se ponga más oscuro..."
```

Escribes clases cortas directamente:
```
<button class="bg-blue-500 rounded px-6 py-4 hover:bg-blue-600">
```

**CSS tradicional vs Tailwind:**

```
CSS TRADICIONAL                         TAILWIND
───────────────                         ────────

/* styles.css */                        <!-- Directo en el HTML -->
.mi-boton {                             <button class="
  background-color: #3b82f6;              bg-blue-500
  padding: 16px 24px;                     px-6 py-4
  border-radius: 8px;                     rounded-lg
  color: white;                           text-white
  font-weight: bold;                      font-bold
}                                         hover:bg-blue-600
                                        ">
.mi-boton:hover {                         Click aquí
  background-color: #2563eb;            </button>
}

<!-- HTML -->
<button class="mi-boton">
  Click aquí
</button>
```

**¿Por qué usar Tailwind?**
- No cambias entre archivos (todo está junto)
- Los nombres de clase dicen qué hacen
- No inventas nombres (`.mi-boton-grande-azul-redondeado`)
- Muy rápido una vez que aprendes las clases

---

## Cómo Se Conecta Todo: Escenario Real

### El Negocio: Ingeniero de IA que Vende Servicios

Imagina que eres un ingeniero de IA y quieres crear tu web para vender tus servicios:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TU WEB: ia-soluciones.com                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SERVICIOS QUE OFRECES:                                                     │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │  PLAN BÁSICO    │  │  PLAN PRO       │  │  PLAN EMPRESA   │             │
│  │  $500           │  │  $2,000         │  │  $5,000+        │             │
│  │                 │  │                 │  │                 │             │
│  │  • Chatbot      │  │  • Todo Básico  │  │  • Todo Pro     │             │
│  │    simple       │  │  • Integración  │  │  • Consultoría  │             │
│  │  • 1 revisión   │  │    con APIs     │  │  • Soporte 24/7 │             │
│  │  • Docs básica  │  │  • 3 revisiones │  │  • Código fuente│             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                              │
│  PÁGINAS DE TU WEB:                                                         │
│  • Inicio (quién eres, qué haces)                                           │
│  • Servicios (los 3 planes)                                                 │
│  • Portfolio (proyectos anteriores)                                         │
│  • Contacto (formulario)                                                    │
│  • Blog (artículos sobre IA)                                                │
│  • Login/Registro (para clientes)                                           │
│  • Dashboard cliente (ver estado de su proyecto)                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### El Flujo Completo: Un Cliente Contrata tus Servicios

**PROTAGONISTAS:**
- **María** = Una empresaria que quiere un chatbot para su tienda online
- **Tú** = El ingeniero de IA dueño de la web

---

#### PASO 1: María Descubre tu Web

```
MARÍA                                    TU WEB (en Amplify)
──────                                   ───────────────────

María busca en Google:
"desarrollador chatbot
 para ecommerce"
        │
        ▼
Google muestra tu web  ─────────────►  Amplify sirve tu página
        │                                       │
        ▼                                       ▼
María hace click      ◄─────────────────  Página de inicio
                                          bella con Tailwind:
                                          • Tu foto
                                          • "Ingeniero de IA"
                                          • Testimonios
                                          • Botón "Ver Servicios"
```

**¿Qué servicios se usaron?**
- **Amplify**: Sirvió la página web
- **Tailwind**: Hizo que se vea profesional
- **S3**: Las imágenes de tu portfolio están guardadas ahí

---

#### PASO 2: María Explora tus Servicios

```
MARÍA                                    TU WEB
──────                                   ──────

María navega por tu web:
        │
        ├──► /servicios ─────────────►  Ve los 3 planes con precios
        │
        ├──► /portfolio ─────────────►  Ve proyectos anteriores
        │                               (imágenes desde S3)
        │
        └──► /blog ──────────────────►  Lee tu artículo:
                                        "Cómo un chatbot puede
                                         aumentar ventas 30%"

María piensa: "Este tipo sabe
lo que hace, quiero el Plan Pro"
```

**¿Qué servicios se usaron?**
- **Amplify**: Sirve todas las páginas
- **S3**: Imágenes del portfolio
- **DynamoDB**: Los artículos del blog están guardados ahí

---

#### PASO 3: María se Registra

```
MARÍA                          TU WEB                         COGNITO
──────                         ──────                         ───────

María: "Quiero contratar,
necesito crear cuenta"
        │
        ▼
Click en "Registrarse"
        │
        ▼
Llena formulario:
• Email: maria@sutienda.com
• Password: ********
• Nombre: María García
• Empresa: TiendaOnline.com
        │
        ▼
Click "Crear cuenta"  ─────────────────────────────────────►
                                                            Cognito guarda:
                                                            • Email
                                                            • Password (encriptado)
                                                            • Datos del perfil
                                                                    │
                      ◄─────────────────────────────────────────────┘
Tu web muestra:
"Te enviamos un código                          Cognito usa SES para
de verificación"                                enviar email
                                                        │
        │                                               ▼
        ▼                                        ┌─────────────────┐
María revisa su email ◄──────────────────────────│ De: tu-web.com  │
                                                 │ Código: 847291  │
                                                 └─────────────────┘
        │
        ▼
María ingresa: 847291  ────────────────────────────────────►
                                                            Cognito verifica
                      ◄─────────────────────────────────────
"¡Cuenta verificada!"                                       "OK, usuario activo"
```

**¿Qué servicios se usaron?**
- **Cognito**: Creó la cuenta y verificó el email
- **SES**: Envió el email con el código
- **DynamoDB**: Guardó datos adicionales del perfil (empresa, etc.)

---

#### PASO 4: María Hace Login y Ve el Dashboard

```
MARÍA                          TU WEB                         COGNITO
──────                         ──────                         ───────

María vuelve otro día:
"Quiero entrar a mi cuenta"
        │
        ▼
Email: maria@sutienda.com
Password: ********
        │
        ▼
Click "Entrar"  ───────────────────────────────────────────►
                                                            Cognito verifica
                                                            credenciales
                      ◄─────────────────────────────────────
                                                            "Correcto, aquí
                                                             tienes un TOKEN"
        │
        ▼
Token guardado en navegador
(María ya está "dentro")
        │
        ▼
Redirigida a /dashboard  ──────────────────►  Dashboard personalizado:

                                              ┌─────────────────────────┐
                                              │ Hola, María             │
                                              │                         │
                                              │ Tus proyectos: 0        │
                                              │ Estado: Sin proyectos   │
                                              │                         │
                                              │ [Contratar Servicio]    │
                                              └─────────────────────────┘
```

**¿Qué servicios se usaron?**
- **Cognito**: Verificó login, generó token
- **DynamoDB**: Cargó datos de María para mostrar en dashboard

---

#### PASO 5: María Contrata el Plan Pro ($2,000)

```
MARÍA                    TU WEB                    STRIPE                TU BANCO
──────                   ──────                    ──────                ────────

María en su dashboard:
"Quiero contratar Plan Pro"
        │
        ▼
Click en [Contratar
Plan Pro - $2,000]
        │
        ▼
Tu web pide a Stripe:    ───────────────────────►
"Crea página de pago                              Stripe crea sesión
 para Plan Pro, $2,000"                           de pago segura
        │               ◄───────────────────────
        │               URL: checkout.stripe.com/xyz
        ▼
María es redirigida     ───────────────────────►
a página de Stripe                                Página de Stripe:
                                                  ┌──────────────────────┐
                                                  │ Plan Pro - $2,000    │
                                                  │                      │
                                                  │ Tarjeta:             │
                                                  │ [________________]   │
                                                  │                      │
                                                  │ [Pagar $2,000]       │
                                                  └──────────────────────┘
        │
        ▼
María ingresa tarjeta   ───────────────────────►
(TÚ NUNCA VES EL                                  Stripe:
 NÚMERO DE TARJETA)                               • Valida tarjeta
                                                  • Cobra $2,000
                                                  • Detecta fraude
                                                          │
        │               ◄───────────────────────          │
        │               "Pago exitoso"                    │
        ▼                                                 │
María vuelve a tu web                                     │
        │                                                 ▼
        │                                           3-5 días después:
        │                                           $2,000 - 2.9% fee
        │                                           = $1,942 llegan
        │                                           a tu cuenta bancaria
        ▼
Tu web actualiza todo:

1. DynamoDB ──────────►  Guarda:
                         • María tiene Plan Pro
                         • Fecha de compra
                         • ID de pago Stripe

2. SES ────────────────► Envía email a María:
                         "¡Gracias por tu compra!
                          Nos pondremos en contacto
                          en 24 horas"

3. SES ────────────────► Envía email a TI:
                         "🎉 Nueva venta: Plan Pro
                          Cliente: María García
                          Empresa: TiendaOnline.com
                          Total: $2,000"
```

**¿Qué servicios se usaron?**
- **Stripe**: Procesó el pago de forma segura
- **DynamoDB**: Guardó la compra
- **SES**: Envió confirmaciones por email

---

#### PASO 6: Tú Trabajas en el Proyecto de María

```
TÚ (Ingeniero)                TU WEB (Admin)               MARÍA (Cliente)
──────────────                ──────────────               ───────────────

Recibes notificación
de nueva venta
        │
        ▼
Entras a tu panel admin
/admin/proyectos
        │
        ▼
Creas proyecto para María:
• Nombre: "Chatbot TiendaOnline"
• Cliente: María García
• Plan: Pro
• Estado: "En progreso"
• Deadline: 15 días
        │
        ▼
Guardas en DynamoDB  ─────────────────────────────────────────────────────►
        │                                                                  │
        │                                                                  ▼
        │                                              María ve en su dashboard:
        │                                              ┌─────────────────────────┐
        │                                              │ Proyecto: Chatbot       │
        │                                              │ Estado: En progreso 🟡  │
        │                                              │ Progreso: 20%           │
        │                                              │ Deadline: 12 días       │
        │                                              └─────────────────────────┘
        │
        ▼
Una semana después...
Subes avance del proyecto:
• Documento PDF con diseño
• Video demo del chatbot
        │
        ▼
Archivos van a S3 ───────────────────────────────────────────────────────►
        │                                                                  │
        │                                                                  ▼
        ▼                                              María recibe email (SES):
Actualizas estado:                                     "Hay novedades en tu
"Avance: 60%"                                           proyecto. Revisa tu
"Archivos adjuntos: 2"                                  dashboard"
        │                                                      │
        │                                                      ▼
        │                                              María entra a dashboard:
        │                                              ┌─────────────────────────┐
        │                                              │ Proyecto: Chatbot       │
        │                                              │ Estado: En progreso 🟡  │
        │                                              │ Progreso: 60%           │
        │                                              │                         │
        │                                              │ Archivos:               │
        │                                              │ 📄 diseño.pdf           │
        │                                              │ 🎥 demo.mp4             │
        │                                              │                         │
        │                                              │ [Descargar archivos]    │
        │                                              └─────────────────────────┘
        │                                                      │
        │                                                      ▼
        │                                              María descarga archivos
        │                                              (directamente desde S3)
```

**¿Qué servicios se usaron?**
- **DynamoDB**: Estado del proyecto, actualizaciones
- **S3**: Archivos del proyecto (PDFs, videos, código)
- **SES**: Notificaciones automáticas
- **Cognito**: Verificar que María solo ve SUS proyectos

---

#### PASO 7: Proyecto Completado

```
TÚ                           TU WEB                         MARÍA
──                           ──────                         ─────

Terminas el proyecto
        │
        ▼
Actualizas estado:
"Completado ✅"
        │
        ▼
Subes entregables finales:
• Código fuente (.zip)
• Documentación
• Video tutorial
        │
        ▼
DynamoDB + S3 ───────────────────────────────────────────────────────────►
        │                                                                  │
        │                                                                  ▼
        │                                              SES envía email:
        │                                              "🎉 ¡Proyecto completado!
        │                                               Descarga tus archivos"
        │                                                      │
        │                                                      ▼
        │                                              María en dashboard:
        │                                              ┌─────────────────────────┐
        │                                              │ Proyecto: Chatbot       │
        │                                              │ Estado: Completado ✅   │
        │                                              │                         │
        │                                              │ Entregables finales:    │
        │                                              │ 📦 codigo-fuente.zip    │
        │                                              │ 📄 documentacion.pdf    │
        │                                              │ 🎥 tutorial.mp4         │
        │                                              │                         │
        │                                              │ [Descargar todo]        │
        │                                              │                         │
        │                                              │ ¿Satisfecho?            │
        │                                              │ [⭐⭐⭐⭐⭐ Dejar reseña] │
        │                                              └─────────────────────────┘
        │                                                      │
        │                                                      ▼
        │                                              María deja reseña:
        │                                              "Excelente trabajo, muy
        │               ◄──────────────────────────────  profesional. 5 estrellas"
        │
        ▼
La reseña aparece en
tu página /portfolio
para futuros clientes
```

---

### Resumen del Escenario: Qué Hizo Cada Servicio

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    RESUMEN: SERVICIOS USADOS                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AMPLIFY (Hosting)                                                          │
│  └── Sirvió TODAS las páginas: inicio, servicios, blog, dashboard          │
│                                                                              │
│  COGNITO (Auth)                                                             │
│  ├── Registro de María                                                      │
│  ├── Verificación de email                                                  │
│  ├── Login/Logout                                                           │
│  └── Proteger dashboard (solo María ve sus proyectos)                       │
│                                                                              │
│  DYNAMODB (Datos)                                                           │
│  ├── Perfil de María (nombre, empresa, email)                               │
│  ├── Proyectos (estado, progreso, fechas)                                   │
│  ├── Artículos del blog                                                     │
│  ├── Reseñas de clientes                                                    │
│  └── Historial de compras                                                   │
│                                                                              │
│  S3 (Archivos)                                                              │
│  ├── Imágenes del portfolio                                                 │
│  ├── PDFs de propuestas                                                     │
│  ├── Videos de demos                                                        │
│  └── Entregables finales (código, docs)                                     │
│                                                                              │
│  SES (Emails)                                                               │
│  ├── Código de verificación                                                 │
│  ├── Confirmación de compra (a María)                                       │
│  ├── Notificación de venta (a ti)                                           │
│  ├── Actualizaciones del proyecto                                           │
│  └── Proyecto completado                                                    │
│                                                                              │
│  STRIPE (Pagos)                                                             │
│  ├── Página de pago segura                                                  │
│  ├── Cobro de $2,000                                                        │
│  └── Transferencia a tu banco                                               │
│                                                                              │
│  TAILWIND (Estilos)                                                         │
│  └── Hizo que TODO se vea profesional y moderno                             │
│                                                                              │
│  ❌ BEDROCK (IA) - NO SE USÓ                                                │
│  └── La IA (Claude Code) solo se usa para CREAR la web,                     │
│      no es parte de la web en sí                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Nota sobre la IA en este Proyecto

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ¿DÓNDE ENTRA LA IA?                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  La IA (Claude Code) se usa para CONSTRUIR la web, no para operarla:        │
│                                                                              │
│  TÚ + CLAUDE CODE                         RESULTADO                         │
│  ────────────────                         ─────────                         │
│                                                                              │
│  "Claude, crea una página               → Código de página                  │
│   de servicios con 3 planes"               de servicios                     │
│                                                                              │
│  "Claude, implementa el                 → Código de integración             │
│   checkout con Stripe"                     con Stripe                       │
│                                                                              │
│  "Claude, haz un dashboard              → Código del dashboard              │
│   donde clientes vean sus                                                   │
│   proyectos"                                                                │
│                                                                              │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                              │
│  La web TERMINADA no usa IA internamente.                                   │
│  Es una web normal que:                                                     │
│  • Muestra páginas                                                          │
│  • Autentica usuarios                                                       │
│  • Guarda datos                                                             │
│  • Procesa pagos                                                            │
│  • Envía emails                                                             │
│                                                                              │
│  Si QUISIERAS añadir IA a la web (ej: chatbot para visitantes),            │
│  entonces sí usarías Bedrock. Pero no es necesario.                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Resumen: Qué Hace Cada Pieza

| Servicio | Rol | Analogía |
|----------|-----|----------|
| **NextJS** | Estructura de tu app | Los planos del edificio |
| **Amplify** | Hosting (donde vive tu app) | El terreno y construcción |
| **Cognito** | Usuarios y autenticación | El portero del edificio |
| **DynamoDB/RDS** | Guardar datos | El archivador |
| **S3** | Guardar archivos | El almacén |
| **Bedrock** | Inteligencia Artificial | Experto contratado por minuto |
| **SES** | Enviar emails | La oficina de correos |
| **Stripe** | Cobrar pagos | La caja registradora |
| **Tailwind** | Estilos visuales | El decorador de interiores |

---

## Diagrama Final: Arquitectura Completa

```
                                 ┌─────────────┐
                                 │   USUARIO   │
                                 │  (navegador)│
                                 └──────┬──────┘
                                        │
                                        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                      │
└───────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
                              ┌─────────────────┐
                              │  AWS AMPLIFY    │
                              │  (tu app vive   │
                              │   aquí)         │
                              └────────┬────────┘
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           │                           │                           │
           ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    FRONTEND     │         │    BACKEND      │         │      APIs       │
│                 │         │   (API Routes)  │         │    EXTERNAS     │
│  • Páginas      │         │                 │         │                 │
│  • Componentes  │         │  • Lógica       │         │  • Stripe       │
│  • UI/Estilos   │         │  • Validación   │         │    (pagos)      │
│    (Tailwind)   │         │  • Seguridad    │         │                 │
└─────────────────┘         └────────┬────────┘         └─────────────────┘
                                     │
                                     │ conecta con
                                     ▼
        ┌────────────────────────────────────────────────────────┐
        │                    SERVICIOS AWS                        │
        │                                                         │
        │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
        │  │ COGNITO  │  │ DYNAMODB │  │    S3    │  │BEDROCK │ │
        │  │          │  │   /RDS   │  │          │  │        │ │
        │  │ usuarios │  │  datos   │  │ archivos │  │   IA   │ │
        │  │  auth    │  │          │  │          │  │        │ │
        │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
        │                                                         │
        │  ┌──────────┐                                          │
        │  │   SES    │                                          │
        │  │          │                                          │
        │  │  emails  │                                          │
        │  └──────────┘                                          │
        │                                                         │
        └────────────────────────────────────────────────────────┘
```

---

## ¿Qué Sigue?

Ahora que entiendes cómo funciona cada pieza, el siguiente paso sería:

1. **Crear cuenta AWS** (si no tienes)
2. **Configurar los servicios básicos** (Cognito, DynamoDB, S3)
3. **Crear el proyecto NextJS**
4. **Conectar todo**

¿Quieres que te guíe paso a paso en la configuración inicial de AWS y la creación de tu primer proyecto?
