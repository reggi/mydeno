/** @jsx h */
import { Fragment, h } from "https://esm.sh/preact@10.10.0";
import { tw } from "https://esm.sh/twind@0.16.17";
import type { ComponentChildren } from "https://esm.sh/preact@10.10.0";
import { StateUpdater, useCallback, useMemo, useState } from 'https://esm.sh/preact@10.10.0/hooks';
import { contactSchema, postKey } from './schema.ts'
import { DateHelper } from "./date_helper.ts";
import { Props } from './props.ts'
import { Hours } from "./hours.ts";
import { Week } from './week.ts'

export interface ChevronProps {
  disabled?: boolean,
  left?: boolean,
  right?: boolean
  onClick?: (o: { left?: boolean, right?: boolean }) => void
}

export const Chevron = ({ disabled, right, left, onClick }: ChevronProps) => (
  <span className={(() => {
    const disabledClass = `flex-none ml-3 text-center p-1 pl-3 pr-3 rounded-lg bg-gray-100 text-gray-400 font-bold`
    const accessClass = `flex-none ml-3 text-center p-1 pl-3 pr-3 rounded-lg bg-blue-100 hover:cursor-pointer hover:bg-blue-200 text-blue-600 font-bold`
    const className = disabled === true ? disabledClass : accessClass
    return tw`${className}`
  })()} onClick={() => onClick && onClick({ left, right })}>
    {left && <span dangerouslySetInnerHTML={{__html:"&#8249;"}}/>}
    {right && <span dangerouslySetInnerHTML={{__html:"&#8250;"}}/>}
  </span>
)

export const Arrows = ({ disabled, right, left, onClick }: ChevronProps) => (
  <Fragment>
    <Chevron left disabled={disabled || left} onClick={onClick}/>
    <Chevron right disabled={disabled || right} onClick={onClick}/>
  </Fragment>
)

export interface TitleSectionProps {
  title: string,
  children: ComponentChildren
}

export const TitleSection = ({ title, children }: TitleSectionProps) => (
  <div className={tw`text-center grid gap-3 grid-cols-2 mb-4`}>
    <div className={tw`mb-2 text-lg text-left`}>
      {title}
    </div>
    <div className={tw`mb-2 text-lg flex-col-reverse text-right`}>
      {children}
    </div>
  </div>
)

export interface CellProps {
  isPrev: boolean;
  isFollowing: boolean;
  isToday: boolean;
  isUnavailable: boolean;
  dayOfTheWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  day: number;
  month: number;
  year: number;
  helper: DateHelper;
  onClick?: (cell: CellProps) => void
}

export const Cell = (props: CellProps) => (
  <div className={(() => {
    const classes = []
    if (props.isToday) classes.push(`bg-blue-200`)
    if (props.isUnavailable) classes.push(`text-center rounded-lg text-gray-400`)
    if (!props.isUnavailable) classes.push(`text-center rounded-lg bg-blue-100 hover:cursor-pointer hover:bg-blue-200 text-blue-600 font-bold`)
    return tw`${classes.join(' ')}`;
  })()} onClick={() => !props.isUnavailable && props.onClick && props.onClick(props)}>
    {props.day}
  </div>
)

export interface BodyProps {
  week: string[]
  leading: null[]
  days: CellProps[]
  onClick?: (cell: CellProps) => void
}

export const Body = ({ week, leading, days, onClick }: BodyProps) => (
  <div class={tw`text-center grid gap-4 grid-cols-7`}>
    {week.map(day => <div class={tw`font-bold`}>{day}</div>)}
    {leading.map(() => <div></div>)}
    {days.map(props => <Cell {...props} onClick={onClick}/>)}
  </div>
)

export interface InputProps {
  error?: string,
  label: string,
  placeholder: string,
  id: string,
  onChange: (e: any) => void
}

export const Input = ({ error, label, placeholder, id, onChange }: InputProps) => (  
  <div className={tw`grid grid-col-1 gap-2`}>
    <label for={id} class={tw`form-label inline-block mb-2 text-gray-700`}>{label}</label>
    {error && <div class={tw`text-red-400`}>{error}</div>}
    <input
      type="text"
      class={tw`
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      `}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
)

interface TimeProps {
  times?: string[]
  selectedTime?: string
  onClick: (time: string) => void
}

export const Time = ({ times, selectedTime, onClick }: TimeProps) => (
  <div>
    {times?.length ? (
      <div className={tw`grid grid-col-1 gap-3`}>
        {times.map(time => (
          <div className={(() => {
            const classes = ['border border-blue-600 rounded-lg p-2 text-blue-600 font-bold text-center hover:cursor-pointer']
            if (time === selectedTime) classes.push('bg-blue-100')
            return tw`${classes.join(' ')}`
          })()} onClick={() => onClick && onClick(time)}>
            {time}
          </div>
        ))}
      </div>
    ) : (
      <span>Sorry no times available for this day.</span>
    )}
  </div>
)

const getChild = (children: ComponentChildren, name: string) => {
  if (!children) return null;
  if (Array.isArray(children)) {
    return children.find(child => (child && typeof child === 'object') && ('props' in child) && child.props.name === name)
  }
  return false
}

