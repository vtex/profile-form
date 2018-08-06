import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutocompleteEntry from './AutocompleteEntry'

class AutocompleteMenu extends Component {
  render() {
    const { items, highlightedIndex, getMenuProps, getItemProps } = this.props

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
              isHighlighted: highlightedIndex === index,
            })}
          >
            {item.text}
          </AutocompleteEntry>
        ))}
      </div>
    )
  }
}

AutocompleteMenu.propTypes = {
  /** The items this menu contains */
  items: PropTypes.array,
  /** The index of the item currently highlighted */
  highlightedIndex: PropTypes.number,
  /** Function that returns some acessibility props for the menu */
  getMenuProps: PropTypes.func,
  /** Function that returns some acessibility props for the items */
  getItemProps: PropTypes.func,
}

export default AutocompleteMenu
