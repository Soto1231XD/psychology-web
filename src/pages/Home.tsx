import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, HeartHandshake, Leaf, ShieldCheck, MapPin, Laptop, ArrowRight, CalendarCheck, ClipboardList, Sparkles } from 'lucide-react'
import logo from '../assets/logo.png'
import Faq from '../components/Faq'

const benefits = [
  {
    title: 'Autoconocimiento',
    text: 'Descubre tus emociones, fortalezas y áreas de mejora para comprenderte mejor.',
    icon: Brain,
  },
  {
    title: 'Gestión emocional',
    text: 'Aprende herramientas para manejar la ansiedad, el estrés y la tristeza.',
    icon: Leaf,
  },
  {
    title: 'Relaciones sanas',
    text: 'Mejora la comunicación y la empatía con las personas que te rodean.',
    icon: HeartHandshake,
  },
]

const trust = [
  { label: 'Confidencial', icon: ShieldCheck },
  { label: 'Presencial y online', icon: Laptop },
  { label: 'Cancún, Q. Roo', icon: MapPin },
]

const steps = [
  {
    title: 'Agenda tu cita',
    text: 'Elige la fecha y el horario que mejor se acomode a tu disponibilidad.',
    icon: CalendarCheck,
  },
  {
    title: 'Cuéntame tu proceso',
    text: 'Completa un breve formulario para conocer el motivo de tu consulta.',
    icon: ClipboardList,
  },
  {
    title: 'Comienza a sanar',
    text: 'Iniciamos un acompañamiento a tu ritmo, con empatía y sin juicios.',
    icon: Sparkles,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center overflow-hidden">
      {/* Hero */}
      <section className="relative w-full px-6 pt-20 pb-24 bg-gradient-to-b from-[#fbfbf6] via-[#fffaf8] to-[#f1f1f1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#e86b6115_0%,_transparent_70%)] pointer-events-none" />
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-principal/10 blur-3xl pointer-events-none"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-dorado/15 blur-3xl pointer-events-none"
          aria-hidden
        />

        <motion.img
          src={logo}
          alt="Espacio Psicológico"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-28 md:w-32 mx-auto mb-6 rounded-full shadow-lg ring-4 ring-white"
        />

        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block bg-principal/10 text-principal font-semibold text-sm px-4 py-1.5 rounded-full mb-5"
        >
          Espacio Psicológico en Cancún
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative font-display text-4xl md:text-6xl font-bold text-secundario mb-5 leading-tight"
        >
          Bienvenidos al <span className="text-principal italic">espacio psicológico</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Un lugar para cuidar tu mente, reconectar contigo mismo y encontrar el equilibrio
          emocional que mereces. 🌿
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <Link
            to="/citas"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-principal text-white text-lg font-semibold rounded-2xl shadow-lg shadow-principal/30 hover:bg-principal-dark hover:shadow-xl transition-all duration-300"
          >
            Agendar una cita
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/conoceme"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-secundario text-lg font-semibold rounded-2xl border border-gray-200 hover:border-principal/40 hover:text-principal transition-all duration-300"
          >
            Conóceme
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {trust.map((t) => (
            <span key={t.label} className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <t.icon size={18} className="text-principal" />
              {t.label}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="w-full py-20 bg-white">
        <span className="text-dorado font-semibold uppercase tracking-widest text-xs">Beneficios</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secundario mt-2 mb-12">
          ¿Por qué acudir a terapia?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20 max-w-6xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-fondo shadow-md rounded-2xl p-8 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-principal/10 mb-5 mx-auto">
                <b.icon className="text-principal" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-secundario mb-2">{b.title}</h3>
              <p className="text-gray-600 leading-relaxed">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full py-20 bg-fondo px-6">
        <span className="text-dorado font-semibold uppercase tracking-widest text-xs">Proceso</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secundario mt-2 mb-14">
          Cómo funciona
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-0.5 bg-principal/20" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center"
            >
              <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-white border-2 border-principal shadow-md mb-5">
                <step.icon className="text-principal" size={26} />
              </div>
              <h3 className="text-lg font-semibold text-secundario mb-2">
                {i + 1}. {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-20 bg-white px-6">
        <span className="text-dorado font-semibold uppercase tracking-widest text-xs">Preguntas frecuentes</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secundario mt-2 mb-12">
          Resolvemos tus dudas
        </h2>
        <Faq />
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 relative bg-gradient-to-b from-[#fbfbf6] via-[#fffaf8] to-[#f1f1f1] px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#e86b6115_0%,_transparent_70%)] pointer-events-none" />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative font-display text-3xl md:text-4xl font-bold mb-4 text-secundario"
        >
          Tu historia merece ser escuchada.
        </motion.h2>
        <p className="relative max-w-2xl mx-auto mb-8 text-gray-600 text-lg">
          Inicia tu proceso terapéutico y date el permiso de sentirte bien.
        </p>
        <Link
          to="/citas"
          className="relative inline-flex items-center gap-2 bg-principal text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-principal/30 hover:bg-principal-dark hover:shadow-xl transition-all"
        >
          Agendar mi cita
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}
