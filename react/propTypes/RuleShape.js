import PropTypes from 'prop-types'
import RuleFieldShape from './RuleFieldShape'

export default PropTypes.shape({
  /** The country this rule refers to */
  country: PropTypes.string,
  /** Configuration for the personal fields */
  personalFields: PropTypes.arrayOf(RuleFieldShape).isRequired,
  /** Configuration for the business fields */
  businessFields: PropTypes.arrayOf(RuleFieldShape).isRequired,
})
