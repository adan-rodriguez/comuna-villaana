export const prerender = false;

import { app } from "../../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { v4 as uuidv4 } from "uuid"; // Para generar nombres únicos
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export const POST = async ({ request, redirect }) => {
  const formData = await request.formData();
  // const isChecked = formData.get("isChecked") === "on"; // checkbox
  const title = formData.get("title")?.toString();
  const lead = formData.get("lead")?.toString();
  const image = formData.get("image");
  const alt = formData.get("alt")?.toString();
  const body = formData.get("body")?.toString();
  console.log({ title, lead, image, alt, body });

  if (!title || !lead || !image || !alt || !body) {
    return new Response("Faltan campos obligatorios", {
      status: 400,
    });
  }

  try {
    const db = getFirestore(app);
    const storage = getStorage(app);

    // Genera un nombre único para la imagen
    const imageName = `${uuidv4()}_${image.name}`;
    const bucket = storage.bucket("comuna-villaana.appspot.com");

    // Usar el directorio temporal del sistema
    const tempFilePath = path.join(os.tmpdir(), imageName);

    // Guardar temporalmente la imagen en el servidor (para luego subirla)
    // const tempFilePath = path.join("/tmp", imageName);

    const buffer = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(tempFilePath, buffer);

    // Subir la imagen a Firebase Storage
    await bucket.upload(tempFilePath, {
      destination: `images/${imageName}`,
      public: true,
      metadata: {
        contentType: image.type, // Asegúrate de que se guarde el tipo de imagen correcto
      },
    });

    // Obtener la URL pública de la imagen subida
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/images/${imageName}`;

    // Generar el slug del título quitando caracteres especiales
    const slugify = (text) =>
      text
        .toString()
        .normalize("NFD") // Normaliza a descomposición de caracteres
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .replace(/[^a-zA-Z0-9\s]/g, "") // Elimina caracteres especiales
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"); // Reemplaza espacios con guiones

    const titleSlug = slugify(title);

    // Formatear la fecha actual como DD-MM-YY
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "-");

    // Concatenar el título y la fecha para formar el ID
    const customId = `${titleSlug}-${formattedDate}`;

    const newsRef = db.collection("news").doc(customId); // Usar el ID personalizado
    await newsRef.set({
      title,
      lead,
      imageUrl,
      alt,
      body,
      createdAt: today,
    });

    // Elimina el archivo temporal del servidor
    // fs.unlinkSync(tempFilePath);

    // Usar la versión asíncrona
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo temporal:", err);
      } else {
        console.log("Archivo temporal eliminado");
      }
    });
  } catch (error) {
    console.error("Error subiendo imagen o guardando noticia:", error);
    return new Response("Algo salió mal", {
      status: 500,
    });
  }

  return redirect("/dashboard");
};
