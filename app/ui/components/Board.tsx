import Image from 'next/image'

import Piece from './Piece'

export default function Board({ gameState }: { gameState: Array<number> }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <p className='mb-2 block text-base font-medium'>Your Board</p>
        <div className="border-2 border-white flex flex-wrap w-[424px]">
          {
            gameState.map((state, index) => {
              return (
                <Piece
                  status={state}
                  id={index}
                  row={Math.floor(index / 4)}
                  col={index % 4} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}