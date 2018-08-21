export default function removeValidation(profile, rules) {
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
