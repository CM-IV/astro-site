import type { APIRoute } from "astro";
import { Messages, db } from "astro:db";
import dayjs from "dayjs";

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
  // Do something with the data, then return a success response
  await db.insert(Messages).values({ name, email, content });

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};

export const GET: APIRoute = async () => {
  // Fetch todays messages from the DB
  const messages = await db.select().from(Messages);

  const todaysMessages = messages.filter((message) => {
    const messageDate = dayjs(message.date);
    const today = dayjs();
    return messageDate.isSame(today, 'day');
  });

  return new Response(
    JSON.stringify(todaysMessages), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}