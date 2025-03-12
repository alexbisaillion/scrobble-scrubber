export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "Guest"; // Default to "Guest" if no name is provided

  const secretKey = process.env.MY_SECRET_API_KEY;

  const data = {
    message: `Hello, ${name}! Welcome to the secure API.`,
    apiKeyUsed: secretKey ? "✔️ (hidden from client)" : "❌ (missing)",
  };

  return Response.json(data);
}
