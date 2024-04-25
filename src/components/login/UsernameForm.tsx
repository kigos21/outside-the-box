import { UsernameFormProps } from '@/types';

export default function UsernameForm({
  handleSubmit,
  handleChange,
  username,
}: UsernameFormProps) {
  return (
    <div className=" text-center">
      <p className="font-bold">Forget Password</p>
      <p className="text-sm">We will send an OTP through your SMS</p>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username e.g. joe123"
          className="mt-4 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
          value={username}
          onChange={(e) => handleChange(e.target.value.trim())}
        />
        <button
          type="submit"
          className="my-4 w-32   rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
