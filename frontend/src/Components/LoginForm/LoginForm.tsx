import React, { ChangeEvent, useState } from 'react'
import '../LoginForm/LoginForm.css'
interface Props {

  onLogin:(ID:string, Password:string) => void;

}

const LoginForm:React.FC<Props> = ({ onLogin }: Props): JSX.Element => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      onLogin(id, password);
      
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      console.log(id,password);
    }
    const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
      console.log(id,password);
    }

  return (
    <div className='container'>
      <div className='wraper'>
        <div className='signin'>
          Sign in
        </div>
        <input value={id} onChange={(e) => handleIdChange(e)} placeholder='Id'></input>
        <input value={password} onChange={(e) => handlePasswordChange(e)} placeholder='password'></input>
        <div className='theTwo'>
          <div className='ftext'>Forget Password</div>
          <button onClick={handleLogin}>Sign In</button>
        </div>

      </div>

    </div>
  )
}

export default LoginForm