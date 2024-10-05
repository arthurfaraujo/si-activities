import { useState, type ChangeEvent, type FormEvent } from 'react'
import { API_URL, FRONT_RELATIVE_URL } from '../../const'

interface FormData {
  name: string
}

export default function ActivityForm() {
  const [formData, setFormData] = useState<FormData>({
    name: ''
  })
  const [isSending, setIsSending] = useState<boolean>(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    e.target.checkValidity()

    setFormData({
      name: value
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsSending(is => !is)
      await fetch(API_URL + '/subjects', {
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
          className="input-style"
        />
      </label>

      <button
        type="submit"
        className={
          'w-full text-lg p-2 border border-solid border-[#3a3a3a] rounded text-white bg-inherit cursor-pointer' +
          (isSending ? ' disabled-button' : '')
        }
        disabled={isSending}
      >
        Criar matéria
      </button>
    </form>
  )
}
