export type CalendareDay = {
  date: Date
  day: number
  month: number
  year: number
  weekday: number
  weekdayName: string
  weekdayNameAbbr: string
  isWeekend: boolean
  isToday: boolean
  isCurrentMonth: boolean
  isPast: boolean
  isFuture: boolean
  data: any
}

export type CalendarWeek = {
  days: (CalendareDay | null)[]
}

export type CalendarMonth = {
  year: number
  month: number
  weeks: CalendarWeek[]
}

export type CalendarOptions = {
  // year: number
  // month: number
  startDay?: number // 0 = sunday, 1 = monday
  selection?: 'multiple' | 'single' | 'range'
}

export class CalendarFactory {
  private startDay: number

  constructor(opts?: CalendarOptions) {
    this.startDay = opts?.startDay ?? 0
  }

  private getWeekdayName(weekday: number, abbr = false) {
    return new Intl.DateTimeFormat('en-US', {
      weekday: abbr ? 'short' : 'long',
    }).format(new Date(0, 0, weekday))
  }

  private createDate(year: number, month: number, day: number) {
    return new Date(year, month, day)
  }

  private createCalendarDay(year: number, month: number, day: number, monthOffset = 0): CalendareDay {
    const date = this.createDate(year, month, day)
    const weekday = date.getDay()
    const weekdayName = this.getWeekdayName(weekday, false)
    const weekdayNameAbbr = this.getWeekdayName(weekday, true)
    const isWeekend = weekday === 0 || weekday === 6
    const today = new Date()
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    const isCurrentMonth = date.getMonth() === month
    const isPast = !isToday && date < today
    const isFuture = date > today
    return {
      date,
      day,
      month: month + monthOffset,
      year,
      weekday,
      weekdayName,
      weekdayNameAbbr,
      isWeekend,
      isToday,
      isCurrentMonth,
      isPast,
      isFuture,
      data: null,
    }
  }

  private getNumDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
  }

  private getNumWeeksInMonth(year: number, month: number) {
    const firstDay = new Date(year, month, 1).getDay()
    const numDays = this.getNumDaysInMonth(year, month)
    const numDaysInMonthWithPadding = numDays + firstDay + (7 - ((numDays + firstDay) % 7))
    return numDaysInMonthWithPadding / 7
  }

  private createCalendarWeek(year: number, month: number, startDay: number): CalendarWeek {
    const days: (CalendareDay | null)[] = new Array(7).fill(null)
    for (let i = 0; i < 7; i++) {
      const day = startDay + i
      if (day <= 0 || day > this.getNumDaysInMonth(year, month)) {
        days[i] = null
      } else {
        days[i] = this.createCalendarDay(year, month, day)
      }
    }
    return { days }
  }

  getMonthName(month: number, abbr = false): string {
    return new Intl.DateTimeFormat('en-US', {
      month: abbr ? 'short' : 'long',
    }).format(new Date(0, month))
  }

  getDaysInWeek(abbr = false): string[] {
    const days: string[] = []
    for (let i = 0; i < 7; i++) {
      days.push(this.getWeekdayName(i, abbr))
    }
    return days
  }

  getDay(day?: number, month?: number, year?: number): CalendareDay {
    day = day ?? new Date().getDate()
    month = month ?? new Date().getMonth()
    year = year ?? new Date().getFullYear()
    return this.createCalendarDay(year, month, day)
  }

  getWeek(day?: number, month?: number, year?: number): CalendarWeek {
    day = day ?? new Date().getDate()
    month = month ?? new Date().getMonth()
    year = year ?? new Date().getFullYear()
    const startDay = day - new Date(year, month, day).getDay() + this.startDay
    return this.createCalendarWeek(year, month, startDay)
  }

  getMonth(month?: number, year?: number): CalendarMonth {
    month = month ?? new Date().getMonth()
    year = year ?? new Date().getFullYear()
    const numWeeks = this.getNumWeeksInMonth(year, month)
    const weeks: CalendarWeek[] = []
    let startDay = 1 - new Date(year, month, 1).getDay() + this.startDay
    for (let i = 0; i < numWeeks; i++) {
      weeks.push(this.createCalendarWeek(year, month, startDay))
      startDay += 7
    }
    return { year, month, weeks }
  }

  getYear(year?: number): CalendarMonth[] {
    year = year ?? new Date().getFullYear()
    const months: CalendarMonth[] = []
    for (let i = 0; i < 12; i++) {
      months.push(this.getMonth(i, year))
    }
    return months
  }
}
