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


  alphabetic: (minLength = 1, maxLength = 50, caseSensitive = false) =>
    new RegExp(`^[a-zA-Z]{${minLength},${maxLength}}$`, caseSensitive ? '' : 'i'),

  digitsOnly: (minLength = 1, maxLength = 10) =>
    new RegExp(`^\\d{${minLength},${maxLength}}$`),

  // New pattern for numeric range with optional negative values
  numericRange: (min = -Infinity, max = Infinity, allowNegative = true) => {
    let pattern = '^';

    if (allowNegative && min < 0) pattern += '-?';

    pattern += '\\d+';

    const boundedPattern = new RegExp(pattern);
    return (value: string) => {
      const numValue = Number(value);
      return boundedPattern.test(value) && numValue >= min && numValue <= max;
    };
  },
};

export default regexPatterns;
