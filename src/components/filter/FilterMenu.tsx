import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'
import FilterSubject from './FilterSubject'
import FilterActive from './FilterActive'
import { isLoading } from '@/stores/listStore'
import { useStore } from '@nanostores/react'
import FilterCourse from './FilterCourse'
import { filters, type FilterOption, type Filters } from '@/stores/filtersStore'
import { useState } from 'react'

export default function FilterMenu() {
  const $isLoading = useStore(isLoading)
  const $filters = useStore(filters)
  const [tempFilters, setTempFilters] = useState<Filters>($filters)

  function changeFilter(key: FilterOption, value: string) {
    setTempFilters(tempFilters => ({ ...tempFilters, [key]: value }))
  }

  function applyFilters() {
    filters.set(tempFilters)
  }

  function clearFilters() {
    setTempFilters({
      course: 'any',
      subject: 'any',
      isActive: 'any'
    })
  }

  function previousFilters() {
    setTempFilters($filters)
  }

  return (
    !$isLoading && (
      <div className="w-full flex gap-2 justify-end p-4">
        <DropdownMenu onOpenChange={open => {
          if (open) {
            previousFilters()
          }
        }}>
          <DropdownMenuTrigger>
            <Button variant="outline">
              <SlidersHorizontal className="size-5" />
              <span>Filtros</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-screen w-sm">
            <DropdownMenuLabel>Filtros</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Curso</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={e => {
                  e.preventDefault()
                }}
              >
                <FilterCourse value={tempFilters.course} onChange={changeFilter} />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Matéria</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={e => {
                  e.preventDefault()
                }}
              >
                <FilterSubject
                  value={tempFilters.subject} 
                  courseId={tempFilters.course}
                  onChange={changeFilter}
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem
                onSelect={e => {
                  e.preventDefault()
                }}
              >
                <FilterActive value={tempFilters.isActive} onChange={changeFilter} />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="p-2 flex justify-between">
              <DropdownMenuItem
                onSelect={e => {
                  e.preventDefault()
                  clearFilters()
                }}
              >
                <Button
                  className="w-full text-[13px]"
                  variant="destructive"
                  size={'sm'}
                >
                  Limpar
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  applyFilters()
                }}
              >
                <Button className="w-full text-[13px]" size={'sm'}>
                  Aplicar
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  )
}
