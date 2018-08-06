import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutocompleteInput extends Component {
  render() {
    const { children, isSelected, ...domProps } = this.props

    return (
      <div
        {...domProps}
        className={`f6 ph5 pv5 ${isSelected ? 'bg-light-silver' : 'bg-white'}`}
      >
        {children}
      </div>
    )
  }
}

AutocompleteInput.propTypes = {}

export default AutocompleteInput
