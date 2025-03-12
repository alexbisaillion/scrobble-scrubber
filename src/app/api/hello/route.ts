export async function GET() {
  const secretKey = process.env.MY_SECRET_API_KEY; // Securely access API key

  const data = {
    message: "Hello from the secure API!",
    apiKeyUsed: secretKey ? "✔️ (hidden from client)" : "❌ (missing)",
  };

  return Response.json(data);
}
