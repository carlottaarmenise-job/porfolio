import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'entra') {
        navigate('/app')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [navigate])

  return (
    <>
      <iframe
        src="/site.html"
        title="Landing"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </>
  )
}
