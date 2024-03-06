import Image from 'next/image'

export default function Piece(
  { status, id, row, col }:
    { status: number, id: number, row: number, col: number }
) {
  return (
    <div
      className={`w-[140px] h-[140px] ${status ? 'invisible' : 'bg-black'}`}
      key={id}>
      {
        status === 0 && <div className="w-[140px] h-[140px] bg-black" />
      }
      {
        status === 1 && <Image
          src={`/row-${row}_column-${col}.jpg`}
          alt="Puzzle Board picture piece"
          className=""
          width={140}
          height={140}
        />
      }
    </div>
  )
}