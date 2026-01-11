# Web App

## Reglas del Proyecto

### Gestion de Progreso
Al trabajar en un item del PRD, sigue este flujo:

1. **Planificar**: Entra en plan mode (Shift+Tab x2 o `claude --permission-mode plan`) para analizar el item y disenar la implementacion
2. **Implementar** el item segun los steps definidos
3. **Tests**: Genera tests para la funcionalidad implementada
4. **Verificar**: Ejecuta los tests y asegura que pasen
5. **Commit**: Haz commit con mensaje descriptivo (conventional commits)
6. **Actualizar PRD**: En `planning/prd.json`:
   - Marca `passes: true` en el item completado
   - Actualiza `progress` del item a 100
   - Recalcula `progress.completed`, `progress.total`, y `progress.percentage`
7. **Actualizar Deliverable**: Refleja el avance en `planning/deliverable.md`

Solo marca un item como completado si los tests pasan.

### Documentacion Continua
- Manten `planning/deliverable.md` actualizado con:
  - Descripcion actual del proyecto
  - Arquitectura (incluir diagramas ASCII o Mermaid)
  - Estado actual y progreso
  - Decisiones tecnicas tomadas y su justificacion
- Genera diagramas cuando sea util:
  - Arquitectura del sistema
  - Flujo de datos
  - Modelos de datos
  - Secuencias de interaccion

### Convenciones
- Codigo limpio y documentado
- Tests para funcionalidad critica
- Commits descriptivos siguiendo conventional commits
