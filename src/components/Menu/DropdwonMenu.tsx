import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { House, BookPlus, FilePlus, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { FRONT_RELATIVE_URL } from '@/const'

export default function DropdwonMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="default-border hover:bg-zinc-800 ">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="default-border w-56 bg-zinc-900 text-inherit mt-1 mr-2">
        <DropdownMenuGroup>
          <a href={FRONT_RELATIVE_URL + "/home"}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <House className="mr-2 h-4 w-4" />
              <span>Início</span>
            </DropdownMenuItem>
          </a>
          <a href={FRONT_RELATIVE_URL + "/activity/create"}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <FilePlus className="mr-2 h-4 w-4" />
              <span>Criar uma atividade</span>
            </DropdownMenuItem>
          </a>
          <a href={FRONT_RELATIVE_URL + "/subject/create"}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Criar uma matéria</span>
            </DropdownMenuItem>
          </a>
          <a href={FRONT_RELATIVE_URL + "/rate"}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <Star className="mr-2 h-4 w-4" />
              <span>Avalie o site</span>
            </DropdownMenuItem>
          </a>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
