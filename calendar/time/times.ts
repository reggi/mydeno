import { Span } from "./span.ts";
import { isTimeConstructable, Time, TimeConstructable } from "./time.ts";

type TimesConstructable = Time[] | TimeConstructable | TimeConstructable[] | Times

const excludeSpans = (times: Time[], span: Span[]) => {
  return times.filter(time => {
    const result = time.excludeFilter(span)
    return result;
  })
}

const excludeTimes = (times: Time[], exclude: TimesConstructable) => {
  const excludeMinutes = Times.m(exclude).toMinutes()
  return times.filter(time => !excludeMinutes.includes(time.toMinutes()))
}

type compareFn = ((a: Time, b: Time) => number) | undefined
const sortPrimative: compareFn = (a, b) => {
  return a.toMinutes() - b.toMinutes()
}

function resovleTimes (times: TimesConstructable): Time[] {
  if (times instanceof Times) {
    return times.times.sort(sortPrimative)
  } else if (Array.isArray(times)) {
    return times.map(time => Time.m(time)).sort(sortPrimative)
  } else if (isTimeConstructable(times)) {
    return [Time.m(times)].sort(sortPrimative)
  }
  return []
}

export class Times {
  times: Time[] = []
  constructor(times: Time[] | TimeConstructable | TimeConstructable[] | Times) {
    this.times = resovleTimes(times)
  }
  static m (times: Time[] | TimeConstructable | TimeConstructable[] | Times) { 
    return new Times(times);
  }
  toMinutes () {
    return this.times.map(time => time.toMinutes())
  }
  get minutes () {
    return this.toMinutes()
  }
  toStrings () {
    return this.times.map(time => time.toString())
  }
  get strings () {
    return this.toStrings()
  }
  setTimes (times: Time[]) {
    this.times = times.sort(sortPrimative)
    return this;
  }
  excludeSpan(exclude: Span | Span[]) {
    return this.setTimes(excludeSpans(this.times, [exclude].flat()))
  }
  excludeTime (exclude: TimesConstructable) {
    return this.setTimes(excludeTimes(this.times, exclude))
  } 
  include (include: Times) {
    return this.setTimes([...include.times, ...this.times])
  }
}