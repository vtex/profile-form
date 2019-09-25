import guatemala from '@vtex/phone/countries/GTM'

import { getPhoneFields } from '../modules/phone'
import regexValidation from '../modules/regexValidation'
import initialize from './initializeCountryPhone'

const phoneCountryCode = initialize(guatemala)

export default {
  country: 'GTM',
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
      label: 'GTM_dpi',
      required: true,
      validate: regexValidation(
        /^[\d]{8}(?:\-|)[\d]{1}(?:\-|)[\d]{2}(?:\-|)[\d]{2}$/,
      ),
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
      type: 'date',
      validate: isFutureDate,
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
      label: 'GTM_nit',
      validate: regexValidation(/^[\d]{7}(?:\-|)[\dkK]{1}$/),
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      ...getPhoneFields(phoneCountryCode),
    },
  ],
}
