import { useEffect, useState } from 'react'
import Activity from './Activity.tsx'
import Modal from '../Modal.tsx'
import Loading from '../Loading.tsx'
import { courses, isLoading, subjects } from '@/stores/listStore.ts'
import { filters } from '@/stores/filtersStore.ts'
import { useStore } from '@nanostores/react'
import { filterActivities } from '@/utils/filterUtil.ts'
import type { ActivityData } from './ActivityForm.tsx'

export default function ActivityList() {
  const [activitiesData, setActivitiesData] = useState<ActivityData[]>([])
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(
    null
  )
  const $isLoading = useStore(isLoading)
  const $filters = useStore(filters)
  const $subjects = useStore(subjects)
  const $courses = useStore(courses)

  useEffect(() => {
    async function fetchData() {
      try {
        const activities = await (await fetch('/api/activities')).json()
        subjects.set(await (await fetch('/api/subjects')).json())
        courses.set(await (await fetch('/api/courses')).json())

        setActivitiesData(
          activities.map((act: ActivityData) => ({
            ...act,
            subject: $subjects.find(subject => subject.id == act.subjectId)
              ?.name
          }))
        )

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
        <ul className="activity-list w-full grid grid-cols-[repeat(auto-fill,250px)] justify-center content-start list-none gap-4 p-4 grow">
          {filterActivities($filters, activitiesData, $subjects, $courses).map(
            activity => (
              <Activity
                key={activity.id}
                activity={activity}
                onClick={handleClick}
              />
            )
          )}
        </ul>
      )}
      {selectedActivity && (
        <Modal activity={selectedActivity} onClose={closeModal} />
      )}
    </>
  )
}
