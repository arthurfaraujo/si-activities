import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { API_URL, FRONT_RELATIVE_URL } from '../../const'
import { formatDate } from '../../utils/dateUtils'
import { courses, subjects } from '@/stores/listStore'
import { useStore } from '@nanostores/react'

export interface ActivityData {
  id: number
  name: string
  subjectId: number
  subject: string
  endDate: string
  startDate: string
  isActive: boolean
  description: string
}

export default function ActivityForm() {
  const $subjects = useStore(subjects)
  const $courses = useStore(courses)
  const [formData, setFormData] = useState<Partial<ActivityData>>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    subjectId: 0
  })
  const [isSending, setIsSending] = useState<boolean>(false)
  const [courseId, setCourseId] = useState<number>(0)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        courses.set(await (await fetch(API_URL + '/courses')).json())
      } catch (e) {
        console.error(e)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        subjects.set(await (await fetch(API_URL + `/subjects/course/${courseId}`)).json())
      } catch (e) {
        console.error(e)
      }
    }
    fetchSubjects()
  }, [courseId])

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
      await fetch(API_URL + '/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          endDate: formData.endDate && formatDate(formData.endDate),
          startDate: formData.startDate && formatDate(formData.startDate)
        })
      })

      setIsSending(is => !is)
      window.location.href = FRONT_RELATIVE_URL + "/home"
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
        <span>Curso</span>
        <select
          className="input-style"
          name="subjectId"
          onChange={e => {
            setCourseId(Number(e.target.value))
          }}
        >
          <option value="-1" className='bg-zinc-900' disabled selected>Nenhum</option>  
          {$courses.map(course => (
            <option key={course.id} value={course.id} className='bg-zinc-900'>
              {course.name}
            </option>
          ))}
        </select>
      </label>
      <label className="label-style">
        <span>Matéria</span>
        <select
          className="input-style"
          name="subjectId"
          onChange={handleChange}
        >
          <option value="-1" className='bg-zinc-900' disabled selected>Nenhuma</option>
          {$subjects.map(subject => (
            <option key={subject.id} value={subject.id} className='bg-zinc-900'>
              {subject.name}
            </option>
          ))}
        </select>
      </label>
      <label className="label-style">
        <span>Descrição</span>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
          autoComplete='off'
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Data de criação</span>
        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          autoComplete='off'
          className="input-style"
        />
      </label>
      <label className="label-style date-style">
        <span>Data de entrega</span>
        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          autoComplete='off'
          className="input-style"
        />
      </label>

      <button
        type="submit"
        className={
          'w-full text-lg p-2 border border-solid border-[#3a3a3a] rounded text-white bg-inherit cursor-pointer hover:bg-zinc-800 duration-200' +
          (isSending && ' disabled-button')
        }
        disabled={isSending}
      >
        Criar atividade
      </button>
    </form>
  )
}
