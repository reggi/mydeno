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

export const defaultDaysAvailable: DaysAvailable<string[]> = {
  "0": [],
  "1": [],
  "2": [],
  '3': [],
  "4": [],
  "5": [],
  "6": [],
}

type HoursType = string[]

export class Week {
  days = defaultDaysAvailable
  private add (hours: HoursType, weekDay: WeekDay) {
    this.days[weekDay] = hours
    return this
  }
  // sunday
  sunday (hours: HoursType) {
    return this.add(hours, 0)
  }
  sun = this.sunday
  su = this.sunday
  // monday
  monday (hours: HoursType) {
    return this.add(hours, 1)
  }
  mon = this.monday
  mo = this.monday
  // tuesday
  tuesday (hours: HoursType) {
    return this.add(hours, 2)
  }
  tue = this.monday
  tu = this.monday
  // wednesday
  wednesday (hours: HoursType) {
    return this.add(hours, 3)
  }
  wed = this.wednesday
  we = this.wednesday
  // thursday
  thursday (hours: HoursType) {
    return this.add(hours, 4)
  }
  thurs = this.thursday
  thu = this.thursday
  th = this.thursday
  // friday
  friday (hours: HoursType) {
    return this.add(hours, 5)
  }
  fri = this.friday
  fr = this.friday
  // saturday
  saturday (hours: HoursType) {
    return this.add(hours, 6)
  }
  sat = this.saturday
  sa = this.saturday
  // week
  weekend (hours: HoursType) {
    this.add(hours, 0)
    this.add(hours, 6)
    return this;
  }
  static weekend (hours: HoursType) {
    return Week.new.weekend(hours)
  }
  weekdays (hours: HoursType) {
    this.add(hours, 1)
    this.add(hours, 2)
    this.add(hours, 3)
    this.add(hours, 4)
    this.add(hours, 5)
    return this;
  }
  static weekdays (hours: HoursType) {
    return Week.new.weekdays(hours)
  }
  static onlyWeekdays (hours: HoursType) {
    return this.weekdays(hours).days;
  }
  week (hours: HoursType) {
    this.weekend(hours)
    this.weekdays(hours)
  }
  static get new () {
    return new Week();
  }
}

export const week = () => new Week()
