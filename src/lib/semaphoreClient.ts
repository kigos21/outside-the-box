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

    const responseData = response.data[0];
    const otp = responseData.code.toString();

    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

export const sendSMSNotification = async (mobileNumber: string) => {
  const url = 'https://api.semaphore.co/api/v4/priority';

  const data = {
    apikey: process.env.SEMAPHORE_API_KEY,
    number: mobileNumber,
    message: 'You have 10 minutes left within your session, thank you.',
  };

  try {
    const response = await axios.post(url, data);
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    console.log('Notification message sent successfully.');
  } catch (error) {
    console.error(error);
  }
};

export const sendReservationConfirmation = async (
  mobileNumber: string,
  message: string,
) => {
  const url = 'https://api.semaphore.co/api/v4/priority';

  const data = {
    apikey: process.env.SEMAPHORE_API_KEY,
    number: mobileNumber,
    message,
  };

  try {
    const response = await axios.post(url, data);
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    console.log('Reservation confirmation message sent successfully.');
  } catch (error) {
    console.error(error);
  }
};
