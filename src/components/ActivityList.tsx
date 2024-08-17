import { useEffect, useState } from 'react'
import Activity from './Activity.jsx'
import { API_URL } from '../const.js'
import Loading from './Loading.js'

interface ActivityData {
  id: number
  name: string
  subject: string
  endDate: string
  startDate: string
  isActive: boolean
}

export default function ActivityList() {
  const [data, setData] = useState<ActivityData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

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

  return (
    <>
      {loading ? <Loading /> : <ul className="activity-list">
        {data.map(activity => (
          <Activity
            key={activity.id}
            name={activity.name}
            subject={activity.subject}
            endDate={activity.endDate}
          />
        ))}
      </ul>}
    </>
  )
}
