import { useState, type FormEvent } from 'react'

export interface UserAuth {
  nickname: string
  password: string
}

export default function SignInForm() {
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isWrong, setIsWrong] = useState<boolean>(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      setIsSending(is => !is)
      setIsWrong(false)
      const response = await fetch('/api/signin', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement)
      }).then(res => {
        const status = res.status

        if (status === 200) {
          return res.json()
        }

        return { token: null }
      })

      setIsSending(is => !is)
      if (response.token) {
        window.location.href = '/home'
      } else {
        setIsWrong(true)
      }
    } catch (e) {
      console.error('Error: ', e)
    }
  }

  return (
    <form
      className="max-w-[400px] w-full flex flex-wrap gap-4 p-6"
      onSubmit={handleSubmit}
    >
      <label className={'label-style ' + (isWrong ? 'text-red-400' : '')}>
        <span>Nome de usuário</span>
        <input
          name="nickname"
          type="text"
          required
          autoComplete="off"
          className={'input-style ' + (isWrong ? '!border-red-500' : '')}
        />
      </label>
      <label className={'label-style ' + (isWrong ? 'text-red-400' : '')}>
        <span>Senha</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="off"
          className={'input-style ' + (isWrong ? '!border-red-500' : '')}
        />
      </label>

      <button
        type="submit"
        className={
          'w-full text-lg p-2 border border-solid border-[#3a3a3a] rounded text-white bg-inherit cursor-pointer hover:bg-zinc-800 duration-200' +
          (isSending ? ' disabled-button' : '')
        }
        disabled={isSending}
      >
        Entrar
      </button>
    </form>
  )
}
