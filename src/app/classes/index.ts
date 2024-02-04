// Classes for twilio
export class TwilioCreateError extends Error {
  name = 'TwilioCreateError';

  constructor(message: string) {
    super(message);
  }
}
