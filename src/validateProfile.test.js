import {
  addValidation,
  removeValidation,
  applyMask,
  applyValidation,
  findFirstInvalidInput,
  addFocusToFirstInvalidInput,
} from './validateProfile'
import cleanProfile from './__mocks__/profile'
import validatedProfile from './__mocks__/validatedProfile'
import invalidProfile from './__mocks__/invalidProfile'

describe('validateProfile', () => {
  it('should add validation data to a clean profile', () => {
    expect(addValidation(cleanProfile)).toEqual(validatedProfile)
  })

  it('should remove validation data from a validated profile', () => {
    expect(removeValidation(validatedProfile)).toEqual(cleanProfile)
  })

  it('should apply a given mask to a value', () => {
    const mockField = { mask: value => '**' + value + '**' }
    expect(applyMask(mockField, 'hello')).toBe('**hello**')
  })

  it('should validate a required field', () => {
    const mockField = { required: true }
    expect(applyValidation(mockField, '')).toBe('EMPTY_FIELD')
  })

  it('should validate a field according to rules', () => {
    const mockField = { validate: value => value.length === 3 }
    expect(applyValidation(mockField, 'AAA')).toBeNull()
    expect(applyValidation(mockField, 'AAAA')).toBe('INVALID_FIELD')
  })

  it('should find the first invalid input', () => {
    expect(findFirstInvalidInput(invalidProfile)).toBe('gender')
  })

  it('should apply focus to the first invalid input', () => {
    const focusedProfile = addFocusToFirstInvalidInput(invalidProfile)
    expect(focusedProfile.gender.focus).toBe(true)
  })
})
