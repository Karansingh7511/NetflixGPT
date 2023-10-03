export const checkValidateData = (email, password, fullname) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isFullNameValid = /^[A-Za-z\s]{3,}$/.test(fullname);

  if (!isFullNameValid) return "Oops! Your full name seems to be too short. Please enter your full name.";
  if (!isEmailValid) return "Uh-oh! It seems you've entered an invalid email format. Please double-check.";
  if (!isPasswordValid) return "Oops! Your password must be at least 8 characters long and include a mix of uppercase, lowercase, and numbers.";

  return null;
};
