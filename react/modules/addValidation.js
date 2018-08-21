export default function addValidation(profile, rules) {
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
