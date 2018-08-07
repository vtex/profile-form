import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import Input from '@vtex/styleguide/lib/Input'
import AutocompleteMenu from './AutocompleteMenu'

class AutocompleteInput extends Component {
  handleChange = ({ value }) => {
    this.props.onChange({ target: { value } })
  }

  render() {
    const { field, data, inputRef, intl } = this.props

    const {
      name,
      label,
      items,
      value,
      placeholder,
      suffixIcon,
      listSize,
      forwardedRef,
    } = this.props

    return (
      <Downshift
        onChange={this.handleChange}
        itemToString={item => (item ? item.label : '')}
        defaultInputValue={value}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div className="relative">
            <Input
              {...getInputProps({
                name,
                label,
                placeholder,
                suffixIcon,
                ref: forwardedRef,
              })}
            />
            {isOpen ? (
              <AutocompleteMenu
                items={matchSorter(items, inputValue, {
                  keys: ['label'],
                }).slice(0, listSize)}
                getMenuProps={getMenuProps}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
              />
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

AutocompleteInput.defaultProps = {
  listSize: 5,
}

AutocompleteInput.propTypes = {
  /** Name for this input */
  name: PropTypes.string.isRequired,
  /** List of items to feed the autocompletion */
  items: PropTypes.array.isRequired,
  /** The default selected value */
  value: PropTypes.string.isRequired,
  /** Label for this input */
  label: PropTypes.string,
  /** Placeholder text for the input box */
  placeholder: PropTypes.string,
  /** An icon that can be added to the right corner of the input */
  suffixIcon: PropTypes.any,
  /** The maximum number of suggestions to be shown at a time */
  listSize: PropTypes.number,
  /** Function to be called on data change */
  onChange: PropTypes.func,
  /** A ref function to control this input from outside */
  forwardedRef: PropTypes.func,
}

export default React.forwardRef((props, ref) => (
  <AutocompleteInput {...props} forwardedRef={ref} />
))
