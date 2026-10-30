export default async function handler() {
  const res = await fetch('https://httpbin.org/headers', {
    headers: { 'User-Agent': 'SkinHall/1.0' },
  });
  const data = await res.json();
  return Response.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
