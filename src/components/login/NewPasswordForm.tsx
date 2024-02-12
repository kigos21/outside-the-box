import { NewPasswordFormProps } from '@/types';

export default function NewPasswordForm({
  handleSubmit,
  handlePasswordChange,
  handleConfirmPasswordChange,
  newPassword,
  confirmPassword,
}: NewPasswordFormProps) {
  return (
    <>
      <h2>Enter New Password</h2>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          required
          placeholder="New Password"
          className="mt-3 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
          value={newPassword}
          onChange={(e) => handlePasswordChange(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          placeholder="Confirm Password"
          className="mt-2 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
        />

        <button
          type="submit"
          className="my-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Reset
        </button>
      </form>
    </>
  );
}
