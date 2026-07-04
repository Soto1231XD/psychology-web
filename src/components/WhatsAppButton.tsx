import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/529982642671?text=Hola%20quiero%20info%20sobre%20sesiones"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 hover:bg-[#1ebe5d] transition-all"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}
