import React from 'react'
import { shallowWithIntl, loadTranslation } from 'enzyme-react-intl'
import ProfileContainer from '../ProfileContainer'
import ProfileFieldWrapper from '../ProfileFieldWrapper'
import mockRules from '../__mocks__/rules'
import mockProfile from '../__mocks__/profile'

loadTranslation('../messages/pt.json')

describe('ProfileContainer', () => {
  let wrapper
  let mockSubmit

  beforeEach(() => {
    // Arrange
    mockSubmit = jest.fn()
    wrapper = shallowWithIntl(
      <ProfileContainer
        rules={mockRules}
        defaultProfile={mockProfile}
        onSubmit={mockSubmit}
      />,
    ).dive()
  })

  it('should render fields based on rules', () => {
    // Act
    const result = wrapper.find(ProfileFieldWrapper)

    // Assert
    expect(result).toHaveLength(4)
  })

  it('should pass down profile data to fields', () => {
    // Act
    const firstName = wrapper.find(ProfileFieldWrapper).first().props()
      .data.value
    const lastName = wrapper.find(ProfileFieldWrapper).last().props().data.value

    // Assert
    expect(firstName).toBe('John')
    expect(lastName).toBe('Appleseed')
  })

  it('should update its state when receives changes', () => {
    // Act
    wrapper.instance().handleFieldUpdate({
      firstName: {
        value: 'Jack',
      },
    })
    wrapper.update()
    const result = wrapper.state().profile.firstName.value

    // Assert
    expect(result).toBe('Jack')
  })

  it('should call onSubmit with a validated profile when necessary', () => {
    // Arrange
    const subRules = {
      ...mockRules,
      personalFields: [
        ...mockRules.personalFields,
        {
          name: 'document',
          maxLength: 30,
          label: 'document',
          required: true,
        },
      ],
    }
    const instance = shallowWithIntl(
      <ProfileContainer
        rules={subRules}
        defaultProfile={mockProfile}
        onSubmit={mockSubmit}
      />,
    )
      .dive()
      .instance()

    // Act
    instance.handleSubmit({
      preventDefault() {},
    })

    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({
      profile: {
        birthDate: '23/05/92',
        firstName: 'John',
        gender: null,
        lastName: 'Appleseed',
        tradeName: null,
        document: null,
        isCorporate: false,
      },
      valid: false,
    })
  })

  it('should include isCorporate in profile object when submitting', () => {
    // Arrange
    const corpProfile = {
      isCorporate: true,
    }
    const instance = shallowWithIntl(
      <ProfileContainer
        rules={mockRules}
        defaultProfile={corpProfile}
        onSubmit={mockSubmit}
      />,
    )
      .dive()
      .instance()

    // Act
    instance.handleSubmit({
      preventDefault() {},
    })

    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({
      profile: { isCorporate: true },
      valid: false,
    })
  })
})
