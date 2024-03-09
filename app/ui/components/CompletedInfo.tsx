import { fetchTravelerById } from '@/app/lib/data'
import { Piece } from '@/app/lib/definitions'

export default async function CompletedInfo({ piece }: { piece: Piece }) {
  const traveler = await fetchTravelerById(piece.partnerid);

  return (
    <div className="back flex flex-col justify-center items-center border-2 border-white">
      {
        traveler && (
          <>
            <div>Partner:</div>
            <div>{traveler?.name}</div>
          </>
        )
      }
      <div className='text-center mt-2'>{piece.answer}</div>
    </div>
  )
}