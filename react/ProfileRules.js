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
    const { shouldUseIOFetching, fetch, country } = this.props

    const rulePromise = shouldUseIOFetching
      ? import(`./rules/${country}`)
      : fetch(country)
    return this.fetchRules(rulePromise)
  }

  async fetchRules(rulePromise) {
    try {
      const ruleData = await rulePromise
      const rules = ruleData.default || ruleData
      this.setState({ rules })
      return rules
    } catch (error) {
      const errorType = this.parseError(error)
      if (errorType) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `Couldn't load rules for country ${errorType}, using default rules instead.`,
          )
        }
        this.setState({ rules: defaultRules })
        return defaultRules
      }
      if (process.env.NODE_ENV !== 'production') {
        console.warn('An unknown error occurred.')
      }
    }
  }

  parseError(e) {
    const regex = new RegExp(
      process.env.NODE_ENV === 'test'
        ? /Cannot find module '\.\.\/(rules\/)?([A-z-]{1,7})'/
        : /Cannot find module '\.\/([A-z-]{1,7})'/
    )
    const result = regex.exec(e.message)
    if (!result) return false
    return result[1]
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
  /** The country whose rules will be fetched and applied */
  country: PropTypes.string.isRequired,
  /** Whether to use IO built-in file fetching */
  shouldUseIOFetching: PropTypes.bool,
  /** Functionality for importing the rule files outside of IO */
  fetch: PropTypes.func,
}

export default ProfileRules
