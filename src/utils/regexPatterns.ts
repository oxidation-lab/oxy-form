const regexPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  username: (minLength = 3, maxLength = 16) =>
    new RegExp(`^[a-zA-Z0-9_-]{${minLength},${maxLength}}$`),

  password: (minLength = 6, maxLength = 36, requireUpper = true, requireDigit = true, requireSpecial = true) => {
    let pattern = `^`;
    if (requireUpper) pattern += `(?=.*[A-Z])`;
    if (requireDigit) pattern += `(?=.*\\d)`;
    if (requireSpecial) pattern += `(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?])`;
    pattern += `.{${minLength},${maxLength}}$`;
    return new RegExp(pattern);
  },

  phoneNumber: (exactLength: number, countryCodeOptional = true) => {
    const lengthPattern = `\\d{${exactLength}}`;
    return new RegExp(`^${countryCodeOptional ? "\\+?" : "\\+"}${lengthPattern}$`);
  },

  postalCode: /^[A-Za-z0-9]{3,10}$/,

  url: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
};

export default regexPatterns;
