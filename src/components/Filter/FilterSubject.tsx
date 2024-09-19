import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { filters } from '@/stores/filtersStore'
import { subjects } from '@/stores/listStore'
import { useStore } from '@nanostores/react'

export default function FilterSubject() {
  const $filters = useStore(filters)
  const $subjects = useStore(subjects)

  return (
    <Select onValueChange={(value: string) => filters.set({...$filters, subject: value})}>
      <SelectTrigger className="min-w-fit max-w-40 dark focus:ring-1 gap-1">
        <SelectValue placeholder="Matérias" />
      </SelectTrigger>
      <SelectContent className='dark'>
        <SelectItem value='any'>Todas</SelectItem>
        {$subjects.map((subj) => (<SelectItem key={subj.id} value={subj.name}>{subj.name}</SelectItem>))}
      </SelectContent>
    </Select>
  )
}
