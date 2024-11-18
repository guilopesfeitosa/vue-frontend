import type { Address } from './address'

export type Patient = {
  id: string
  name: string
  document: number // CPF
  address: Address
  phone: string
  email: string
  age: string
  gender: 'Male' | 'Female'
}
