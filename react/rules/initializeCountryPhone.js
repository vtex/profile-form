import Phone from '@vtex/phone'

export default function initialize(country) {
  const phoneCountryCode = country.countryCode
  Phone.countries[phoneCountryCode] = country

  return phoneCountryCode
}
