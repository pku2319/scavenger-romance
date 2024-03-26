import Link from "next/link";

export default function Header({ children, hideHomeLink }: { children?: React.ReactNode, hideHomeLink?: boolean }) {
  return (
    <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        {children}
        {
          !hideHomeLink && (
            <Link
              className='absolute right-5 top-50% underline hover:text-blue-500'
              href='/'>
              Game Board
            </Link>
          )
        }
      </div>
    </header>
  )
}