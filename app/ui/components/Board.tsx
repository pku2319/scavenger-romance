import Piece from './Piece'
import { Piece as PieceType } from '@/app/lib/definitions';

export default function Board({ pieces }: { pieces: Array<PieceType> }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <p className='mb-2 block text-base font-medium'>Your Board</p>
        <div className="border-2 border-white flex flex-wrap w-[424px]">
          {
            pieces.map((piece) => {
              return (
                <Piece
                  status={piece.status}
                  key={piece.id}
                  pieceId={piece.pieceid}
                  row={Math.ceil(piece.pieceid / 3)}
                  col={(piece.pieceid % 3) || 3} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}