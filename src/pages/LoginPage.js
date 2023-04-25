import React from 'react'
import TopBar from '../component/TopBar'
import UnderBar from '../component/UnderBar'
import LoginForm from '../component/LoginForm'

const LoginPage = () => {
  return (
    <div className="wrap">
        <TopBar />
        <LoginForm />
        <UnderBar />
    </div>
  )
}

export default LoginPage