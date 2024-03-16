import { createTraveler } from '@/app/lib/actions';
import Input from './components/Input';
import Label from './components/Label';

export default function CreateTravelerForm() {
  const initialState = { message: null, errors: {} };

  return (
    <form
      className="flex flex-col items-center justify-between pt-20 pb-10 mt-10"
      action={createTraveler}>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

      </div>
      <div className="flex flex-col items-center">
        <Label htmlFor='name' text="What is your name?" />
        <Input name="name" type="text" placeholder="" />
        <Label htmlFor='email' text="Email:" />
        <Input name="email" type="text" placeholder="" />
        <Label htmlFor='password' text="Password:" />
        <input
          className="h-4 p-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 rounded"
          id="password"
          type="password"
          name="password"
          required
          minLength={6}
        />
      </div>
      <input
        readOnly
        className="hidden"
        data-testid="game"
        id="game"
        name="game"
        value="first" />

      <div>
        <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mt-5">
          Let&apos;s Begin
        </button>
      </div>
    </form>
  );
}
