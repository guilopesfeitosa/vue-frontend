import type { Schedule } from '@/types/schedule'
import { mount } from '@vue/test-utils'
import { beforeAll, describe, expect, it, test, vi } from 'vitest'
import Schedules from '@/views/Schedules.vue'
import axios from 'axios'
import { scheduleMock } from '../mock/schedule.mock'

vi.mock('axios')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockAxios: any = axios

describe('Schedules POST', () => {
  it('Register a schedule successfully', async () => {
    const wrapper = mount(Schedules)

    wrapper.setData({
      selectedDoctor: scheduleMock.doctor,
      date: scheduleMock.date,
      times: scheduleMock.times.map((time) => time.hour),
    })

    mockAxios.post.mockResolvedValueOnce({ data: scheduleMock })

    await wrapper.find('form').trigger('submit.prevent')

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/schedules',
      expect.objectContaining(scheduleMock),
    )

    expect(wrapper.vm.selectedDoctor).toBe('')
    expect(wrapper.vm.date).toBe('')
    expect(wrapper.vm.times).toEqual([])
  })
})

describe('Schedules GET', () => {
  let response: Response
  let schedules: Schedule[]

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/schedules')
    schedules = await response.json()
  })

  test('Returns all schedules', () => {
    expect(schedules.length).toBeGreaterThan(0)
  })

  test('Each schedule has required fields', () => {
    schedules.forEach((schedule) => {
      expect(schedule).toHaveProperty('id')
      expect(schedule).toHaveProperty('doctor')
      expect(schedule).toHaveProperty('date')
      expect(schedule).toHaveProperty('times')
    })
  })
})
