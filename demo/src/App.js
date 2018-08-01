import React, { Component } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import ptLocaleData from 'react-intl/locale-data/pt'
import ptTranslations from '../../src/locales/pt'
import ProfileContainer from '../../src/ProfileContainer'
import ProfileRules from '../../src/ProfileRules'
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
      profileLocale: 'pt-BR',
    }
  }

  toggleLocale = () => {
    this.setState(prevState => ({
      profileLocale: prevState.profileLocale === 'pt-BR' ? 'en-US' : 'pt-BR',
    }))
  }

  render() {
    const { profile, profileLocale } = this.state

    if (!profile) return null

    return (
      <div>
        <h3>ProfileForm demo:</h3>
        <div className="mb6">
          <button onClick={this.toggleLocale}>
            Set rules to {profileLocale === 'pt-BR' ? 'en-US' : 'pt-BR'}
          </button>
        </div>
        <IntlProvider locale={'pt-BR'} messages={ptTranslations}>
          <ProfileRules
            key={profileLocale}
            locale={profileLocale}
            fetch={locale => import('../../src/rules/' + locale)}
          >
            <ProfileContainer profile={profile} />
          </ProfileRules>
        </IntlProvider>
      </div>
    )
  }
}

export default App
