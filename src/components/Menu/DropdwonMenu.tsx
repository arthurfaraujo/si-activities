import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { House, BookPlus, FilePlus, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'

export default function DropdwonMenu({url}: Readonly<{url: string}>) {
  return (
    <div className='lg:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="hover:bg-zinc-800">Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border border-zinc-600 w-56 bg-zinc-900 text-inherit mt-1 mr-2">
          <DropdownMenuGroup>
            <a href={url + '/home'}>
              <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
                <House className="mr-2 h-4 w-4" />
                <span>Início</span>
              </DropdownMenuItem>
            </a>
            <a href={url + '/activity/create'}>
              <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
                <FilePlus className="mr-2 h-4 w-4" />
                <span>Criar uma atividade</span>
              </DropdownMenuItem>
            </a>
            <a href={url + '/subject/create'}>
              <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
                <BookPlus className="mr-2 h-4 w-4" />
                <span>Criar uma matéria</span>
              </DropdownMenuItem>
            </a>
            <a href={url + '/rate'}>
              <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
                <Star className="mr-2 h-4 w-4" />
                <span>Avalie o site</span>
              </DropdownMenuItem>
            </a>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
