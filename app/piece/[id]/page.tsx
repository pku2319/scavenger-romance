import { Pieces } from "@/app/lib/definitions";

const pieces: Pieces = (await import("./pieces.json")).default

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const piece = pieces[id];
  return (
    <div>
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Question to obtain piece: #{id}
        </p>
      </header>
      <div className="flex flex-col items-center p-24">
        {
          piece.type === 'interaction w/ answer' && (
            <p className="mb-2 block text-base font-medium">
              {piece.prompts[0].prompt}
            </p>
          )
        }
      </div>
    </div>
  )
}