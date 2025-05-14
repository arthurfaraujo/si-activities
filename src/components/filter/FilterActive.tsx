import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type FilterOption } from '@/stores/filtersStore'

export default function FilterActive({
  value,
  onChange
}: {
  value: string
  onChange: (key: FilterOption, value: string) => void
}) {
  return (
    <Select
      onValueChange={(value: string) => onChange('isActive', value)}
      value={value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent className="p-1">
        <SelectItem value="any">Todos</SelectItem>
        <SelectItem value="true">Abertas</SelectItem>
        <SelectItem value="false">Encerradas</SelectItem>
      </SelectContent>
    </Select>
  )
}
