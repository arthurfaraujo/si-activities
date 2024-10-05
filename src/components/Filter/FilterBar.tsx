import FilterActive from './FilterActive'
import { isLoading } from '@/stores/listStore'
import { useStore } from '@nanostores/react'
import FilterSubject from './FilterSubject'

export default function FilterBar() {
  const loading = useStore(isLoading)

  return loading ? null : (
    <div className='w-full flex gap-2 justify-end px-4'>
      <FilterSubject />
      <FilterActive />
    </div>
  )
}
