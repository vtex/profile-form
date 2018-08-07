import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ProfileShape from './propTypes/ProfileShape'
import RuleShape from './propTypes/RuleShape'

class ProfileSummary extends Component {
  mapFields(fields) {
    const { profile, intl } = this.props

    return fields
      .map(field => {
        const data = profile[field.name]
        return {
          [field.name]: {
            label: intl.formatMessage({
              id: 'profile-form.field.' + field.name,
            }),
            value: field.mask && data ? field.mask(data) : data,
            hidden: field.hidden,
          },
        }
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
  }

  translateGender(mappedData) {
    return {
      ...mappedData,
      gender: {
        ...mappedData.gender,
        value: mappedData.gender.value
          ? this.props.intl.formatMessage({
              id: 'profile-form.gender.' + mappedData.gender.value,
            })
          : '',
      },
    }
  }

  render() {
    const { rules, children } = this.props
    const personalData = this.translateGender(
      this.mapFields(rules.personalFields),
    )
    const businessData = this.mapFields(rules.businessFields)

    return <div>{children({ personalData, businessData })}</div>
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