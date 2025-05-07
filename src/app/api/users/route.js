export async function POST(request) {
  const body = await request.json();
  return new Response(`User created: ${JSON.stringify(body)}`);
}