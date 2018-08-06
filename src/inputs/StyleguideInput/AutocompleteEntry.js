import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutocompleteInput extends Component {
  render() {
    const { children, isHighlighted, ...domProps } = this.props

    return (
      <div
        {...domProps}
        className={`f6 ph5 pv5 ${
          isHighlighted ? 'bg-light-silver' : 'bg-white'
        }`}
      >
        {children}
      </div>
    )
  }
}

AutocompleteInput.propTypes = {
  /** Whether this entry is being highlighted by the user */
  isHighlighted: PropTypes.bool.isRequired,
  /** Content to be displayed inside the item */
  children: PropTypes.any.isRequired,
}

export default AutocompleteInput
