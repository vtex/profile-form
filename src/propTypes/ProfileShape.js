import PropTypes from 'prop-types'

export default PropTypes.shape({
  /** Date of the user's birth */
  birthDate: PropTypes.string,
  /** User's business phone */
  businessPhone: PropTypes.string,
  /** User's corporate document */
  corporateDocument: PropTypes.string,
  /** User's corporate name */
  corporateName: PropTypes.string,
  /** User's personal document */
  document: PropTypes.string,
  /** User's personal name */
  firstName: PropTypes.string,
  /** User's gender */
  gender: PropTypes.string,
  /** User's personal phone */
  homePhone: PropTypes.string,
  /** User's surname */
  lastName: PropTypes.string,
  /** User's corporate state registration */
  stateRegistration: PropTypes.string,
  /** User's corporate trade name */
  tradeName: PropTypes.string,
})
