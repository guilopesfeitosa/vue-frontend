import { createWebHistory, createRouter } from 'vue-router'

import Doctors from '@/views/Doctors.vue'
import Schedules from '@/views/Schedules.vue'
import Patients from '@/views/Patients.vue'
import Appointments from '@/views/Appointments.vue'

export const routes = [
  {
    label: 'Médicos',
    path: '/doctors',
    component: Doctors,
  },
  {
    label: 'Agendas',
    path: '/schedules',
    component: Schedules,
  },
  {
    label: 'Pacientes',
    path: '/patients',
    component: Patients,
  },
  {
    label: 'Consultas',
    path: '/appointments',
    component: Appointments,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
