import ActivityList from '../Activity/ActivityList'
import FilterBar from '../Filter/FilterBar'
import Loading from './Loading'
import { useStore } from '@nanostores/react'
import { isLoading } from '../../stores/listStore'

export default function LoadingContent() {
  const $isLoading = useStore(isLoading)

  return (
    <>
      {isLoading ? (
        // <Loading />
        <FilterBar />
      ) : (
        <>
          <FilterBar />
          <ActivityList />
        </>
      )}
    </>
  )
}
