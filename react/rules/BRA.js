import msk from 'msk'
import brazil from '@vtex/phone/countries/BRA'

import { getPhoneFields } from '../modules/phone'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'
import regexValidation, { regexEmail } from '../modules/regexValidation'

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
      required: true,
      validate: regexValidation(regexEmail),
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

        const cpfDigits = cpf.split('').map(Number)
        const firstElement = 0
        const cpfDigitsArray = [firstElement].concat(cpfDigits)

        const sum1 = cpfDigitsArray.reduce(function(acc, value, index) {
          if (index < 10) {
            return acc + value * (11 - index)
          }

          return acc
        })

        remainder = (sum1 * 10) % 11

        if (remainder === 10 || remainder === 11) remainder = 0
        if (remainder !== parseInt(cpf.substring(9, 10), 10)) return false

        const sum2 = cpfDigitsArray.reduce(function(acc, value, index) {
          if (index < 11) {
            return acc + value * (12 - index)
          }

          return acc
        })

        remainder = (sum2 * 10) % 11

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
      required: true,
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'BRA_cnpj',
      required: true,
      mask: value => msk.fit(value, '99.999.999/9999-99'),
      validate: cnpj => {
        if (!cnpj) {
          return false
        }

        cnpj = cnpj.replace(/[^\d]+/g, '')

        if (cnpj.length !== 14) {
          return false
        }

        if (
          cnpj === '00000000000000' ||
          cnpj === '11111111111111' ||
          cnpj === '22222222222222' ||
          cnpj === '33333333333333' ||
          cnpj === '44444444444444' ||
          cnpj === '55555555555555' ||
          cnpj === '66666666666666' ||
          cnpj === '77777777777777' ||
          cnpj === '88888888888888' ||
          cnpj === '99999999999999'
        ) {
          return false
        }

        // Validate DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho)
        const digitos = cnpj.substring(tamanho)
        let soma = 0
        let pos = tamanho - 7

        for (let i = tamanho; i >= 1; i--) {
          soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--
          if (pos < 2) {
            pos = 9
          }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

        if (resultado !== parseInt(digitos.charAt(0), 10)) {
          return false
        }

        tamanho += 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        for (let i = tamanho; i >= 1; i--) {
          soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--
          if (pos < 2) {
            pos = 9
          }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
          return false
        }

        return true
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
      required: true,
    },
    {
      name: 'tradeName',
      maxLength: 100,
      label: 'tradeName',
      required: true,
    },
  ],
}
