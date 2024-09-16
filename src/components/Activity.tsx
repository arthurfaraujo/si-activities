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
    <li onClick={() => onClick(activity)} className="w-full flex flex-col justify-center p-6 border border-solid border-[#2f2f2f] rounded cursor-pointer">
      <div className="w-full flex flex-col flex-wrap">
        <span><b>Atividade:</b> {name}</span>
        <span><b>Matéria:</b> {subject}</span>
        {isActive ? <span><b>Data de entrega:</b> {endDate}</span> : <span><b>Prazo de entrega encerrado!</b></span>}
      </div>
    </li>
  )
}
