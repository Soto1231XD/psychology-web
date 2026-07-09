import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import Calendar from 'react-calendar'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Tag,
  ListChecks,
  Clock,
  User,
} from 'lucide-react'
import { fetchBusyIntervals, type BusyInterval } from '../lib/googleCalendar'

type PatientType = 'Niño' | 'Adolescente' | 'Adulto'

type FormData = {
  nombre: string
  edad: string
  correo: string
  telefono: string
  nombrePadre: string
  relacion: string
  motivo: string
}

type Feedback = { type: 'success' | 'error'; message: string } | null

const WEEKDAY_SLOTS = [
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM',
]

const SATURDAY_SLOTS = [
  '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
  '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
]

function getSlotsForDate(d: Date | null): string[] {
  if (!d) return []
  const day = d.getDay()
  if (day === 6) return SATURDAY_SLOTS
  if (day >= 1 && day <= 5) return WEEKDAY_SLOTS
  return []
}

const isSunday = (d: Date) => d.getDay() === 0

function slotToDateTime(date: Date, slot: string): Date {
  const [time, meridiem] = slot.split(' ')
  const [hoursRaw, minutes] = time.split(':').map(Number)
  let hours = hoursRaw % 12
  if (meridiem === 'PM') hours += 12
  const result = new Date(date)
  result.setHours(hours, minutes, 0, 0)
  return result
}

function isSlotBusy(date: Date, slot: string, busy: BusyInterval[]): boolean {
  const slotStart = slotToDateTime(date, slot)
  return busy.some((b) => slotStart >= b.start && slotStart < b.end)
}

function getAvailableSlots(date: Date | null, busy: BusyInterval[]): string[] {
  if (!date) return []
  return getSlotsForDate(date).filter((slot) => !isSlotBusy(date, slot, busy))
}

const INITIAL_FORM: FormData = {
  nombre: '',
  edad: '',
  correo: '',
  telefono: '',
  nombrePadre: '',
  relacion: '',
  motivo: '',
}

const inputClass =
  'w-full border border-gray-200 rounded-xl p-2.5 bg-[#F9F6F0] focus:ring-2 focus:ring-dorado focus:border-transparent outline-none transition-shadow'

