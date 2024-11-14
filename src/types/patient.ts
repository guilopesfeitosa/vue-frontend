import type { Address } from './address'

export type Patient = {
  id: string
  name: string
  address: Address
  phone: string
  email: string
  age: string
  gender: 'Male' | 'Female' | 'Other'
}
