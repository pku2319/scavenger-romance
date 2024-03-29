import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { fetchTravelerById } from '@/app/lib/data';
import { updatePiece } from '@/app/lib/actions';
import { STATUS_COMPLETED } from '../../statuses';

import { Pieces } from "@/app/lib/definitions";
const pieces: Pieces = (await import("@/app/lib/pieces.json")).default

export default async function Page({ params }: { params: { id: string, partnerId: string } }) {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;
  const partnerData = await fetchTravelerById(params.partnerId)

  const { id } = params;
  const piece = pieces[id];

  const updateGame = async (formData: FormData) => {
    "use server";
    const answer = formData.get('answer')

    await updatePiece(traveler?.value || "", Number(id), STATUS_COMPLETED, answer?.valueOf().toString() || '', params.partnerId)

    redirect('/');
  }

  return (
    <div className='flex flex-col items-center'>
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <div>Piece: #{id} w/ {partnerData?.name}</div>
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
      <form
        className='flex flex-col items-center'
        action={updateGame}>
        <label htmlFor="answer" className="mb-2 block text-base font-medium">
          {piece.prompts[0].question}
        </label>
        <input
          className="h-4 p-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
          id="answer"
          name="answer"
          type="text" />
        <button
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Claim Piece!
        </button>
      </form>
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