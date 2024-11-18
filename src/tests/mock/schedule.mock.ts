import { doctorMock } from './doctor.mock'

export const scheduleMock = {
  doctor: doctorMock,
  date: '2024-11-20',
  times: [
    { id: '1', hour: '08:00', available: true },
    { id: '2', hour: '09:00', available: true },
  ],
}
