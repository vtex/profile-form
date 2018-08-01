import React, { Component } from 'react'
import PropTypes from 'prop-types'

import defaultRules from './rules/default'

class ProfileRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rules: null,
    }
  }

  componentDidMount() {
    return this.updateRules()
  }

  updateRules() {
    const { locale, fetch } = this.props

    return fetch(locale)
      .then(ruleData => {
        const rules = ruleData.default || ruleData

        this.setState({ rules })
        return rules
      })
      .catch(error => {
        const errorType = this.parseError(error)
        if (errorType) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn(
              `Couldn't load rules for locale ${errorType}, using default rules instead.`,
            )
          }
          this.setState({
            rules: defaultRules,
          })
          return defaultRules
        }
        if (process.env.NODE_ENV !== 'production') {
          console.warn('An unknown error occurred.')
        }
      })
  }

  parseError(e) {
    const regex = new RegExp(/Cannot find module '\.\/(rules\/)?([A-z-]{1,7})'/)
    const result = regex.exec(e.message)
    if (!result) return false
    return result[2]
  }

  render() {
    const { children } = this.props
    const { rules } = this.state

    return rules ? React.cloneElement(children, { rules }) : null
  }
}

ProfileRules.propTypes = {
  /** Components that will receive the rules */
  children: PropTypes.element.isRequired,
  /** The locale whose rules will be fetched and applied */
  locale: PropTypes.string.isRequired,
  /** Functionality for importing the rule files */
  fetch: PropTypes.func.isRequired,
}

export default ProfileRules
