import { cookies } from 'next/headers';
import Link from 'next/link';

import { Pieces } from "@/app/lib/definitions";
import { fetchTravelerById } from '@/app/lib/data';

const pieces: Pieces = (await import("./pieces.json")).default

export default async function Page({ params }: { params: { id: string } }) {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;

  const { id } = params;
  const piece = pieces[id];
  return (
    <div className='flex flex-col items-center'>
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <div>Piece: #{id}</div>
          <Link
            className='absolute right-5 top-50% underline hover:text-blue-500'
            href='/'>
            Game Board
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center p-24">
        <Prompt type={piece.type} prompts={piece.prompts} travelerName={travelerData?.name || ''} />
      </div>
      {
        piece.type.match('interaction') && (
          <div>
            Scan another person's QR Code to complete
          </div>
        )
      }
      {
        piece.type.match('individual') && (
          <button>
            Claim Piece!
          </button>
        )
      }
    </div>
  )
}

function Prompt(
  { type, prompts, travelerName }:
    { type: string, prompts: Array<any>, travelerName: string }
) {
  let promptKey = 0
  if (type.match('choice')) {
    promptKey = travelerName.length % 2
  }

  return (
    <p className="mb-2 block text-base font-medium">
      {prompts[promptKey].prompt}
    </p>
  )
}