import type { ActivityData } from "./ActivityList"

export default function Modal({ activity, onClose }: Readonly<{ activity: ActivityData, onClose: () => void }>) {
  const { name, subject, endDate, startDate, isActive, description } = activity

  return (
    <div className="activity-modal">
      <div className="modal-content">
        <button className="btn-close" onClick={onClose}>X</button>
        <h3>{name}</h3>
        <div className="activity-info">
          <p><b>Matéria:</b> {subject}</p>
          <p><b>Data de entrega:</b> {endDate}</p>
          <p><b>Data de criação:</b> {startDate}</p>
          <p><b>Atividade ativa:</b> {isActive ? "Sim" : "Não"}</p>
          <p className="description"><b>Descrição:</b> {description}</p>
        </div>
      </div>
    </div>
  )
}