import { cookies } from "next/headers";

import { fetchPiecesByTravelerId, fetchTravelerById } from "@/app/lib/data";
import { STATUS_FOUND } from "@/app/piece/[id]/statuses";

import { Pieces } from "@/app/lib/definitions";
import Link from "next/link";
import pieces from "@/app/lib/pieces.json";

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

            const gamePiece = pieces[piece.piece_id as unknown as keyof typeof pieces];

            if (gamePiece.type.match('choice')) {
              return <PieceLink
                key={piece.id}
                pieceId={piece.piece_id}
                partnerId={params.partnerId}
                shortname={gamePiece.prompts[(travelerData?.name?.length || 0) % 2].shortName} />
            }

            return <PieceLink
              key={piece.id}
              pieceId={piece.piece_id}
              partnerId={params.partnerId}
              shortname={gamePiece.prompts[0].shortName} />
          })
        }
      </div>
    </div>
  )
}

function PieceLink({ pieceId, partnerId, shortname }: { pieceId: number, partnerId: string, shortname: string }) {
  return (
    <div key={pieceId}>
      <Link
        href={`/piece/${pieceId}/partner/${partnerId}`}
        className="mb-2 block text-base underline hover:text-blue-500">
        <p>{shortname}</p>
      </Link>
    </div>
  )
}