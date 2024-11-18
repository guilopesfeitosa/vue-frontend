import type { Patient } from '@/types/patient'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'
import Patients from '@/views/Patients.vue'
import axios from 'axios'
import { patientMock } from '../mock/patient.mock'

vi.mock('axios')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAxios: any = axios

describe('Patients POST', () => {
  it('Register a patient successfully', async () => {
    const wrapper = mount(Patients)

    await wrapper.find('#name').setValue(patientMock.name)
    await wrapper.find('#age').setValue(patientMock.age)
    await wrapper.find('#gender').setValue(patientMock.gender)
    await wrapper.find('#document').setValue(patientMock.document)
    await wrapper.find('#phone').setValue(patientMock.phone)
    await wrapper.find('#email').setValue(patientMock.email)
    await wrapper.find('#cep').setValue(patientMock.address.cep)
    await wrapper.find('#street').setValue(patientMock.address.street)
    await wrapper.find('#number').setValue(patientMock.address.number)
    await wrapper.find('#neighborhood').setValue(patientMock.address.neighborhood)
    await wrapper.find('#complement').setValue(patientMock.address.complement)
    await wrapper.find('#city').setValue(patientMock.address.city)
    await wrapper.find('#state').setValue(patientMock.address.state)

    mockAxios.post.mockResolvedValueOnce({ data: patientMock })

    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/patients',
      expect.objectContaining(patientMock),
    )

    expect(wrapper.vm.patientName).toBe('')
    expect(wrapper.vm.patientDocument).toBe('')
    expect(wrapper.vm.patientPhone).toBe('')
    expect(wrapper.vm.patientAddress.cep).toBe('')
  })
})

describe('Patients GET', () => {
  let response: Response
  let patients: Patient[]

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/patients')
    patients = await response.json()
  })

  test('Returns all patients', () => {
    expect(patients.length).toBeGreaterThan(0)
  })

  test('Each patient has required fields', () => {
    patients.forEach((patient) => {
      expect(patient).toHaveProperty('id')
      expect(patient).toHaveProperty('name')
      expect(patient).toHaveProperty('document')
      expect(patient).toHaveProperty('phone')
      expect(patient).toHaveProperty('email')
      expect(patient).toHaveProperty('address')
    })
  })
})
