import {
  BookPlus,
  FilePlus,
  House,
  ListPlus,
  User,
  UserMinusIcon,
  UserPlus,
  UserRound
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function Menu(userInfo: {
  username?: string
  isAdmin?: boolean
}) {
  const { username, isAdmin } = userInfo

  async function handleLogout() {
    await fetch('/api/signout')
    window.location.href = '/home'
  }

  return (
    <>
      <ListMenu isAdmin={isAdmin} username={username} onLogout={handleLogout} />
      <DropMenu isAdmin={isAdmin} username={username} onLogout={handleLogout} />
    </>
  )
}

function ListMenu({
  isAdmin,
  username,
  onLogout
}: {
  isAdmin?: boolean
  username?: string
  onLogout: () => void
}) {
  return (
    <ul className="hidden lg:flex gap-2">
      <li>
        <a href={'/home'}>
          <Button
            variant="ghost"
            className="transition-all duration-200 flex gap-2"
          >
            <House className="size-5" />
            <span>Início</span>
          </Button>
        </a>
      </li>
      {isAdmin === true && (
        <>
          <li>
            <a href={'/activity/create'}>
              <Button
                variant="ghost"
                className="transition-all duration-200 flex gap-2"
              >
                <FilePlus className="size-5" />
                <span>Atividade</span>
              </Button>
            </a>
          </li>
          <li>
            <a href={'/subject/create'}>
              <Button
                variant="ghost"
                className="transition-all duration-200 flex gap-2"
              >
                <BookPlus className="size-5" />
                <span>Matéria</span>
              </Button>
            </a>
          </li>
          <li>
            <a href={'/course/create'}>
              <Button
                variant="ghost"
                className="transition-all duration-200 flex gap-2"
              >
                <ListPlus className="size-5" />
                <span>Curso</span>
              </Button>
            </a>
          </li>
        </>
      )}

      <li>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CustomAvatar username={username} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-1 mr-4">
            {!username ? (
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
              <DropdownMenuItem
                className="hover:!bg-zinc-700 hover:!text-inherit"
                onClick={onLogout}
              >
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
  isAdmin,
  username,
  onLogout
}: {
  isAdmin?: boolean
  username?: string
  onLogout: () => void
}) {
  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CustomAvatar username={username} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1 mr-2">
          <a href={'/home'}>
            <DropdownMenuItem className="focus:bg-zinc-700 focus:text-inherit">
              <House className="mr-2 size-5" />
              <span>Início</span>
            </DropdownMenuItem>
          </a>
          <DropdownMenuSeparator />
          {!username ? (
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
            <>
              {isAdmin && (
                <>
                  <a href={'/activity/create'}>
                    <DropdownMenuItem className="">
                      <FilePlus className="mr-2 size-5" />
                      <span>Criar uma atividade</span>
                    </DropdownMenuItem>
                  </a>
                  <a href={'/subject/create'}>
                    <DropdownMenuItem className="">
                      <BookPlus className="mr-2 size-5" />
                      <span>Criar uma matéria</span>
                    </DropdownMenuItem>
                  </a>
                  <a href={'/course/create'}>
                    <DropdownMenuItem className="">
                      <ListPlus className="mr-2 size-5" />
                      <span>Criar um curso</span>
                    </DropdownMenuItem>
                  </a>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem
                className=""
                onClick={onLogout}
              >
                <UserMinusIcon />
                <span>Sair</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function CustomAvatar({ username }: { username?: string }) {
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
