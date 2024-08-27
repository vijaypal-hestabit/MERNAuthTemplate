import React from 'react';
import Lottie from 'lottie-react';
import NotFound404 from '../images/lottie/404.json'

function NotFound() {
    return (
        <div className='vh-100'>
            <Lottie animationData={NotFound404}/>
        </div>
    )
}

export default NotFound