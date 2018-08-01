import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProfileInput from './ProfileInput'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { rules } = this.props
    return (
      <div>{rules.fields.map(field => <ProfileInput field={field} />)}</div>
    )
  }
}

ProfileContainer.propTypes = {
  rules: PropTypes.any.isRequired,
}

export default ProfileContainer
