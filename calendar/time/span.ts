import { ParsedTime, Time, TimeConstructable } from "./time.ts"
import { Times } from "./times.ts"

export interface ParsedTimeSpan {
  start: ParsedTime,
  end: ParsedTime
}

export interface TimeSpan {
  start: Time,
  end: Time
}

export interface LiteralSpan {
  start: TimeConstructable,
  end: TimeConstructable
}

export const loop = (span: Span, minutes: number, buffer = 0): Time[] => {
  const { start, end } = span.toMinutes()
  const results: Time[] = []
  let time = span.start
  let i = start;
  while (i <= end) {
    const meetingEnd = time.addMinutes(minutes)
    const meetingEndId = meetingEnd.toMinutes()
    if (meetingEndId <= end) {
      results.push(time)
    }
    const nextMeetingStart = time.addMinutes(minutes + buffer)
    time = nextMeetingStart
    i = nextMeetingStart.toMinutes()
  }
  return results
}

export function isSpan(item: any): item is Span {
  return item instanceof Span
}

export function isLiteralSpan(span: any): span is LiteralSpan {
  return typeof span === 'object' && ('start' in span) && ('end' in span)
}

export function isSpans(item: any): item is Span[] {
  return Array.isArray(item) && item[0] && item[0] instanceof Span
}

export class SpanBuilder {
  start: Time
  constructor (start: TimeConstructable) {
    this.start = Time.m(start)
  }
  to (end: TimeConstructable) {
    return new Span(this.start, Time.m(end))
  }
}

function spanResolver (span: LiteralSpan | TimeConstructable, end?: TimeConstructable): TimeSpan {
  if (isLiteralSpan(span)) {
    const start = Time.m(span.start)
    const end = Time.m(span.end)
    return {start, end }
  } else {
    if (!end) throw new Error('missing end in span')
    const start = Time.m(span)
    const _end = Time.m(end)
    return { start, end: _end }
  }
}

export class Span {
  start: Time
  end: Time
  constructor (span: TimeConstructable, end?: TimeConstructable)
  constructor (span: LiteralSpan)
  constructor (span: LiteralSpan | TimeConstructable, end?: TimeConstructable) {
    const v = spanResolver(span, end)
    this.start = v.start
    this.end = v.end
  }
  static from (time: TimeConstructable) {
    return new SpanBuilder(time)
  }
  toParsedTimeSpan (): ParsedTimeSpan {
    return {
      start: this.start.parsed,
      end: this.end.parsed
    }
  }
  toMinutes (): { start: number, end: number } {
    return {
      start: this.start.minutes,
      end: this.end.minutes
    }
  }
  every (minutes: number, buffer?: number): Times {
    return Times.m(loop(this, minutes, buffer).map(v => Time.m(v)))
  }
  static get lunch () {
    return new Span('12pm', '1pm')
  }
  static get eightToFour () {
    return new Span('8am', '4pm')
  }
  static get nineToFive () {
    return new Span('9am', '5pm')
  }
  static get tenToSix () {
    return new Span('10am', '6pm')
  }
  static get elevenToSeven () {
    return new Span('11am', '7pm')
  }
}
