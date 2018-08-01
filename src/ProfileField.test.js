import React from 'react'
import { shallow } from 'enzyme'
import ProfileField from './ProfileField'
import mockField from './__mocks__/ruleField'
import mockData from './__mocks__/profileField'
import ProfileInput from './ProfileInput'

describe('ProfileField', () => {
  let wrapper
  let mockChange
  beforeEach(() => {
    mockChange = jest.fn()
    wrapper = shallow(
      <ProfileField
        field={mockField}
        data={mockData}
        onFieldUpdate={mockChange}
      />,
    )
  })

  it('should pass down received rules and data', () => {
    expect(wrapper.find(ProfileInput).props().field).toBe(mockField)
    expect(wrapper.find(ProfileInput).props().data).toBe(mockData)
  })

  it('should call onFieldUpdate when receives new data', () => {
    wrapper.instance().handleChange({ target: { value: 'Joe' } })
    expect(mockChange).toHaveBeenCalled()
  })
})
