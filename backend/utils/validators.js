export const validateEmail = (email) => {
  const trimmed = String(email || "").trim().toLowerCase();
  const EMAIL_REGEX = /^[a-zA-Z0-9]+@anurag\.edu\.in$/i;
  return EMAIL_REGEX.test(trimmed);
};

export const validatePassword = (password) => password && password.length >= 6;

export const validateRegisterInput = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "All fields are required";
  }

  if (!validateEmail(email)) {
    return "Only rollnumber@anurag.edu.in email addresses are allowed";
  }

  if (!validatePassword(password)) {
    return "Password must be at least 6 characters";
  }

  return null;
};

export const validateLoginInput = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!validateEmail(email)) {
    return "Only rollnumber@anurag.edu.in email addresses are allowed";
  }

  return null;
};
