import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { filters } from '@/stores/filtersStore'
import { useStore } from '@nanostores/react'

export default function FilterActive() {
  const $filters = useStore(filters)

  return (
    <Select onValueChange={(value: string) => filters.set({...$filters, isActive: value})}>
      <SelectTrigger className="w-fit max-w-[45%] dark focus:ring-1 gap-1">
        <SelectValue placeholder="Prazo" />
      </SelectTrigger>
      <SelectContent className='dark'>
        <SelectItem value="any">Todas</SelectItem>
        <SelectItem value="true">Abertas</SelectItem>
        <SelectItem value="false">Encerradas</SelectItem>
      </SelectContent>
    </Select>
  )
}
