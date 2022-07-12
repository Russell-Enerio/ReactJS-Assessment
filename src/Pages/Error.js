import React from 'react'
import BackButton from '../Component/BackButton'
function Error() {
  return (
    <div className="error-page">
        <div className="error-message">
        <h1>Error 404: Page not found</h1>
        <BackButton />
        </div>
    </div>
  )
}

export default Error