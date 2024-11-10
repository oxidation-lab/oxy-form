
# 🛠️ Form Renderer

## 📜 Description

`oxy-form` is a powerful and flexible library designed to dynamically render forms based on JSON configurations. It provides a set of customizable templates, making it easy to create forms that meet your needs without extensive coding. This project aims to streamline the process of form generation, validation, and submission in web applications.

## 🚀 Features

- **Dynamic Form Rendering**: Render forms using JSON configurations.
- **Customizable Templates**: Easily switch between different templates to match your application's style.
- **Field Validation**: Built-in utilities for validating form fields based on patterns.
- **TypeScript Support**: Strongly typed components and utilities for a better development experience.

## 📦 Installation

```bash
npm install @oxidation-lab/oxy-form
```

## 🎨 Templates

The library provides a set of templates that can be used to render forms. You can easily switch between templates by specifying the template name in the configuration.

### BasicTemplate (Default)

The default template is a simple form layout with basic styling. It is suitable for most applications.

```jsx
import ReactDOM from "react-dom/client";
import { FormRenderer } from "@oxidation-lab/oxy-form";

const formConfig = {
  formName: "Multi-Category Radio Form",
  fields: [
    {
      name: "username",
      type: "text",
      label: "Username",
      required: true,
      placeholder: "Enter your username",
      validation: {
        minLength: 3,
        maxLength: 20,
      },
    },
    {
      name: "preferences",
      label: "Preferences",
      type: "radio",
      required: true,
      groups: [
        {
          name: "operatingSystem",
          options: ["Windows", "macOS", "Linux"],
          layout: "inline",
        },
        {
          name: "languageProficiency",
          options: ["Beginner", "Intermediate", "Advanced"],
          layout: "newline",
        },
      ],
    },
  ],
  template: "BasicTemplate",
};

const App = () => (
  <div style={{ padding: "20px", marginTop: "300px" }}>
    <FormRenderer config={formConfig} />
  </div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
```

## 🔏 Validation with Regular Expressions

You can easily integrate regular expression-based validation into your forms. The library supports a wide range of field types such as email, username, password, phone number, and more. Below is how you can use the validation patterns from the `regexPatterns` module:

### Import Regular Expressions

```jsx
import { regexPatterns } from '@oxidation-lab/oxy-form';
```

### Example: Email Validation

You can validate the email field using the predefined regular expression pattern.

```jsx
{
  name: "email",
  type: "email",
  label: "Email Address",
  required: true,
  validation: {
    pattern: regexPatterns.email, // Using regex for email validation
  },
}
```

### Example: Username Validation

The username field can have a minimum and maximum length and only allow alphanumeric characters, dashes, and underscores.

```jsx
{
  name: "username",
  type: "text",
  label: "Username",
  required: true,
  validation: {
    pattern: regexPatterns.username(3, 16), // Min 3, Max 16 characters
  },
}
```

### Regular Expression Patterns

```js
export const regexPatterns = {
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
```

## 🧪 Example Field Configurations

### Email Field

```jsx
{
  name: "email",
  type: "email",
  label: "Email Address",
  required: true,
  validation: {
    pattern: regexPatterns.email,
  },
}
```

### Username Field

```jsx
{
  name: "username",
  type: "text",
  label: "Username",
  required: true,
  validation: {
    pattern: regexPatterns.username(3, 16),
  },
}
```

### Password Field

```jsx
{
  name: "password",
  type: "password",
  label: "Password",
  required: true,
  validation: {
    pattern: regexPatterns.password(8, 20),
  },
}
```

### Phone Number Field

```jsx
{
  name: "phoneNumber",
  type: "text",
  label: "Phone Number",
  required: true,
  validation: {
    pattern: regexPatterns.phoneNumber(10),
  },
}
```

## 📝 Custom Validation

You can easily create your own custom validation patterns as needed. The library is designed to allow you to extend it with your own patterns.

### Example: Custom Validation for a Zip Code

```jsx
const customZipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
```

You can use this pattern for validation by passing it in the `validation` object, just like any other regular expression.

```jsx
{
  name: "zipCode",
  type: "text",
  label: "Zip Code",
  required: true,
  validation: {
    pattern: customZipCodePattern,
  },
}
```

## 📚 Detailed Documentation of Regex Patterns

1. **Email**: Validates email addresses in a basic format such as `user@example.com`.
    - Pattern: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
  
2. **Username**: Allows alphanumeric characters, underscores, and dashes with customizable minimum and maximum length.
    - Pattern: `/^[a-zA-Z0-9_-]{minLength,maxLength}$/`

3. **Password**: Requires a combination of upper case letters, digits, and special characters, with customizable length and requirements.
    - Pattern: `/^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?]).{minLength,maxLength}$/`

4. **Phone Number**: Allows for phone numbers, optionally including a country code.
    - Pattern: `/^\\+?\\d{exactLength}$/`

5. **Postal Code**: Validates alphanumeric postal codes.
    - Pattern: `/^[A-Za-z0-9]{3,10}$/`

6. **URL**: Validates URLs starting with `http`, `https`, or `ftp`.
    - Pattern: `/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i`

