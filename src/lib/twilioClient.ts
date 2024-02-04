import { TwilioCreateError } from '@/app/classes';
import twilioClient from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID as string;
const authToken = process.env.TWILIO_AUTH_TOKEN as string;
const verifySid = process.env.TWILIO_VERIFY_SID as string;

export const twilio = twilioClient(accountSid, authToken);

export async function sendOTP(mobileNumber: string) {
  try {
    const verification = await twilio.verify.v2
      .services(verifySid)
      .verifications.create({ to: mobileNumber, channel: 'sms' });

    return verification;
  } catch (error) {
    console.log('TWILIO ERROR: ' + error);
    throw new TwilioCreateError(
      'There was an error sending an OTP to your number.',
    );
  }
}

export async function verifyOTP(mobileNumber: string, otp: string) {
  try {
    const verification = await twilio.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: mobileNumber, code: otp });

    return verification;
  } catch (error) {
    console.log('TWILIO ERROR: ' + error);
    throw new TwilioCreateError('There was an error verifying your OTP.');
  }
}
