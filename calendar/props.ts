export interface Props {
  dayOfBooking?: boolean,
  startOfTheWeekDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  availability?: {
    [0]?: string[]
    [1]?: string[]
    [2]?: string[]
    [3]?: string[]
    [4]?: string[]
    [5]?: string[]
    [6]?: string[]
  }
}