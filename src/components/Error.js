import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='section error-page'>
            <h1 className='error-container'>no user to display</h1>

            <Link to='/' className='btn btn-error error-container'>
                back home
            </Link>
        </div>
    )
}

export default Error
