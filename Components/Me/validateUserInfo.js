const MIN_NAME_LENGTH = 5;
const MAX_NAME_LENGTH = 20;
const MAX_ADDRESS_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

export const validateUserInfo = (userInfo) => {
  const { name, age, sex, avatar, email, phone, address, description } =
    userInfo;

  const errors = [];

  //validate name
  if (!name) {
    errors.push("Name cannot be empty!");
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.push(`Name cannot be shorter than ${MIN_NAME_LENGTH}!`);
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push(`Name cannot be longer than ${MAX_NAME_LENGTH}!`);
  }

  //validate age
  if (!age) {
    errors.push("Age cannot be empty!");
  } else {
    const ageValue = +age;
    if (!ageValue || age <= 0) {
      errors.push("Age must be a positive number!");
    }
  }

  //validate sex
  if (!sex) {
    errors.push("Gender cannot be empty!");
  }

  // TODO: avatar validation if needed

  //validate email
  if (!email) {
    errors.push("Email cannot be empty!");
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push("Invalid email format!");
  }

  //validate phone
  if (!phone) {
    errors.push("Phone cannot be empty!");
  } else if (!PHONE_REGEX.test(phone)) {
    errors.push("Invalid phone format!");
  }

  //validate address
  if (!address) {
    errors.push("Address cannot be empty!");
  } else if (address.length > MAX_ADDRESS_LENGTH) {
    errors.push(`Address cannot be longer than ${MAX_ADDRESS_LENGTH}!`);
  }

  //validate description
  if (!description) {
    errors.push("Description cannot be empty!");
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description cannot be longer than ${MAX_DESCRIPTION_LENGTH}!`);
  }

  return errors;
};
