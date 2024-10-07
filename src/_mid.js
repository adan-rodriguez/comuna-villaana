// // src/middleware.js
// import { getAuth } from "firebase-admin/auth";
// import { app } from "../firebase/server";

// export async function onRequest(context, next) {
//   console.log("mid");

//   const { request, locals, redirect } = context;

//   // Verifica si la ruta comienza con "/dashboard"
//   const pathname = new URL(request.url).pathname;
//   if (pathname.startsWith("/dashboard")) {
//     const auth = getAuth(app);

//     // Verificar si la cookie de sesión está presente
//     const sessionCookie = request.headers
//       .get("cookie")
//       ?.split(";")
//       .find((cookie) => cookie.trim().startsWith("__session"))
//       ?.split("=")[1];

//     if (!sessionCookie) {
//       return redirect("/login"); // Redirigir si no hay cookie
//     }

//     try {
//       // Verifica la cookie de sesión
//       const decodedCookie = await auth.verifySessionCookie(sessionCookie);
//       const user = await auth.getUser(decodedCookie.uid);

//       // Guardar los detalles del usuario en locals para acceder a ellos en la página
//       locals.user = user;
//     } catch (error) {
//       // Redirigir al login si la verificación falla
//       return redirect("/login");
//     }
//   }

//   // Si no es una ruta de dashboard, o si la autenticación es exitosa, continuar
//   return next();
// }

// export function onRequest(context, next) {
//   console.log("mid");

//   // devuelve una respuesta o el resultado de llamar a `next()`.
//   return next();
// }
