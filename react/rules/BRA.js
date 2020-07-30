import msk from 'msk'
import brazil from '@vtex/phone/countries/BRA'

import { getPhoneFields } from '../modules/phone'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(brazil)

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
      required: true,
      mask: value => msk.fit(value, '999.999.999-99'),
      validate: cpf => {
        if (!cpf) {
          return false
        }

        let sum = 0
        let remainder

        cpf = !cpf || typeof cpf !== 'string' ? '' : cpf.replace(/[^\d]+/g, '')

        if (
          cpf === '00000000000' ||
          cpf === '11111111111' ||
          cpf === '22222222222' ||
          cpf === '33333333333' ||
          cpf === '44444444444' ||
          cpf === '55555555555' ||
          cpf === '66666666666' ||
          cpf === '77777777777' ||
          cpf === '88888888888' ||
          cpf === '99999999999'
        ) {
          return false
        }

        for (let i = 1; i <= 9; i++) {
          sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i)
        }

        remainder = (sum * 10) % 11

        if (remainder === 10 || remainder === 11) remainder = 0
        if (remainder !== parseInt(cpf.substring(9, 10), 10)) return false

        sum = 0
        for (let i = 1; i <= 10; i++) {
          sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i)
        }

        remainder = (sum * 10) % 11

        if (remainder === 10 || remainder === 11) remainder = 0
        if (remainder !== parseInt(cpf.substring(10, 11), 10)) return false

        return true
      },
    },
    {
      name: 'homePhone',
      maxLength: 30,
      label: 'homePhone',
      required: true,
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
      type: 'date',
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
      mask: value => msk.fit(value, '99.999.999/9999-99'),
      validate: value => {
        const cleanValue = value.replace(/[^\d]/g, '')

        if (cleanValue.length !== 14) return false

        const isRepeatedNum = '0123456789'
          .split('')
          .some(digit => digit.repeat(14) === cleanValue)

        if (isRepeatedNum) return false

        const firstWeights = '543298765432'.split('')
        const firstReduce = cleanValue
          .split('')
          .slice(0, 12)
          .reduce(
            (acc, cur, index) =>
              acc + parseInt(cur, 10) * parseInt(firstWeights[index], 10),
            0
          )

        const firstDigit = firstReduce % 11 < 2 ? 0 : 11 - (firstReduce % 11)

        if (firstDigit !== cleanValue.charAt(12)) return false

        const secondWeights = ['6', ...firstWeights]
        const secondReduce = cleanValue
          .split('')
          .slice(0, 13)
          .reduce(
            (acc, cur, index) =>
              acc + parseInt(cur, 10) * parseInt(secondWeights[index], 10),
            0
          )

        const secondDigit = secondReduce % 11 < 2 ? 0 : 11 - (secondReduce % 11)

        return secondDigit === cleanValue.charAt(13)
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
