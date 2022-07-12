import React from 'react'
import {Link} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function BackButton() {
  return (
    <div>
        <button className="back-button">
            <Link to="/">
                <ArrowBackIcon />
                <span>Back</span>
            </Link>
        </button>
    </div>
  )
}

export default BackButton