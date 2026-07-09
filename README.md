# Espacio Psicológico — Psic. Elizabeth Soto

Sitio web con 3 secciones: Inicio, Conóceme y Citas (agendar cita). Construido con Vite + React + TypeScript + Tailwind CSS v4 + React Router + Framer Motion.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Sincronización con Google Calendar (opcional)

La página de Citas puede leer el Google Calendar de Elizabeth para marcar automáticamente
los horarios ya ocupados y evitar que alguien agende encima de una cita existente. Es de
**un solo sentido**: el sitio solo lee su calendario, nunca escribe en él. Si no se
configura, el sitio funciona igual, solo que sin este bloqueo automático.

### 1. Compartir el calendario como público (solo disponibilidad)

En [Google Calendar](https://calendar.google.com) → ⚙️ Configuración → click en el
calendario de Elizabeth → **"Permisos de acceso"**:

- Marcar **"Hacer disponible para el público"**
- Elegir **"Ver solo información de disponibilidad (ocultar detalles)"**

Esto es importante: así el sitio solo puede ver qué horas están "ocupadas", nunca los
nombres ni motivos de consulta de sus pacientes.

### 2. Obtener el ID del calendario

En la misma pantalla de configuración del calendario, bajar hasta **"Integrar calendario"**
y copiar el **"ID de calendario"**. Si es su calendario principal, normalmente es su
propio correo de Gmail.

### 3. Crear una API key en Google Cloud Console

1. Ir a [Google Cloud Console](https://console.cloud.google.com/) y crear un proyecto (o usar uno existente).
2. Habilitar la **Google Calendar API** (menú "APIs y servicios" → "Habilitar APIs y servicios").
3. Crear una **API key** en "Credenciales".
4. Restringir la key:
   - **Restricciones de API**: solo "Google Calendar API".
   - **Restricciones de la aplicación**: "Referentes HTTP", agregando el dominio del sitio
     (ej. `https://sweet-haupia-976850.netlify.app/*` y tu dominio final si cambia).

### 4. Configurar las variables de entorno

Copiar `.env.example` a `.env.local` para desarrollo local:

```bash
VITE_GOOGLE_CALENDAR_ID=correo-de-elizabeth@gmail.com
VITE_GOOGLE_CALENDAR_API_KEY=la-api-key-restringida
```

Para producción en Netlify: **Site settings → Environment variables**, agregar esas mismas
dos variables, y volver a desplegar (los valores se incrustan en el build, un cambio
requiere un nuevo deploy).
