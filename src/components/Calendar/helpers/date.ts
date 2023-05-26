export const formatDate = (date?: Date | string | number) => {
  if (!date) return ''
  // return YYYY-MM-DD
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

export const formatToMilitaryTime = (date?: Date | string | number) => {
  if (!date) return ''
  // return HH:MM
  const d = new Date(date)
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

export const formatToStandardTime = (time?: string) => {
  if (!time) return ''
  // convert 24 hour time to 12 hour time
  const [hour, minute] = time.split(':')
  const h = parseInt(hour)
  const m = parseInt(minute)
  const ampm = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, '0')}${ampm}`
}

export const parseDate = (date: string) => {
  // parse YYYY-MM-DD
  const [year, month, day] = date.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export const parseTime = (time: string) => {
  // parse HH:MM
  const [hour, minute] = time.split(':')
  return new Date(0, 0, 0, parseInt(hour), parseInt(minute))
}

export const parseDateTime = (date: string, time: string) => {
  if (!date || !time) return
  // parse YYYY-MM-DD HH:MM
  const [year, month, day] = date.split('-')
  const [hour, minute] = time.split(':')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute))
}

// get today of the week first 3 letters
export const today = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return {
    label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date,
    value: formatDate(date),
  }
}

export const tomorrow = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 1)
  return {
    label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date,
    value: formatDate(date),
  }
}

export const laterThisWeek = () => {
  // in 2 days
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 2)
  return {
    label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date,
    value: formatDate(date),
  }
}

// upcoming saturday
export const thisWeekend = () => {
  // find the saturday for this week and return it
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -5 : 1) + 5
  return {
    label: new Date(date.setDate(diff)).toLocaleDateString('en-US', { weekday: 'short' }),
    date: new Date(date.setDate(diff)),
    value: formatDate(date.setDate(diff)),
  }
}

// find the monday for next week and return it
export const nextWeek = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 7
  return {
    // format label like so Mon Apr 24
    label: new Date(date.setDate(diff)).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
    date: new Date(date.setDate(diff)),
    value: formatDate(date.setDate(diff)),
  }
}

export const hasTime = (date: Date | string) => {
  const d = new Date(date)
  if (d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0) {
    return false
  }
  return true
}

export const getDateTimeLabel = (date?: Date | string) => {
  if (!date) return ''
  const d = new Date(date)
  // if date is yesterday return Yesterday
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  if (
    yesterday.getFullYear() === d.getFullYear() &&
    yesterday.getMonth() === d.getMonth() &&
    yesterday.getDate() === d.getDate()
  ) {
    return 'Yesterday'
  }

  // if date is today return Today
  const today = new Date()
  if (today.getFullYear() === d.getFullYear() && today.getMonth() === d.getMonth() && today.getDate() === d.getDate()) {
    if (hasTime(date)) {
      return formatToStandardTime(formatToMilitaryTime(date))
    }
    return 'Today'
  }

  // if date is tomorrow return Tomorrow
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (
    tomorrow.getFullYear() === d.getFullYear() &&
    tomorrow.getMonth() === d.getMonth() &&
    tomorrow.getDate() === d.getDate()
  ) {
    let label = 'Tomorrow'
    if (hasTime(date)) {
      label = `${label} ${formatToStandardTime(formatToMilitaryTime(date))}`
    }
    return label
  }

  // show the date and time
  return `${formatDate(date)} ${formatToStandardTime(formatToMilitaryTime(date))}`
}
