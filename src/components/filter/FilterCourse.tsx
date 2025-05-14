import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type FilterOption } from '@/stores/filtersStore'
import type { CourseData } from '../course/CourseForm'
import { useEffect, useState } from 'react'
import { useStore } from '@nanostores/react'
import { courses } from '@/stores/listStore'

export default function FilterCourse({
  value,
  onChange
}: {
  value: string
  onChange: (key: FilterOption, value: string) => void
}) {
  const $courses = useStore(courses)

  return (
    <Select
      onValueChange={(value: string) => onChange('course', value)}
      value={value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Cursos" />
      </SelectTrigger>
      <SelectContent className="p-1">
        <SelectItem value="any" defaultChecked>Todos</SelectItem>
        {$courses.map(course => (
          <SelectItem key={course.id} value={course.id.toString()}>
            {course.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
