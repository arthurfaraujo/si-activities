import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type FilterOption, type Filters } from '@/stores/filtersStore'
import { useEffect, useState } from 'react'
import type { SubjectData } from '../subject/SubjectForm'
import { useStore } from '@nanostores/react'
import { courses, subjects } from '@/stores/listStore'

export default function FilterSubject({
  value,
  courseId,
  onChange
}: {
  value: string
  courseId: string
  onChange: (key: FilterOption, value: string) => void
}) {
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectData[]>([])
  const $subjects = useStore(subjects)
  const $courses = useStore(courses)

  useEffect(() => {
    const filtered = $subjects.filter(
      subject =>
        subject.courseName ==
        $courses.find(course => course.id.toString() === courseId)?.name
    )

    filtered.length == 0 && onChange("subject", "any")
    setFilteredSubjects(filtered)
  }, [courseId])

  return (
    <Select
      onValueChange={(value: string) => {
        onChange('subject', value)
      }}
      value={value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Matérias" />
      </SelectTrigger>
      <SelectContent className="p-1">
        <SelectItem value="any">Todas</SelectItem>
        {filteredSubjects.length > 0 &&
          filteredSubjects.map(subj => (
            <SelectItem key={subj.id} value={subj.id.toString()}>
              {subj.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
