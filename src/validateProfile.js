export function addValidation(profile, rules) {
  const allRules = [...rules.personalFields, ...rules.businessFields]

  return allRules
    .map(field => ({
      [field.name]: {
        value:
          field.display && profile[field.name]
            ? field.display(profile[field.name])
            : profile[field.name],
      },
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
}

export function removeValidation(profile, rules) {
  const allRules = [...rules.personalFields, ...rules.businessFields]

  return allRules
    .map(field => ({
      [field.name]:
        field.submit && profile[field.name].value
          ? field.submit(profile[field.name].value)
          : profile[field.name].value,
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
}

export function applyMask(field, value) {
  return field.mask ? field.mask(value) : value
}

export function applyValidation(field, value) {
  if (!value || !value.trim()) {
    return field.required ? 'EMPTY_FIELD' : null
  }
  return field.validate && !field.validate(value) ? 'INVALID_FIELD' : null
}

export function applyFullValidation(rules, profile) {
  const validatedProfile = Object.keys(profile)
    .map(fieldName => {
      const rule =
        rules.personalFields.find(rule => rule.name === fieldName) ||
        rules.businessFields.find(rule => rule.name === fieldName)
      if (rule) {
        const error = applyValidation(rule, profile[fieldName].value)
        return { [fieldName]: { ...profile[fieldName], error } }
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
