export default function regexValidation(customRegex) {
  const regex = new RegExp(customRegex)
  return (value) => regex.test(value)
}