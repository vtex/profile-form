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

    this.state = {
      profile: {
        birthDate: null,
        businessPhone: null,
        corporateDocument: null,
        corporateName: null,
        document: null,
        email: null,
        firstName: 'Gustavo',
        gender: null,
        homePhone: null,
        lastName: 'Silva',
        stateRegistration: null,
        tradeName: null,
      },
    }
  }

  render() {
    const { profile } = this.state

    return (
      <div>
        <h3>ProfileForm demo:</h3>
        <IntlProvider locale={'pt-BR'} messages={ptTranslations}>
          <ProfileContainer profile={profile} rules={mockRules} />
        </IntlProvider>
      </div>
    )
  }
}

export default App
