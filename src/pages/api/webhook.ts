import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    
    if (!request.headers.has("x-webhook-secret")) {
        return new Response(
            JSON.stringify({
              message: "Unauthorized",
            }),
            { status: 401 },
        );
    }

    const data = await request.text();
  
    return new Response(data, { 
            status: 200 
        },
    );
};