import { cookies } from 'next/headers';

import { fetchTravelerById, fetchPiecesByTravelerId } from '@/app/lib/data';
import CreateTravelerForm from '@/app/ui/form/CreateTravelerForm';
import Board from '@/app/ui/components/Board';
import Link from 'next/link';

export default async function Home() {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;
  const piecesData = traveler ? await fetchPiecesByTravelerId(traveler.value) : null;

  return (
    <div>
      <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {travelerData ? `Welcome Back, ${travelerData.name}!` : 'Welcome Traveler!'}
          <Link
            href="/qr-code"
            className='absolute right-5 top-50% underline hover:text-blue-500'>
            My QR Code
          </Link>
        </div>
      </header>
      {
        travelerData ? <Board pieces={piecesData || []} /> : <CreateTravelerForm />
      }
    </div>
  );
}
