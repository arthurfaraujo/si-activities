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
        <span><b>Activity:</b> {name}</span>
        <span><b>Subject:</b> {subject}</span>
        <span><b>Deadline:</b> {endDate}</span>
      </div>
    </li>
  )
}
