import React from 'react'
import { shallowWithIntl, loadTranslation } from 'enzyme-react-intl'
import StyleguideInput from '../inputs/StyleguideInput'
import mockField from '../__mocks__/ruleField'
import mockData from '../__mocks__/profileField'

loadTranslation('../messages/pt-BR.json')

describe('StyleguideInput', () => {
  let wrapper
  let mockChange
  let mockBlur
  beforeEach(() => {
    // Arrange
    mockChange = jest.fn()
    mockBlur = jest.fn()
    wrapper = shallowWithIntl(
      <StyleguideInput
        field={mockField}
        data={mockData}
        onChange={mockChange}
        onBlur={mockBlur}
      />,
    ).dive()
  })

  it('should render input based on rules', () => {
    // Act
    const result = wrapper.children().props().name

    // Assert
    expect(result).toBe(mockField.name)
  })

  it('should fill input with received data', () => {
    // Act
    const result = wrapper.children().props().value

    // Assert
    expect(result).toBe(mockData.value)
  })

  it('should display error if said so', () => {
    // Arrange
    const errorWrapper = shallowWithIntl(
      <StyleguideInput
        field={mockField}
        data={{ value: 'John', error: 'EMPTY_FIELD' }}
        onChange={mockChange}
        onBlur={mockBlur}
      />,
    ).dive()

    // Act
    const result = errorWrapper.children().props().errorMessage

    // Assert
    expect(result).toBeTruthy()
  })

  it('should not display hidden fields', () => {
    // Arrange
    const emptyWrapper = shallowWithIntl(
      <StyleguideInput
        field={{ name: 'firstName', label: 'firstName', hidden: true }}
        data={mockData}
        onChange={mockChange}
        onBlur={mockBlur}
      />,
    ).dive()

    // Assert
    expect(emptyWrapper).toHaveClassName('dn')
  })
})
