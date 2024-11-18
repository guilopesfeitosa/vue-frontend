import type { Doctor } from './doctor'
import type { Time } from './time'

export type Schedule = {
  id: string
  doctor: Doctor
  date: Date | string
  times: Time[]
}
