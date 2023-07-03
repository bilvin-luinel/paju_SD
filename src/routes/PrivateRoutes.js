import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoutes = (props) => {

  const { right, element } = props;

  useEffect(() => {
    console.log('hello')
  }, [])


  return (
    right ? element : <Navigate to="/" replace={true} />
  )
}

export default PrivateRoutes