export const Page = (props: {
  name: string
  children: ComponentChildren
}) => {
  return <div>{props.children}</div>
}

export const Navigator = (props: {
  page: string
  children: ComponentChildren
}) => {
  const { children, page } = props;
  const child = useMemo(() => getChild(children, page), [children, page])
  return (
    <div>
      {child}
    </div>
  )
}

const rmLast = (arr: string[]) => {
  arr.pop()
  return [...arr]
}

type ContactSubmission = { name: string, email: string };

export const Calendar = (props: Props) => {
  const duration = 30
  const availability = Week.onlyWeekdays(Hours.nineToFive.noMeetingsDuringLunch.every(duration, 5).stringTimes)
  const thisMonth = useMemo(() => new DateHelper({ availability }), []);
  const nextMonth = useMemo(() => thisMonth.nextMonth, [thisMonth]);
  const [history, setHistory] = useState<string[]>(['calendar'])
  const navigate = useCallback((page: string) => setHistory(h => [...h, page]), [setHistory])
  const page = useMemo(() => history[history.length-1], [history]);
  const back = useCallback(() => setHistory(v => rmLast(v)), [navigate]);
  const handleBack: NonNullable<ChevronProps['onClick']> = ({ left }) => left && back();
  const [dateSubmission, setDateSubmission] = useState<CellProps>();
  const dayOfTheWeek = dateSubmission?.dayOfTheWeek
  const times = useMemo(() => dayOfTheWeek &&  availability[dayOfTheWeek] || [], [dayOfTheWeek])
  const [timeSubmission, setTimeSubmission] = useState<string>();
  const [contactSubmission, setContactSubmission] = useState<ContactSubmission>({ name: '', email: ''});
  const [contactErrors, setContactErrors] = useState<{ name: string, email: string}>({ name: '', email: ''});

  return (
    <Navigator page={page}>

      <Page name="calendar">
        <TitleSection title={thisMonth.monthName}>
          <Arrows left onClick={({ right }) => {
            if (right) navigate('next-calendar')
          }}/>
        </TitleSection>
        <Body {...thisMonth.bodyProps} onClick={(data) => {
          setDateSubmission(data)
          navigate('time')
        }}/>
      </Page>

      <Page name="next-calendar">
        <TitleSection title={nextMonth.monthName}>
          <Arrows right onClick={handleBack}/>
        </TitleSection>
        <Body {...nextMonth.bodyProps} onClick={(data) => {
          setDateSubmission(data)
          navigate('time')
        }}/>
      </Page>

      <Page name="time">
        <TitleSection title={'Select a Time'}>
          <Arrows right onClick={handleBack}/>
        </TitleSection>
        <Time times={times} selectedTime={timeSubmission} onClick={(time) => {
          setTimeSubmission(time)
          navigate('contact')
        }}/>
      </Page>

      <Page name="contact">
        <TitleSection title={'Tell me about yourself'}>
          <Arrows left={false} right={true} onClick={handleBack}/>
        </TitleSection>

        <form className={tw`grid grid-col-1 gap-4`} onSubmit={handleSubmit({ 
          duration,
          contactSubmission,
          dateSubmission,
          timeSubmission,
          setContactErrors,
          callback() {
            navigate('done')
          }
        })}>
          <Input id="name" placeholder="Your Name" label="Name" error={contactErrors.name} onChange={e => {
            const name = (e.target as HTMLInputElement).value
            setContactSubmission(contact => ({ ...contact, name }));
          }}/>
          <Input id="email" placeholder="your@email.com" label="Email" error={contactErrors.email} onChange={e => {
            const email = (e.target as HTMLInputElement).value
            setContactSubmission(contact => ({ ...contact, email }));
          }}/>
          <button className={tw`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}>Submit</button>
        </form>
      </Page>

      <Page name="done">
        <TitleSection title={'Thanks 👏'}>
          <Arrows disabled/>
        </TitleSection>
        <div className={tw`text-center text-xlg mt-10`}>
          Thanks for scheduling some time!
        </div>
      </Page>
    </Navigator>
  )
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const handleSubmit = (p: {
  duration: number,
  contactSubmission: ContactSubmission,
  dateSubmission: CellProps | undefined,
  timeSubmission: string | undefined,
  setContactErrors: StateUpdater<{
    name: string;
    email: string;
  }>
  callback?: () => void;
}) => {
  return (e: any) => {
    e.preventDefault()
    const { duration, callback, setContactErrors, contactSubmission, dateSubmission, timeSubmission } = p;
    try {
      contactSchema.parse(contactSubmission)
      callback && callback();
      postData(`${window.location.origin}/api/calendar`, {
        [postKey]: {
          contact: contactSubmission,
          date: dateSubmission,
          time: timeSubmission,
          duration
        }
      })
    } catch (e) {
      e.issues.forEach((e: any) => {
        if (e.path.includes('email')) {
          setContactErrors(contactErrors => ({ ...contactErrors, email: e.message }))
        } else if (e.path.includes('name')) {
          setContactErrors(contactErrors => ({ ...contactErrors, name: e.message }))
        }
      })
    }
  }
}