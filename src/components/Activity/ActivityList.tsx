import { useEffect, useState } from 'react'
import Activity from './Activity.tsx'
import { API_URL } from '@/const.ts'
import Modal from '../Others/Modal.tsx'
import Loading from '../Others/Loading.tsx'
import { isLoading, subjects } from '@/stores/listStore.ts'
import { filters } from '@/stores/filtersStore.ts'
import { useStore } from '@nanostores/react'
import { filterActivities } from '@/utils/filterUtil.ts'

export interface ActivityData {
  id: number
  name: string
  subject_id: number
  subject?: string
  endDate: string
  startDate: string
  isActive: boolean
  description: string
}

export interface SubjectData {
  id: number
  name: string
}

export default function ActivityList() {
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([])
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null)
  const $isLoading = useStore(isLoading)
  const $filters = useStore(filters)

  useEffect(() => {
    async function fetchData() {
      try {        
        subjects.set(await (await fetch(API_URL + '/subjects')).json())
        const activities = await (await fetch(API_URL + '/activities')).json()

        setActivitiesData(activities.map((act: ActivityData) => (
          {
            ...act,
            subject: subjects.get().find(
              subject => subject.id == act.subject_id
            )?.name
          }
        )))

        isLoading.set(false)
      } catch (e) {
        console.error('Error: ', e)
      }
    }
    
    fetchData()
  }, [])

  function handleClick(activity: ActivityData) {
    setSelectedActivity(activity)
  }

  function closeModal() {
    setSelectedActivity(null)
  }

  return (
    <>
      {$isLoading ? (
        <Loading />
      ) : (
        <ul className="activity-list w-full grid grid-cols-[repeat(auto-fill,250px)] justify-center content-start list-none gap-4 p-4 flex-grow">
            {filterActivities($filters, activitiesData).map(activity => (
            <Activity
              key={activity.id}
              activity={activity}
              onClick={handleClick}
            />
          ))}
        </ul>
      )}
      {selectedActivity && (
        <Modal activity={selectedActivity} onClose={closeModal} />
      )}
    </>
  )
}
