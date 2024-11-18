import type { Appointment } from '@/types/appointment'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'
import Appointments from '@/views/Appointments.vue'
import axios from 'axios'
import { appointmentMock } from '../mock/appointment.mock'

vi.mock('axios')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAxios: any = axios

describe('Appointments POST', () => {
  it('Register a appointment successfully', async () => {
    const wrapper = mount(Appointments)

    wrapper.setData({
      selectedSchedule: '1',
      selectedTime: '08:00',
      selectedPatient: '1',
    })

    mockAxios.post.mockResolvedValueOnce({ data: appointmentMock })

    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/appointments',
      expect.objectContaining(appointmentMock),
    )

    expect(wrapper.vm.selectedSchedule).toBe('')
    expect(wrapper.vm.selectedTime).toBe('')
    expect(wrapper.vm.selectedPatient).toBe('')
  })
})

describe('Appointments GET', () => {
  let response: Response
  let appointments: Appointment[]

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/appointments')
    appointments = await response.json()
  })

  test('Returns all appointments', () => {
    expect(appointments.length).toBeGreaterThan(0)
  })

  test('Each appointment has required fields', () => {
    appointments.forEach((appointment) => {
      expect(appointment).toHaveProperty('id')
      expect(appointment).toHaveProperty('date')
      expect(appointment).toHaveProperty('doctor')
      expect(appointment).toHaveProperty('patient')
      expect(appointment).toHaveProperty('time')
    })
  })
})
