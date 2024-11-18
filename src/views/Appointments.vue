<template>
  <div class="mx-auto max-w-3xl flex flex-col">
    <PageTitle title="Cadastro de Consultas" />

    <form @submit="createAppointment" class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <div class="flex flex-col gap-1 w-1/2">
          <label for="schedule">Agenda</label>
          <select
            id="schedule"
            required
            v-model="selectedSchedule"
            @change="updateTimes"
            class="px-2 py-2 bg-transparent border border-slate-200 rounded-sm"
          >
            <option value="" disabled>Selecione uma agenda</option>
            <option v-for="schedule in schedules" :key="schedule.id" :value="schedule.id">
              Médico: {{ schedule.doctor.name }} | Data: {{ formatDate(schedule.date as string) }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1 w-1/2">
          <label for="time">Horário</label>
          <select
            id="time"
            required
            v-model="selectedTime"
            :disabled="allTimes.length === 0"
            class="px-2 py-2 bg-transparent border border-slate-200 rounded-sm disabled:text-gray-300"
          >
            <option value="" disabled>Selecione um horário</option>
            <option
              v-for="time in allTimes"
              :key="time.id"
              :value="time.id"
              :disabled="!time.available"
            >
              {{ time.hour }} <span v-if="!time.available">(Indisponível)</span>
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label for="patient">Paciente</label>
        <select
          id="patient"
          required
          v-model="selectedPatient"
          class="px-2 py-2 bg-transparent border border-slate-200 rounded-sm"
        >
          <option value="" disabled>Selecione um paciente</option>
          <option v-for="patient in patients" :key="patient.id" :value="patient.id">
            {{ patient.name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end">
        <SubmitInput label="Cadastrar" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import PageTitle from '@/components/PageTitle.vue'
import SubmitInput from '@/components/SubmitInput.vue'
import type { Patient } from '@/types/patient'
import type { Schedule } from '@/types/schedule'
import type { Time } from '@/types/time'
import axios from 'axios'

export default {
  name: 'AppointmentsView',
  components: { PageTitle, SubmitInput },
  data() {
    return {
      schedules: [] as Schedule[],
      allTimes: [] as Time[],
      patients: [] as Patient[],
      selectedSchedule: '',
      selectedTime: '',
      selectedPatient: '',
    }
  },
  methods: {
    async fetchSchedules() {
      try {
        const response = await axios.get('http://localhost:3000/schedules')
        this.schedules = response.data
      } catch (error) {
        console.error('Erro ao buscar agendas:', error)
      }
    },

    async fetchPatients() {
      try {
        const response = await axios.get('http://localhost:3000/patients')
        this.patients = response.data
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error)
      }
    },

    updateTimes() {
      const schedule = this.schedules.find((schedule) => schedule.id === this.selectedSchedule)
      this.allTimes = schedule ? schedule.times : []
      this.selectedTime = ''
    },

    async createAppointment(e: Event) {
      e.preventDefault()

      // if (!this.selectedSchedule || !this.selectedTime || !this.selectedPatient) {
      //   alert('Preencha todos os campos antes de cadastrar a consulta.')
      //   return
      // }

      const appointmentData = {
        schedule: this.schedules.find((schedule) => schedule.id === this.selectedSchedule),
        selectedTime: this.allTimes.find((time) => time.id === this.selectedTime),
        patient: this.patients.find((patient) => patient.id === this.selectedPatient),
      }

      console.log(JSON.stringify(appointmentData, null, 2))

      try {
        await axios.post('http://localhost:3000/appointments', appointmentData)

        alert('Consulta cadastrada com sucesso!')
        this.resetForm()
        this.fetchSchedules()
      } catch (error) {
        console.error('Erro ao cadastrar consulta:', error)
        alert('Erro ao cadastrar consulta.')
      }
    },
    resetForm() {
      this.selectedSchedule = ''
      this.selectedTime = ''
      this.selectedPatient = ''
      this.allTimes = []
    },
    formatDate(value: string) {
      if (!value) return ''
      try {
        const date = new Date(value)
        return new Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(date)
      } catch (error) {
        console.error('Erro ao formatar a data:', error)
        return value
      }
    },
  },
  mounted() {
    this.fetchSchedules()
    this.fetchPatients()
  },
}
</script>
