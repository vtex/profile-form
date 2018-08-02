import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RuleShape from './propTypes/RuleShape'
import ProfileShape from './propTypes/ProfileShape'
import ProfileField from './ProfileField'
import { addValidation, removeValidation } from './validateProfile'
import defaultRules from './rules/default'
import StyleguideInput from './inputs/StyleguideInput'

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

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { profile } = this.state

    //validate the entire form

    if (onSubmit) {
      onSubmit({ valid: true, profile: removeValidation(profile) })
    }
  }

  render() {
    const { rules, Input, SubmitButton } = this.props
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
            Input={Input}
          />
        ))}
        {SubmitButton && SubmitButton(this.handleSubmit)}
      </div>
    )
  }
}

ProfileContainer.defaultProps = {
  rules: defaultRules,
  Input: StyleguideInput,
}

ProfileContainer.propTypes = {
  /** Set of rules for this form */
  rules: RuleShape.isRequired,
  /** Profile data to be managed */
  profile: ProfileShape.isRequired,
  /** Function to be called when profile data changes */
  onProfileChange: PropTypes.func,
  /** Function to be called upon form submission */
  onSubmit: PropTypes.func,
  /** Component to be used as input for the form fields */
  Input: PropTypes.func,
  /** Function returning a component to be used as a submit button */
  SubmitButton: PropTypes.func,
}

export default ProfileContainer
