import msk from 'msk'

import { isPastDate } from '../utils/dateRules'

// `@vtex/phone` has no native `IRL` country module (there is no
// `@vtex/phone/countries/IRL`, and there never was one — see CHANGELOG).
// Relying on `initializeCountryPhone` + `getPhoneFields` (as done for other
// countries) breaks the build for Ireland, so this rule implements its own
// phone validation/masking instead. See specs/irl-phone-format-validation.md
// for the full rationale (Decision 1).

// Confirmed valid formats (ticket #1447585 / OMS-9318, dunnesstores):
//   mobile:             +353 87 123 4567
//   landline (Dublin):  +353 1 123 4567
const IRL_MOBILE_REGEX = /^\+3538\d{8}$/
const IRL_LANDLINE_REGEX = /^\+3531\d{7}$/

// Before this fix, IRL had no phone validation at all, so shoppers may
// already have a phone number saved in an unrelated/free-form format. That
// data must never be rejected or altered just because it doesn't match the
// two formats above (Decision 2) — it's left untouched by mask/display/submit
// and still accepted by validate.
const LEGACY_PHONE_REGEX = /^[+()\d\s-]+$/
const MIN_LEGACY_DIGITS = 4

function normalize(value) {
  return typeof value === 'string' ? value.replace(/[\s-]/g, '') : value
}

function isIrlFormat(normalized) {
  return IRL_MOBILE_REGEX.test(normalized) || IRL_LANDLINE_REGEX.test(normalized)
}

function isLegacyPhone(value) {
  if (typeof value !== 'string') return false

  const digitCount = (value.match(/\d/g) || []).length

  return LEGACY_PHONE_REGEX.test(value.trim()) && digitCount >= MIN_LEGACY_DIGITS
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

// Only values matching one of the confirmed formats are reformatted/
// normalized. Anything else (legacy free-form data) passes through
// unchanged, at every stage (mask, display and submit).
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

  const normalized = normalize(value)

  if (isIrlFormat(normalized)) return true

  return isLegacyPhone(value)
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
      ...getIrlPhoneFields(),
    },
  ],
}
