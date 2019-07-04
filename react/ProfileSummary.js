import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import ProfileShape from './ProfileShape'
import RuleShape from './RuleShape'

class ProfileSummary extends Component {
  mapFields(fields) {
    const { profile, intl } = this.props

    return fields
      .map(field => {
        const data = profile[field.name]
        return {
          [field.name]: {
            label: intl.formatMessage({
              id: 'profile-form.field.' + field.label,
            }),
            value: field.display && data ? field.display(data) : data,
            hidden: field.hidden,
          },
        }
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {})
  }

  translateGender(mappedData) {
    const gender = mappedData.gender.value
    return {
      ...mappedData,
      gender: {
        ...mappedData.gender,
        value:
          gender &&
          this.props.intl.formatMessage({
            id: `profile-form.gender.${gender}`,
            // fallback to whatever came from the master data
            defaultMessage: gender,
          }),
      },
    }
  }

  render() {
    const { rules, children } = this.props
    const { isCorporate } = this.props.profile
    const personalData = this.translateGender(
      this.mapFields(rules.personalFields),
    )
    const businessData = this.mapFields(rules.businessFields)

    return (
      <div className="vtex-profile-form__profile-summary">
        {children({ personalData, businessData, isCorporate })}
      </div>
    )
  }
}

ProfileSummary.propTypes = {
  /** Profile to be displayed */
  profile: ProfileShape.isRequired,
  /** Rules to be applied over the profile */
  rules: RuleShape.isRequired,
  /** Render prop that receives all display data */
  children: PropTypes.func.isRequired,
  /** React-intl injected utility */
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileSummary)
