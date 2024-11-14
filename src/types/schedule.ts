import type { Doctor } from './doctor'
import type { Time } from './time'

export type Schedule = {
  id: string
  doctor: Doctor
  day: number
  mounth: string
  year: string
  times: Time[]
}
