import type { Patient } from './patient'
import type { Schedule } from './schedule'

export type Appointment = {
  id: string
  schedule: Schedule
  selectedTime: string
  patient: Patient
}
