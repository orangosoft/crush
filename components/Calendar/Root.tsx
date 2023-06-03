import './Root.css'

import { CalendarFactory, CalendarMonth, CalendarOptions, CalendarWeek, CalendareDay } from './helpers/Calendar'
import { FiChevronLeft, FiChevronRight } from 'solid-icons/fi'
import { For, Show, createSignal } from 'solid-js'

import { FaRegularCircle } from 'solid-icons/fa'

export default function Calendar(props: {
  options?: CalendarOptions
  onSelect?: (date: CalendareDay) => void
}) {
  const cf = new CalendarFactory()
  const now = new Date()
  const [currentMonth, setCurrentMonth] = createSignal<CalendarMonth>(cf.getMonth())
  const [nextMonth, setNextMonth] = createSignal<CalendarMonth>(cf.getMonth(now.getMonth() + 1, now.getFullYear()))
  const daysInWeek = cf.getDaysInWeek(true)

  const isPrevDisabled = () => {
    // return currentMonth().month === cf.getMonth().month && currentMonth().year === cf.getMonth().year
    return false
  }

  const prev = (ev: MouseEvent) => {
    ev.stopPropagation()
    const date = new Date(currentMonth().year, currentMonth().month - 1)
    setCurrentMonth(cf.getMonth(date.getMonth(), date.getFullYear()))
    setNextMonth(cf.getMonth(date.getMonth() + 1, date.getFullYear()))
  }

  const next = (ev: MouseEvent) => {
    ev.stopPropagation()
    const date = new Date(currentMonth().year, currentMonth().month + 1)
    setCurrentMonth(cf.getMonth(date.getMonth(), date.getFullYear()))
    setNextMonth(cf.getMonth(date.getMonth() + 1, date.getFullYear()))
  }

  const today = (ev: MouseEvent) => {
    ev.stopPropagation()
    setCurrentMonth(cf.getMonth())
    setNextMonth(cf.getMonth(now.getMonth() + 1, now.getFullYear()))
  }

  const isNotPastWeek = (week: CalendarWeek) => {
    return week.days[week.days.length - 1]?.isPast === false
  }

  const selectDay = (day: CalendareDay | null, ev: PointerEvent) => {
    if (day) props.onSelect?.(day)
  }

  return (
    <div class="calendar">
      <div class='calendar__header'>
        {cf.getMonthName(currentMonth().month, true)} {currentMonth().year}
        <div class="calendar__nav">
          <button disabled={isPrevDisabled()} onClick={prev}>
            <FiChevronLeft />
          </button>
          <button onClick={today}>
            <FaRegularCircle size={10} />
          </button>
          <button onClick={next}>
            <FiChevronRight />
          </button>
        </div>
      </div>
      <div class="calendar__weekdays">
        <For each={daysInWeek}>
          {(day) => (
            <div class="calendar__weekday">
              {day[0]}
            </div>
          )}
        </For>
      </div>
      <For each={currentMonth().weeks}>
        {(week) => (
          <div class="calendar__week">
            <For each={week.days}>
              {(day) => (
                <button class="calendar__day"
                  onClick={(ev: any) => selectDay(day, ev)}
                  disabled={day === null || day.isPast}
                  classList={{
                    'calendar__day-none': day === null,
                    'calendar__day-today': day?.isToday,
                    'calendar__day-weekend': day?.isWeekend,
                    'calendar__day-past': day?.isPast,
                  }}>
                  {day?.day}
                </button>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}
