import { isPastDate } from '../utils/dateRules'
import regexValidation, { regexEmail } from '../modules/regexValidation'

export default {
  country: 'UNI',
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
      label: 'document',
    },
    {
      name: 'homePhone',
      maxLength: 30,
      label: 'homePhone',
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
      name: 'tradeName',
      maxLength: 100,
      label: 'tradeName',
      required: true,
    },
    {
      name: 'corporateDocument',
      maxLength: 30,
      label: 'corporateDocument',
      required: true,
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
    },
  ],
}
