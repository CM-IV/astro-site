import type { APIRoute } from "astro";
import { Messages, db } from "astro:db";
// import { Client } from "revolt.js"


// const client = new Client();
// await client.loginBot("0qA-jpNAUyySyM28UVz8nZwPZb4ke9RaqfHVxtBoerZTUjUcn3CbuJ-bK4y53xl-");

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const content = data.get("message") as string;
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !content) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }
  // Do something with the data, then return a success response
  await db.insert(Messages).values({ name, email, content });

  //Send message via Revolt
  // await client.channels
  // await client.api.post(`/channels/c4-server/messages`, { content: "You got an email!" });

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
