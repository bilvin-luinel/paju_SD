import React from 'react'
import TopBar from '../component/TopBar'
import SignupForm from '../component/SignupForm'
import UnderBar from '../component/UnderBar'

const SignupPage = () => {
  return (
    <div className="wrap">
        <TopBar />
        <SignupForm />
        <UnderBar />
    </div>
  )
}

export default SignupPage