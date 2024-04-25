import { NewPasswordFormProps } from '@/types';
import { useState } from 'react';

export default function NewPasswordForm({
  handleSubmit,
  handlePasswordChange,
  handleConfirmPasswordChange,
  newPassword,
  confirmPassword,
}: NewPasswordFormProps) {
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmNewPasswordVisible(!confirmNewPasswordVisible);
  };

  return (
    <div className="text-center">
      <p className="text-xl  font-bold">Enter New Password</p>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <div className="relative">
          <input
            type={newPasswordVisible ? 'text' : 'password'}
            name="newPassword"
            id="newPassword"
            required
            placeholder="New Password"
            className="mt-3 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
            value={newPassword}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm leading-5"
          >
            {newPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={confirmNewPasswordVisible ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="Confirm Password"
            className="mt-2 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
            value={confirmPassword}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-sm leading-5"
          >
            {confirmNewPasswordVisible ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="my-4 w-full rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
