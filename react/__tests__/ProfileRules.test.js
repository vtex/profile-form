import { IntlProvider } from 'react-intl'
import { prepareDateRules, filterDateType } from '../utils/dateRules'
import defaultRules from '../rules/default'

const intlProvider = new IntlProvider({ locale: 'pt-br' }, {})
const { intl } = intlProvider.getChildContext()

function getBirthDate(rules) {
  const preparedRules = prepareDateRules(rules, intl)
  const birthDateInitialized = preparedRules.personalFields.find(
    (rule) => rule.name === 'birthDate',
  )
  return birthDateInitialized
}

describe('ProfileRules aux functions', () => {
  it('should filter the correct rules', () => {
    const rules = defaultRules
    const filteredFields = filterDateType(rules.personalFields)

    expect(filteredFields.length).toBe(1)
    expect(filteredFields[0].name).toBe('birthDate')
  })

  it('should set the functions to the rules of type date', () => {
    const rules = defaultRules
    const birthDate = filterDateType(rules.personalFields)[0]

    expect(birthDate.mask).toBeDefined()
    expect(birthDate.validate).toBeDefined()
    expect(birthDate.display).toBeUndefined()
    expect(birthDate.submit).toBeUndefined()

    const birthDateInitialized = getBirthDate(rules)

    expect(birthDateInitialized.mask).toBeDefined()
    expect(birthDateInitialized.validate).toBeDefined()
    expect(birthDateInitialized.display).toBeDefined()
    expect(birthDateInitialized.submit).toBeDefined()
  })

  it('should mask correctly', () => {
    const rules = defaultRules
    const birthDateInitialized = getBirthDate(rules)

    expect(birthDateInitialized.mask('100')).toBe('10/0')
    expect(birthDateInitialized.mask('10/09')).toBe('10/09')
    expect(birthDateInitialized.mask('10/091994')).toBe('10/09/1994')
  })

  it('should validate correctly', () => {
    const rules = defaultRules
    const birthDateInitialized = getBirthDate(rules)

    expect(birthDateInitialized.validate('100')).toBeFalsy()
    expect(birthDateInitialized.validate('10/09/1994')).toBeTruthy()
    expect(birthDateInitialized.validate('29/02/1000')).toBeFalsy()
  })

  it('should display correctly', () => {
    const rules = defaultRules
    const birthDateInitialized = getBirthDate(rules)

    expect(birthDateInitialized.display('10/09/1994')).toBe('10/09/1994')
    expect(birthDateInitialized.display('2018-11-25T00:00:00')).toBe(
      '25/11/2018',
    )
  })

  it('should submit correctly', () => {
    const rules = defaultRules
    const birthDateInitialized = getBirthDate(rules)

    expect(birthDateInitialized.submit('25/11/2018')).toMatch(
      new RegExp('2018-11-25T([0-9])([0-9]):00:00Z'),
    )
  })

  describe('date', () => {
    it('empty date should be submitted as null', () => {
      const rules = defaultRules
      const birthDateInitialized = getBirthDate(rules)

      expect(birthDateInitialized.submit()).toBe(null)
    })

    it('invalid date should be submitted as null', () => {
      const rules = defaultRules
      const birthDateInitialized = getBirthDate(rules)

      expect(birthDateInitialized.submit('30/28/19501')).toBe(null)
      expect(birthDateInitialized.submit('not-a-date')).toBe(null)
    })
  })
})
