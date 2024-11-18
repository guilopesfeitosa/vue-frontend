<template>
  <div class="mx-auto max-w-3xl flex flex-col">
    <PageTitle title="Cadastro de Pacientes" />

    <form id="patientForm" @submit="createPatient" class="flex flex-col gap-4">
      <h2 class="text-2xl pb-1 text-gray-500 border-b-2 border-gray-200">Dados pessoais</h2>

      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-1 w-1/3">
          <label for="name">Nome</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            v-model="patientName"
            placeholder="Insira o nome do paciente"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/3">
          <label for="age">Idade</label>
          <input
            required
            id="age"
            name="age"
            type="number"
            v-model="patientAge"
            placeholder="Insira a idade do paciente"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/3">
          <label for="gender">Gênero</label>
          <select
            required
            id="gender"
            name="gender"
            v-model="patientGender"
            class="px-2 py-2 bg-transparent border border-slate-200 rounded-sm"
          >
            <option value="" disabled>Selecione o gênero</option>
            <option value="Male">Masculino</option>
            <option value="Female">Feminino</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-1 w-1/3">
          <label for="document">CPF</label>
          <input
            required
            type="text"
            id="document"
            name="document"
            v-model="patientDocument"
            placeholder="Insira o CPF do paciente"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/3">
          <label for="phone">Telefone</label>
          <input
            required
            type="text"
            id="phone"
            name="phone"
            v-model="patientPhone"
            placeholder="Insira o telefone do paciente"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/3">
          <label for="email">E-mail</label>
          <input
            required
            type="email"
            id="email"
            name="email"
            v-model="patientEmail"
            placeholder="Insira o e-mail do paciente"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
      </div>

      <h2 class="text-2xl pt-3 text-gray-500 border-b-2 border-gray-200">Endereço</h2>

      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-1 w-2/6">
          <label for="cep">CEP</label>
          <input
            required
            type="text"
            id="cep"
            name="cep"
            v-model="patientAddress.cep"
            placeholder="Insira o CEP"
            class="px-2 py-1 border border-slate-200 rounded-sm"
            @blur="fetchAddressFromCep"
          />
        </div>
        <div class="flex flex-col gap-1 w-3/6">
          <label for="street">Logradouro</label>
          <input
            required
            type="text"
            id="street"
            name="street"
            v-model="patientAddress.street"
            placeholder="Insira o logradouro"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/6">
          <label for="number">Número</label>
          <input
            required
            type="text"
            id="number"
            name="number"
            v-model="patientAddress.number"
            placeholder="Insira o número"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-1 w-1/2">
          <label for="neighborhood">Bairro</label>
          <input
            required
            type="text"
            id="neighborhood"
            name="neighborhood"
            v-model="patientAddress.neighborhood"
            placeholder="Insira o bairro"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/2">
          <label for="complement">Complemento</label>
          <input
            type="text"
            id="complement"
            name="complement"
            v-model="patientAddress.complement"
            placeholder="Insira o complemento"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex flex-col gap-1 w-2/3">
          <label for="city">Cidade</label>
          <input
            required
            type="text"
            id="city"
            name="city"
            v-model="patientAddress.city"
            placeholder="Insira a cidade"
            class="px-2 py-1 border border-slate-200 rounded-sm"
          />
        </div>
        <div class="flex flex-col gap-1 w-1/3">
          <label for="state">Estado</label>
          <input
            type="text"
            id="state"
            name="state"
            v-model="patientAddress.state"
            placeholder="Insira o estado"
            maxlength="2"
            class="px-2 py-1 border border-slate-200 rounded-sm"
            required
          />
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
import axios from 'axios'

export default {
  name: 'PatientsView',
  components: { PageTitle, SubmitInput },
  data() {
    return {
      patientDocument: '',
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      patientAge: '',
      patientGender: '',
      patientAddress: {
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: '',
      },
    }
  },
  methods: {
    async fetchAddressFromCep() {
      const cep = this.patientAddress.cep.replace(/\D/g, '')
      if (cep.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          const { logradouro, bairro, localidade, uf } = response.data
          if (response.data.erro) {
            alert('CEP não encontrado.')
          } else {
            this.patientAddress.street = logradouro || ''
            this.patientAddress.neighborhood = bairro || ''
            this.patientAddress.city = localidade || ''
            this.patientAddress.state = uf || ''
          }
        } catch (error) {
          alert('Erro ao buscar o CEP. Tente novamente mais tarde.')
          console.error(error)
        }
      } else {
        alert('CEP inválido.')
      }
    },
    async createPatient(e: Event) {
      e.preventDefault()

      const patientData = {
        id: crypto.randomUUID(),
        name: this.patientName,
        document: this.patientDocument,
        phone: this.patientPhone,
        email: this.patientEmail,
        age: this.patientAge,
        gender: this.patientGender,
        address: { ...this.patientAddress },
      }

      try {
        await axios.post('http://localhost:3000/patients', patientData)
        alert('Paciente cadastrado com sucesso!')
        this.resetForm()
      } catch (error) {
        console.error('Erro ao cadastrar paciente:', error)
        alert('Erro ao cadastrar paciente.')
      }
    },
    resetForm() {
      this.patientDocument = ''
      this.patientName = ''
      this.patientPhone = ''
      this.patientEmail = ''
      this.patientAge = ''
      this.patientGender = ''
      this.patientAddress = {
        cep: '',
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        state: '',
      }
    },
  },
}
</script>
