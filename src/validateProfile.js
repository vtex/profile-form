export function addValidation(profile) {
  return Object.keys(profile)
    .map(field => ({ [field]: { value: profile[field] } }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
}

export function removeValidation(profile) {
  return Object.keys(profile)
    .map(field => ({ [field]: profile[field].value }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})
}
