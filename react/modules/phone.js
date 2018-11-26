import Phone from '@vtex/phone'

export function validatePhone(countryCode) {
  return (value) => Phone.validate(value, countryCode)
}

export function formatPhone(countryCode) {
  return (value) => {
    const phone = Phone.getPhoneInternational(value, countryCode)
    if (!phone) return value

    return Phone.format(phone, Phone.NATIONAL)
  }
}

export function cleanPhone(value) {
  return value.replace(/[^\d]/g, '')
}

export function getPhoneFields(phoneCountryCode) {
  return {
    mask: formatPhone(phoneCountryCode),
    validate: validatePhone(phoneCountryCode),
    display: formatPhone(phoneCountryCode),
    submit: cleanPhone,
  }
}