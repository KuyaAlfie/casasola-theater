export function safeUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return '';
    return url.href;
  } catch { return ''; }
}
export function theaterUrl(value) {
  const url = safeUrl(value);
  return url ? `https://www.youtube.com/redirect?q=${encodeURIComponent(url)}` : '';
}
