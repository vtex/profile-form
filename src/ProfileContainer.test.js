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
    wrapper = shallow(
      <ProfileContainer rules={mockRules} profile={mockProfile} />,
    )
  })

  it('should render fields based on rules', () => {
    expect(wrapper.find(ProfileField)).toHaveLength(2)
  })

  it('should pass down profile data to fields', () => {
    const firstName = wrapper
      .find(ProfileField)
      .first()
      .props().data.value

    const lastName = wrapper
      .find(ProfileField)
      .last()
      .props().data.value

    expect(firstName).toBe('John')
    expect(lastName).toBe('Appleseed')
  })

  it('should update its state when receives changes', () => {
    wrapper.instance().handleFieldUpdate({
      firstName: {
        value: 'Jack',
      },
    })
    wrapper.update()

    expect(wrapper.state().profile.firstName.value).toBe('Jack')
  })

  it('should call onProfileChange when state changes', () => {
    const mockChange = jest.fn()
    const wrapperFn = shallowWithIntl(
      <ProfileContainer
        rules={mockRules}
        profile={mockProfile}
        onProfileChange={mockChange}
      />,
    )
    const instance = wrapperFn.instance()
    const prevState = wrapperFn.state()
    instance.handleFieldUpdate({
      firstName: {
        value: 'Jack',
      },
    })
    instance.componentDidUpdate(null, prevState)
    expect(mockChange).toHaveBeenCalled()
  })

  it('should call onSubmit with a validated profile when necessary', () => {
    const mockSubmit = jest.fn()
    const subRules = {
      ...mockRules,
      fields: [
        ...mockRules.fields,
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
    ).instance()
    instance.handleSubmit()
    expect(mockSubmit).toHaveBeenCalledWith({
      profile: { firstName: 'John', gender: null, lastName: 'Appleseed' },
      valid: false,
    })
  })
})
