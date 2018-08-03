import {
  addValidation,
  removeValidation,
  applyMask,
  applyValidation,
  findFirstInvalidInput,
  addFocusToFirstInvalidInput,
  isProfileValid,
} from './validateProfile'
import cleanProfile from './__mocks__/profile'
import validatedProfile from './__mocks__/validatedProfile'
import invalidProfile from './__mocks__/invalidProfile'
import mockRules from './__mocks__/rules'

describe('validateProfile', () => {
  it('should add validation data to a clean profile', () => {
    // Act
    const result = addValidation(cleanProfile)

    // Assert
    expect(result).toEqual(validatedProfile)
  })

  it('should remove validation data from a validated profile', () => {
    // Act
    const result = removeValidation(validatedProfile)

    // Assert
    expect(result).toEqual(cleanProfile)
  })

  it('should apply a given mask to a value', () => {
    // Arrange
    const mockField = { mask: value => '**' + value + '**' }

    // Act
    const result = applyMask(mockField, 'hello')

    // Assert
    expect(result).toBe('**hello**')
  })

  it('should validate a required field', () => {
    // Arrange
    const mockField = { required: true }

    // Act
    const result = applyValidation(mockField, '')

    // Assert
    expect(result).toBe('EMPTY_FIELD')
  })

  it('should validate a field according to rules', () => {
    // Arrange
    const mockField = { validate: value => value.length === 3 }

    // Act
    const validResult = applyValidation(mockField, 'AAA')
    const invalidResult = applyValidation(mockField, 'AAAA')

    // Assert
    expect(validResult).toBeNull()
    expect(invalidResult).toBe('INVALID_FIELD')
  })

  it('should check if a profile is valid', () => {
    // Act
    const result = isProfileValid(invalidProfile)

    // Assert
    expect(result).toBe(false)
  })

  it('should apply focus to the first invalid input', () => {
    // Arrange
    const focusRules = {
      personalFields: [
        ...mockRules.personalFields,
        { name: 'gender', required: true },
      ],
    }

    // Act
    const focusedProfile = addFocusToFirstInvalidInput(
      focusRules,
      invalidProfile,
    )

    // Assert
    expect(focusedProfile.gender.focus).toBe(true)
  })
})
