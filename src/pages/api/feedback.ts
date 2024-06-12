import type { APIRoute } from "astro";
import { Messages, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const content = data.get("message") as string;

  if (!name || !email || !content) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  await db.insert(Messages).values({ name, email, content });

  await fetch(import.meta.env.NTFY_URL, {
    method: "POST",
    body: "Backup successful 😀",
  });

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
