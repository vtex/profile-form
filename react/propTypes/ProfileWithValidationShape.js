import PropTypes from 'prop-types'
import ProfileFieldShape from './ProfileFieldShape'
import ProfileShape from './ProfileShape'

/** Same fields as ProfileShape, but content is of shape ProfileFieldShape */
export default Object.keys(ProfileShape)
  .map(field => ({ [field]: ProfileFieldShape }))
  .reduce((acc, cur) => ({ ...acc, ...cur }), {})
