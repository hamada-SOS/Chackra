import React, { useState } from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'

import '../LoginPage/LoginPage.css'
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
interface Props {
}

const LoginPage:React.FC<Props> = (Props): JSX.Element => {
  const [IsLogin, setIsLogin] = useState(true);
  return (
    <div className='Container'>
        <div className='img'>
          <div className="labels">
            <div>student</div>
            <div>Admin</div>
          </div>
        </div>
        <div className='loginContainer'>
          {IsLogin ?(
            <LoginForm setIsLogin={setIsLogin} isLogin={IsLogin}/>
            
          ) : (
          <RegisterForm setIsLogin={setIsLogin} isLogin={IsLogin}/>
          )
        }
        </div>
    </div>
  )
}

export default LoginPage