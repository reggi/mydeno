
import { z } from "https://deno.land/x/zod/mod.ts"

export const postKey = 'create'

export const contactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export const dateSchema = z.object({
  day: z.number().int().min(1).max(31),
  month: z.number().int().min(0).max(11),
  year: z.number().int().min(new Date().getFullYear()),
})

export const corePostBody = z.object({
  contact: contactSchema,
  date: dateSchema,
  time: z.string(),
  duration: z.number().int()
})

export const postBody = z.object({
  [postKey]: corePostBody
})
