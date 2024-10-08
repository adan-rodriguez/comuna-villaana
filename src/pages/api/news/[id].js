export const prerender = false;

import { app } from "@/firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const db = getFirestore(app);

export const PUT = async ({ params, request }) => {
  const { id } = params;
  const formData = await request.formData();

  const title = formData.get("title")?.toString();
  const lead = formData.get("lead")?.toString();
  const image = formData.get("image");
  const alt = formData.get("alt")?.toString();
  const body = formData.get("body")?.toString();

  let imageUrl;

  if (image && image.size > 0) {
    // Subir nueva imagen a Firebase Storage
    const storage = getStorage(app);
    const bucket = storage.bucket("comuna-villaana.appspot.com");
    const file = bucket.file(`news/${image.name}`);
    await file.save(Buffer.from(await image.arrayBuffer()), {
      metadata: { contentType: image.type },
    });
    imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
  }

  // Construir objeto con los datos actualizados
  const updatedData = {
    title,
    lead,
    alt,
    body,
  };

  if (imageUrl) {
    updatedData.imageUrl = imageUrl; // Solo se actualiza si se subió una nueva imagen
  }

  // Actualizar Firestore con los datos editados
  await db.collection("news").doc(id).update(updatedData);

  return new Response("Noticia actualizada con éxito", {
    status: 200,
  });
};

export const DELETE = async ({ params, redirect }) => {
  const { id } = params;
  if (!id) {
    return new Response("No se puede encontrar la noticia", {
      status: 404,
    });
  }

  try {
    await db.collection("news").doc(id).delete();
  } catch (error) {
    return new Response("Algo salió mal", {
      status: 500,
    });
  }

  return redirect("/dashboard");
};