7. **Alphabetic**: Validates alphabetic characters with customizable length and case sensitivity.
    - Pattern: `/^[a-zA-Z]{minLength,maxLength}$/`

8. **Digits Only**: Allows only numeric digits with customizable length.
    - Pattern: `/^\\d{minLength,maxLength}$/`

9. **Numeric Range**: Allows



## 🧮 Using `regexPatterns` with Arguments

You can use the `regexPatterns` utility to easily validate different types of inputs like emails, usernames, phone numbers, and more. The table below provides an overview of each regex pattern, the arguments you can pass to customize them, and examples of how to use them.

### Validation Patterns Table

| **Pattern**             | **Arguments**                                                                                                                                 | **Example Usage**                                                                                                                   | **Description**                                                                                                  |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Email**               | None                                                                                                                                          | `pattern: regexPatterns.email`                                                                                                      | Validates email addresses in a basic format like `user@example.com`.                                             |
| **Username**            | `minLength` (optional, default: 3), `maxLength` (optional, default: 16)                                                                       | `pattern: regexPatterns.username(3, 16)`                                                                                             | Validates alphanumeric characters, underscores, and dashes with specified min and max length.                   |
| **Password**            | `minLength` (optional, default: 6), `maxLength` (optional, default: 36), `requireUpper` (optional, default: true), `requireDigit` (optional, default: true), `requireSpecial` (optional, default: true) | `pattern: regexPatterns.password(8, 20, true, true, true)`                                                                           | Validates passwords with customizable length and requirements for upper case, digits, and special characters.     |
| **Phone Number**        | `exactLength` (required), `countryCodeOptional` (optional, default: true)                                                                     | `pattern: regexPatterns.phoneNumber(10)`                                                                                             | Validates phone numbers, optionally including a country code (e.g., `+1234567890`).                             |
| **Postal Code**         | None                                                                                                                                          | `pattern: regexPatterns.postalCode`                                                                                                 | Validates alphanumeric postal codes, with length between 3 and 10 characters.                                  |
| **URL**                 | None                                                                                                                                          | `pattern: regexPatterns.url`                                                                                                        | Validates URLs starting with `http`, `https`, or `ftp` (e.g., `http://example.com`).                           |
| **Alphabetic**          | `minLength` (optional, default: 1), `maxLength` (optional, default: 50), `caseSensitive` (optional, default: false)                            | `pattern: regexPatterns.alphabetic(1, 20)`                                                                                          | Validates alphabetic characters, with customizable min and max length and case sensitivity.                     |
| **Digits Only**         | `minLength` (optional, default: 1), `maxLength` (optional, default: 10)                                                                        | `pattern: regexPatterns.digitsOnly(3, 10)`                                                                                          | Validates numeric digits only, with customizable length.                                                      |
| **Numeric Range**       | `min` (optional, default: -Infinity), `max` (optional, default: Infinity), `allowNegative` (optional, default: true)                          | `pattern: regexPatterns.numericRange(10, 100)`                                                                                      | Validates numeric values within a specified range, allowing for optional negative numbers.                      |


Here is how you can integrate the details for using `regexPatterns` with arguments and validation options in a detailed table format that you can directly add to your README file.


### Example: Custom Postal Code Validation

```jsx
const customZipCodePattern = /^[0-9]{5}(?:-[0-9]{4})?$/; // US zip code pattern

{
  name: "zipCode",
  type: "text",
  label: "Zip Code",
  required: true,
  validation: {
    pattern: customZipCodePattern,
  },
}
```

## 📄 Contributing

We welcome contributions to improve **oxy-form**! If you want to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to your branch (`git push origin feature-name`).
6. Create a new Pull Request.

Please make sure that your changes are well-documented and covered by tests if applicable.

### Code Style

We follow standard JavaScript/TypeScript coding practices and encourage writing clean, readable code. You can use tools like **Prettier** and **ESLint** to maintain code quality.

## 🧑💻 License

**oxy-form** is open-source software released under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 👥 Contact

- GitHub Repository: [https://github.com/oxidation-lab/oxy-form](https://github.com/oxidation-lab/oxy-form)

## 🔧 Acknowledgements

- This project is built using **React** and **TypeScript**.
- Thanks to [all contributors](https://github.com/oxidation-lab/oxy-form/graphs/contributors) for their contributions.
- Special thanks to the open-source community for their libraries and tools that make this project possible.

## 🚀 Roadmap

The following features and improvements are planned for future releases:

- 📱 **Mobile-first responsive form templates**.
- 🌍 **Internationalization (i18n)** support for form labels and error messages.
- 🧑💻 **Integration with popular form submission services** (e.g., Formspree, Firebase).
- 📝 **Enhanced documentation** and examples for advanced use cases.
- 🛠️ **Expand regex patterns** for additional use cases (e.g., credit card validation, date validation).
- 🧑🎨 **Customizable styling**: Allow users to easily define and apply custom styles to form components.
- 🌐 **Support for other frontend frameworks**: Expand compatibility to support other popular frameworks like Vue.js, Angular, and Svelte, allowing users to integrate **oxy-form** with their preferred stack.
- 🎨 **Design system integration**: Enable users to integrate with popular design systems (e.g., Material UI, Bootstrap) for consistent form design across applications.
  
Stay tuned for more updates!
