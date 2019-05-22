import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AutocompleteMenu extends Component {
  render() {
    const { items, highlightedIndex, getMenuProps, getItemProps } = this.props

    if (!items.length) return null

    const listHeight = items.length > 4 ? 'h5' : ''

    return (
      <div
        {...getMenuProps({
          className: `br2 br--bottom bb br bl b--gray bw1 outline-0 overflow-y-scroll ${
            listHeight
          } absolute w-100 z-1 bg-white vtex-profile-form__autocomplete-menu`,
        })}
      >
        {items.map((item, index) => (
          <div
            {...getItemProps({
              key: item.value,
              index,
              item,
              className: `vtex-profile-form__autocomplete-menu__content f6 ph5 pv5 dark-gray ${
                highlightedIndex === index ? 'bg-light-silver' : 'bg-white'
              }`,
            })}
          >
            {item.label}
          </div>
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
