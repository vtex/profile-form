import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Input from '@vtex/styleguide/lib/Input'
import RuleFieldShape from '../../RuleFieldShape'
import ProfileFieldShape from '../../ProfileFieldShape'
import GenderInput from './GenderInput'
import styles from '../../styles.css'

const StyleguideInput = (props) => {
  const { field, data, options, inputRef, onChange, onBlur, intl } = props

  const [isFocused, setIsFocused] = useState(false)

  // Handle focus and blur events
  const handleFocus = () => setIsFocused(true)
  const handleBlur = (e) => {
    onBlur(e)
    setIsFocused(false)
  }

  // Define class names based on the component state and props
  const containerClassNames = [
    styles.styleguideInput,
    field.hidden ? 'dn' : '',
    field.required ? `${styles.styleguideInput}-required` : '',
    isFocused ? `${styles.styleguideInput}-focused` : '',
    data.error ? `${styles.styleguideInput}-invalid` : '',
    !data.value ? `${styles.styleguideInput}-empty` : '',
    'pb7',
  ].join(' ')

  if (field.name === 'gender') {
    return (
      <GenderInput
        {...props}
        shouldShowExtendedGenders={options.shouldShowExtendedGenders}
      />
    )
  }

  return (
    <div className={containerClassNames}>
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
        onBlur={handleBlur}
        onFocus={handleFocus}
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

StyleguideInput.defaultProps = {
  options: {},
  inputRef: () => {},
}

export default injectIntl(StyleguideInput)
