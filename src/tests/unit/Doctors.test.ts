import type { Doctor } from '@/types/doctor'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'
import Doctors from '@/views/Doctors.vue'
import axios from 'axios'
import { doctorMock } from '../mock/doctor.mock'

vi.mock('axios')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAxios: any = axios

describe('Doctors POST', () => {
  it('Register a doctor successfully', async () => {
    const wrapper = mount(Doctors)

    await wrapper.find('#name').setValue(doctorMock.name)
    await wrapper.find('#crmNumber').setValue(doctorMock.crmNumber.toString())
    await wrapper.find('#state').setValue(doctorMock.state)

    mockAxios.post.mockResolvedValueOnce({ data: doctorMock })

    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/doctors', doctorMock)

    expect(wrapper.vm.doctorName).toBe('')
    expect(wrapper.vm.doctorCRM).toBe('')
    expect(wrapper.vm.doctorState).toBe('')
  })
})

describe('Doctors GET', () => {
  let response: Response
  let doctors: Doctor[]

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/doctors')
    doctors = await response.json()
  })

  test('Returns all doctors', () => {
    expect(doctors.length).toBeGreaterThan(0)
  })

  test('Each doctor has required fields', () => {
    doctors.forEach((doctor) => {
      expect(doctor).toHaveProperty('id')
      expect(doctor).toHaveProperty('name')
      expect(doctor).toHaveProperty('crmNumber')
      expect(doctor).toHaveProperty('state')
    })
  })
})
