import Phone from '@vtex/phone'

export function validatePhone(countryCode) {
  return (value) => Phone.validate(value, countryCode)
}

export function formatPhone(countryCode) {
  return (value) => {
    const phone = value.indexOf('+') === 0
      ? Phone.getPhoneInternational(value, countryCode)
      : Phone.getPhoneNational(value, countryCode)

    if (!phone) return value

    return Phone.format(phone, Phone.NATIONAL)
  }
}

export function cleanPhone(countryCode) {
  return (value) => {
    const numbers = value.replace(/[^\d]/g, '')

    try {
      const phone = Phone.getPhoneNational(numbers, countryCode)
      if (!phone) return value

      return Phone.format(phone, Phone.INTERNATIONAL)
    } catch (err) {
      return numbers
    }
  }
}

export function getPhoneFields(phoneCountryCode) {
  return {
    mask: formatPhone(phoneCountryCode),
    validate: validatePhone(phoneCountryCode),
    display: formatPhone(phoneCountryCode),
    submit: cleanPhone(phoneCountryCode),
  }
}