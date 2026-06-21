export async function onRequest(context) {
  const { env } = context;
  const esc = (value) => String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '');

  const supabaseUrl = esc(env.SUPABASE_URL);
  const supabaseKey = esc(env.SUPABASE_KEY);
  const couplesPin = esc(env.COUPLES_APP_PIN);

  const script = `window.__ENV = {
  SUPABASE_URL: '${supabaseUrl}',
  SUPABASE_KEY: '${supabaseKey}',
  COUPLES_APP_PIN: '${couplesPin}'
};`;

  return new Response(script, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'max-age=300'
    }
  });
}
