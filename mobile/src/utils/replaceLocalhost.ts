export default function(url: string): string {
  return url.replace('localhost', '10.0.0.105');
}