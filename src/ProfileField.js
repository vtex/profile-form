import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RuleFieldShape from './propTypes/RuleFieldShape'
import ProfileFieldShape from './propTypes/ProfileFieldShape'

class ProfileField extends Component {
  handleChange = e => {
    const { field, data, onFieldUpdate } = this.props
    const { value } = e.target

    // validation will take place here

    onFieldUpdate({ [field.name]: { ...data, value } })
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
  Input: PropTypes.func,
}

export default ProfileField
