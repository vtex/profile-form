import msk from 'msk'
import mexico from '@vtex/phone/countries/MEX'

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'
import { isPastDate } from '../utils/dateRules'

const phoneCountryCode = initialize(mexico)

export default {
  country: 'MEX',
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
      name: 'document',
      maxLength: 50,
      label: 'MEX_rfc',
      required: true,
      validate: regexValidation(/^[a-zA-Z]{4}[0-9]{6}(?:[a-zA-Z0-9]{3}|)$/),
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'MEX_rfc_corporate',
      validate: regexValidation(/^[a-zA-Z]{3}[0-9]{6}[a-zA-Z0-9]{3}$/),
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      ...getPhoneFields(phoneCountryCode),
    },
  ],
}
