import { useState, type ChangeEvent, type FormEvent } from 'react'
import { API_URL, FRONT_RELATIVE_URL } from '../../const'
import { formatDate } from '../../utils/dateUtils'

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
  const [isSending, setIsSending] = useState<boolean>(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    e.target.checkValidity()

    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsSending(is => !is)
      await fetch(API_URL + '/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          endDate: formatDate(formData.endDate),
          startDate: formatDate(formData.startDate)
        })
      })

      setIsSending(is => !is)
      window.location.href = FRONT_RELATIVE_URL
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  return (
    <form className='max-w-[400px] w-4/6 flex flex-wrap gap-4' onSubmit={handleSubmit}>
      <label className='label-style'>
        <span>Nome</span>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className='input-style'
        />
      </label>
      <label className='label-style'>
        <span>Matéria</span>
        <input
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
          className='input-style'
        />
      </label>
      <label className='label-style'>
        <span>Descrição</span>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          className='input-style'
        />
      </label>
      <label className='label-style'>
        <span>Data de criação</span>
        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          placeholder="dd/MM/aaaa"
          className='input-style'
        />
      </label>
      <label className='label-style'>
        <span>Data de entrega</span>
        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          placeholder="dd/MM/aaaa"
          className='input-style'
        />
      </label>

      <button type="submit" className={'w-full text-lg p-2 border border-solid border-[#3a3a3a] rounded text-white bg-inherit cursor-pointer' + (isSending ? ' disabled-button' : "")} disabled={isSending}>Criar atividade</button>
    </form>
  )
}
