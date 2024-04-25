import { NewPasswordFormProps } from '@/types';

export default function NewPasswordForm({
  handleSubmit,
  handlePasswordChange,
  handleConfirmPasswordChange,
  newPassword,
  confirmPassword,
}: NewPasswordFormProps) {
  return (
    <div className="text-center">
      <p className="text-xl  font-bold">Enter New Password</p>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          placeholder="New Password"
          className="mt-3 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
          value={newPassword}
          onChange={(e) => handlePasswordChange(e.target.value.trim())}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          placeholder="Confirm Password"
          className="mt-2 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value.trim())}
        />

        <button
          type="submit"
          className="my-4 w-32 rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
