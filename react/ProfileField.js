import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { applyMask, applyValidation } from './modules/validateProfile'
import RuleFieldShape from './RuleFieldShape'
import ProfileFieldShape from './ProfileFieldShape'

class ProfileField extends Component {
  componentDidUpdate() {
    const { field, data, onFieldUpdate } = this.props
    if (data.focus && this.el) {
      this.el.focus()
      onFieldUpdate({ [field.name]: { ...data, focus: false } })
    }
  }

  handleChange = e => {
    const { field, data, onFieldUpdate } = this.props
    const { value } = e.target

    const error = data.touched ? applyValidation(field, value) : null
    const maskedValue = applyMask(field, value)

    onFieldUpdate({ [field.name]: { ...data, value: maskedValue, error, changing: true } })
  }

  handleBlur = () => {
    const { field, data, onFieldUpdate } = this.props
    const error = applyValidation(field, data.value)

    onFieldUpdate({ [field.name]: { ...data, touched: true, error } })
  }

  inputRef = el => {
    this.el = el
  }

  render() {
    const { field, data, options, Input, userProfile, blockDocument } = this.props
    if(blockDocument && field.name === 'document' && userProfile.document.value && !userProfile.document.changing) {
      field.disabled = true 
    }
    return (
      <Input
        field={field}
        data={data}  
        options={options}
        inputRef={this.inputRef}
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
  /** Additional options to modify this input */
  options: PropTypes.object,
  /** Function to be called when data changes */
  onFieldUpdate: PropTypes.func.isRequired,
  /** Component to be used as input for the field */
  Input: PropTypes.func.isRequired,
}

export default ProfileField
