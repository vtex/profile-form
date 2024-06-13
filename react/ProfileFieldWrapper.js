import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import ProfileField from './ProfileField'

function ProfileFieldWrapper(props) {
  const handles = useCssHandles([props.cssHandle])

  return (
    <div className={handles[props.cssHandle]}>
      <ProfileField {...props} />
    </div>
  )
}

export default ProfileFieldWrapper
