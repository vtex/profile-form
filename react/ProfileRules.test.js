import React from 'react'
import ProfileRules from './ProfileRules'
import { shallow } from 'enzyme'
import brRules from './rules/BRA'
import defaultRules from './rules/default'

describe('ProfileRules', () => {
  it('should load the defined rules', async () => {
    // Arrange
    const instance = shallow(
      <ProfileRules
        country={'BRA'}
        fetch={country => import('./rules/' + country)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    ).instance()

    // Act
    const rules = await instance.componentDidMount()

    // Assert
    expect(rules).toEqual(brRules)
  })

  it('should render its children', async () => {
    // Arrange
    const wrapper = shallow(
      <ProfileRules
        country={'BRA'}
        fetch={country => import('./rules/' + country)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    )
    const instance = wrapper.instance()

    // Act
    await instance.componentDidMount()
    wrapper.update()

    // Assert
    expect(wrapper.find('h1')).toHaveLength(1)
  })

  it('should inject rules as a prop to its children', async () => {
    // Arrange
    const wrapper = shallow(
      <ProfileRules
        country={'BRA'}
        fetch={country => import('./rules/' + country)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    )
    const instance = wrapper.instance()

    // Act
    await instance.componentDidMount()
    wrapper.update()

    // Assert
    expect(wrapper.find('h1').props().rules).toBe(brRules)
  })

  it('should provide default rules when country is unrecognized', async () => {
    // Arrange
    global.console = { warn: jest.fn() }
    const instance = shallow(
      <ProfileRules
        country={'XXX'}
        fetch={country => import('./rules/' + country)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    ).instance()

    // Act
    const rules = await instance.componentDidMount()

    // Assert
    expect(rules).toEqual(defaultRules)
  })
})
