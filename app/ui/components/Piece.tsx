import Image from 'next/image'

export default function Piece(
  { status, row, col }:
    { status: number, row: number, col: number }
) {
  return (
    <div
      className="w-[140px] h-[140px]">
      {
        status === 0 && <div className="w-[140px] h-[140px] bg-black" />
      }
      {
        status === 1 && (
          <div className="w-[140px] h-[140px] bg-black">
            Found
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