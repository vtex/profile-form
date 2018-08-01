import React from 'react'
import { shallow } from 'enzyme'
import { mountWithIntl, loadTranslation } from 'enzyme-react-intl'
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

  /* Uncomment when Enzyme adds support for forwardRefs */
  xit('should call onProfileChange when state changes', () => {
    const mockChange = jest.fn()
    const wrapperFn = mountWithIntl(
      <ProfileContainer
        rules={mockRules}
        profile={mockProfile}
        onProfileChange={mockChange}
      />,
    )
    wrapperFn.instance().handleFieldUpdate({
      firstName: {
        value: 'Jack',
      },
    })
    expect(mockChange).toHaveBeenCalled()
  })
})
