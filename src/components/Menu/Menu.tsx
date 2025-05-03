import { BookPlus, FilePlus, House, ListPlus, User, UserMinusIcon, UserPlus, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function Menu({ hasToken }: { hasToken: boolean }) {
  let username = localStorage.getItem('username')

  if (!hasToken) {
    username = null
    localStorage.removeItem('username')
  }

  async function handleLogout() {
    await fetch('/api/signout')

    localStorage.removeItem('username')
    window.location.href = '/home'
  }

  return (
    <>
      <ListMenu
        hasToken={hasToken}
        username={username}
        onLogout={handleLogout}
      />
      <DropMenu
        hasToken={hasToken}
        username={username}
        onLogout={handleLogout}
      />
    </>
  )
}

function ListMenu({
  hasToken,
  username,
  onLogout
}: {
  hasToken: boolean
  username: string | null
  onLogout: () => void
}) {
  return (
    <ul className="hidden lg:flex gap-2">
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
        <a href={'/home'}>
          <Button className="focus:bg-zinc-700 focus:text-inherit hover:bg-zinc-800 transition-all duration-200 flex gap-2">
            <House className="h-4 w-4" />
            <span>Início</span>
          </Button>
        </a>
      </li>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CustomAvatar username={username} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-zinc-600 w-fit p-2 bg-zinc-900 text-inherit mt-1 mr-4">
            {!hasToken ? (
              <>
                <a href={'/signin'}>
                  <DropdownMenuItem className="hover:!bg-zinc-700 hover:!text-inherit">
                    <User />
                    <span>Iniciar sessão</span>
                  </DropdownMenuItem>
                </a>
                <a href={'/signup'}>
                  <DropdownMenuItem className="hover:!bg-zinc-700 hover:!text-inherit">
                    <UserPlus />
                    <span>Criar conta</span>
                  </DropdownMenuItem>
                </a>
              </>
            ) : (
                <DropdownMenuItem className="hover:!bg-zinc-700 hover:!text-inherit" onClick={onLogout}>
                  <UserMinusIcon />
                  <span>Sair</span>
                </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </ul>
  )
}

function DropMenu({
  hasToken,
  username,
  onLogout
}: {
  hasToken: boolean
  username: string | null
  onLogout: () => void
}) {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CustomAvatar username={username} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border border-zinc-600 w-56 bg-zinc-900 text-inherit mt-1 mr-2">
          <a href={'/home'}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <House className="mr-2 h-4 w-4" />
              <span>Início</span>
            </DropdownMenuItem>
          </a>
          <a href={'/activity/create'}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <FilePlus className="mr-2 h-4 w-4" />
              <span>Criar uma atividade</span>
            </DropdownMenuItem>
          </a>
          <a href={'/subject/create'}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Criar uma matéria</span>
            </DropdownMenuItem>
          </a>
          <a href={'/course/create'}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <ListPlus className="mr-2 h-4 w-4" />
              <span>Criar um curso</span>
            </DropdownMenuItem>
          </a>
          {!hasToken ? (
            <>
              <a href={'/signin'}>
                <DropdownMenuItem className="hover:!bg-zinc-700 hover:!text-inherit">
                  <User />
                  <span>Iniciar sessão</span>
                </DropdownMenuItem>
              </a>
              <a href={'/signup'}>
                <DropdownMenuItem className="hover:!bg-zinc-700 hover:!text-inherit">
                  <UserPlus />
                  <span>Criar conta</span>
                </DropdownMenuItem>
              </a>
            </>
          ) : (
            
              <DropdownMenuItem className="hover:!bg-zinc-700 hover:!text-inherit" onClick={onLogout}>
                <UserMinusIcon />
                <span>Sair</span>
              </DropdownMenuItem>
   
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function CustomAvatar({ username }: { username: string | null }) {
  return (
    <Avatar className="">
      <AvatarFallback className="!bg-inherit">
        {username ? (
          username
            .split(' ')
            .slice(0, 2)
            .map(name => name[0])
            .join('')
        ) : (
          <UserRound />
        )}
      </AvatarFallback>
    </Avatar>
  )
}
