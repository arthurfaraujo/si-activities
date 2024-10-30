import type { ActivityData } from '@/components/Activity/ActivityForm'

export default function Modal({ activity, onClose }: Readonly<{ activity: ActivityData, onClose: () => void }>) {
  const { name, subject, endDate, startDate, isActive, description } = activity

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000c0]">
      <div className="modal-content relative min-w-[300px] w-[25vw] min-h-52 bg-inherit p-5 rounded border border-solid border-[#272727]">
        <button className="absolute top-1 right-3 border-0 text-inherit cursor-pointer bg-none font-extrabold text-lg" onClick={onClose}>x</button>
        <h3 className="mb-3">{name}</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><b>Matéria:</b> {subject}</p>
          <p><b>Data de entrega:</b> {endDate}</p>
          <p><b>Data de criação:</b> {startDate}</p>
          <p><b>Atividade ativa:</b> {isActive ? "Sim" : "Não"}</p>
          <p className="col-start-1 col-end-3"><b>Descrição:</b> {description}</p>
        </div>
      </div>
    </div>
  )
}