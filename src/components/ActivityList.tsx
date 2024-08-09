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
    // setData([
    //   {
    //     id: 1,
    //     name: 'Activity 1',
    //     subject: 'Subject 1',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: true
    //   },
    //   {
    //     id: 2,
    //     name: 'Activity 2',
    //     subject: 'Subject 2',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: false
    //   },
    //   {
    //     id: 4,
    //     name: 'Activity 2',
    //     subject: 'Subject 2',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: false
    //   },
    //   {
    //     id: 5,
    //     name: 'Activity 2',
    //     subject: 'Subject 2',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: false
    //   },
    //   {
    //     id: 6,
    //     name: 'Activity 2',
    //     subject: 'Subject 2',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: false
    //   },
    //   {
    //     id: 7,
    //     name: 'Activity 2',
    //     subject: 'Subject 2',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: false
    //   },
    //   {
    //     id: 3,
    //     name: 'Activity 3',
    //     subject: 'Subject 3',
    //     endDate: '2022-12-31',
    //     startDate: '2022-01-01',
    //     isActive: true
    //   }
    // ])
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
