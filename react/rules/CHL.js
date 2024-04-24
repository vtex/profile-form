import chile from '@vtex/phone/countries/CHL'

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(chile)

function validateRUT(rut) {
  var caracteres, dig, dv, i, j, k, resto, serie, sumatoria
  // Codigo inspirado de http://metaltux.cl/2014/06/12/script-de-validacion-de-rut-chileno-en-javascript/
  if (/^\d{1,2}\.?\d{3}\.?\d{3}\-?[\dkK]$/.test(rut)) {
    rut = rut.replace(/[.-]/g, '')
    if (rut.length === 8) {
      rut = '0' + rut
    }
    rut = rut.substr(0, 8) + '-' + rut.substr(8, 1)
    caracteres = []
    serie = [2, 3, 4, 5, 6, 7]
    dig = rut.toString().substr(rut.toString().length - 1, 1)
    rut = rut.toString().substr(0, rut.toString().length - 2)
    i = 0
    while (i < rut.length) {
      caracteres[i] = parseInt(rut.charAt(rut.length - (i + 1)))
      i++
    }
    sumatoria = 0
    k = 0
    resto = 0
    j = 0
    while (j < caracteres.length) {
      if (parseInt(k, 10) === 6) {
        k = 0
      }
      sumatoria += parseInt(caracteres[j]) * parseInt(serie[k])
      k++
      j++
    }
    resto = sumatoria % 11
    dv = 11 - resto
    if (parseInt(dv, 10) === 10) {
      dv = 'K'
    } else if (parseInt(dv, 10) === 11) {
      dv = 0
    }

    if (
      dv
        .toString()
        .trim()
        .toUpperCase() ===
      dig
        .toString()
        .trim()
        .toUpperCase()
    ) {
      return true
    }

    return false
  }

  return false
}

export default {
  country: 'CHL',
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
      label: 'CHL_rut',
      required: false,
      validate: validateRUT,
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
      label: 'CHL_rut',
      validate: regexValidation(/^0*(\d{1,3}(\.?\d{3})*)\-?([\dkK])$/),
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
