import React from 'react'
import { ClipLoader } from 'react-spinners'

const LoadingSpinner = ({ color = '#4a51e1', loading = true, size = 40 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  )
}

export default LoadingSpinner