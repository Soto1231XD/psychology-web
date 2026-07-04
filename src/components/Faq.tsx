import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type Item = { question: string; answer: string }

const items: Item[] = [
  {
    question: '¿Necesito una remisión médica para asistir a terapia?',
    answer:
      'No es necesario. Puedes agendar tu cita directamente desde esta página cuando sientas que es momento de comenzar tu proceso.',
  },
  {
    question: '¿Las sesiones son confidenciales?',
    answer:
      'Sí. Todo lo que se comparte en consulta se maneja con estricta confidencialidad y ética profesional.',
  },
  {
    question: '¿Ofrecen sesiones en línea?',
    answer:
      'Sí, la atención es presencial en Cancún y también en modalidad online para quien lo prefiera.',
  },
  {
    question: '¿Cómo sé qué tipo de paciente soy al agendar?',
    answer:
      'Selecciona la categoría según la edad de quien recibirá la terapia: Niño (0-12 años), Adolescente (13-17 años) o Adulto (18+ años).',
  },
  {
    question: '¿Qué pasa si necesito cambiar mi cita?',
    answer:
      'Escríbenos por WhatsApp con anticipación y con gusto te ayudamos a reagendar tu sesión.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-2xl border border-gray-100 bg-white shadow-sm">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-secundario">{item.question}</span>
              <ChevronDown
                className={`shrink-0 text-principal transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                size={20}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
