import { signIn } from 'next-auth/react';

export default function CreateTravelerForm() {
  return (
    <div
      className="flex flex-col items-center justify-between pt-20 pb-10 mt-10">
      <div>
        <button
          onClick={() => signIn()}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
          Sign up (google)
        </button>
      </div>
    </div>
  );
}
