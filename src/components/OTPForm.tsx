import { OTPFormProps } from '@/types';

export default function OTPForm({
  handleSubmit,
  handleChange,
  otp,
  errorMessage,
}: OTPFormProps) {
  return (
    <div className="text-center">
      <p className="font-bold">Enter OTP</p>
      <p className="text-sm">We have sent an OTP to your mobile number.</p>
      <p className="text-sm">Enter them for verification.</p>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="number"
          name="otp"
          id="otp"
          required
          placeholder="OTP"
          minLength={6}
          maxLength={6}
          className="mt-3 w-full rounded-full border border-gray-300 px-6 py-4 text-center text-lg"
          value={otp}
          onChange={(e) => handleChange(e.target.value)}
        />
        {errorMessage && (
          <p role="alert" className="mt-[.25rem] px-6 text-xs text-red-500">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="my-4 w-32 rounded-lg bg-cs-blue px-6 py-4 font-semibold uppercase text-cs-cream shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
