// Accepts roll numbers (alphanumeric) followed by @anurag.edu.in
// e.g. 22A91A0501@anurag.edu.in
export const EMAIL_PATTERN = "^[a-zA-Z0-9]+@anurag\\.edu\\.in$";

export const EMAIL_REGEX = new RegExp(EMAIL_PATTERN, "i");

export const isValidEmail = (email) => EMAIL_REGEX.test(String(email || "").trim().toLowerCase());
