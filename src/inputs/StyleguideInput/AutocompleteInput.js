import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import Input from '@vtex/styleguide/lib/Input'
import CaretDown from '@vtex/styleguide/lib/icon/CaretDown'
import RuleFieldShape from '../../propTypes/RuleFieldShape'
import ProfileFieldShape from '../../propTypes/ProfileFieldShape'
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
      ref,
      maxLength,
      placeholder,
      suffixIcon,
      items,
      listSize,
      forwardedRef,
    } = this.props

    return (
      <Downshift
        onChange={this.handleChange}
        itemToString={item => (item ? item.label : '')}
        defaultInputValue={data.value || ''}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <Input
              {...getInputProps({
                name,
                label,
                ref,
                maxLength,
                placeholder,
                suffixIcon,
                ref: forwardedRef,
              })}
            />
            {isOpen ? (
              <AutocompleteMenu
                items={matchSorter(items, inputValue, { keys: ['text'] }).slice(
                  0,
                  listSize,
                )}
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

AutocompleteInput.propTypes = {
  /** Rules for the field this input represents */
  field: RuleFieldShape.isRequired,
  /** Data this input will display */
  data: ProfileFieldShape.isRequired,
  /** Options for this autocomplete component */
  items: PropTypes.array.isRequired,
  /** Ref function to control this input from outside */
  inputRef: PropTypes.func,
  /** Function to be called when input changes */
  onChange: PropTypes.func.isRequired,
  /** Function to be called when input blurs */
  onBlur: PropTypes.func.isRequired,
}

export default React.forwardRef((props, ref) => (
  <AutocompleteInput {...props} forwardedRef={ref} />
))
