import { useEffect, useState } from 'react'
import Activity from './Activity.jsx'

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
        const response = await fetch(
          'http://si-activities-api.onrender.com/api/activities'
        )
        const data = await response.json()
        setData(data)
      } catch (e) {
        console.error('Error: ', e)
      }
    }

    fetchData()
  }, [])

  return (
    <ul>
      {data.map(activity => (
        <Activity
          name={activity.name}
          subject={activity.subject}
          endDate={activity.endDate}
        />
      ))}
    </ul>
  )
}
