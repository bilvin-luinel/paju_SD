import React from 'react'
import LoginForm from '../component/LoginForm'

const LoginPage = () => {
  return (
    <div className="wrap">
      <div className='arrow-wrap'>
        <div className='arrow1'>
          <div className='arrow-1' style={{ backgroundColor: "#545761", color: "white" }}>
            <span>로그인</span>
          </div>
          <div className='arrow-2' style={{ borderLeft: "20px solid #545761" }}>
          </div>
          <div className='arrow-3'>
          </div>
        </div>
        <div className='arrow1'>
          <div className='arrow-1'>
            <span>이메일 찾기</span>
          </div>
          <div className='arrow-2'>
          </div>
          <div className='arrow-3'>
          </div>
        </div>
        <div className='arrow1'>
          <div className='arrow-1'>
            <span>이메일 확인</span>
          </div>
          <div className='arrow-2'>
          </div>
          <div className='arrow-3'>
          </div>
        </div>
        <div className='arrow1'>
          <div className='arrow-1'>
            <span>비밀번호 찾기</span>
          </div>
          <div className='arrow-2'>
          </div>
          <div className='arrow-3'>
          </div>
        </div>
        <div className='arrow1'>
          <div className='arrow-1'>
            <span>비밀번호 확인</span>
          </div>
          {/* <div className='arrow-2'>
          </div>
          <div className='arrow-3'>
          </div> */}
        </div>
      </div>

      <LoginForm />
    </div>
  )
}

export default LoginPage