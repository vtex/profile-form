import React from 'react'
import ProfileRules from './ProfileRules'
import { shallow } from 'enzyme'
import brRules from './rules/pt-BR'
import defaultRules from './rules/default'

describe('ProfileRules', () => {
  it('should load the defined rules', async () => {
    const instance = shallow(
      <ProfileRules
        locale={'pt-BR'}
        fetch={locale => import('./rules/' + locale)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    ).instance()

    const rules = await instance.componentDidMount()
    expect(rules).toEqual(brRules)
  })

  it('should render its children', async () => {
    const wrapper = shallow(
      <ProfileRules
        locale={'pt-BR'}
        fetch={locale => import('./rules/' + locale)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    )

    const instance = wrapper.instance()

    await instance.componentDidMount()
    wrapper.update()

    expect(wrapper.find('h1')).toHaveLength(1)
  })

  it('should inject rules as a prop to its children', async () => {
    const wrapper = shallow(
      <ProfileRules
        locale={'pt-BR'}
        fetch={locale => import('./rules/' + locale)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    )

    const instance = wrapper.instance()

    await instance.componentDidMount()
    wrapper.update()

    expect(wrapper.find('h1').props().rules).toBe(brRules)
  })

  it('should provide default rules when country is unrecognized', async () => {
    global.console = { warn: jest.fn() }

    const instance = shallow(
      <ProfileRules
        locale={'xx-YY'}
        fetch={locale => import('./rules/' + locale)}
      >
        <h1>It works!</h1>
      </ProfileRules>,
    ).instance()

    const rules = await instance.componentDidMount()

    expect(rules).toEqual(defaultRules)
  })
})
