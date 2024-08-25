import type { ActivityData } from "./ActivityList"

export default function Activity({
  activity,
  onClick
}: Readonly<{
  activity: ActivityData
  onClick: (activity: ActivityData) => void
}>) {
  const {name, subject, endDate, isActive} = activity
  return (
    <li onClick={() => onClick(activity)}>
      <div>
        <span><b>Activity:</b> {name}</span>
        <span><b>Subject:</b> {subject}</span>
        {isActive ? <span><b>Deadline:</b> {endDate}</span> : <span><b>Deadline ended</b></span>}
      </div>
    </li>
  )
}
