# Gimnasio API — Código base (Semana 5)

API REST en NestJS para el gimnasio: `Clases`, `Horarios`, `Miembros` e `Inscripciones`, cada
módulo con dominio, DTOs e infraestructura separados (patrón repositorio + inyección por token).
Los datos viven en memoria — ningún repositorio se conecta todavía a una base de datos real.

Este proyecto es el punto de partida de la Práctica 8 (Prisma) y la Práctica 9 (Blindar la API).

## Cómo correrlo

```bash
npm install
npm run start:dev
```

El servidor levanta en `http://localhost:3000`. En `peticiones.http` está la batería completa de
pruebas (requiere la extensión "REST Client" de VS Code).

## Estructura

```
src/
  clases/        CRUD de clases del gimnasio
  horarios/      CRUD de horarios (día, hora, cupo, entrenador)
  miembros/      CRUD de miembros del gimnasio
  inscripciones/ inscribir a un miembro a un horario, con reglas de cupo y duplicados
  datos/         datos de arranque (seed) que usan Horarios y Miembros
```

Cada módulo sigue la misma forma: `dominio/` (entidades + interfaz del repositorio), `dto/`,
`infra/` (repositorio en memoria) y el token de inyección en `<módulo>.tokens.ts`.

---Parte 1
1. ¿Por qué el filtro atrapa la clase base y no cada error por separado?
   Porque @Catch(ErrorDeDominio) atrapa esa clase y todas sus hijas, así que un solo filtro cubre los cuatro errores actuales y cualquier error nuevo que se agregue después.

2. ¿Por qué el middleware no podría decidir si un usuario tiene permiso para una ruta?
   Porque corre antes de que Nest sepa qué controller y qué método va a atender la petición. Solo recibe la petición y la respuesta de Express, sin acceso a los metadatos de los decoradores (@Publico(), @Roles()). Para decidir permisos hace falta saber a qué meétodo va la petición, y eso solo lo tiene un Guard, que recibe el ExecutionContext.

3. ¿Por qué la petición que responde 409 no aparece en ese registro?
   Porque el interceptor usa tap, que solo corre cuando el controller respondió bien. Cuando el service lanza un errro, la petición sale por el camino de errores y llega directo al filtro, sin pasar por el tap. Esa petición sí queda registrada, pero por el filtro, con su línea WARN [Dominio].

4. ¿Por qué este cambio rompe a cualquier cliente que ya estuviera usando la API?
   Porque cambia la forma de la respuesta, que es parte del contrato. Antes GET/clases devolvía un arreglo y el cliente leía res[0]; ahora devuelve {data, meta } y hay que leer res.data[0]. Un cliente que no actualice recibirá un objeto donde esperaba un arreglo y fallará. Por eso se decide ahora, antes de que el frontend de React empiece a consumir la API.

5. Si el servidor respondió en los dos casos, ¿quién bloquea y a quién protege?
   Bloquea el navegador, no el servidor. El servidor responde a cualquier origen, pero con Orgini: http//localhost:5173 incluye Access-Control-Allow-Origin y con http://localhost: 400 no lo incluye. Sin ese encabezado, el navegador no deja que el JavaScript de esa página lea la respuesta. Protege al usuario: evita que una paágina maliciosa, abierta en en su navegadro, use su sesión para leer datos de otra API. CORS no protege al servidor de herramientas como Postman o curl, que no aplican esa regla.

---Parte 2

1. ¿Por qué el campo se llama passwordHash y no password?
   Porque nunca guarda la contraseña, sino su hash de bcrypt. Con ese nombre es muy difícil guardar la contraseña en claro por descuido, ya que el nombre del campo obliga a pensar qué se está guardando. Así, si se filtra la base de datos, no se filtran las contraseñas.

2. ¿Por qué los dos errores del inicio de sesión dicen exactamente lo mismo?
   Para no revelar qué correos existen. Si "correo no registrado" y "contraseña incorrecta" dieran mensajes distintos, un atacante podría probar correos uno por uno y saber cuáles tienen cuenta. Con el mismo mensaje (Credencialesinvalidas) y el mismo 401, no puede distinguirlos.

3. Si el contenido del token se puede leer, ¿qué es lo que protege la firma?
   La integridad, no la confidencialidad. Cualquiera puede leer el payload (en jwt.io seven sub, correo, rol, miembroId y las fechas, sin necesidad del secreto), pero nadie puede modificarlo sin que la firma deje de cuadrar. Solo quien tiene JWT_SECRET puede firmar un token válido. Por eso en el payload no va nada secreto.

4. ¿Por qué es más seguro proteger todo y abrir a mano, que al revés?
   Porque el error de omisión se nota. Si alguien olvida poner @Publico() en una ruta, esa ruta da 401 y se detecta enseguida. Si fuera al revés, olvidar proteger una ruta dejaría un hueco abierto que nadie ve. Con el guard global, lo seguro es el valor por omisión.

5. ¿Cuál es la diferencia entre un 401 y un 403?
   El 401 significa "no sé quien eres": falta el token, está vencido o la firma no es válida. El 403 significa "sé quién eres, pero no tienes permiso": el token es válido, pero tu rol o tus datos no alcanzan para esa acción.

6. ¿Cuántas líneas del AuthService tuvieron que cambiar para pasar de memoria a MySQL? ¿Por qué?
   Ninguna. El único cambio fue una línea en auth.module.ts: useClass: UsuarioMemoriaRepository por useClass: UsuarioPrismaRepository. El AuthService depende de la interfaz UsuarioRepository, que se inyecta con el token USUARIO_REPOSITORY, y no sabe si detrás hay memoria o MySQL.

7. ¿Por qué es importante tomar al usuario de los claims del token y no de la URL o del cuerpo?
   Porque la URL y el cuerpo los controla el cliente, y el cliente puede mandar lo que quiera. El token, en cambio, lo firma el servidor.
