import uruguay from '@vtex/phone/countries/URY' // Used for initialization purposes, do not remove it!

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(uruguay)

function validateCedulaURY(value) {
  var baseArray, c, i, intArray, j, k, len, len1, verifiyDigit
  value = value.replace(/\-|\./g, '')
  intArray = []
  for (j = 0, len = value.length; j < len; j++) {
    c = value[j]
    intArray.push(parseInt(c))
  }
  //array base para validação no Uruguai
  baseArray = [8, 1, 2, 3, 4, 7, 6]
  verifiyDigit = 0
  //executa o cálculo para criação do dígito verificador
  for (i = k = 0, len1 = baseArray.length; k < len1; i = ++k) {
    value = baseArray[i]
    verifiyDigit += baseArray[i] * intArray[i]
  }
  verifiyDigit %= 10
  //valida o dígito verificador
  return verifiyDigit === intArray[intArray.length - 1]
}

export default {
  country: 'URY',
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
      label: 'URY_cedula',
      required: true,
      validate: validateCedulaURY,
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
      label: 'URY_rut',
      validate: regexValidation(/^\d{12}$/),
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      ...getPhoneFields(phoneCountryCode),
    },
  ],
}
