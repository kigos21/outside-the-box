// Services
export type ServicePill = {
  title: string;
  price: string;
};

export type RegularRateList = {
  title: string;
  items: string[];
  price?: string;
};

// Reserve Seat
export type SeatReservationInputs = {};

// Login / Register
export type UsernameFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (value: string) => void;
  username: string;
};

export type OTPFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (value: string) => void;
  otp: string;
  errorMessage?: string;
};

export type NewPasswordFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePasswordChange: (value: string) => void;
  handleConfirmPasswordChange: (value: string) => void;
  newPassword: string;
  confirmPassword: string;
};

// Backend
type Map = {
  [key: string]: string | undefined;
};

export type RegisterFormBody = Map & {
  username: string;
  firstname: string;
  lastname: string;
  occupation: string;
  affiliation: string;
  mobileNumber: string;
  password: string;
  confirmPassword: string;
};

export type Customer = {
  username: string;
  firstName: string;
  lastName: string;
  occupation: string;
  affiliation: string;
  mobileNumber: string;
  password: string;
};

export type LoginFormBody = Map & {
  username: string;
  password: string;
};

export type SeatReservationFormBody = {
  date: string;
  time: string;
  service: string;
};
