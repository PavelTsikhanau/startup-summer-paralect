export async function makeHttpCall(url, method = 'GET') {
  const response = await fetch(url, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzkzOWZkN2EzYWYwYTgyN2M2YmI3YjYxMTllOTU0YiIsInN1YiI6IjY2NGIzODNiMjdjMGU2OTMxOWVkM2UzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AUwDGglMTVwT9-OYHUH4Qrml_zReXFXKf01A5lr4ICc',
      accept: 'application/json',
    },
    method,
  });
  if (!response.ok) {
    throw new Error(`error: ${response.statusText}`);
  }
  return response.json();
}
