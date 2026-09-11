import IRL from '../rules/IRL'
import { applyValidation } from '../modules/validateProfile'

const getField = (fields, name) => fields.find(field => field.name === name)

describe('IRL phone validation', () => {
  const homePhoneField = getField(IRL.personalFields, 'homePhone')
  const { mask, validate, display, submit } = homePhoneField

  it('is marked as required', () => {
    expect(homePhoneField.required).toBe(true)
  })

  describe('validate', () => {
    // US-1: only the two confirmed formats are recognized. Neither format
    // pins a specific leading digit — mobile network prefixes and landline
    // area codes both vary, so validation is by shape (digit count per
    // group), not by a hardcoded prefix digit.
    it('accepts the confirmed mobile format', () => {
      expect(validate('+353 87 123 4567')).toBe(true)
    })

    it('accepts the confirmed mobile format without spacing', () => {
      expect(validate('+353871234567')).toBe(true)
    })

    it('accepts a mobile-shaped number with a different network prefix', () => {
      // Irish mobile prefixes include 83/85/86/87/88/89 — none is hardcoded
      expect(validate('+353 83 123 4567')).toBe(true)
      expect(validate('+353 89 123 4567')).toBe(true)
    })

    it('accepts the confirmed Dublin landline format', () => {
      expect(validate('+353 1 123 4567')).toBe(true)
    })

    it('accepts the confirmed Dublin landline format without spacing', () => {
      expect(validate('+35311234567')).toBe(true)
    })

    it('accepts a landline-shaped number with a different area code digit', () => {
      // e.g. Cork/Limerick/Galway-style single leading digit — not hardcoded to Dublin's "1"
      expect(validate('+353 2 123 4567')).toBe(true)
      expect(validate('+353 6 123 4567')).toBe(true)
    })

    it('accepts an empty value at the validate() level (required is enforced upstream)', () => {
      expect(validate('')).toBe(true)
      expect(validate(undefined)).toBe(true)
    })

    // Free-form / out-of-pattern input is no longer grandfathered by validate()
    it('rejects a free-form phone number that does not match either confirmed format', () => {
      expect(validate('016613245')).toBe(false)
    })

    it('rejects a number with parentheses/dashes', () => {
      expect(validate('(01) 661-3245')).toBe(false)
    })

    it('rejects input with letters', () => {
      expect(validate('abcxyz')).toBe(false)
    })

    it('rejects input that is too short to be a phone number', () => {
      expect(validate('12')).toBe(false)
    })

    it('rejects a "+" that is not the leading character', () => {
      expect(validate('232+983745934534534')).toBe(false)
    })

    it('rejects a digit string longer than E.164 allows (15 digits)', () => {
      expect(validate('1234567890123456')).toBe(false)
    })

    it('rejects a mobile-shaped number with the wrong country code', () => {
      expect(validate('+1 87 123 4567')).toBe(false)
    })

    it('rejects a number that is one digit short of either shape (7 digits)', () => {
      expect(validate('+353 1234567')).toBe(false)
    })

    it('rejects a number that is one digit too long for either shape (10 digits)', () => {
      expect(validate('+353 1234567890')).toBe(false)
    })
  })

  describe('required + empty value, via the shared validation pipeline', () => {
    // US-2 (revised): the field is required, so an empty value must be
    // blocked at submit time — this is enforced by applyValidation()
    // (react/modules/validateProfile.js), not by validate() itself.
    it('flags an empty value as EMPTY_FIELD', () => {
      expect(applyValidation(homePhoneField, '')).toBe('EMPTY_FIELD')
      expect(applyValidation(homePhoneField, '   ')).toBe('EMPTY_FIELD')
    })

    it('flags a non-conforming value as INVALID_FIELD', () => {
      expect(applyValidation(homePhoneField, '016613245')).toBe('INVALID_FIELD')
    })

    it('accepts a conforming value with no error', () => {
      expect(applyValidation(homePhoneField, '+353 87 123 4567')).toBe(null)
    })
  })

  describe('mask / display', () => {
    it('formats an unformatted mobile number into the confirmed format', () => {
      expect(mask('+353871234567')).toBe('+353 87 123 4567')
      expect(display('+353871234567')).toBe('+353 87 123 4567')
    })

    it('formats an unformatted landline number into the confirmed format', () => {
      expect(mask('+35311234567')).toBe('+353 1 123 4567')
    })

    it('formats by shape regardless of the leading digit', () => {
      expect(mask('+35321234567')).toBe('+353 2 123 4567')
      expect(mask('+353831234567')).toBe('+353 83 123 4567')
    })

    it('is idempotent for an already-formatted number', () => {
      expect(mask('+353 87 123 4567')).toBe('+353 87 123 4567')
    })

    // A non-conforming value is left untouched by mask/display — validate()
    // is what rejects it, so the shopper sees their own error input, not a
    // silently mangled one.
    it('leaves a non-conforming number untouched', () => {
      expect(mask('016613245')).toBe('016613245')
    })
  })

  describe('submit', () => {
    it('normalizes a confirmed format by stripping spaces', () => {
      expect(submit('+353 87 123 4567')).toBe('+353871234567')
    })

    it('leaves a non-conforming value unchanged (validate() blocks it before submit)', () => {
      expect(submit('016613245')).toBe('016613245')
    })
  })
})

describe('IRL businessPhone', () => {
  const businessPhoneField = getField(IRL.businessFields, 'businessPhone')
  const { validate } = businessPhoneField

  it('is marked as required', () => {
    expect(businessPhoneField.required).toBe(true)
  })

  it('shares the same validation as homePhone', () => {
    expect(validate('+353 87 123 4567')).toBe(true)
    expect(validate('016613245')).toBe(false)
    expect(validate('abcxyz')).toBe(false)
  })

  it('is flagged as EMPTY_FIELD when left blank', () => {
    expect(applyValidation(businessPhoneField, '')).toBe('EMPTY_FIELD')
  })
})
