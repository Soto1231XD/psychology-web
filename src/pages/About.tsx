import { motion } from 'framer-motion'
import { FaWhatsapp, FaFacebookF, FaTiktok } from 'react-icons/fa'
import { ClipboardList, MapPin, Video } from 'lucide-react'
import psicologa from '../assets/psicologa.jpg'
import consultorio from '../assets/consultorio.jpg'

const focusAreas = ['Terapia cognitivo-conductual', 'Niños', 'Adolescentes', 'Adultos', 'Ansiedad', 'Autoestima']

const infoCards = [
  {
    title: 'Tu consulta incluye',
    text: '1. Plan de terapia cognitiva a medida.\n2. Técnicas y herramientas para intervenir según el motivo de tu consulta.',
    icon: ClipboardList,
  },
  {
    title: 'Ubicación',
    text: 'Cancún, Q. Roo. Av. Kabah, SM 43.',
    icon: MapPin,
  },
  {
    title: 'Modalidad',
    text: 'Atención presencial y online.',
    icon: Video,
  },
]

const socials = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/529982642671',
    icon: FaWhatsapp,
    className: 'bg-[#25D366] hover:bg-[#1ebe5d]',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/17KmTutnfr/',
    icon: FaFacebookF,
    className: 'bg-[#1877F2] hover:bg-[#145dbf]',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@psic.elizabeth.so',
    icon: FaTiktok,
    className: 'bg-black hover:bg-[#333]',
  },
]

export default function About() {
  return (
    <div className="relative flex flex-col items-center text-center px-6 py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm pointer-events-none"
        style={{ backgroundImage: `url(${consultorio})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbf6]/90 via-[#fffaf8]/85 to-[#f1f1f1]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#e86b6115_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-6"
      >
        <img
          src={psicologa}
          alt="Psic. Elizabeth Soto"
          className="w-40 h-40 md:w-52 md:h-52 rounded-full shadow-2xl border-4 border-white ring-4 ring-principal/30 object-cover"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 font-display text-3xl md:text-5xl font-bold text-secundario mb-2"
      >
        Psic. Elizabeth Soto
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="relative z-10 text-principal font-medium mb-6"
      >
        Espacio Psicológico · Cancún
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="relative z-10 flex flex-wrap justify-center gap-2 mb-10 max-w-xl"
      >
        {focusAreas.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/80 border border-principal/20 text-secundario"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative max-w-3xl text-gray-700 text-lg mb-10 leading-relaxed z-10 bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm"
      >
        <p>
          Soy <span className="text-principal font-semibold">Elizabeth Soto</span>, psicóloga con
          formación en <span className="text-principal font-semibold">terapia cognitivo-conductual</span> y
          un enfoque centrado en el bienestar emocional.
        </p>
        <p className="mt-4">
          Acompaño a <span className="text-principal font-semibold">adultos, adolescentes y niños</span> en
          procesos terapéuticos enfocados en fortalecer la{' '}
          <span className="text-principal font-semibold">autoestima</span>, la{' '}
          <span className="text-principal font-semibold">gestión emocional</span>, el manejo de la{' '}
          <span className="text-principal font-semibold">ansiedad</span> y la{' '}
          <span className="text-principal font-semibold">depresión</span>.
        </p>
        <p className="mt-4">
          En el trabajo con <span className="text-principal font-semibold">niños</span>, abordo temas de{' '}
          <span className="text-principal font-semibold">problemas de aprendizaje y lectoescritura</span> en
          edades de preescolar hasta los 12 años, incorporando estrategias de{' '}
          <span className="text-principal font-semibold">estimulación temprana</span>.
        </p>
        <p className="mt-4">
          Concibo la terapia como un espacio seguro donde cada persona puede{' '}
          <span className="text-principal font-semibold">comprenderse, sanar y crecer</span>. Mi objetivo
          es acompañarte con empatía, escucha y respeto.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative flex flex-col md:flex-row gap-4 mb-16 z-10"
      >
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-2xl shadow-lg hover:scale-105 transition-all ${s.className}`}
          >
            <s.icon size={20} /> {s.label}
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto z-10 mt-10"
      >
        {infoCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="relative bg-white border border-gray-100 shadow-lg rounded-2xl p-6 text-gray-700 transition-shadow hover:shadow-xl overflow-hidden"
          >
            <div className="flex items-center mb-3">
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-principal/10 mr-3">
                <card.icon className="text-principal" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-secundario text-left">{card.title}</h3>
            </div>
            <p className="text-gray-600 whitespace-pre-line text-left">{card.text}</p>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e86b6115] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
