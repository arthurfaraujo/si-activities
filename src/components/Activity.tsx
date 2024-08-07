export default function Activity({
  name,
  subject,
  endDate
}: Readonly<{
  name: string
  subject: string
  endDate: string
}>) {
  return (
    <li>
      <div>
        <span>{name}</span>
        <span>{subject}</span>
        <span>{endDate}</span>
      </div>
    </li>
  )
}
