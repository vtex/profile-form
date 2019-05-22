import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import RuleShape from './RuleShape'
import ProfileShape from './ProfileShape'
import ProfileField from './ProfileField'
import { applyFullValidation, isProfileValid } from './modules/validateProfile'
import addValidation from './modules/addValidation'
import removeValidation from './modules/removeValidation'
import emptyProfile from './modules/emptyProfile'
import defaultRules from './rules/default'
import StyleguideInput from './inputs/StyleguideInput'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      isCorporate: false,
    }
  }

  componentDidMount() {
    const { defaultProfile, rules } = this.props
    this.setState({
      profile: addValidation(defaultProfile, rules),
      isCorporate: defaultProfile.isCorporate,
    })
  }

  handleFieldUpdate = field => {
    this.setState(prevState => ({
      profile: { ...prevState.profile, ...field },
    }))
  }

  handleSubmit = () => {
    const { rules, onSubmit } = this.props
    const { profile, isCorporate } = this.state

    const validatedProfile = applyFullValidation(rules, profile, isCorporate)
    this.setState({
      profile: validatedProfile,
    })

    onSubmit({
      valid: isProfileValid(validatedProfile),
      profile: { ...removeValidation(validatedProfile, rules), isCorporate },
    })
  }

  toggleBusinessFields = () => {
    this.setState(prevState => ({
      isCorporate: !prevState.isCorporate,
    }))
  }

  render() {
    const {
      rules,
      Input,
      ToggleBusinessButton,
      SubmitButton,
      shouldShowExtendedGenders,
      children,
      intl,
    } = this.props
    const { profile, isCorporate } = this.state

    const businessButtonMessage = isCorporate
      ? 'profile-form.exclude-business'
      : 'profile-form.include-business'

    const options = { gender: { shouldShowExtendedGenders } }

    if (!profile) return null

    return (
      <div className="vtex-profile-form__profile-container__wrapper">
        <div className="vtex-profile-form__personal-fields">
          {rules.personalFields.map(field => (
            <ProfileField
              key={field.name}
              field={field}
              data={profile[field.name]}
              options={options[field.name]}
              onFieldUpdate={this.handleFieldUpdate}
              Input={Input}
            />
          ))}
        </div>
        {children && (
          <div className="vtex-profile-form__extended-fields">{children}</div>
        )}
        <div className="vtex-profile-form__toggle-business-btn__wrapper mb7">
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
        {isCorporate && (
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
  defaultProfile: emptyProfile,
  rules: defaultRules,
  Input: StyleguideInput,
  shouldShowExtendedGenders: false,
}

ProfileContainer.propTypes = {
  /** Set of rules for this form */
  rules: RuleShape.isRequired,
  /** Initial data for the profile object */
  defaultProfile: ProfileShape,
  /** Function to be called upon form submission */
  onSubmit: PropTypes.func.isRequired,
  /** Component to be used as input for the form fields */
  Input: PropTypes.func,
  /** Component to be used as a button for toggling business fields */
  ToggleBusinessButton: PropTypes.element,
  /** Component to be used as a submit button */
  SubmitButton: PropTypes.element,
  /** Whether to display extended genders or just M/F */
  shouldShowExtendedGenders: PropTypes.bool,
  /** Other components to be displayed before the business toggle button */
  children: PropTypes.node,
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(ProfileContainer)
