import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { applyMask, applyValidation } from './validateProfile'
import RuleFieldShape from './propTypes/RuleFieldShape'
import ProfileFieldShape from './propTypes/ProfileFieldShape'

import msk from 'msk'

class ProfileField extends Component {
  handleChange = e => {
    const { field, data, onFieldUpdate } = this.props
    const { value } = e.target

    const error = data.touched ? applyValidation(field, value) : null
    const maskedValue = applyMask(field, value)

    onFieldUpdate({ [field.name]: { ...data, value: maskedValue, error } })
  }

  handleBlur = () => {
    const { field, data, onFieldUpdate } = this.props
    const error = applyValidation(field, data.value)

    onFieldUpdate({ [field.name]: { ...data, touched: true, error } })
  }

  render() {
    const { field, data, Input } = this.props
    return (
      <Input
        field={field}
        data={data}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}

ProfileField.propTypes = {
  /** Rules for the field this component represents */
  field: RuleFieldShape.isRequired,
  /** Data to be displayed by this component */
  data: ProfileFieldShape.isRequired,
  /** Function to be called when data changes */
  onFieldUpdate: PropTypes.func.isRequired,
  /** Component to be used as input for the field */
  Input: PropTypes.func.isRequired,
}

export default ProfileField
