import spain from '@vtex/phone/countries/ESP'

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(spain)

export default {
  country: 'ESP',
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
      label: 'ESP_dni',
      required: false,
      validate: regexValidation(/^(?:\d{8}|[A-z]\d{7})-?[A-z]{1}$/),
    },
    {
      name: 'homePhone',
      maxLength: 30,
      label: 'homePhone',
      required: false,
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
      name: 'tradeName',
      maxLength: 100,
      label: 'tradeName',
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'ESP_cif',
      validate: regexValidation(/^[A-z]{1}\d{8}$/),
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      ...getPhoneFields(phoneCountryCode),
    },
  ],
}
