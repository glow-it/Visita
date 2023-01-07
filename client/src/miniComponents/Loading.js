import React, { useEffect } from 'react'

function Loading({isLoading}) {

  return (
    <div className={`secondary_loading_wrapper ${!isLoading ? "hidden" : ''} flex items-center justify-center`}>
  <span className="dot"></span>
  <div className="dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>
  )
}

export default Loading