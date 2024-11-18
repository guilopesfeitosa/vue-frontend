<template>
  <div class="mx-auto max-w-xl flex flex-col">
    <PageTitle title="Cadastro de Agendas" />

    <form @submit="createSchedule" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="doctor">Médico</label>
        <select
          id="doctor"
          v-model="selectedDoctor"
          class="px-2 py-2 bg-transparent border border-slate-200 rounded-sm"
          required
        >
          <option value="" disabled>Selecione um médico</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor">
            {{ doctor.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col gap-1">
        <label for="date">Dia</label>
        <input
          type="date"
          name="date"
          v-model="date"
          id="date"
          class="px-2 py-1 border border-slate-200 rounded-sm"
          required
        />
      </div>

      <div class="flex flex-col gap-1">
        <label>Horários</label>
        <div class="grid grid-cols-4 gap-x-4 gap-y-2">
          <div v-for="(time, index) in availableTimes" :key="index" class="flex items-center gap-2">
            <input type="checkbox" :id="`time-${index}`" :value="time" v-model="times" />
            <label :for="`time-${index}`">{{ time }}</label>
          </div>
        </div>
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
import type { Doctor } from '@/types/doctor'
import axios from 'axios'

export default {
  name: 'SchedulesView',
  components: {
    PageTitle,
    SubmitInput,
  },
  data() {
    return {
      doctors: [] as Doctor[],
      selectedDoctor: '',
      date: '',
      times: [],
      availableTimes: [
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
      ],
    }
  },
  methods: {
    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:3000/doctors')
        this.doctors = response.data
      } catch (error) {
        console.error('Erro ao buscar médicos:', error)
      }
    },
    async createSchedule(e: Event) {
      e.preventDefault()

      if (this.times.length === 0) {
        alert('Selecione ao menos um horário na agenda.')
        return
      }

      const data = {
        doctor: this.selectedDoctor,
        date: this.date,
        times: this.times.map((time, index) => ({
          id: (index + 1).toString(),
          hour: time,
          isAvaliable: true,
        })),
      }

      try {
        await axios.post('http://localhost:3000/schedules', data)
        alert('Agenda cadastrada com sucesso!')
        this.resetForm()
      } catch (error) {
        console.error('Erro ao criar a agenda:', error)
        alert('Erro ao criar a agenda.')
      }
    },
    resetForm() {
      this.selectedDoctor = ''
      this.date = ''
      this.times = []
    },
  },
  mounted() {
    this.fetchDoctors()
  },
}
</script>
