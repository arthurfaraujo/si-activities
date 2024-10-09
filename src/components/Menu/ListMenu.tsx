import { BookPlus, FilePlus, House, Star } from 'lucide-react'
import { Button } from '../ui/button'

export default function ListMenu({url}: Readonly<{url: string}>) {
  return (
    <ul className='hidden lg:flex '>
      <li>
        <a href={url + '/activity/create'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Criar uma atividade</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={url + '/subject/create'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <BookPlus className="h-4 w-4" />
            <span>Criar uma matéria</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={url + '/rate'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <Star className="h-4 w-4" />
            <span>Avalie o site</span>
          </Button>
        </a>
      </li>
      <li>
        <a href={url + '/home'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <House className="h-4 w-4" />
            <span>Início</span>
          </Button>
        </a>
      </li>
    </ul>
  )
}
