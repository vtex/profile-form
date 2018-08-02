import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RuleFieldShape from './propTypes/RuleFieldShape'
import ProfileFieldShape from './propTypes/ProfileFieldShape'

import msk from 'msk'

class ProfileField extends Component {
  handleChange = e => {
    const { field, data, onFieldUpdate } = this.props
    const { value } = e.target

    const maskedValue = this.applyMask(field, value)
    // validation will take place here

    onFieldUpdate({ [field.name]: { ...data, value: maskedValue } })
  }

  applyMask = (field, value) => {
    if (field.mask) {
      const mask = field.mask()
      return msk.fit(value, mask)
    }
    return value
  }

  render() {
    const { field, data, Input } = this.props
    return <Input field={field} data={data} onChange={this.handleChange} />
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
