export default function whatsappNumberMask(number: string): string {
  return number.replace(/\D/g, '');
}
