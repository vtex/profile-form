import moment from 'moment'
import msk from 'msk'

export function filterDateType(fields) {
  return fields.filter(rule => rule.type === 'date')
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

function setDateRuleValidations(rules, intl) {
  if (rules) {
    return rules.map(rule => {
      const ruleCopy = { ...rule }
      ruleCopy.mask = value => msk.fit(value, '99/99/9999')
      ruleCopy.validate = value => {
        const mom = moment.utc(value, 'L', intl.locale.toLowerCase())

        return mom.isValid() && rule.validate(mom.unix())
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

export function isPastDate(unixTimestamp) {
  const nowMS = Date.now() / 1000

  return unixTimestamp - nowMS < 0
}
