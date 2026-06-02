import msk from 'msk'
import brazil from '@vtex/phone/countries/BRA'

import { getPhoneFields } from '../modules/phone'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(brazil)

const maskPhone = value =>
  value.length === 14
    ? msk.fit(value, '(99) 9999-9999')
    : msk.fit(value, '(99) 99999-9999')

export default {
  country: 'BRA',
  personalFields: [
    {
      name: 'firstName',
      maxLength: 100,
      label: 'firstName',
      required: true,
    },
    {
      name: 'lastName',
      maxLength: 100,
      label: 'lastName',
      required: true,
    },
    {
      name: 'email',
      maxLength: 100,
      label: 'email',
      hidden: true,
    },
    {
      name: 'document',
      maxLength: 50,
      label: 'BRA_cpf',
      mask: value => msk.fit(value, '999.999.999-99'),
      validate: value => {
        const cleanValue = value.replace(/[^\d]/g, '')
        if (cleanValue.length != 11) return false

        const isRepeatedNum = '0123456789'
          .split('')
          .some(digit => digit.repeat(11) === cleanValue)
        if (isRepeatedNum) return false

        const firstReduce = cleanValue
          .split('')
          .slice(0, 9)
          .reduce((acc, cur, index) => acc + parseInt(cur) * (10 - index), 0)
        const firstDigit = ((firstReduce * 10) % 11) % 10
        if (firstDigit != cleanValue.charAt(9)) return false

        const secondReduce = cleanValue
          .split('')
          .slice(0, 10)
          .reduce((acc, cur, index) => acc + parseInt(cur) * (11 - index), 0)
        const secondDigit = ((secondReduce * 10) % 11) % 10
        return secondDigit == cleanValue.charAt(10)
      },
    },
    {
      name: 'homePhone',
      maxLength: 30,
      label: 'homePhone',
      ...getPhoneFields(phoneCountryCode),
    },
    {
      name: 'gender',
      maxLength: 30,
      label: 'gender',
    },
    {
      name: 'birthDate',
      maxLength: 30,
      label: 'birthDate',
      mask: (value) => msk.fit(value, '99/99/9999'),
      validate: isPastDate,
    },
  ],
  businessFields: [
    {
      name: 'corporateName',
      maxLength: 100,
      label: 'corporateName',
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'BRA_cnpj',
      mask: value => msk.fit(value, 'SS.SSS.SSS/SSSS-99'),
      validate: value => {
        const cleanValue = value.replace(/[.\/-]/g, '').toUpperCase()
        if (cleanValue.length !== 14) return false
        if (!/^[A-Z0-9]{12}\d{2}$/.test(cleanValue)) return false
    
        if (/^(.)\1+$/.test(cleanValue)) return false
    
        const getCharValue = char => char.charCodeAt(0) - 48
        const values = cleanValue.split('').map(getCharValue)
    
        const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        const firstReduce = values
          .slice(0, 12)
          .reduce((acc, cur, index) => acc + cur * firstWeights[index], 0)
        const firstDigit = firstReduce % 11 < 2 ? 0 : 11 - (firstReduce % 11)
        if (firstDigit != cleanValue.charAt(12)) return false
    
        const secondWeights = [6, ...firstWeights]
        const secondReduce = values
          .slice(0, 13)
          .reduce((acc, cur, index) => acc + cur * secondWeights[index], 0)
        const secondDigit = secondReduce % 11 < 2 ? 0 : 11 - (secondReduce % 11)
        return secondDigit == cleanValue.charAt(13)
      },
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      ...getPhoneFields(phoneCountryCode),
    },
    {
      name: 'stateRegistration',
      maxLength: 50,
      label: 'stateRegistration',
    },
    {
      name: 'tradeName',
      maxLength: 100,
      label: 'tradeName',
    },
  ],
}
