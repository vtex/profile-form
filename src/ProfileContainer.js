import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ProfileField from './ProfileField'
import { addValidation, removeValidation } from './validateProfile'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
    }
  }

  componentDidMount() {
    const { profile } = this.props
    this.setState({ profile: addValidation(profile) })
  }

  componentDidUpdate(_, prevState) {
    const { onProfileChange } = this.props
    const { profile } = this.state

    if (prevState.profile !== profile && onProfileChange) {
      onProfileChange(profile)
    }
  }

  handleFieldUpdate = field => {
    this.setState(prevState => ({
      profile: { ...prevState.profile, ...field },
    }))
  }

  render() {
    const { rules } = this.props
    const { profile } = this.state

    if (!profile) return null

    return (
      <div>
        {rules.fields.map(field => (
          <ProfileField
            key={field.name}
            field={field}
            data={profile[field.name]}
            onFieldUpdate={this.handleFieldUpdate}
          />
        ))}
      </div>
    )
  }
}

ProfileContainer.propTypes = {
  rules: PropTypes.any.isRequired,
  profile: PropTypes.any.isRequired,
  onProfileChange: PropTypes.func,
}

export default ProfileContainer
