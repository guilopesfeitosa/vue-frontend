<template>
  <div class="mx-auto max-w-xl flex flex-col">
    <PageTitle title="Cadastro de Médicos" />

    <form @submit="createDoctor" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <label for="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="doctorName"
          placeholder="Insira o nome do médico"
          class="px-2 py-1 border border-slate-200 rounded-sm"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="crmNumber">CRM</label>
        <input
          type="text"
          id="crmNumber"
          name="crmNumber"
          v-model="doctorCRM"
          placeholder="Insira o número do CRM do médico"
          class="px-2 py-1 border border-slate-200 rounded-sm"
          required
        />
      </div>
      <div class="flex flex-col gap-1">
        <label for="state">Estado</label>
        <input
          type="text"
          id="state"
          name="state"
          v-model="doctorState"
          maxlength="2"
          placeholder="Insira o estado de atuação do médico"
          class="px-2 py-1 border border-slate-200 rounded-sm"
          required
        />
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
import axios from 'axios'

export default {
  name: 'DoctorsView',
  components: { PageTitle, SubmitInput },
  data() {
    return {
      doctorName: '',
      doctorCRM: '',
      doctorState: '',
    }
  },
  methods: {
    async createDoctor(e: Event) {
      e.preventDefault()

      const doctorData = {
        name: this.doctorName,
        crmNumber: parseInt(this.doctorCRM, 10),
        state: this.doctorState.toUpperCase(),
      }

      try {
        await axios.post('http://localhost:3000/doctors', doctorData)
        alert('Médico cadastrado com sucesso!')
        this.resetForm()
      } catch (error) {
        console.error('Erro ao cadastrar médico:', error)
        alert('Erro ao cadastrar médico.')
      }
    },
    resetForm() {
      this.doctorName = ''
      this.doctorCRM = ''
      this.doctorState = ''
    },
  },
}
</script>
