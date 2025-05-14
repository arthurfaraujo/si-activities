import type { ActivityData } from './ActivityForm'

export default function Activity({
  activity,
  onClick
}: Readonly<{
  activity: ActivityData
  onClick: (activity: ActivityData) => void
}>) {
  const { name, subject, endDate, isActive } = activity
  return (
    <li
      onClick={() => onClick(activity)}
      className="max-w-80 aspect-video w-full flex flex-col justify-center p-6 default-border cursor-pointer transition duration-500 hover:bg-[#1f1f23]"
    >
      <div className="w-full flex flex-col flex-wrap">
        <span>
          <b>Atividade:</b> {name}
        </span>
        <span>
          <b>Matéria:</b> {subject}
        </span>
        {isActive ? (
          <span>
            <b>Data de entrega:</b> {endDate}
          </span>
        ) : (
          <span>
            <b>Prazo de entrega encerrado!</b>
          </span>
        )}
      </div>
    </li>
  )
}
