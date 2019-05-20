export default function removeValidation(profile, rules) {
  const allRules = [...rules.personalFields, ...rules.businessFields]

  return allRules.reduce((acc, field) => {
    if (field.submit && profile[field.name].value) {
      acc[field.name] = field.submit(profile[field.name].value)
    } else {
      acc[field.name] = profile[field.name].value
    }
    return acc
  }, {})
}
