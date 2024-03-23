import Image from 'next/image'
import Link from 'next/link'

import Flipper from './Flipper'
import CompletedInfo from './CompletedInfo'
import { Piece } from '@/app/lib/definitions'

export default function Piece(
  { status, piece, row, col }:
    { status: number, piece: Piece, row: number, col: number }
) {
  return (
    <div
      className="w-[140px] h-[140px]">
      {
        status === 0 && <div className="w-[140px] h-[140px] bg-black" />
      }
      {
        status === 1 && (
          <div className="w-[140px] h-[140px] bg-black flex items-center justify-center">
            <Link
              className="text-white underline hover:text-blue-500"
              href={`/piece/${piece.piece_id}`}>
              Found
            </Link>
          </div>
        )
      }
      {
        status === 2 && (
          <Flipper className="w-[140px] h-[140px] bg-black flex items-center justify-center">
            <Image
              src={`/row-${row}-column-${col}.jpg`}
              alt={`Puzzle Board picture piece ${piece.piece_id}`}
              key={row}
              className="front"
              width={140}
              height={140}
            />
            <CompletedInfo piece={piece} />
          </Flipper>
        )
      }
    </div>
  )
}