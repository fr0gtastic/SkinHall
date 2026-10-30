export const config = { runtime: 'edge' };

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path || path.includes('..')) {
    return new Response('Bad Request', { status: 400 });
  }

  const image = await fetch(`https://vinfo-api.com/${path}`, {
    headers: { Accept: 'image/*', 'User-Agent': 'SkinHall/1.0' },
  });

  if (!image.ok) {
    return new Response('Not Found', { status: image.status });
  }

  return new Response(image.body, {
    status: 200,
    headers: {
      'Content-Type': image.headers.get('Content-Type') || 'image/png',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=604800',
      'CDN-Cache-Control': 'public, s-maxage=604800',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
