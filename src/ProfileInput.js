import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Input from '@vtex/styleguide/lib/Input'
import RuleFieldShape from './propTypes/RuleFieldShape'
import ProfileFieldShape from './propTypes/ProfileFieldShape'

const ProfileInput = ({ field, intl, data, onChange }) => {
  return (
    <div
      className={`vtex-profile-form__${field.name} ${
        field.hidden ? 'dn' : ''
      } pb7`}
    >
      <Input
        name={field.name}
        label={intl.formatMessage({
          id: `profile-form.field.${field.label}`,
        })}
        value={data.value || ''}
        errorMessage={
          data.reason &&
          intl.formatMessage({
            id: `profile-form.error.${data.reason}`,
          })
        }
        placeholder={
          !field.required
            ? intl.formatMessage({ id: 'profile-form.optional' })
            : null
        }
        onChange={onChange}
      />
    </div>
  )
}

ProfileInput.propTypes = {
  field: RuleFieldShape.isRequired,
  data: ProfileFieldShape.isRequired,
  onChange: PropTypes.func,
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileInput)
