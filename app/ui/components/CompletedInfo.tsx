import { fetchTravelerById } from '@/app/lib/data'
import { Piece } from '@/app/lib/definitions'

export default async function CompletedInfo({ piece }: { piece: Piece }) {
  const traveler = piece.partnerid ? await fetchTravelerById(piece.partnerid) : null;

  return (
    <div className="back flex flex-col justify-center items-center border-2 border-white">
      {
        traveler && (
          <>
            <div className='text-base'>Partner:</div>
            <div className='text-base'>{traveler?.name}</div>
          </>
        )
      }
      <div className='text-center mt-2'>{piece.answer}</div>
    </div>
  )
}