import React, { useState } from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'
import '../LoginPage/LoginPage.css'
import RegisterForm from '../../Components/RegisterForm/RegisterForm';
import { Link } from 'react-router-dom';


interface Props {
}

const LoginPage:React.FC<Props> = (Props): JSX.Element => {
  const [IsLogin, setIsLogin] = useState(true);
  return (
    <div className='Container'>
        <div className='img'>
          <div className="labels">
            <Link to={"/"}>
              <div>student</div>
            </Link>
            <div>Teacher</div>
            <Link to={"/AdminLogin"}>
              <div>Admin</div>
            </Link>
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