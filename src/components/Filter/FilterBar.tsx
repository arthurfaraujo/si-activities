import FilterActive from './FilterActive.tsx'
import { isLoading } from '@/stores/listStore.ts'
import { useStore } from '@nanostores/react'
import FilterSubject from './FilterSubject.tsx'

export default function FilterBar() {
  const loading = useStore(isLoading)

  return loading ? null : (
    <div className='w-full flex flex-wrap gap-4 justify-end pr-8'>
      <FilterSubject />
      <FilterActive />
    </div>
  )
}
