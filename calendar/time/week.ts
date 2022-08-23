import { Times } from "./times.ts"

type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DaysAvailable<T> {
  [0]?: T
  [1]?: T
  [2]?: T
  [3]?: T
  [4]?: T
  [5]?: T
  [6]?: T
}

export const defaultDaysAvailable: DaysAvailable<Times | undefined> = {
  "0": undefined,
  "1": undefined,
  "2": undefined,
  '3': undefined,
  "4": undefined,
  "5": undefined,
  "6": undefined,
}

export class Week {
  days = defaultDaysAvailable
  private add (times: Times, weekDay: WeekDay) {
    this.days[weekDay] = times
    return this
  }
  // sunday
  sunday (times: Times) {
    return this.add(times, 0)
  }
  sun = this.sunday
  su = this.sunday
  // monday
  monday (times: Times) {
    return this.add(times, 1)
  }
  mon = this.monday
  mo = this.monday
  // tuesday
  tuesday (times: Times) {
    return this.add(times, 2)
  }
  tue = this.monday
  tu = this.monday
  // wednesday
  wednesday (times: Times) {
    return this.add(times, 3)
  }
  wed = this.wednesday
  we = this.wednesday
  // thursday
  thursday (times: Times) {
    return this.add(times, 4)
  }
  thurs = this.thursday
  thu = this.thursday
  th = this.thursday
  // friday
  friday (times: Times) {
    return this.add(times, 5)
  }
  fri = this.friday
  fr = this.friday
  // saturday
  saturday (times: Times) {
    return this.add(times, 6)
  }
  sat = this.saturday
  sa = this.saturday
  // week
  weekend (times: Times) {
    this.add(times, 0)
    this.add(times, 6)
    return this;
  }
  static weekend (times: Times) {
    return Week.new.weekend(times)
  }
  weekdays (times: Times) {
    this.add(times, 1)
    this.add(times, 2)
    this.add(times, 3)
    this.add(times, 4)
    this.add(times, 5)
    return this;
  }
  static weekdays (times: Times) {
    return Week.new.weekdays(times)
  }
  static onlyWeekdays (times: Times) {
    return this.weekdays(times).days;
  }
  week (times: Times) {
    this.weekend(times)
    this.weekdays(times)
  }
  toStrings (): DaysAvailable<string[]> {
    return Object.fromEntries(Object.entries(this.days).map(([day, times]) => {
      return [day, times.strings]
    }))
  }
  static get new () {
    return new Week();
  }
  static get m () {
    return new Week();
  }
}
