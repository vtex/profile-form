import msk from 'msk'

import { isPastDate } from '../utils/dateRules'

const IRL_MOBILE_REGEX = /^\+3538\d{8}$/
const IRL_LANDLINE_REGEX = /^\+3531\d{7}$/

function normalize(value) {
  return typeof value === 'string' ? value.replace(/[\s-]/g, '') : value
}

function isIrlFormat(normalized) {
  return IRL_MOBILE_REGEX.test(normalized) || IRL_LANDLINE_REGEX.test(normalized)
}

function formatIrl(normalized) {
  if (IRL_MOBILE_REGEX.test(normalized)) {
    return normalized.replace(/^\+353(\d{2})(\d{3})(\d{4})$/, '+353 $1 $2 $3')
  }

  if (IRL_LANDLINE_REGEX.test(normalized)) {
    return normalized.replace(/^\+353(\d{1})(\d{3})(\d{4})$/, '+353 $1 $2 $3')
  }

  return null
}

function processIrlPhone(value, formatter) {
  const normalized = normalize(value)

  if (!isIrlFormat(normalized)) return value

  return formatter(normalized)
}

function maskIrlPhone(value) {
  return processIrlPhone(value, formatIrl)
}

function submitIrlPhone(value) {
  return processIrlPhone(value, (normalized) => normalized)
}

function validateIrlPhone(value) {
  if (!value) return true

  return isIrlFormat(normalize(value))
}

function getIrlPhoneFields() {
  return {
    mask: maskIrlPhone,
    validate: validateIrlPhone,
    display: maskIrlPhone,
    submit: submitIrlPhone,
  }
}

export default {
  country: 'IRL',
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
      required: true,
      ...getIrlPhoneFields(),
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
      mask: (value) => msk.fit(value, '99/99/9999'),
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
      name: 'businessPhone',
      maxLength: 30,
      label: 'businessPhone',
      required: true,
      ...getIrlPhoneFields(),
    },
  ],
}
