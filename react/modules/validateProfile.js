import { MINIMUM_EXPECTED_DATE_LENGTH } from '../utils/dateRules.js'

export function applyMask(field, value) {
  return field.mask ? field.mask(value) : value
}

export function applyValidation(field, value) {
  if (!value || !value.trim()) {
    return field.required ? 'EMPTY_FIELD' : null
  }

  return (field.validate && !field.validate(value)) || containsEmoji(value)
    ? 'INVALID_FIELD'
    : null
}

export function applyFullValidation(rules, profile, isCorporate) {

  if(rules.country === 'HUN' && profile.birthDate.value){
    hungarianDateValidation(profile)
  }

  const validatedProfile = Object.keys(profile)
    .map(field => {
      const rule =
        rules.personalFields.find(rule => rule.name === field) ||
        rules.businessFields.find(rule => rule.name === field && isCorporate)
      if (rule) {
        const error = applyValidation(rule, profile[field].value)
        return { [field]: { ...profile[field], error } }
      } else {
        return { [field]: { value: null } }
      }
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})

  return addFocusToFirstInvalidInput(rules, validatedProfile)
}

export function isProfileValid(profile) {
  return !Object.keys(profile).some(field => profile[field].error != null)
}

export function addFocusToFirstInvalidInput(rules, profile) {
  const firstInvalidInput =
    rules.personalFields.find(field => profile[field.name].error != null) ||
    rules.businessFields.find(field => profile[field.name].error != null)

  if (firstInvalidInput == null) return profile

  const focusedInput = { ...profile[firstInvalidInput.name], focus: true }
  return { ...profile, [firstInvalidInput.name]: focusedInput }
}

function containsEmoji(input) {
  // Emojis until version 11.0
  const EMOJIS_REGEX = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/

  return EMOJIS_REGEX.test(input)
}

function hungarianDateValidation(profile) {
  let profileDate = profile.birthDate.value
  if (!profileDate.endsWith(".") && profileDate.length === MINIMUM_EXPECTED_DATE_LENGTH) {
    profileDate += "."

    profile.birthDate.value = profileDate
  }
}

