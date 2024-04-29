import React from 'react'

const FeedbackMsg = ({ state, msg, opacity, transform, transition }) => {

    return (
        <>
            <div className='absolute inset-x-0 top-8 left-1/2 text-white w-72 text-center p-2 rounded-xl'
                style={{
                    background: state === "success" ? "#81bf4d" : "#ea6a6f",
                    opacity: opacity,
                    transition: transition,
                    transform: transform,
                }}
            >
                {msg}
            </div>
        </>
    )
}

export default FeedbackMsg