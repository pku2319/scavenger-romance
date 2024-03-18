import SignInButton from "../sign-in/components/SignInButton";
import Input from "./components/Input";
import Label from "./components/Label";

export default function LoginForm() {
  const initialState = { message: null, errors: {} };

  return (
    <div
      className="flex flex-col items-center justify-between p-16 mt-20"
    >
      <SignInButton />
      {/* <div className="flex flex-col items-center">
        <Label htmlFor='email' text="Email:" />
        <Input name="email" type="text" placeholder="" />
        <Label htmlFor='password' text="Password:" />
        <input
          className="h-4 p-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 rounded"
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
          minLength={6}
        />
      </div> */}

      {/* <div>
        <button type="submit" className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mt-5">
          Login
        </button>
      </div> */}
    </div>
  );
}
