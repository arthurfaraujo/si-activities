import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useStore } from '@nanostores/react'
import { courses } from '@/stores/listStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export interface SubjectData {
  id: number
  name: string
  period: number
  courseId?: number
  courseName?: string
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
        courses.set(await (await fetch('/api/courses')).json())
      } catch (e) {
        console.error(e)
      }
    }
    fetchCourses()
  }, [])

  function handleChange({
    e,
    select
  }: {
    e?: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    select?: number
  }) {
    if (e) {
      const { name, value } = e.target

      e.target.checkValidity()

      setFormData(data => ({
        ...data,
        [name]: value
      }))
    }

    if (select) {
      setFormData(data => ({ ...data, courseId: select }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsSending(is => !is)
      await fetch('/api/subjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      setIsSending(is => !is)
      window.location.href = '/home'
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
          onChange={e => handleChange({ e })}
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
          onChange={e => handleChange({ e })}
          required
          autoComplete='off'
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Curso</span>
        <Select
          onValueChange={value => {
            const data = Number(value)
            handleChange({ select: data })
          }}
        >
          <SelectTrigger className='input-style'>
            <SelectValue placeholder="Nenhum" />
          </SelectTrigger>
          <SelectContent>
            {$courses.map(course => (
              <SelectItem key={course.id} value={course.id.toString()}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
