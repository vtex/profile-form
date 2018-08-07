import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ProfileShape from './propTypes/ProfileShape'
import RuleShape from './propTypes/RuleShape'

class ProfileSummary extends Component {
  mapFields(fields) {
    const { profile, intl } = this.props

    return fields
      .map(field => ({
        [field.name]: {
          label: intl.formatMessage({
            id: 'profile-form.field.' + field.name,
          }),
          value: profile[field.name],
          hidden: field.hidden,
        },
      }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
  }

  render() {
    const { rules, children } = this.props
    const personalData = this.mapFields(rules.personalFields)
    const businessData = this.mapFields(rules.businessFields)

    return <div>{children({ displayData, businessData })}</div>
  }
}

ProfileSummary.propTypes = {
  /** Profile to be displayed */
  profile: ProfileShape.isRequired,
  /** Rules to be applied over the profile */
  rules: RuleShape.isRequired,
  /** Render prop that receives all display data */
  children: PropTypes.func,
  /** React-intl injected utility */
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileSummary)
