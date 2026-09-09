import IRL from '../rules/IRL'

const getField = (fields, name) => fields.find(field => field.name === name)

describe('IRL phone validation', () => {
  const { mask, validate, display, submit } = getField(IRL.personalFields, 'homePhone')

  describe('validate', () => {
    // US-1: new confirmed formats must be recognized
    it('accepts the confirmed mobile format', () => {
      expect(validate('+353 87 123 4567')).toBe(true)
    })

    it('accepts the confirmed mobile format without spacing', () => {
      expect(validate('+353871234567')).toBe(true)
    })

    it('accepts the confirmed Dublin landline format', () => {
      expect(validate('+353 1 123 4567')).toBe(true)
    })

    it('accepts the confirmed Dublin landline format without spacing', () => {
      expect(validate('+35311234567')).toBe(true)
    })

    // US-2: previously saved (legacy/free-form) numbers must never be rejected
    it('accepts a legacy free-form phone number that does not match either new format', () => {
      expect(validate('016613245')).toBe(true)
    })

    it('accepts a legacy number with parentheses/dashes', () => {
      expect(validate('(01) 661-3245')).toBe(true)
    })

    it('accepts an empty value (field is optional)', () => {
      expect(validate('')).toBe(true)
      expect(validate(undefined)).toBe(true)
    })

    // Error case: clearly invalid input still fails
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

    it('rejects a legacy-looking value shorter than a real subscriber number (6 digits)', () => {
      expect(validate('123456')).toBe(false)
    })

    it('accepts a legacy-looking value at the minimum realistic length (7 digits)', () => {
      expect(validate('1234567')).toBe(true)
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

    it('is idempotent for an already-formatted number', () => {
      expect(mask('+353 87 123 4567')).toBe('+353 87 123 4567')
    })

    // US-2: legacy values must never be reformatted/altered
    it('leaves a legacy free-form number untouched', () => {
      expect(mask('016613245')).toBe('016613245')
    })
  })

  describe('submit', () => {
    it('normalizes a confirmed format by stripping spaces', () => {
      expect(submit('+353 87 123 4567')).toBe('+353871234567')
    })

    // US-2: legacy values must be submitted unchanged
    it('leaves a legacy free-form number unchanged', () => {
      expect(submit('016613245')).toBe('016613245')
    })
  })
})

describe('IRL businessPhone', () => {
  const { validate } = getField(IRL.businessFields, 'businessPhone')

  it('shares the same validation as homePhone', () => {
    expect(validate('+353 87 123 4567')).toBe(true)
    expect(validate('016613245')).toBe(true)
    expect(validate('abcxyz')).toBe(false)
  })
})
