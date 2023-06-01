import { CalendarFactory, CalendarMonth, CalendarOptions, CalendarWeek, CalendareDay } from './helpers/Calendar'
import { FiChevronLeft, FiChevronRight } from 'solid-icons/fi'
import { For, Show, createSignal } from 'solid-js'

import { FaRegularCircle } from 'solid-icons/fa'

export default function Calendar(props: {
  numWeeks?: number
  startDate?: Date
  includeWeekend?: boolean
  startDay?: 'sunday' | 'monday'
  onSelect?: (date: CalendareDay) => void
}) {
  const cf = new CalendarFactory()
  const now = new Date()
  const [currentMonth, setCurrentMonth] = createSignal<CalendarMonth>(cf.getMonth())
  const [nextMonth, setNextMonth] = createSignal<CalendarMonth>(cf.getMonth(now.getMonth() + 1, now.getFullYear()))
  const daysInWeek = cf.getDaysInWeek(true)

  const isPrevDisabled = () => {
    return currentMonth().month === cf.getMonth().month && currentMonth().year === cf.getMonth().year
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
    // console.log(day, ev)
    // debugger
    if (day) props.onSelect?.(day)
  }

  return (
    <div class="select-none">
      <div class="flex flex-col items-center justify-center gap-5">
        <div class="flex flex-col gap-2">
          <div class='flex items-center text-sm font-bold pl-2'>
            {cf.getMonthName(currentMonth().month, true)} {currentMonth().year}
            <div class='flex-grow'></div>
            <div class="flex items-center justify-center">
              <button class='h-6 w-8 !p-0' disabled={isPrevDisabled()} onClick={prev}>
                <FiChevronLeft class='w-4 h-4 pointer-events-none' />
              </button>
              <button class='h-6 w-8 !p-0' onClick={today}>
                <FaRegularCircle size={10} class='pointer-events-none' />
              </button>
              <button class='h-6 w-8 !p-0' onClick={next}>
                <FiChevronRight class='w-4 h-4 pointer-events-none' />
              </button>
            </div>
          </div>
          <div class="flex justify-center gap-3">
            <For each={daysInWeek}>
              {(day) => (
                <div class="flex items-center justify-center w-6 h-6 text-xs rounded-full text-neutral-500">
                  {day[0]}
                </div>
              )}
            </For>
          </div>
          <For each={currentMonth().weeks}>
            {(week) => (
              <Show when={isNotPastWeek(week)}>
                <div class="flex justify-center gap-3">
                  <For each={week.days}>
                    {(day) => (
                      <button class="flex items-center justify-center w-6 h-6 !p-0 font-normal text-xs !rounded-full"
                        onClick={(ev: any) => selectDay(day, ev)}
                        disabled={day === null || day.isPast}
                        classList={{
                          'invisible': day === null,
                          '!bg-sky-500 !text-white font-bold': day?.isToday,
                          'text-neutral-500': day?.isWeekend,
                          'text-neutral-300': day?.isPast,
                        }}>
                        {day?.day}
                      </button>
                    )}
                  </For>
                </div>
              </Show>
            )}
          </For>
        </div>

        {/* <div class="flex flex-col gap-2 pt-6">
          <div class='text-sm font-bold pl-2 border-b pb-2'>{cf.getMonthName(nextMonth().month)}</div>
          <For each={nextMonth().weeks}>
            {(week) => (
              <Show when={isNotPastWeek(week)}>
                <div class="flex justify-center gap-3">
                  <For each={week.days}>
                    {(day) => (
                      <Button class="flex items-center justify-center w-6 h-6 !p-0 font-normal text-xs !rounded-full"
                        disabled={day === null}
                        classList={{
                          'invisible': day === null,
                          '!bg-sky-500 !text-white font-bold': day?.isToday,
                          'text-neutral-500': day?.isWeekend,
                          'text-neutral-300': day?.isPast,
                        }}>
                        {day?.day}
                      </Button>
                    )}
                  </For>
                </div>
              </Show>
            )}
          </For>
        </div> */}
      </div>
    </div>
  )
}
