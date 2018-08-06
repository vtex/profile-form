import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { intlShape, injectIntl } from 'react-intl'
import Input from '@vtex/styleguide/lib/Input'
import CaretDown from '@vtex/styleguide/lib/icon/CaretDown'
import RuleFieldShape from '../../propTypes/RuleFieldShape'
import ProfileFieldShape from '../../propTypes/ProfileFieldShape'
import AutocompleteEntry from './AutocompleteEntry'
import AutocompleteMenu from './AutocompleteMenu'

class AutocompleteInput extends Component {
  handleChange = ({ value }) => {
    this.props.onChange({ target: { value } })
  }

  render() {
    const { field, data, items, inputRef, onBlur, intl } = this.props

    return (
      <Downshift
        onChange={this.handleChange}
        itemToString={item => (item ? item.text : '')}
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
          <div
            className={`vtex-profile-form__${field.name} relative ${
              field.hidden ? 'dn' : ''
            } pb7`}
          >
            <Input
              {...getInputProps({
                name: field.name,
                label: intl.formatMessage({
                  id: `profile-form.field.${field.name}`,
                }),
                ref: inputRef,
                maxLength: field.maxLength,
                suffixIcon: (
                  <span className="blue">
                    <CaretDown color="currentColor" size={10} />
                  </span>
                ),
                placeholder: !field.required
                  ? intl.formatMessage({ id: 'profile-form.optional' })
                  : null,
                onBlur: onBlur,
              })}
            />
            {isOpen ? (
              <AutocompleteMenu
                items={items.filter(
                  item => !inputValue || item.text.includes(inputValue),
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
  /** React-intl utility */
  intl: intlShape.isRequired,
}

export default injectIntl(AutocompleteInput)
