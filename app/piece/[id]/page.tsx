import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { fetchTravelerById, fetchPiece } from '@/app/lib/data';
import { updatePiece } from '@/app/lib/actions';
import Status from './Status';
import { STATUS_COMPLETED } from './statuses';
import pieces from "@/app/lib/pieces.json";
import Header from '@/app/ui/components/Header';

export default async function Page({ params }: { params: { id: string } }) {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;
  const myPiece = traveler ? await fetchPiece(params.id, traveler.value) : null;

  const { id } = params;
  const piece = pieces[id as keyof typeof pieces];

  const updateGame = async (formData: FormData) => {
    "use server";
    const answer = formData.get('answer')

    await updatePiece(traveler?.value || "", Number(id), STATUS_COMPLETED, answer?.valueOf().toString() || '', null)

    redirect('/');
  }

  if (myPiece?.status === STATUS_COMPLETED) {
    return (
      <div className='flex flex-col items-center'>
        <Header>
          You already completed this piece!
        </Header>
      </div>
    )
  }


  return (
    <div className='flex flex-col items-center'>
      <Header>
          { /* To separate a server action */}
          <Status travelerId={traveler?.value || ""} piece={myPiece} />
      </Header>
      <div className="flex flex-col items-center p-24">
        <Prompt type={piece.type} prompts={piece.prompts} travelerName={travelerData?.name || ''} />
      </div>
      {
        piece.type.match('interaction') && (
          <div>
            Scan another person&apos;s QR Code to complete
          </div>
        )
      }
      {
        piece.type.match('individual') && (
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