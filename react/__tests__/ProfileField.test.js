import React from 'react'
import { shallow } from 'enzyme'
import ProfileField from '../ProfileField'
import mockField from '../__mocks__/ruleField'
import mockData from '../__mocks__/profileField'
import StyleguideInput from '../inputs/StyleguideInput'

describe('ProfileField', () => {
  let wrapper
  let mockChange
  beforeEach(() => {
    // Arrange
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
    // Act
    const fieldResult = wrapper.find(StyleguideInput).props().field
    const dataResult = wrapper.find(StyleguideInput).props().data

    // Assert
    expect(fieldResult).toBe(mockField)
    expect(dataResult).toBe(mockData)
  })

  it('should call onFieldUpdate when receives new data', () => {
    // Act
    wrapper.instance().handleChange({ target: { value: 'Joe' } })

    // Assert
    expect(mockChange).toHaveBeenCalled()
  })

  it('should mask data if necessary before passing up', () => {
    // Arrange
    const maskField = {
      ...mockField,
      mask: value => '-' + value + '-',
    }
    const maskWrapper = shallow(
      <ProfileField
        field={maskField}
        data={mockData}
        onFieldUpdate={mockChange}
        Input={StyleguideInput}
      />,
    )

    // Act
    maskWrapper.instance().handleChange({ target: { value: '123456789' } })

    // Assert
    expect(mockChange).toHaveBeenCalledWith({
      [maskField.name]: {
        ...mockData,
        value: '-123456789-',
        error: null,
      },
    })
  })

  it('should validate touched fields before passing up', () => {
    // Arrange
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

    // Act
    valWrapper.instance().handleChange({ target: { value: '' } })

    // Assert
    expect(mockChange).toHaveBeenCalledWith({
      [valField.name]: {
        ...valData,
        value: '',
        error: 'EMPTY_FIELD',
      },
    })
  })

  it('should not validate pristine fields before passing up', () => {
    // Arrange
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

    // Act
    valWrapper.instance().handleChange({ target: { value: '' } })

    // Assert
    expect(mockChange).toHaveBeenCalledWith({
      [valField.name]: {
        ...valData,
        value: '',
        error: null,
      },
    })
  })
})
