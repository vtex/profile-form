import React from 'react'
import { shallow } from 'enzyme'
import ProfileField from './ProfileField'
import mockField from './__mocks__/ruleField'
import mockData from './__mocks__/profileField'
import StyleguideInput from './inputs/StyleguideInput'
import msk from 'msk'

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
        Input={StyleguideInput}
      />,
    )
  })

  it('should pass down received rules and data', () => {
    expect(wrapper.find(StyleguideInput).props().field).toBe(mockField)
    expect(wrapper.find(StyleguideInput).props().data).toBe(mockData)
  })

  it('should call onFieldUpdate when receives new data', () => {
    wrapper.instance().handleChange({ target: { value: 'Joe' } })
    expect(mockChange).toHaveBeenCalled()
  })

  it('should mask data if necessary before passing up', () => {
    const maskField = {
      ...mockField,
      mask: value => msk.fit(value, '999.999.999'),
    }
    const maskWrapper = shallow(
      <ProfileField
        field={maskField}
        data={mockData}
        onFieldUpdate={mockChange}
        Input={StyleguideInput}
      />,
    )

    maskWrapper.instance().handleChange({ target: { value: '123456789' } })
    expect(mockChange).toHaveBeenCalledWith({
      [maskField.name]: {
        ...mockData,
        value: '123.456.789',
        error: null,
      },
    })
  })

  it('should validate touched fields before passing up', () => {
    const valField = { ...mockField, required: true }
    const valData = { ...mockData, touched: true }
    const valWrapper = shallow(
      <ProfileField
        field={valField}
        data={valData}
        onFieldUpdate={mockChange}
        Input={StyleguideInput}
      />,
    )

    valWrapper.instance().handleChange({ target: { value: '' } })
    expect(mockChange).toHaveBeenCalledWith({
      [valField.name]: {
        ...valData,
        value: '',
        error: 'EMPTY_FIELD',
      },
    })
  })

  it('should not validate pristine fields before passing up', () => {
    const valField = { ...mockField, required: true }
    const valData = { ...mockData, touched: false }
    const valWrapper = shallow(
      <ProfileField
        field={valField}
        data={valData}
        onFieldUpdate={mockChange}
        Input={StyleguideInput}
      />,
    )

    valWrapper.instance().handleChange({ target: { value: '' } })
    expect(mockChange).toHaveBeenCalledWith({
      [valField.name]: {
        ...valData,
        value: '',
        error: null,
      },
    })
  })
})
