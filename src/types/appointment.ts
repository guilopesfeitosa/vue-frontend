import type { Doctor } from './doctor'
import type { Patient } from './patient'

export type Appointment = {
  id: string
  date: Date
  patient: Patient
  doctor: Doctor
}
