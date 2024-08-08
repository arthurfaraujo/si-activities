import { useEffect, useState } from 'react'
import Activity from './Activity.jsx'
import { API_URL } from '../const.js'

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL + '/activities')
        const data = await response.json()
        setData(data)
      } catch (e) {
        console.error('Error: ', e)
      }
    }

    fetchData()
  }, [])

  return (
    <ul className="activity-list">
      {data.map(activity => (
        <Activity
          key={activity.id}
          name={activity.name}
          subject={activity.subject}
          endDate={activity.endDate}
        />
      ))}
    </ul>
  )
}
