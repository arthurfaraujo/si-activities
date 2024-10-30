import { BookPlus, FilePlus, House, Star, ListPlus } from 'lucide-react'
import { Button } from '../ui/button'

export default function ListMenu() {
  return (
    <ul className='hidden lg:flex '>
      <li>
        <a href={'/activity/create'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Atividade</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={'/subject/create'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <BookPlus className="h-4 w-4" />
            <span>Matéria</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={'/course/create'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <ListPlus className="h-4 w-4" />
            <span>Curso</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={'/rate'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <Star className="h-4 w-4" />
            <span>Avalie o site</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={'/home'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <House className="h-4 w-4" />
            <span>Início</span>
          </Button>
        </a>
      </li>
    </ul>
  )
}
