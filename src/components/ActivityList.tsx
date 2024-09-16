import { useEffect, useState } from 'react'
import Activity from './Activity.jsx'
import { API_URL } from '../const.js'
import Loading from './Loading.js'
import Modal from './Modal.js'

export interface ActivityData {
  id: number
  name: string
  subject: string
  endDate: string
  startDate: string
  isActive: boolean
  description: string
}

export default function ActivityList() {
  const [data, setData] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL + '/activities')
        const data = await response.json()
        setData(data)
        setLoading(false)
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
      {loading ? <Loading /> : <ul className="activity-list w-full grid grid-cols-[repeat(auto-fill,250px)] justify-center content-start list-none gap-4 p-4 flex-grow">
        {data.map(activity => (
          <Activity
            key={activity.id}
            activity={activity}
            onClick={handleClick}
          />
        ))}
      </ul>}
      {selectedActivity && (
        <Modal activity={selectedActivity} onClose={closeModal} />
      )}
    </>
  )
}