export default function Booking() {
  const [patientType, setPatientType] = useState<PatientType>('Adulto')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [busy, setBusy] = useState<BusyInterval[]>([])
  const availableSlots = getAvailableSlots(date, busy)

  useEffect(() => {
    const timeMin = new Date()
    const timeMax = new Date()
    timeMax.setDate(timeMax.getDate() + 120)
    fetchBusyIntervals(timeMin, timeMax).then(setBusy)
  }, [])

  useEffect(() => {
    if (time && !availableSlots.includes(time)) setTime('')
  }, [availableSlots, time])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const required: (keyof FormData)[] = ['nombre', 'edad', 'correo', 'telefono']
    if (patientType === 'Niño' || patientType === 'Adolescente') required.push('nombrePadre')

    for (const field of required) {
      if (!form[field]) {
        setFeedback({ type: 'error', message: `Por favor completa el campo: ${field}` })
        return
      }
    }
    if (!date) {
      setFeedback({ type: 'error', message: 'Selecciona una fecha en el calendario.' })
      return
    }
    if (!time) {
      setFeedback({ type: 'error', message: 'Selecciona un horario para tu cita.' })
      return
    }

    const edad = Number(form.edad)
    if (patientType === 'Niño' && (edad < 0 || edad > 12)) {
      setFeedback({
        type: 'error',
        message: 'La edad no coincide con el tipo de paciente Niño (0-12 años).',
      })
      return
    }
    if (patientType === 'Adolescente' && (edad < 13 || edad > 17)) {
      setFeedback({
        type: 'error',
        message: 'La edad no coincide con el tipo de paciente Adolescente (13-17 años).',
      })
      return
    }
    if (patientType === 'Adulto' && edad < 18) {
      setFeedback({
        type: 'error',
        message: 'La edad no coincide con el tipo de paciente Adulto (18+ años).',
      })
      return
    }

    setFeedback({
      type: 'success',
      message: `Cita agendada para ${date.toLocaleDateString()} a las ${time}`,
    })
    setForm(INITIAL_FORM)
    setDate(null)
    setTime('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfaf6] to-[#f7efe6] flex flex-col items-center px-4 py-14 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 bg-dorado/15 text-secundario font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
          <CalendarDays size={16} /> Reserva en línea
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-secundario mb-3">
          Agenda tu Cita
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Completa el formulario y selecciona la fecha para agendar tu sesión.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-6 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 min-w-[300px] bg-white shadow-xl shadow-secundario/5 rounded-3xl p-6 md:p-7"
        >
          <h2 className="text-xl font-semibold text-secundario mb-4 text-center font-display">
            Selecciona una Fecha
          </h2>
          <Calendar
            onChange={(v) => {
              setDate(v as Date)
              setTime('')
            }}
            value={date}
            minDate={new Date()}
            tileDisabled={({ date: d }) => {
              if (isSunday(d)) return true
              const slots = getSlotsForDate(d)
              return slots.length > 0 && slots.every((s) => isSlotBusy(d, s, busy))
            }}
            tileContent={({ date: d, view }) => {
              if (view !== 'month' || isSunday(d)) return null
              const hasBooking = getSlotsForDate(d).some((s) => isSlotBusy(d, s, busy))
              if (!hasBooking) return null
              const isSelected = date && d.toDateString() === date.toDateString()
              return (
                <span
                  className={`block w-1.5 h-1.5 rounded-full mx-auto mt-1 ${
                    isSelected ? 'bg-white' : 'bg-principal'
                  }`}
                />
              )
            }}
          />
          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500 mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-principal" /> Día con citas ya agendadas
          </p>

          <div className="mt-6 bg-[#F9F6F0] p-5 rounded-2xl border border-gray-100">
            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-secundario mb-3">
              <Tag size={18} className="text-dorado" /> Precios
            </h3>
            <p className="text-gray-700 font-medium text-center mb-2">Presencial y Online:</p>
            <ul className="text-gray-700 space-y-1 text-center mb-1">
              <li>
                Adultos: <span className="font-semibold text-secundario">$500</span>
              </li>
              <li>
                Niños y adolescentes: <span className="font-semibold text-secundario">$400</span>
              </li>
            </ul>

            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-secundario mt-5 mb-3">
              <ListChecks size={18} className="text-dorado" /> Para Reservar
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1.5">
              <li>Elige el horario disponible más conveniente a tu disponibilidad.</li>
              <li>Responde a las preguntas obligatorias para agendar.</li>
              <li>
                Una vez agendada tu cita, es importante comunicarte al{' '}
                <a
                  href="https://wa.me/529982642671?text=Hola%20quiero%20info%20sobre%20sesiones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-semibold hover:underline"
                >
                  WhatsApp
                </a>{' '}
                para que te pueda enviar la ubicación exacta y detalles importantes.
              </li>
            </ol>
          </div>

          <div className="mt-6 bg-[#F9F6F0] p-5 rounded-2xl border border-gray-100">
            <h3 className="flex items-center justify-center gap-2 text-lg font-semibold text-secundario mb-3">
              <Clock size={18} className="text-dorado" /> Hora de disponibilidad
            </h3>
            <ul className="text-gray-700 space-y-1 text-center">
              <li>Lunes a viernes: 4:00 pm a 8:00 pm</li>
              <li>Sábado: 2:30 pm a 6:30 pm</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="min-w-[300px] flex-1 bg-white shadow-xl shadow-secundario/5 rounded-3xl p-6 md:p-7 self-start"
        >
          <h2 className="flex items-center justify-center gap-2 text-xl font-semibold text-secundario mb-4 font-display">
            <User size={20} className="text-dorado" /> Tus Datos
          </h2>

          {date && (
            <div className="mb-4 text-center bg-principal/10 rounded-xl py-2">
              <span className="font-semibold text-principal">
                Fecha seleccionada: {date.toLocaleDateString()}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Tipo de paciente <span className="text-principal">*</span>
                </label>
                <select
                  value={patientType}
                  onChange={(e) => setPatientType(e.target.value as PatientType)}
                  className={inputClass}
                >
                  <option value="Niño">Niño</option>
                  <option value="Adolescente">Adolescente</option>
                  <option value="Adulto">Adulto</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Nombre completo <span className="text-principal">*</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Edad <span className="text-principal">*</span>
                </label>
                <input
                  type="number"
                  name="edad"
                  value={form.edad}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {(patientType === 'Niño' || patientType === 'Adolescente') && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Nombre del padre/madre/tutor <span className="text-principal">*</span>
                    </label>
                    <input
                      type="text"
                      name="nombrePadre"
                      value={form.nombrePadre}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Relación con el paciente
                    </label>
                    <input
                      type="text"
                      name="relacion"
                      value={form.relacion}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">Motivo de la consulta</label>
                <textarea
                  name="motivo"
                  value={form.motivo}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {date && (
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Selecciona un horario <span className="text-principal">*</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">-- Elige un horario --</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 w-full py-3.5 bg-secundario text-white font-semibold rounded-xl shadow-lg shadow-secundario/30 hover:bg-secundario-dark hover:shadow-xl transition-all"
            >
              Agendar Cita
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setFeedback(null)}
                aria-label="Cerrar"
              >
                <XCircle className="w-6 h-6" />
              </button>
              {feedback.type === 'success' ? (
                <>
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-700 mb-2 font-display">Cita Agendada</h3>
                  <p className="text-gray-600">{feedback.message}</p>
                </>
              ) : (
                <>
                  <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-red-700 mb-2 font-display">Error</h3>
                  <p className="text-gray-600">{feedback.message}</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
