export const config = {
  runtime: 'edge', 
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 1. Point to your backend
  url.hostname = 'worker2.cubernets.com';
  url.protocol = 'https:';

  // 2. Clone headers and fix the Host header
  // Vercel sometimes passes its own host, which confuses the backend
  const newHeaders = new Headers(req.headers);
  newHeaders.set('Host', 'worker2.cubernets.com');

  // 3. Create the proxy request
  // We pass req.body directly to support xhttp/splitHttp streaming
  const proxyReq = new Request(url.toString(), {
    method: req.method,
    headers: newHeaders,
    body: req.body,
    redirect: 'manual',
    // 'duplex: half' is required by the spec when body is a stream
    duplex: 'half', 
  });

  try {
    // 4. Execute the fetch
    const response = await fetch(proxyReq);
    
    // Optional: Log status for debugging (check Vercel dashboard)
    console.log(`Proxying ${req.method} to ${url.hostname} - Status: ${response.status}`);
    
    return response;
  } catch (err) {
    return new Response(`Vercel Proxy Error: ${err.message}`, { status: 502 });
  }
}