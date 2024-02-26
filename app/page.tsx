import Image from "next/image";
import { useFormState } from 'react-dom';

import { createTraveler } from '@/app/lib/actions';

export default function Home() {
  const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useFormState(createTraveler, initialState);

  return (
    <main>
      <form
        className="flex min-h-screen flex-col items-center justify-between p-24"
        action={createTraveler}>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Welcome Traveler
          </p>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="name" className="mb-2 block text-base font-medium">
            What is your name?
          </label>
          <input
            className="h-4 p-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
            id="name"
            name="name"
            type="text" />
        </div>
        <input
          className="hidden"
          id="game"
          name="game"
          value="first" />

        <div className="mb-64">
          <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
            Let&apos;s Begin
          </button>
        </div>
      </form>
    </main>
  );
}
