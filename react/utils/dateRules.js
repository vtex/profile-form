import moment from 'moment'
import msk from 'msk'

export function filterDateType(fields) {
  return fields.filter(rule => rule.type === 'date' || rule.name === "birthDate")
}

// merge the arr2 into arr1 based on a rule name
// considering the arr2 value over the arr1
function mergeArrays(arr1, arr2) {
  const aux = {}
  arr2.forEach(rule => (aux[rule.name] = rule))

  return arr1.map(rule => {
    return aux[rule.name] ? aux[rule.name] : rule
  })
}

export function prepareDateRules(rules, intl) {
  return {
    ...rules,
    personalFields: mergeArrays(
      rules.personalFields,
      setDateRuleValidations(filterDateType(rules.personalFields), intl),
    ),
  }
}

export const MINIMUM_EXPECTED_DATE_LENGTH = 10; // 99/99/9999 or 99.99.99.

function setDateRuleValidations(rules, intl) {
  if (rules) {
    return rules.map(rule => {
      const ruleCopy = { ...rule }
      ruleCopy.mask = rule.mask ? rule.mask : (value => msk.fit(value, '99/99/9999'))
      ruleCopy.validate = value => {
        const mom = moment.utc(value, 'L', intl.locale.toLowerCase())
        const currValidate = rule.validate === undefined ? true : rule.validate(value, intl);

        return value.length >= MINIMUM_EXPECTED_DATE_LENGTH && mom.isValid() && currValidate
      }
      ruleCopy.display = value =>
        moment
          .utc(value, [moment.ISO_8601, 'L'], intl.locale.toLowerCase())
          .format('L')
      ruleCopy.submit = value => {
        if (!value) return null

        const date = moment.utc(value, 'L', intl.locale.toLowerCase(), true)
        if (!date.isValid()) return null

        return date.format()
      }
      return ruleCopy
    })
  }
  return rules
}

export function isPastDate(dateString, intl) {
  if(intl === undefined){
    return false
  }

  const date = moment.utc(dateString, 'L', intl.locale.toLowerCase());
  const now = moment();
  return date.isValid() && date.isBefore(now);
}
