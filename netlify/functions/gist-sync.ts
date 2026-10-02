import type { Handler } from "@netlify/functions";

const GIST_ID = process.env.GH_GIST_ID;
const TOKEN = process.env.GH_TOKEN; // ¡Sin el prefijo VITE_!
const FILE_NAME = "weekly-state.json";

export const handler: Handler = async (event: any) => {
  if (!TOKEN || !GIST_ID) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Faltan variables en el servidor" }),
    };
  }

  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "Netlify-Function",
  };

  try {
    // GET: Leer estado
    if (event.httpMethod === "GET") {
      const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        headers,
      });
      const json = await res.json();
      const file = json.files?.[FILE_NAME];
      return {
        statusCode: 200,
        body: JSON.stringify(
          file?.content ? JSON.parse(file.content) : { chores: [], done: {} },
        ),
      };
    }

    // POST: Guardar estado
    if (event.httpMethod === "POST") {
      const state = JSON.parse(event.body || "{}");
      const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          files: { [FILE_NAME]: { content: JSON.stringify(state, null, 2) } },
        }),
      });

      if (!res.ok) throw new Error(`GitHub error: ${res.status}`);
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: String(error) }) };
  }
};
