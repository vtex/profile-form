import React from 'react'
import PropTypes from 'prop-types'

const ProfileSummary = ({ profile }) => {
  return (
    <div>
      {Object.keys(profile).map(field => (
        <p key={field}>
          <b>{field}</b> - {profile[field]}
        </p>
      ))}
    </div>
  )
}

ProfileSummary.propTypes = {}

export default ProfileSummary
