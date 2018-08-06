import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import RuleShape from './propTypes/RuleShape'
import ProfileShape from './propTypes/ProfileShape'
import ProfileField from './ProfileField'
import {
  addValidation,
  removeValidation,
  applyFullValidation,
  isProfileValid,
} from './validateProfile'
import defaultRules from './rules/default'
import StyleguideInput from './inputs/StyleguideInput'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      showingBusinessFields: false,
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
    const { rules, onSubmit } = this.props
    const { profile } = this.state

    const validatedProfile = applyFullValidation(rules, profile)
    this.setState({
      profile: validatedProfile,
    })

    if (onSubmit) {
      onSubmit({
        valid: isProfileValid(validatedProfile),
        profile: removeValidation(validatedProfile),
      })
    }
  }

  toggleBusinessFields = () => {
    this.setState(prevState => ({
      showingBusinessFields: !prevState.showingBusinessFields,
    }))
  }

  render() {
    const {
      rules,
      Input,
      ToggleBusinessButton,
      SubmitButton,
      intl,
    } = this.props
    const { profile, showingBusinessFields } = this.state

    const businessButtonMessage = showingBusinessFields
      ? 'profile-form.hide-business'
      : 'profile-form.show-business'

    if (!profile) return null

    return (
      <div>
        <div className="vtex-profile-form__personal-fields">
          {rules.personalFields.map(field => (
            <ProfileField
              key={field.name}
              field={field}
              data={profile[field.name]}
              onFieldUpdate={this.handleFieldUpdate}
              Input={Input}
            />
          ))}
        </div>
        <div className="mb7">
          {ToggleBusinessButton ? (
            React.cloneElement(ToggleBusinessButton, {
              onClick: this.toggleBusinessFields,
              children: intl.formatMessage({ id: businessButtonMessage }),
            })
          ) : (
            <Button
              size="small"
              block
              variation="secondary"
              onClick={this.toggleBusinessFields}
            >
              {intl.formatMessage({ id: businessButtonMessage })}
            </Button>
          )}
        </div>
        {showingBusinessFields && (
          <div className="vtex-profile-form__business-fields">
            {rules.businessFields.map(field => (
              <ProfileField
                key={field.name}
                field={field}
                data={profile[field.name]}
                onFieldUpdate={this.handleFieldUpdate}
                Input={Input}
              />
            ))}
          </div>
        )}
        {SubmitButton ? (
          React.cloneElement(SubmitButton, {
            onClick: this.handleSubmit,
          })
        ) : (
          <Button block size="small" onClick={this.handleSubmit}>
            {intl.formatMessage({ id: 'profile-form.save-changes' })}
          </Button>
        )}
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
  /** Component to be used as a button for toggling business fields */
  ToggleBusinessButton: PropTypes.element,
  /** Component to be used as a submit button */
  SubmitButton: PropTypes.element,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileContainer)
