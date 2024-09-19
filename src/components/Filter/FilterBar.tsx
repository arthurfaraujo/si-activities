export default function FilterBar() {
  return (
    <div className="filter-bar w-full flex justify-center items-center gap-4 p-4 appearance-none bg-inherit">
      <select className="w-1/4 p-2 rounded border border-solid border-[#272727] bg-inherit">
        <option className="bg-inherit" value="all">Todas as matérias</option>
        <option value="active">Ativas</option>
        <option value="inactive">Inativas</option>
      </select>
    </div>
  )
}