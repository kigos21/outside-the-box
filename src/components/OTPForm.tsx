import { OTPFormProps } from '@/types';

export default function OTPForm({
  handleSubmit,
  handleChange,
  otp,
}: OTPFormProps) {
  return (
    <>
      <h2>Enter OTP</h2>
      <p className="text-sm">
        We have sent an OTP to your mobile number. Enter them for verification.
      </p>
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
        <button
          type="submit"
          className="my-4 w-full rounded-full bg-otb-blue px-6 py-4 font-semibold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
        >
          Verify
        </button>
      </form>
    </>
  );
}
