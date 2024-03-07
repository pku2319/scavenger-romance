import Image from 'next/image'
import Link from 'next/link'

export default function Piece(
  { status, pieceId, row, col }:
    { status: number, pieceId: number, row: number, col: number }
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
              href={`/piece/${pieceId}`}>
              Found
            </Link>
          </div>
        )
      }
      {
        status === 2 && <Image
          src={`/row-${row}-column-${col}.jpg`}
          alt="Puzzle Board picture piece"
          key={row}
          className=""
          width={140}
          height={140}
          priority
        />
      }
    </div>
  )
}