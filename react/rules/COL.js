import colombia from '@vtex/phone/countries/COL'

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(colombia)

export default {
  country: 'COL',
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
      validate: regexValidation(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    },
    {
      name: 'document',
      maxLength: 50,
      label: 'COL_cedula',
      required: true,
      validate: regexValidation(/^[\d]{6,12}$/),
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
      name: 'tradeName',
      maxLength: 100,
      label: 'tradeName',
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'COL_rut',
      validate: regexValidation(/^[\d]{5,}$/),
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
