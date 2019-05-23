export default function removeValidation(profile, rules) {
  const allRules = [...rules.personalFields, ...rules.businessFields]

  return allRules.reduce((acc, field) => {
    const fieldValue = profile[field.name].value

    if (field.submit && fieldValue) {
      acc[field.name] = field.submit(fieldValue)
    } else {
      if (field.type === 'date' && fieldValue === '') {
        acc[field.name] = null
      } else {
        acc[field.name] = fieldValue
      }
    }

    return acc
  }, {})
}
