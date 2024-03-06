import axios from 'axios';

export const sendOTP = async (mobileNumber: string, message: string) => {
  const url = 'https://api.semaphore.co/api/v4/otp';

  const apiKey = process.env.SEMAPHORE_API_KEY;
  //const sender = 'Semaphore'; // Optional *Replace once Semaphore account has an established sender name (as of now wala pa...)

  const data = {
    apikey: apiKey,
    number: mobileNumber,
    message,
    // from: sender,
  };

  try {
    const response = await axios.post(url, data);
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    console.log('OTP sent successfully!');

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};
