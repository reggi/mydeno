import { toDate } from '../time.ts'
import { postBody, postKey } from '../schema.ts'
import Calendar from './model.ts'

export const endpoint = async (body: any) => {
  const results = postBody.parse(body)[postKey]
  await Calendar.create({
    name: results.contact.name,
    email: results.contact.email,
    date: toDate(results),
    duration: results.duration,
  })
}