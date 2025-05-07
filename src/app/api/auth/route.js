export async function GET(request) {
    return new Response('Auth GET route works');
  }
  
  export async function POST(request) {
    const data = await request.json();
    return new Response(`Received: ${JSON.stringify(data)}`);
  }