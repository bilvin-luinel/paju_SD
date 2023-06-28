import React from 'react'
import SignupForm from '../component/SignupForm'
import TopBar from '../component/TopBar'
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