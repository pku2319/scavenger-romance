import Image from 'next/image'

export default function Board({ gameState }: { gameState: Array<number> }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center">
        <p className='mb-2 block text-base font-medium'>Your Board</p>
        <div className="relative border-2 border-white">
          <Image
            src="/scavenger_picture.jpeg"
            alt="Puzzle Board picture"
            className=""
            width={420}
            height={420}
            priority
          />
          <div className="absolute top-0 flex flex-wrap">
            {
              gameState.map((state, index) => {
                return (
                  <div
                    className={`w-[140px] h-[140px] ${state ? 'invisible' : 'bg-black'}`}
                    key={index} />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}