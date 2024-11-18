import type { Patient } from './patient'
import type { Schedule } from './schedule'
import type { Time } from './time'

export type Appointment = {
  id: string
  schedule: Schedule
  selectedTime: Time
  patient: Patient
}
