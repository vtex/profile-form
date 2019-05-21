import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Input from '@vtex/styleguide/lib/Input'
import RuleFieldShape from '../../RuleFieldShape'
import ProfileFieldShape from '../../ProfileFieldShape'
import GenderInput from './GenderInput'

const StyleguideInput = props => {
  const {
    field,
    data,
    options,
    inputRef,
    onChange,
    onBlur,
    intl,
  } = props

  if (field.name === 'gender') {
    return (
      <GenderInput
        {...props}
        shouldShowExtendedGenders={options.shouldShowExtendedGenders}
      />
    )
  }

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
          data.error &&
          intl.formatMessage({
            id: `profile-form.error.${data.error}`,
          })
        }
        placeholder={
          !field.required
            ? intl.formatMessage({ id: 'profile-form.optional' })
            : null
        }
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
        maxLength={field.maxLength}
        disabled={field.disabled}
      />
    </div>
  )
}

StyleguideInput.propTypes = {
  /** Rules for the field this input represents */
  field: RuleFieldShape.isRequired,
  /** Data this input will display */
  data: ProfileFieldShape.isRequired,
  /** Additional options to modify this input */
  options: PropTypes.object,
  /** Ref function to control this input from outside */
  inputRef: PropTypes.func,
  /** Function to be called when input changes */
  onChange: PropTypes.func.isRequired,
  /** Function to be called when input blurs */
  onBlur: PropTypes.func.isRequired,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(StyleguideInput)
