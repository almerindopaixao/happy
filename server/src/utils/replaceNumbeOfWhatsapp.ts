export default function replaceNumberOfWhatsapp(whatsapp: string): string {
  return whatsapp.replace(/\D/g, '');
}
