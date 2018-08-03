import React from 'react'
import { shallow } from 'enzyme'
import {
  shallowWithIntl,
  mountWithIntl,
  loadTranslation,
} from 'enzyme-react-intl'
import ProfileContainer from './ProfileContainer'
import mockRules from './__mocks__/rules'
import mockProfile from './__mocks__/profile'
import ProfileField from './ProfileField'

loadTranslation('./src/locales/pt.json')

describe('ProfileContainer', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowWithIntl(
      <ProfileContainer rules={mockRules} profile={mockProfile} />,
    ).dive()
  })

  it('should render fields based on rules', () => {
    // Act
    const result = wrapper.find(ProfileField)

    // Assert
    expect(result).toHaveLength(2)
  })

  it('should pass down profile data to fields', () => {
    // Act
    const firstName = wrapper
      .find(ProfileField)
      .first()
      .props().data.value
    const lastName = wrapper
      .find(ProfileField)
      .last()
      .props().data.value

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

  it('should call onProfileChange when state changes', () => {
    // Arrange
    const mockChange = jest.fn()
    const wrapperFn = shallowWithIntl(
      <ProfileContainer
        rules={mockRules}
        profile={mockProfile}
        onProfileChange={mockChange}
      />,
    ).dive()
    const instance = wrapperFn.instance()
    const prevState = wrapperFn.state()

    // Act
    instance.handleFieldUpdate({
      firstName: {
        value: 'Jack',
      },
    })
    instance.componentDidUpdate(null, prevState)

    // Assert
    expect(mockChange).toHaveBeenCalled()
  })

  it('should call onSubmit with a validated profile when necessary', () => {
    // Arrange
    const mockSubmit = jest.fn()
    const subRules = {
      ...mockRules,
      personalFields: [
        ...mockRules.personalFields,
        {
          name: 'gender',
          maxLength: 30,
          label: 'gender',
          required: true,
        },
      ],
    }
    const instance = shallowWithIntl(
      <ProfileContainer
        rules={subRules}
        profile={mockProfile}
        onSubmit={mockSubmit}
      />,
    )
      .dive()
      .instance()
    instance.handleSubmit()

    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({
      profile: { firstName: 'John', gender: null, lastName: 'Appleseed' },
      valid: false,
    })
  })
})
