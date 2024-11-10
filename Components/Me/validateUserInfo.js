const MIN_NAME_LENGTH = 5;
const MAX_NAME_LENGTH = 20;
const MAX_ADDRESS_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 100;

export const validateUserInfo = (userInfo) => {
  const { name, age, sex, avatar, email, phone, address, description } =
    userInfo;

  const errors = [];

  if (!name) {
    errors.push("Name cannot be empty!");
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.push(`Name cannot be shorter than ${MIN_NAME_LENGTH}!`);
  } else if (name.length > MAX_NAME_LENGTH) {
    errors.push(`Name cannot be longer than ${MAX_NAME_LENGTH}!`);
  }
  if (!age) {
    errors.push("Age cannot be empty!");
  }
  // TODO: sex
  // TODO: avatar
  if (!email) {
    errors.push("Email cannot be empty!");
  }
  if (!phone) {
    errors.push("Phone cannot be empty!");
  }
  if (!address) {
    errors.push("Address cannot be empty!");
  } else if (address.length > MAX_ADDRESS_LENGTH) {
    errors.push(`Address cannot be longer than ${MAX_ADDRESS_LENGTH}!`);
  }
  if (!description) {
    errors.push("Description cannot be empty!");
  } else if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`Description cannot be longer than ${MAX_DESCRIPTION_LENGTH}!`);
  }
  return errors;
};
