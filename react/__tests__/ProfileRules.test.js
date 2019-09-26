import { IntlProvider } from 'react-intl'

import { prepareDateRules } from '../ProfileRules'
import { filterDateType } from '../utils/dateRules'
import defaultRules from '../rules/default'

const intlProvider = new IntlProvider({ locale: 'pt-br' }, {})
const { intl } = intlProvider.getChildContext()

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

    expect(birthDate.mask).toBeUndefined()
    expect(birthDate.validate).toBeDefined()
    expect(birthDate.display).toBeUndefined()
    expect(birthDate.submit).toBeUndefined()

    prepareDateRules(rules, intl)

    expect(birthDate.mask).toBeDefined()
    expect(birthDate.validate).toBeDefined()
    expect(birthDate.display).toBeDefined()
    expect(birthDate.submit).toBeDefined()
  })

  it('should mask correctly', () => {
    const rules = defaultRules
    const birthDate = filterDateType(rules.personalFields)[0]

    prepareDateRules(rules, intl)

    expect(birthDate.mask('100')).toBe('10/0')
    expect(birthDate.mask('10/09')).toBe('10/09')
    expect(birthDate.mask('10/091994')).toBe('10/09/1994')
  })

  it('should validate correctly', () => {
    const rules = defaultRules
    const birthDate = filterDateType(rules.personalFields)[0]

    prepareDateRules(rules, intl)

    expect(birthDate.validate('100')).toBeFalsy()
    expect(birthDate.validate('10/09/1994')).toBeTruthy()
    expect(birthDate.validate('29/02/1000')).toBeFalsy()
  })

  it('should display correctly', () => {
    const rules = defaultRules
    const birthDate = filterDateType(rules.personalFields)[0]

    prepareDateRules(rules, intl)

    expect(birthDate.display('10/09/1994')).toBe('10/09/1994')
    expect(birthDate.display('2018-11-25T00:00:00')).toBe('25/11/2018')
  })

  it('should submit correctly', () => {
    const rules = defaultRules
    const birthDate = filterDateType(rules.personalFields)[0]

    prepareDateRules(rules, intl)

    expect(birthDate.submit('25/11/2018')).toMatch(
      new RegExp('2018-11-25T([0-9])([0-9]):00:00Z'),
    )
  })

  describe('date', () => {
    it('empty date should be submitted as null', () => {
      const rules = defaultRules
      const birthDate = filterDateType(rules.personalFields)[0]

      prepareDateRules(rules, intl)

      expect(birthDate.submit()).toBe(null)
    })

    it('invalid date should be submitted as null', () => {
      const rules = defaultRules
      const birthDate = filterDateType(rules.personalFields)[0]

      prepareDateRules(rules, intl)

      expect(birthDate.submit('30/28/19501')).toBe(null)
      expect(birthDate.submit('not-a-date')).toBe(null)
    })
  })
})
