export type BusyInterval = { start: Date; end: Date }

type GoogleEvent = {
  start?: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
}

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY

/**
 * Reads busy blocks from Elizabeth's public Google Calendar (free/busy only,
 * no patient details) so the booking calendar can avoid double-booking.
 * Silently returns no busy times if the integration isn't configured or fails,
 * so booking keeps working even without Google Calendar set up.
 */
export async function fetchBusyIntervals(timeMin: Date, timeMax: Date): Promise<BusyInterval[]> {
  if (!CALENDAR_ID || !API_KEY) return []

  const params = new URLSearchParams({
    key: API_KEY,
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
  })

  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params}`,
    )
    if (!res.ok) return []

    const data: { items?: GoogleEvent[] } = await res.json()

    return (data.items ?? [])
      .map((event): BusyInterval | null => {
        if (event.start?.dateTime && event.end?.dateTime) {
          return { start: new Date(event.start.dateTime), end: new Date(event.end.dateTime) }
        }
        if (event.start?.date && event.end?.date) {
          // All-day event (e.g. a day off): block the entire day(s).
          return { start: new Date(`${event.start.date}T00:00:00`), end: new Date(`${event.end.date}T00:00:00`) }
        }
        return null
      })
      .filter((interval): interval is BusyInterval => interval !== null)
  } catch {
    return []
  }
}
