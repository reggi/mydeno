import {Props} from './props.ts'

const range = (n: number) => [...Array(n).keys()];

const restrictToDOW = (x: number): x is (0 | 1 | 2 | 3 | 4 | 5 | 6) => {
  if (x === 0 || x === 1 || x === 2 || x === 3 || x === 4 || x === 5 || x === 6) {
    return true
  }
  return false;
}

export class DateHelper {
  sundayLedDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  sundayLedDaysInt = [0, 1, 2, 3, 4, 5, 6];
  totalRows = 6
  totalCells = this.sundayLedDaysInt.length * 2 * this.totalRows;
  constructor(
    public props: Props,
    public date: Date = new Date(),
  ) {}
  get availability () {
    return this.props.availability || {};
  }
  get daysOfTheWeekAvailable () {
    const entries = Object.entries(this.availability)
    return entries.flatMap(([day, times]) => {
      if (times.length === 0) return []
      return [parseInt(day)];
    });
  }
  get startOfTheWeekDay () {
    return this.props.startOfTheWeekDay || 0;
  }
  /** ordered days of the week by startOfTheWeekDay */
  get days (): number[] {
    const { sundayLedDaysInt: days, startOfTheWeekDay: sDay} = this
    if (sDay === 0) return days
    const start = days.slice(sDay, days.length)
    const end = days.slice(0, sDay)
    return [...start, ...end]
  }
  get daysAbrev () {
    return this.days.map(day => this.sundayLedDays[day])
  }
  get monthNumber () {
    return this.date.getMonth()
  }
  get year () {
    return this.date.getFullYear()
  }
  get monthDate () {
    return new Date(this.year, this.monthNumber + 1, 0)
  }
  december = 11;
  get isDecember () {
    return this.monthNumber === this.december
  }
  get nextMonth () {
    if (this.isDecember) {
      return new DateHelper(this.props, new Date(this.year + 1, 0, 0))
    } else {
      return new DateHelper(this.props, new Date(this.year, this.monthNumber + 1, 1))
    }
  }
  get monthName () {
    return this.date.toLocaleString('en-US', {month: 'long'});
  }
  get firstOfTheMonthDate () {
    return new Date(this.year, this.monthNumber, 1)
  }
  get daysInMonth () {
    return this.monthDate.getDate()
  }
  get startingDayOfTheWeek () {
    return this.firstOfTheMonthDate.getDay()
  }
  get numberOfleadingDays () {
    let matchedDayOfTheWeek = false
    let leadingDays = 0;
    this.days.forEach(v => {
      if (matchedDayOfTheWeek) return
      if (v === this.startingDayOfTheWeek) {
        matchedDayOfTheWeek = true
        return;
      }
      leadingDays++
    })
    return leadingDays;
  }
  get leadingDays () {
    return range(this.numberOfleadingDays).map(v => null)
  }
  get daysInMonthRange () {
    return range(this.daysInMonth)
  }
  get monthDays () {
    return this.daysInMonthRange.map(dayIndex => {
      const day = dayIndex+1;
      const mod = ((dayIndex  + this.startingDayOfTheWeek) % 7)
      const dayOfTheWeek = mod
      let isPrev = false;
      let isFollowing = false;
      let isToday = false;
      let isUnavailable = false
      if (day === this.today) {
        isToday = true
      } else if (day < this.today) {
        isPrev = true
        isUnavailable = true
      } else if (day > this.today) {
        isFollowing = true
      }
      const available = this.daysOfTheWeekAvailable.includes(dayOfTheWeek)
      if (!available) isUnavailable = true
      if (restrictToDOW(dayOfTheWeek)) {
        return { isPrev, isFollowing, isToday, isUnavailable, dayOfTheWeek, day, month: this.monthNumber, year: this.year, helper: this }
      } else {
        throw new Error('dayOfTheWeek is not a proper day')
      }
      
    })
  }
  get today () {
    return this.date.getDate()
  }
  get bodyProps () {
    return {
      week: this.daysAbrev,
      leading: this.leadingDays,
      days: this.monthDays
    }
  }
}