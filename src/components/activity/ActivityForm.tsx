import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { formatDate } from '../../utils/dateUtils'
import { courses, subjects } from '@/stores/listStore'
import { useStore } from '@nanostores/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select'
import { SelectValue } from '@radix-ui/react-select'

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
        courses.set(await (await fetch('/api/courses')).json())
      } catch (e) {
        console.error(e)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // pegar as matérias pelo curso de id tal
        subjects.set(
          await (await fetch(`/api/subjects/course/${courseId}`)).json()
        )
      } catch (e) {
        console.error(e)
      }
    }
    fetchSubjects()
  }, [courseId])

  function handleChange({
    e,
    selectData
  }: {
    e?: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    selectData?: { name: string; value: number }
  }) {
    if (e) {
      const { name, value } = e.target

      e.target.checkValidity()

      setFormData(data => ({
        ...data,
        [name]: value
      }))
    }

    if (selectData) {
      setFormData(data => ({ ...data, [selectData.name]: selectData.value }))
      console.log(selectData)
      console.log(formData)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsSending(is => !is)
      await fetch('/api/activities', {
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
          autoComplete="off"
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Curso</span>
        <Select
          onValueChange={value => setCourseId(Number(value))}
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
      <label className="label-style">
        <span>Matéria</span>
        <Select
          onValueChange={value => {
            const data = { name: 'subjectId', value: Number(value) }
            handleChange({ selectData: data })
          }}
        >
          <SelectTrigger className='input-style' value={formData.subjectId}>
            <SelectValue placeholder="Nenhuma"/>
          </SelectTrigger>
          <SelectContent>
            {$subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id.toString()}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="label-style">
        <span>Descrição</span>
        <input
          name="description"
          type="text"
          value={formData.description}
          onChange={e => handleChange({ e })}
          autoComplete="off"
          className="input-style"
        />
      </label>
      <label className="label-style">
        <span>Data de criação</span>
        <input
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={e => handleChange({ e })}
          autoComplete="off"
          className="input-style"
        />
      </label>
      <label className="label-style date-style">
        <span>Data de entrega</span>
        <input
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={e => handleChange({ e })}
          autoComplete="off"
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
