import React from 'react'
import PropTypes from 'prop-types'

const DisplaySlice = ({ slice }) => {
  return (
    <div className={`mb6 ${slice.hidden ? 'dn' : ''}`}>
      <label className="db fw5 black-90 mb2">{slice.label}</label>
      <span className="light black-40">{slice.value}</span>
    </div>
  )
}

DisplaySlice.propTypes = {
  /** Piece of display data to show */
  slice: PropTypes.object.isRequired,
}

export default DisplaySlice
