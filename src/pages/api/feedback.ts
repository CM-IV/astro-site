import type { APIRoute } from "astro";

type RateLimitStore = {
  [key: string]: {
    count: number;
    lastRequest: number;
  };
};

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 1; 

const checkRateLimit = (ip: string): boolean => {
  const currentTime = Date.now();
  
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = { count: 1, lastRequest: currentTime };
    return true;
  }

  const { count, lastRequest } = rateLimitStore[ip];

  if (currentTime - lastRequest > RATE_LIMIT_WINDOW) {
    rateLimitStore[ip] = { count: 1, lastRequest: currentTime };
    return true;
  }
  
  if (count < RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore[ip].count += 1;
    rateLimitStore[ip].lastRequest = currentTime;
    return true;
  }

  return false;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get("x-forwarded-for") || clientAddress;
  
  if (!ip || !checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        message: "Too many requests. Please try again later.",
      }),
      { status: 429 },
    );
  }

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

  await fetch(import.meta.env.NTFY_URL, {
    method: "POST",
    body: `You got a message from ${name} at ${email}:\n\n${content}`,
  });

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};