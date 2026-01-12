# Lecciones Aprendidas - Web App IA Services

## 1. Diagnóstico AWS: Hacerlo yo primero

**Problema**: Pedía al usuario que verificara cosas en AWS Console cuando podía hacerlo yo mismo con AWS CLI.

**Solución**: Antes de pedir al usuario que revise algo en AWS, usar comandos CLI:

```bash
# Listar tablas DynamoDB
aws dynamodb list-tables --region eu-north-1

# Ver contenido de una tabla
aws dynamodb scan --table-name ia-services-projects --region eu-north-1

# Verificar usuarios en Cognito
aws cognito-idp list-user-pools --max-results 10 --region eu-north-1
aws cognito-idp list-users --user-pool-id <pool-id> --region eu-north-1

# Ver variables de Amplify
aws amplify list-apps --region eu-north-1

# Ver permisos IAM
aws iam list-attached-user-policies --user-name <user>
```

---

## 2. Amplify: BuildSpec vs amplify.yml

**Problema**: El archivo `amplify.yml` en el repositorio NO se usa automáticamente. Amplify puede tener un buildSpec diferente configurado internamente.

**Síntomas**:
- Variables de entorno configuradas en Amplify Console pero no disponibles en runtime
- API Routes devuelven errores de conexión a AWS services

**Diagnóstico**:
```bash
# Ver el buildSpec actual de Amplify
aws amplify list-apps --region eu-north-1 --query "apps[].buildSpec"
```

**Solución**:
```bash
# Actualizar buildSpec en Amplify
aws amplify update-app --app-id <app-id> --region eu-north-1 --build-spec '<contenido-yaml>'
```

**Importante**: El buildSpec debe inyectar variables en `.env.production` para que estén disponibles en runtime:
```yaml
build:
  commands:
    - echo "APP_AWS_ACCESS_KEY_ID=$APP_AWS_ACCESS_KEY_ID" >> .env.production
    - echo "APP_AWS_SECRET_ACCESS_KEY=$APP_AWS_SECRET_ACCESS_KEY" >> .env.production
    - npm run build
```

---

## 3. Stripe Webhooks: Verificar eventos configurados

**Problema**: El webhook respondía 200 OK pero no ejecutaba la lógica porque el evento no estaba en la lista de eventos suscritos.

**Diagnóstico**:
1. En Stripe Dashboard, verificar "Intentos recientes" del webhook
2. Ver qué evento se recibió (`charge.updated` vs `checkout.session.completed`)
3. Verificar que el código maneje ese evento específico

**El código necesita**:
```typescript
case 'checkout.session.completed': {
  // Crear proyecto
}
```

**El webhook debe escuchar**: `checkout.session.completed` (no solo `charge.updated`)

---

## 4. Debug de APIs: Probar con curl

**Antes de asumir** que hay un problema complejo, probar la API directamente:

```bash
# Probar en producción
curl -s "https://app.amplifyapp.com/api/projects?userId=xxx"

# Probar en localhost
curl -s "http://localhost:3000/api/projects?userId=xxx"
```

Si localhost funciona y producción no, el problema está en la configuración de Amplify.

---

## 5. DynamoDB: Verificar índices antes de queries

**Problema**: Query por `clientId` fallaba silenciosamente.

**Verificación**:
```bash
# Ver estructura de tabla e índices
aws dynamodb describe-table --table-name ia-services-projects \
  --query "Table.{Name:TableName,KeySchema:KeySchema,GSI:GlobalSecondaryIndexes[*].IndexName}"
```

---

## 6. Credenciales IAM: No siempre es el problema

**Proceso de diagnóstico**:
1. Verificar que el usuario IAM existe
2. Verificar políticas attached (`AdministratorAccess` = todos los permisos)
3. Si tiene permisos, el problema está en CÓMO se pasan las credenciales, no en los permisos

```bash
aws iam list-attached-user-policies --user-name ADMIN
```

---

## 7. Amplify Deploy: Forzar redeploy después de cambios

Después de cambiar buildSpec o variables de entorno:

```bash
aws amplify start-job --app-id <app-id> --branch-name main --job-type RELEASE --region eu-north-1
```

Monitorear estado:
```bash
aws amplify get-job --app-id <app-id> --branch-name main --job-id <id> --query "job.summary.status"
```

---

## 8. Testing E2E con Browser Automation

**Flujo efectivo**:
1. Obtener contexto de tabs primero
2. Navegar a la URL directamente si los clicks no funcionan
3. Para formularios de Stripe, usar Tab para navegar entre campos
4. Esperar después de acciones (pagos, redirects)
5. Verificar cambios de URL para confirmar navegación

**Tarjeta de prueba Stripe**: `4242 4242 4242 4242`, fecha futura, CVC `123`

---

## 9. Next.js 15 + AuthProvider: Problema de Build con SSR

**Problema**: El build de producción falla durante la generación de páginas estáticas con errores de `useContext` o `useState` siendo `null`.

**Causa raíz**: AuthProvider usa React hooks en el root layout. Durante la generación estática, Next.js intenta prerenderizar páginas incluyendo las internas (`/_global-error`, `/_not-found`), y los hooks fallan porque no hay contexto de React disponible.

**Síntomas**:
```
Error occurred prerendering page "/_global-error"
TypeError: Cannot read properties of null (reading 'useContext')
```

**Estado actual**:
- El servidor de desarrollo (`npm run dev`) funciona correctamente
- El build de producción (`npm run build`) falla
- Es un problema preexistente, no causado por las animaciones

**Posibles soluciones (no implementadas aún)**:
1. Mover AuthProvider fuera del root layout a layouts específicos de rutas
2. Usar dynamic import con `ssr: false` para el AuthProvider
3. Usar Next.js 14 con React 18 (requiere cambios en fonts)
4. Esperar fix de Next.js para este comportamiento

**Workaround actual**: Usar `npm run dev` para desarrollo. El deploy a Amplify puede funcionar diferente.

---

## Resumen de Comandos Útiles

```bash
# === DynamoDB ===
aws dynamodb list-tables --region eu-north-1
aws dynamodb scan --table-name <table> --region eu-north-1
aws dynamodb query --table-name <table> --index-name <gsi> \
  --key-condition-expression "clientId = :cid" \
  --expression-attribute-values '{":cid":{"S":"xxx"}}'

# === Cognito ===
aws cognito-idp list-user-pools --max-results 10 --region eu-north-1
aws cognito-idp list-users --user-pool-id <pool-id> --region eu-north-1

# === Amplify ===
aws amplify list-apps --region eu-north-1
aws amplify update-app --app-id <id> --build-spec '<yaml>'
aws amplify start-job --app-id <id> --branch-name main --job-type RELEASE

# === IAM ===
aws iam list-users
aws iam list-attached-user-policies --user-name <user>
aws iam list-access-keys --user-name <user>
```
