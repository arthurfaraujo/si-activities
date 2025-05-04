import { useState, type ChangeEvent, type FormEvent } from 'react'
import { API_URL, FRONT_RELATIVE_URL } from '../../const'

export interface CourseData {
  id: number
  name: string
  periodsNumber: number
}

export default function CourseForm() {
  const [formData, setFormData] = useState<Partial<CourseData>>({
    name: '',
    periodsNumber: 0
  })
  const [isSending, setIsSending] = useState<boolean>(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) {
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
      await fetch(API_URL + '/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      setIsSending(is => !is)
      window.location.href = FRONT_RELATIVE_URL + '/home'
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  return (
    <form
      className="max-w-[400px] w-4/6 flex flex-wrap gap-4"
      onSubmit={handleSubmit}
    >
      <label className="label-style">
        <span>Nome</span>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete='off'
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Quantidade de períodos</span>
        <input
          name="periodsNumber"
          type="number"
          value={formData.periodsNumber}
          onChange={handleChange}
          required
          autoComplete='off'
          className="input-style"
        />
      </label>

      <button
        type="submit"
        className={
          'w-full text-lg p-2 border border-solid border-[#3a3a3a] rounded text-white bg-inherit cursor-pointer hover:bg-zinc-800 duration-200' +
          (isSending ? ' disabled-button' : '')
        }
        disabled={isSending}
      >
        Criar curso
      </button>
    </form>
  )
}
