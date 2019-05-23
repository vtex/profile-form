import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Dropdown from '@vtex/styleguide/lib/Dropdown'
import AutocompleteInput from './AutocompleteInput'
import RuleFieldShape from '../../RuleFieldShape'
import ProfileFieldShape from '../../ProfileFieldShape'
import genders from '../../modules/genders'

class GenderInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showExtendedGenders: false,
    }
  }

  componentDidMount() {
    const { data } = this.props

    if (!data.value) return

    this.setState({
      showExtendedGenders: data.value !== 'male' && data.value !== 'female',
    })
  }

  handleChange = e => {
    const { value } = e.target

    this.setState({
      showExtendedGenders: value !== 'male' && value !== 'female',
    })

    this.props.onChange(e)
  }

  getDropdownValue = () => {
    const { data } = this.props
    if (!data.value) return ''

    return data.value === 'male' || data.value === 'female'
      ? data.value
      : 'custom'
  }

  getAutocompleteValue = () => {
    const { data } = this.props
    return data.value === 'custom' ? '' : data.value
  }

  render() {
    const {
      field,
      inputRef,
      onBlur,
      intl,
      shouldShowExtendedGenders,
    } = this.props
    const { showExtendedGenders } = this.state

    const baseGenders = ['male', 'female', 'custom']
      .map(gender => ({
        value: gender,
        label: intl.formatMessage({ id: 'profile-form.gender.' + gender }),
      }))
      .slice(0, shouldShowExtendedGenders ? 3 : 2)

    const extendedGenders = genders.map(gender => ({
      value: gender,
      label: intl.formatMessage({ id: 'profile-form.gender.' + gender }),
    }))

    return (
      <div
        className={`vtex-profile-form__field-wrapper vtex-profile-form__gender ${field.hidden ? 'dn' : ''} pb7`}
      >
        <Dropdown
          name="gender"
          label={intl.formatMessage({
            id: `profile-form.field.gender`,
          })}
          value={this.getDropdownValue()}
          placeholder={
            !field.required
              ? intl.formatMessage({ id: 'profile-form.optional' })
              : null
          }
          onChange={this.handleChange}
          onBlur={onBlur}
          options={baseGenders}
          disabled={field.disabled}
        />
        {showExtendedGenders && (
          <div className="vtex-profile-form__custom-gender bg-light-silver pa5 mt4 br2">
            <AutocompleteInput
              name="custom-gender"
              label={intl.formatMessage({
                id: `profile-form.field.custom-gender`,
              })}
              value={this.getAutocompleteValue()}
              ref={inputRef}
              items={extendedGenders}
              onChange={this.handleChange}
            />
          </div>
        )}
      </div>
    )
  }
}

GenderInput.propTypes = {
  /** Rules for the field this input represents */
  field: RuleFieldShape.isRequired,
  /** Data this input will display */
  data: ProfileFieldShape.isRequired,
  /** Ref function to control this input from outside */
  inputRef: PropTypes.func,
  /** Function to be called when input changes */
  onChange: PropTypes.func.isRequired,
  /** Function to be called when input blurs */
  onBlur: PropTypes.func.isRequired,
  /** Whether to show the full list of genders or just M/F */
  shouldShowExtendedGenders: PropTypes.bool.isRequired,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(GenderInput)
