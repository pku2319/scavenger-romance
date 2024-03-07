import { cookies } from "next/headers";

import { fetchPiecesByTravelerId, fetchTravelerById } from "@/app/lib/data";
import { STATUS_FOUND } from "@/app/piece/[id]/statuses";

import { Pieces } from "@/app/lib/definitions";
const pieces: Pieces = (await import("@/app/lib/pieces.json")).default

export default async function Pieces({ params }: { params: { partnerId: string } }) {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;
  const partnerData = await fetchTravelerById(params.partnerId)
  const piecesData = traveler ? await fetchPiecesByTravelerId(traveler.value) : null;

  return (
    <div>
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed flex flex-col items-center left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p>Partner: {partnerData?.name}</p>
        </div>
      </header>
      <div className="flex min-h-screen flex-col items-center p-24">
        <h1 className="mb-2 block text-lg">In Progress Pieces</h1>
        {
          piecesData?.map((piece) => {
            if (piece.status !== STATUS_FOUND) {
              return null
            }

            const gamePiece = pieces[piece.pieceid]

            if (gamePiece.type.match('choice')) {
              return (
                <div key={piece.id}>
                  <p>{gamePiece.prompts[(travelerData?.name?.length || 0) % 2].shortName}</p>
                </div>
              )
            }

            return (
              <div key={piece.id}>
                <p>{gamePiece.prompts[0].shortName}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}