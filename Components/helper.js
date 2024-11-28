// default user avatar when no image is given.
export const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/lego/7.jpg";

export const isPasswordStrong = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (email) => {
  return !!email && EMAIL_REGEX.test(email);
};

const PHONE_REGEX = /^\d{10}$/;

export const isPhoneValid = (phone) => {
  return !!phone && PHONE_REGEX.test(phone);
};
