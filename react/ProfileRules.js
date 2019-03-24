import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import moment from 'moment'
import msk from 'msk'

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
    const { shouldUseIOFetching, fetch, country, intl } = this.props

    const rulePromise = shouldUseIOFetching
      ? import(`./rules/${country}`)
      : fetch(country)
    return this.fetchRules(rulePromise, intl)
  }

  async fetchRules(rulePromise, intl) {
    try {
      const ruleData = await rulePromise
      const rules = ruleData.default || ruleData

      prepareDateRules(rules, intl)

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
        
        prepareDateRules(defaultRules, intl)

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
  /** React-intl utility */
  intl: intlShape.isRequired,
  /** Components that will receive the rules */
  children: PropTypes.element.isRequired,
  /** The country whose rules will be fetched and applied */
  country: PropTypes.string.isRequired,
  /** Whether to use IO built-in file fetching */
  shouldUseIOFetching: PropTypes.bool,
  /** Functionality for importing the rule files outside of IO */
  fetch: PropTypes.func,
}

export default injectIntl(ProfileRules)

export function filterDateType(fields) {
  return fields.filter((rule) => rule.type === 'date')
}

export function prepareDateRules(rules, intl) {
  setDateRuleValidations(filterDateType(rules.personalFields), intl)
  setDateRuleValidations(filterDateType(rules.businessFields), intl)
}

function setDateRuleValidations(rules, intl) {
  rules && rules.map(rule => {
    rule.mask =  value => msk.fit(value, '99/99/9999')
    rule.validate = value => moment(value,'L',intl.locale.toLowerCase()).isValid()
    rule.display = value => moment(value,'MM/DD/YYYY', intl.locale.toLowerCase()).utc().format('L')
    rule.submit = value => moment(value,'L',intl.locale.toLowerCase()).utc().format()
  })
}
