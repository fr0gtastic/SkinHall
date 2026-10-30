export const config = { runtime: 'edge' };

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path || path.includes('..')) {
    return new Response('Bad Request', { status: 400 });
  }

  const upstream = `https://vinfo-api.com/${path}`;

  // fetch() from Edge does not forward the visitor's IP.
  const image = await fetch(upstream, {
    headers: { Accept: 'image/*', 'User-Agent': 'SkinHall/1.0' },
  });

  if (!image.ok) {
    return new Response('Not Found', { status: image.status });
  }

  return new Response(image.body, {
    status: 200,
    headers: {
      'Content-Type': image.headers.get('Content-Type') || 'image/png',
      // This is what actually drives Vercel's edge cache.
      'Vercel-CDN-Cache-Control': 'public, s-maxage=604800',
      'CDN-Cache-Control': 'public, s-maxage=604800',
      // Browser cache, shorter than edge.
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
