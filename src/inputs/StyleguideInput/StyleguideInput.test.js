import React from 'react'
import { shallow, render } from 'enzyme'
import { shallowWithIntl, loadTranslation } from 'enzyme-react-intl'
import StyleguideInput from './index'
import mockField from '../../__mocks__/ruleField'
import mockData from '../../__mocks__/profileField'
import Input from '@vtex/styleguide/lib/Input'

loadTranslation('./src/locales/pt.json')

describe('StyleguideInput', () => {
  let wrapper
  let mockChange
  beforeEach(() => {
    mockChange = jest.fn()
    wrapper = shallowWithIntl(
      <StyleguideInput
        field={mockField}
        data={mockData}
        onChange={mockChange}
      />,
    ).dive()
  })

  it('should render input based on rules', () => {
    expect(wrapper.children().props().name).toBe(mockField.name)
  })

  it('should fill input with received data', () => {
    expect(wrapper.children().props().value).toBe(mockData.value)
  })

  it('should display error if said so', () => {
    const errorWrapper = shallowWithIntl(
      <StyleguideInput
        field={mockField}
        data={{ value: 'John', error: 'EMPTY_FIELD' }}
        onChange={mockChange}
      />,
    ).dive()

    expect(errorWrapper.children().props().errorMessage).toBeTruthy()
  })

  it('should not display hidden fields', () => {
    const emptyWrapper = shallowWithIntl(
      <StyleguideInput
        field={{ name: 'firstName', label: 'firstName', hidden: true }}
        data={mockData}
        onChange={mockChange}
      />,
    ).dive()

    expect(emptyWrapper).toHaveClassName('dn')
  })
})
