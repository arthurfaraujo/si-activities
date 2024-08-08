import { useState, type ChangeEvent, type FormEvent } from 'react'

interface FormData {
  name: string
  subject: string
  description: string
  startDate: string
  endDate: string
}

export default function ActivityForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    subject: '',
    description: '',
    startDate: '',
    endDate: ''
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      await fetch('https://si-activities-api.onrender.com/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      window.location.href = '/'
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  return (
    <form className='activity-form' onSubmit={handleSubmit}>
      <label>
        <span>Nome</span>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <span>Matéria</span>
        <input
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        <span>Descrição</span>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Data de criação</span>
        <input
          name="startDate"
          type="text"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="dd/MM/aaaa"
        />
      </label>
      <label>
        <span>Data de entrega</span>
        <input
          name="endDate"
          type="text"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="dd/MM/aaaa"
        />
      </label>

      <button type="submit">Criar atividade</button>
    </form>
  )
}
