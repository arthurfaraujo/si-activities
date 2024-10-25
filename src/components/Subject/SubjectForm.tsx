import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { API_URL, FRONT_RELATIVE_URL } from '../../const'
import { useStore } from '@nanostores/react'
import { courses } from '@/stores/listStore'

export interface SubjectData {
  id: number
  name: string
  period: number
  courseId: number
}

export default function SubjectForm() {
  const $courses = useStore(courses)
  const [formData, setFormData] = useState<Partial<SubjectData>>({
    name: '',
    period: 0,
    courseId: 0
  })
  const [isSending, setIsSending] = useState<boolean>(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        courses.set(await (await fetch(API_URL + '/courses')).json())
      } catch (e) {
        console.error(e)
      }
    }
    fetchCourses()
  })

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
          autoComplete='off'
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Período</span>
        <input
          name="period"
          type="number"
          value={formData.period}
          onChange={handleChange}
          required
          autoComplete='off'
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Curso</span>
        <select
          className="input-style"
          name="courseId"
          onChange={handleChange}
        >
          <option value="-1" className='bg-zinc-900' disabled selected>Nenhum</option>  
          {$courses.map(course => (
            <option key={course.id} value={course.id} className='bg-zinc-900'>
              {course.name}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className={
          'w-full text-lg p-2 border border-solid border-[#3a3a3a] rounded text-white bg-inherit cursor-pointer hover:bg-zinc-800 duration-200' +
          (isSending && ' disabled-button')
        }
        disabled={isSending}
      >
        Criar matéria
      </button>
    </form>
  )
}
