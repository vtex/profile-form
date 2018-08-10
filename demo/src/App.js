import React, { Component } from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import ptLocaleData from 'react-intl/locale-data/pt'
import Button from '@vtex/styleguide/lib/Button'
import ptTranslations from '../../src/locales/pt'
import ProfileContainer from '../../src/ProfileContainer'
import ProfileRules from '../../src/ProfileRules'
import ProfileSummary from '../../src/ProfileSummary'
import DisplaySlice from './DisplaySlice'
import 'vtex-tachyons'

class App extends Component {
  constructor(props) {
    super(props)
    addLocaleData(ptLocaleData)

    this.state = {
      profile: null,
      profileCountry: 'BRA',
      submitted: false,
    }
  }

  toggleLocale = () => {
    this.setState(prevState => ({
      profileCountry: prevState.profileCountry === 'BRA' ? 'USA' : 'BRA',
    }))
  }

  handleSubmit = ({ valid, profile }) => {
    if (!valid) return
    this.setState({ profile, submitted: true })
  }

  render() {
    const { profile, profileCountry, submitted } = this.state

    return (
      <div className="pa4">
        <h2 className="dark-gray">ProfileForm demo:</h2>
        {!submitted && (
          <div className="mb6">
            <Button
              size="small"
              variation="secondary"
              onClick={this.toggleLocale}
            >
              Set rules to {profileCountry === 'BRA' ? 'USA' : 'BRA'}
            </Button>
          </div>
        )}
        <IntlProvider locale={'pt-BR'} messages={ptTranslations}>
          <div>
            <ProfileRules
              key={profileCountry}
              country={profileCountry}
              fetch={country => import('../../src/rules/' + country)}
            >
              {submitted ? (
                <ProfileSummary profile={profile}>
                  {({ personalData, businessData }) => (
                    <div>
                      <h3 className="heavy-rebel-pink">Personal Data:</h3>
                      {Object.keys(personalData).map(fieldName => (
                        <DisplaySlice
                          key={fieldName}
                          slice={personalData[fieldName]}
                        />
                      ))}
                      <h3 className="heavy-rebel-pink">Business Data:</h3>
                      {Object.keys(businessData).map(fieldName => (
                        <DisplaySlice
                          key={fieldName}
                          slice={businessData[fieldName]}
                        />
                      ))}
                    </div>
                  )}
                </ProfileSummary>
              ) : (
                <ProfileContainer
                  defaultProfile={profile}
                  onSubmit={this.handleSubmit}
                  shouldShowExtendedGenders={true}
                />
              )}
            </ProfileRules>
          </div>
        </IntlProvider>
      </div>
    )
  }
}

export default App
