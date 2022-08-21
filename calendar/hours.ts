import { exclude, parse, Time, toString, ParsedTime, TimeSpan, include } from './time.ts';

class State {
  include: TimeSpan[] = []
  exclude: TimeSpan[] = []
  times: ParsedTime[] = []
}

export class Hours {
  constructor(
    public state = new State(),
    public currFrom?: ParsedTime | undefined,
  ) {}
  get times () {
    return this.state.times
  }
  get stringTimes () {
    return this.state.times.map(toString)
  }
  from (time: Time) {
    return new InclusiveHours(this.state, parse(time))
  }
  exceptFrom (time: Time) {
    return new ExcludeHours(this.state, parse(time))
  }
  every (minutes: number, buffer = 0) {
    this.state.times = exclude([...this.state.times, ...include(this.state.include, minutes, buffer)], this.state.exclude);
    this.state.include = []
    this.state.exclude = []
    return this;
  }
  get noMeetingsDuringLunch () {
    return this.exceptFrom("12:00pm").to("1:00pm")
  }
  static get noMeetingsDuringLunch() {
    return this.new.noMeetingsDuringLunch
  }
  get acceptMeetingsDuringLunch () {
    return this.from("12:00pm").to("1:00pm")
  }
  static get acceptMeetingsDuringLunch() {
    return this.new.acceptMeetingsDuringLunch
  }
  get eightToFour () {
    return this.from('8:00am').to('4:00pm')
  }
  static get eightToFour() {
    return this.new.eightToFour
  }
  get nineToFive() {
    return this.from('9:00am').to('5:00pm')
  }
  static get nineToFive() {
    return this.new.nineToFive
  }
  get tenToSix() {
    return this.from('10:00am').to('6:00pm')
  }
  static get tenToSix() {
    return this.new.tenToSix
  }
  get elevenToSeven() {
    return this.from('11:00am').to('7:00pm')
  }
  static get elevenToSeven() {
    return this.new.elevenToSeven
  }
  static get new () {
    return new Hours();
  }
}

class InclusiveHours extends Hours {
  to (time: Time) {
    if (!this.currFrom) throw new Error('no from time specified');
    this.state.include.push({
      start: this.currFrom,
      end: parse(time)
    })
    return new Hours(this.state)
  }
}

class ExcludeHours extends Hours {
  to (time: Time) {
    if (!this.currFrom) throw new Error('no from time specified');
    this.state.exclude.push({
      start: this.currFrom,
      end: parse(time)
    })
    return new Hours(this.state)
  }
}

export const hours = () => new Hours();