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
        <span><b>Atividade:</b> {name}</span>
        <span><b>Matéria:</b> {subject}</span>
        {isActive ? <span><b>Data de entrega:</b> {endDate}</span> : <span><b>Prazo de entrega encerrado!</b></span>}
      </div>
    </li>
  )
}
