import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Input from '@vtex/styleguide/lib/Input'

class ProfileInput extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { field, intl } = this.props

    const data = {}

    return (
      <div
        className={`vtex-profile-form__${field.name} ${
          field.hidden ? 'dn' : ''
        } pb7`}
      >
        <Input
          label={intl.formatMessage({
            id: `profile-form.field.${field.label}`,
          })}
          error={false}
          errorMessage={
            data.reason &&
            intl.formatMessage({
              id: `profile-form.error.${data.reason}`,
            })
          }
          placeholder={
            !field.required
              ? this.props.intl.formatMessage({ id: 'profile-form.optional' })
              : null
          }
        />
      </div>
    )
  }
}

ProfileInput.propTypes = {
  field: PropTypes.any,
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileInput)
