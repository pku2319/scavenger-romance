// import { useFormState } from 'react-dom';
import { cookies } from 'next/headers';

import { fetchTravelerById } from '@/app/lib/data';
import CreateTravelerForm from './ui/form/CreateTravelerForm';
import Board from './ui/Board';

export default async function Home() {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(createTraveler, initialState);

  return (
    <main>
        <header className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {travelerData ? `Welcome Back, ${travelerData.name}!` : 'Welcome Traveler!'} 
          </p>
      </header>
      {
        travelerData ? <Board gameState={travelerData.board} /> : <CreateTravelerForm />
      }
    </main>
  );
}
