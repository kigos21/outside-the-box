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

// Reserve seat
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
};

export type NewPasswordFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePasswordChange: (value: string) => void;
  handleConfirmPasswordChange: (value: string) => void;
  newPassword: string;
  confirmPassword: string;
};
