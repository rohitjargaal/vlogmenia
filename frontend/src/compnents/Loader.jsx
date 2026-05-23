import React from 'react'

function Loader({value}) {
  return (
    <div className='loaderpage'>
        <div className="loader"></div>
        <h1>{value}</h1>
    </div>
  )
}

export default Loader
