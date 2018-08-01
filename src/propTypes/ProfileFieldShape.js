import PropTypes from 'prop-types'

export default PropTypes.shape({
  /** The value for that field */
  value: PropTypes.any,
  /** Whether field is valid or not */
  valid: PropTypes.bool,
  /** i18n code for the error this value is presenting */
  reason: PropTypes.string,
  /** Whether the input should receive focus */
  focus: PropTypes.bool,
  /** Whether the input has already been touched by the user */
  touched: PropTypes.bool,
})
