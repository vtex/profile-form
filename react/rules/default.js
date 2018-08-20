import moment from 'moment'
import msk from 'msk'
import Phone from '@vtex/phone'
import brazil from '@vtex/phone/countries/BRA'

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
      label: 'document',
      required: true,
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
      label: 'corporateDocument',
    },
    {
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
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
