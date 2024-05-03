import msk from 'msk'
import ecuador from '@vtex/phone/countries/ECU'

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(ecuador)

function validateCedulaECU(value) {
  var c,
    calculatedVerifyDigit,
    documentWithOnlyNumbers,
    evenDigitsSum,
    i,
    intArray,
    j,
    len,
    nextDozen,
    oddDigitMultiplied,
    oddDigitsSum,
    provinceCode,
    sum,
    temp
  // o número é formado por 10 dígitos, podendo ter um '-' entre o nono e o décimo
  if (RegExp(/^[0-9]{9}-[0-9]{1}$|^[0-9]{10}$/).test(value)) {
    // remove traços contidos no documento
    documentWithOnlyNumbers = value.replace('-', '')
    // converte o array de caracteres em um array de inteiros
    intArray = []
    for (j = 0, len = documentWithOnlyNumbers.length; j < len; j++) {
      c = documentWithOnlyNumbers[j]
      intArray.push(parseInt(c))
    }
    // os dois primeiros dígitos correspondem à província e devem ser um número de 01 a 24
    provinceCode = intArray[0] * 10 + intArray[1]
    if (provinceCode < 1 || provinceCode > 24) {
      return false
    }
    evenDigitsSum = 0
    oddDigitsSum = 0
    // percorre o array de dígitos desconsiderando o dígito verificador
    i = 0
    while (i < intArray.length - 1) {
      // soma-se todos os dígitos de posição par do array
      // verifica se a posição atual é par (+1 é devido ao fato do array começar na posição zero)
      if ((i + 1) % 2 === 0) {
        evenDigitsSum += intArray[i]
      } else {
        // os dígitos da posição ímpar devem ser multiplicador por 2. Se o resultado da multiplicação der um número maior que 9, subtrair 9 a esse número.
        // Ao final, somar o resultado de todas essas contas
        oddDigitMultiplied = intArray[i] * 2
        if (oddDigitMultiplied > 9) {
          oddDigitMultiplied -= 9
        }
        oddDigitsSum += oddDigitMultiplied
      }
      i++
    }
    // o dígito verificador é calculado pela subtração da próxima dezena da soma dos cálculos acima pelo resultado da soma

    // cálcula a soma dos resultados acima
    sum = oddDigitsSum + evenDigitsSum
    // calcula a próxima dezena
    temp = sum / 10.0
    temp = Math.ceil(temp)
    nextDozen = temp * 10
    // calcula o dígito verificador
    calculatedVerifyDigit = nextDozen - sum
    // verifica se o calculado é igual ao passado
    return calculatedVerifyDigit === intArray[intArray.length - 1]
  }

  return false
}

export default {
  country: 'ECU',
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
      label: 'ECU_cedula',
      required: true,
      validate: validateCedulaECU,
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
      
     validate: isPastDate, mask: (value) => msk.fit(value, '99/99/9999')},
  ],
  businessFields: [
    {
      name: 'corporateName',
      maxLength: 100,
      label: 'corporateName',
    },
    {
      name: 'tradeName',
      maxLength: 100,
      label: 'tradeName',
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'ECU_ruc',
      validate: regexValidation(/^\d{13}$/),
    },
    {
      name: 'stateRegistration',
      maxLength: 50,
      label: 'stateRegistration',
      required: true,
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      ...getPhoneFields(phoneCountryCode),
    },
  ],
}
