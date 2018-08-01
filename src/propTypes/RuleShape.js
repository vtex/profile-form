import PropTypes from 'prop-types'
import RuleFieldShape from './RuleFieldShape'

export default PropTypes.shape({
  /** The country this rule refers to */
  country: PropTypes.string.isRequired,
  /** Configuration for each field of the form */
  fields: PropTypes.arrayOf(RuleFieldShape),
})
