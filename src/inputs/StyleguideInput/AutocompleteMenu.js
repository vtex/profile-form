import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutocompleteEntry from './AutocompleteEntry'

class AutocompleteMenu extends Component {
  render() {
    const { items, getMenuProps, getItemProps, highlightedIndex } = this.props

    if (!items.length) return null

    return (
      <div
        {...getMenuProps()}
        className="bw1 br2 b--solid outline-0 b--gray overflow-hidden absolute w-100 z-1"
      >
        {items.map((item, index) => (
          <AutocompleteEntry
            {...getItemProps({
              key: item.value,
              index,
              item,
              isSelected: highlightedIndex === index,
            })}
          >
            {item.value}
          </AutocompleteEntry>
        ))}
      </div>
    )
  }
}

AutocompleteMenu.propTypes = {}

export default AutocompleteMenu
