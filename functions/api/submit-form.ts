// See https://developers.cloudflare.com/pages/functions/typescript/
// FIX: Define the PagesFunction type for Cloudflare Pages Functions, as it was not globally available.
type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
}) => Promise<Response>;

interface Env {
  GOOGLE_CHAT_WEBHOOK_URL: string;
}

interface RequestBody {
    text: string;
}

// onRequestPost is a convention for handling POST requests in Cloudflare Pages Functions.
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const webhookUrl = env.GOOGLE_CHAT_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('GOOGLE_CHAT_WEBHOOK_URL environment variable not set.');
      return new Response(JSON.stringify({ message: 'Server configuration error.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body: RequestBody = await request.json();
    if (!body || typeof body.text !== 'string') {
        return new Response(JSON.stringify({ message: 'Invalid request body. "text" property is required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const payload = {
        text: body.text
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Webhook failed with status ${response.status}: ${errorText}`);
        throw new Error(`Webhook failed`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(JSON.stringify({ message: 'Error submitting form.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};