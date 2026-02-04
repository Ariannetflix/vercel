export const config = {
  runtime: 'edge', // This is the magic line
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // Target your blocked domain
  url.hostname = 'worker.cubernets.com';
  url.protocol = 'https:';

  // Handle WebSocket Upgrade
  if (req.headers.get('upgrade') === 'websocket') {
    return fetch(url.toString(), {
      method: 'GET',
      headers: req.headers,
      // Pass the actual request to maintain the tunnel
    });
  }

  // Handle standard traffic
  const newReq = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.body,
    redirect: 'manual',
  });

  return fetch(newReq);
}
