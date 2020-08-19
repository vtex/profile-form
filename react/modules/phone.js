import Phone from '@vtex/phone'

export function validatePhone(countryCode) {
  return value => Phone.validate(value, countryCode)
}

export function formatPhone(countryCode) {
  return value => {
    const phoneDigits = value.replace(/[^\d]+/g, '')
    const phone =
      value.indexOf('+') === 0
        ? Phone.getPhoneInternational(phoneDigits, countryCode)
        : Phone.getPhoneNational(phoneDigits, countryCode)

    if (!phone) return value.replace(/[^\d]+/g, '')

    return Phone.format(phone, Phone.NATIONAL)
  }
}

export function cleanPhone(countryCode) {
  return value => {
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
