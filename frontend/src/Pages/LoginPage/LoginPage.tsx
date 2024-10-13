import React from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'

import '../LoginPage/LoginPage.css'
interface Props {
    onLogin:(ID:string, Password:string) => void;
}

const LoginPage:React.FC<Props> = ({onLogin}: Props): JSX.Element => {
  return (
    <div className='Container'>
        <div className='img'>
        </div>
        <div className='loginContainer'>
            <LoginForm onLogin={onLogin}/>
        </div>
    </div>
  )
}

export default LoginPage