import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import Dropdown from '@vtex/styleguide/lib/Dropdown'
import Input from '@vtex/styleguide/lib/Input'

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
    const { value } = e.target

    this.setState({
      showCustomGenders: value !== 'male' && value !== 'female',
    })

    if (value !== 'custom') {
      this.props.onChange(e)
    }
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

    return (
      <div
        className={`vtex-profile-form__gender ${field.hidden ? 'dn' : ''} pb7`}
      >
        <Dropdown
          name="gender"
          label={intl.formatMessage({
            id: `profile-form.field.gender`,
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
          onChange={this.handleChange}
          onBlur={onBlur}
          options={options}
        />
        {showCustomGenders && (
          <div className="vtex-profile-form__custom-gender bg-light-silver pa5 mt4 br2">
            <Input
              name="gender"
              label={intl.formatMessage({
                id: `profile-form.field.custom-gender`,
              })}
              value={data.value || ''}
              errorMessage={
                data.error &&
                intl.formatMessage({
                  id: `profile-form.error.${data.error}`,
                })
              }
              onChange={this.handleChange}
              onBlur={onBlur}
              ref={inputRef}
              maxLength={field.maxLength}
            />
          </div>
        )}
      </div>
    )
  }
}

GenderInput.propTypes = {}

export default injectIntl(GenderInput)
