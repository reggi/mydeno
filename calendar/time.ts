export const pattern = /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(([A|a]|[P|p])[m|M])?$/

export type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
//                 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11;

export type Time = string | number

export interface ParsedTime {
  hour: Hour
  minutes: number;
}

export interface TimeSpan {
  start: ParsedTime,
  end: ParsedTime
}

export const isValidHour = (hour: number): hour is Hour => {
  return hour >= 0 && hour <= 23 && hour % 1 === 0
}

export const parseNumber = (hour: number): ParsedTime => {
  if (isValidHour(hour)) return { hour: hour, minutes: 0 }
  throw new Error(`Unable to parse number "${hour}" as a valid hour`);
}

export const parse = (time: Time): ParsedTime => {
  if (typeof time === 'number') return parseNumber(time)
  const results = time.match(pattern)
  if (!results) throw new Error(`Unable to parse string "${time}" as a valid time`);
  let hour = parseInt(results[1])
  const minutes = parseInt(results[2])
  const ampm = results[3] || ''
  const isAm = ampm.match(/[A|a][m|M]/)
  const isPm = ampm.match(/[P|p][m|M]/)
  if (hour === 12 && isAm) hour = 0
  if (hour < 12 && isPm) hour += 12
  if (isValidHour(hour)) return { hour, minutes }
  throw new Error(`Unable to parse string "${hour}" as a valid hour`);
}

export const id = (time: ParsedTime): number => {
  return (time.hour * 60) + time.minutes
}

export const idSpan = (time: TimeSpan): { start: number, end: number } => {
  const start = id(time.start)
  const end = id(time.end)
  return { start, end }
}

export const loop = (span: TimeSpan, minutes: number, buffer = 0): ParsedTime[] => {
  const { start, end } = idSpan(span)
  const results: ParsedTime[] = []
  let time = span.start
  let i = start;
  while (i <= end) {
    const meetingEnd = add(time, minutes)
    const meetingEndId = id(meetingEnd)
    if (meetingEndId <= end) {
      results.push(time)
    }
    const nextMeetingStart = add(time, minutes + buffer)
    time = nextMeetingStart
    i = id(nextMeetingStart)
  }
  return results
}

export const add = (time: ParsedTime, addMinutes: number): ParsedTime => {
  const { hour, minutes: minutesBefore } = time
  const minutesAfter = minutesBefore + addMinutes
  const hours = Math.floor(minutesAfter / 60)
  const minutes = minutesAfter % 60
  const newHour = (hour + hours) % 24
  if (isValidHour(newHour)) return { hour: newHour, minutes }
  throw new Error(`Unable to add time`);
}

export const include = (include: TimeSpan[], minutes: number, buffer = 0): ParsedTime[] => {
  return include.flatMap((includes) => {
    return loop(includes, minutes, buffer)
  }).sort(sort)
}

const excludeFilter = (time: ParsedTime, exclude: TimeSpan[]): boolean => {
  if (exclude.length === 0) return true
  const result = exclude.some(exclude => {
    const { start, end } = idSpan(exclude);
    const day = id(time)
    return day < start || day >= end
  })
  return result;
}

export const exclude = (times: ParsedTime[], exclude: TimeSpan[]): ParsedTime[] => {
  return times.filter(time => {
    const result = excludeFilter(time, exclude)
    return result;
  })
}

type compareFn = ((a: ParsedTime, b: ParsedTime) => number) | undefined
export const sort: compareFn = (a, b) => {
  return id(a) - id(b)
}

export const toString = (time: ParsedTime) => {
  const hour = time.hour % 12
  const ampm = (time.hour / 24 > 0.5 || time.hour === 12) ? 'pm' : 'am'
  return `${hour === 0 ? 12 : hour}:${time.minutes.toString().padStart(2, "0")}${ampm}`
}

export const toDate = (p: { time: string, date: { day: number, month: number, year: number }}): Date => {
  const { time, date: { day, month, year } } = p
  const { hour, minutes } = parse(time)
  return new Date(year, month, day, hour, minutes);
}
