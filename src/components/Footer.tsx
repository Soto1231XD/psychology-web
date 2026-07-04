import { Link } from 'react-router-dom'
import { FaWhatsapp, FaFacebookF, FaTiktok } from 'react-icons/fa'
import { MapPin, Mail } from 'lucide-react'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer className="w-full bg-[#2b2622] text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Espacio Psicológico" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-display text-lg font-semibold text-white">Psic. Elizabeth Soto</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Un espacio para cuidar tu mente, reconectar contigo mismo y encontrar el equilibrio
            emocional que mereces.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://wa.me/529982642671"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#25D366] transition-colors"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href="https://www.facebook.com/share/17KmTutnfr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition-colors"
            >
              <FaFacebookF size={16} />
            </a>
            <a
              href="https://www.tiktok.com/@psic.elizabeth.so"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-black transition-colors"
            >
              <FaTiktok size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-principal transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/conoceme" className="hover:text-principal transition-colors">
                Conóceme
              </Link>
            </li>
            <li>
              <Link to="/citas" className="hover:text-principal transition-colors">
                Agendar Cita
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contacto</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-principal mt-0.5 shrink-0" />
              Cancún, Q. Roo. Av. Kabah, SM 43.
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp size={16} className="text-principal shrink-0" />
              <a
                href="https://wa.me/529982642671"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-principal transition-colors"
              >
                +52 998 264 2671
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-principal shrink-0" />
              Atención presencial y online
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="text-center text-xs text-gray-500 py-5">
          © {new Date().getFullYear()} Espacio Psicológico · Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
