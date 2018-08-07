import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Dropdown from '@vtex/styleguide/lib/Dropdown'
import Input from '@vtex/styleguide/lib/Input'
import CaretDown from '@vtex/styleguide/lib/icon/CaretDown'
import AutocompleteInput from './AutocompleteInput'
import RuleFieldShape from '../../propTypes/RuleFieldShape'
import ProfileFieldShape from '../../propTypes/ProfileFieldShape'
import genders from '../../data/genders'

class GenderInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCustomGenders: false,
    }
  }

  componentDidMount() {
    if (
      this.props.data.value &&
      !['male', 'female'].includes(this.props.data.value)
    ) {
      this.setState({ showCustomGenders: true })
    }
  }

  handleChange = e => {
    console.log('ping')

    const { value } = e.target

    console.log(value)
    this.setState({
      showCustomGenders: value !== 'male' && value !== 'female',
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
    const { field, data, inputRef, onBlur, intl } = this.props
    const { showCustomGenders } = this.state

    const options = ['male', 'female', 'custom'].map(gender => {
      return {
        value: gender,
        label: intl.formatMessage({ id: 'profile-form.gender.' + gender }),
      }
    })

    const extendedGenders = genders.map(gender => ({
      value: gender,
      label: intl.formatMessage({ id: 'profile-form.gender.' + gender }),
    }))

    return (
      <div
        className={`vtex-profile-form__gender ${field.hidden ? 'dn' : ''} pb7`}
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
          options={options}
        />
        {showCustomGenders && (
          <div className="vtex-profile-form__custom-gender bg-light-silver pa5 mt4 br2">
            <AutocompleteInput
              name="custom-gender"
              label={intl.formatMessage({
                id: `profile-form.field.custom-gender`,
              })}
              value={this.getAutocompleteValue()}
              ref={inputRef}
              suffixIcon={
                <span className="blue">
                  <CaretDown color="currentColor" size={10} />
                </span>
              }
              items={extendedGenders}
              listSize={5}
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
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(GenderInput)
