import { Span } from "./span.ts";

export type Hour = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
//                12 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 | 11;

export interface ParsedTime {
  hour: Hour
  minutes: number;
}

export type TimeOrigin = string | number;

export const isWholeNumber = (num: number): boolean => {
  return num % 1 === 0
}

export const isHour = (hour: number): hour is Hour => {
  return hour >= 0 && hour <= 23 && isWholeNumber(hour)
}

export const parseNumber = (hour: number): ParsedTime => {
  if (isHour(hour)) return { hour: hour, minutes: 0 }
  throw new Error(`Unable to parse number "${hour}" as a valid hour`);
}

export const pattern = /^(0?[1-9]|1[0-2]):?([0-5][0-9])?\s?(([A|a]|[P|p])[m|M])?$/

export const parse = (time: TimeOrigin): ParsedTime => {
  if (typeof time === 'number') return parseNumber(time)
  const results = time.match(pattern)
  if (!results) throw new Error(`Unable to parse string "${time}" as a valid time`);
  let hour = parseInt(results[1])
  const minutes = results[2] ? parseInt(results[2]) : 0
  const ampm = results[3] || ''
  const isAm = ampm.match(/[A|a][m|M]/)
  const isPm = ampm.match(/[P|p][m|M]/)
  if (hour === 12 && isAm) hour = 0
  if (hour < 12 && isPm) hour += 12
  if (isHour(hour)) return { hour, minutes }
  throw new Error(`Unable to parse string "${hour}" as a valid hour`);
}

export const parseResolve = (time: TimeConstructable): ParsedTime =>  {
  if (time instanceof Time) return time.parsed
  if (isParsedTime(time)) return time
  return parse(time)
};

export const inMinutes = (time: ParsedTime): number => {
  return (time.hour * 60) + time.minutes
}

export const toString = (time: ParsedTime) => {
  const hour = time.hour % 12
  const ampm = (time.hour / 24 > 0.5 || time.hour === 12) ? 'pm' : 'am'
  return `${hour === 0 ? 12 : hour}:${time.minutes.toString().padStart(2, "0")}${ampm}`
}

export const add = (time: ParsedTime, addMinutes: number): ParsedTime => {
  const { hour, minutes: minutesBefore } = time
  const minutesAfter = minutesBefore + addMinutes
  const hours = Math.floor(minutesAfter / 60)
  const minutes = minutesAfter % 60
  const newHour = (hour + hours) % 24
  if (isHour(newHour)) return { hour: newHour, minutes }
  throw new Error(`Unable to add time`);
}

export type TimeConstructable = TimeOrigin | ParsedTime | Time

export const isParsedTime = (time: TimeConstructable): time is ParsedTime => {
  return (typeof time === 'object' && 'hour' in time && 'minutes' in time)
}

export const isTimeConstructable = (time: TimeConstructable): time is TimeConstructable => {
  if (isParsedTime(time)) return true
  return typeof time === 'string' || typeof time === 'number' || time instanceof Time
}

export const excludeFilter = (time: Time, exclude: Span[]): boolean => {
  if (exclude.length === 0) return true

  const result = exclude.some(exclude => {
    const { start, end } = exclude.toMinutes()
    const day = time.toMinutes()
    return day < start || day >= end
  })
  return result;
}

export class TimeBuilder {
  hour: number
  _minute = 0

  static clean (v: TimeOrigin): number {
    if (typeof v === 'number') return v
    if (typeof v === 'string') return parseInt(v)
    throw new Error(`Unable to clean time "${v}"`)
  }
  constructor (hour: TimeOrigin) {
    this.hour = TimeBuilder.clean(hour)
  }
  static hour (hour: TimeOrigin) {
    return new TimeBuilder(hour)
  }
  minute (minute: TimeOrigin) {
    this._minute = TimeBuilder.clean(minute)
    return this
  }
  min (minute: TimeOrigin) {
    return this.minute(minute)
  }
  get am () {
    const hour = this.hour
    if (isHour(hour)) {
      return Time.m({ hour, minutes: this._minute });
    }
    throw new Error('invalid hour');
  }
  get pm () {
    const hour = this.hour + 12
    if (isHour(hour)) {
      return Time.m({ hour, minutes: this._minute });
    }
    throw new Error('invalid hour');
  }
}

export class Time {
  parsed: ParsedTime
  string: string
  minutes: number

  constructor (
    public time: TimeConstructable,
  ) {
    this.parsed = parseResolve(this.time)
    this.string = toString(this.parsed)
    this.minutes = inMinutes(this.parsed)
  }
  
  static hour (hour: TimeOrigin) {
    return new TimeBuilder(hour)
  }
  toMinutes () {
    return this.minutes
  }
  toParsed () {
    return this.parsed
  }
  toString () {
    return this.string
  }
  static m (time: TimeConstructable) {
    return new Time(time)
  }
  addMinutes (minutes: number) {
    const newTime = add(this.parsed, minutes)
    return Time.m(newTime)
  }
  to (end: TimeConstructable): Span {
    return new Span(this, Time.m(end));
  }
  excludeFilter (spans: Span[]) {
    return excludeFilter(this, spans)
  }
}
