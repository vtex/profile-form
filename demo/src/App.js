import React, { Component } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import ptLocaleData from 'react-intl/locale-data/pt'
import ptTranslations from '../../src/locales/pt'
import mockRules from '../../src/rules/BRA'
import ProfileContainer from '../../src/ProfileContainer'
import 'vtex-tachyons'

class App extends Component {
  constructor(props) {
    super(props)
    addLocaleData(ptLocaleData)
  }

  render() {
    return (
      <div>
        <h3>ProfileForm demo:</h3>
        <IntlProvider locale={'pt-BR'} messages={ptTranslations}>
          <ProfileContainer rules={mockRules} />
        </IntlProvider>
      </div>
    )
  }
}

App.propTypes = {}

export default App
