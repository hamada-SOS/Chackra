import React from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'

import '../LoginPage/LoginPage.css'
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
interface Props {
}

const LoginPage:React.FC<Props> = (Props): JSX.Element => {
  return (
    <div className='Container'>
        <div className='img'>
        </div>
        <div className='loginContainer'>
            <LoginForm/>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default LoginPage