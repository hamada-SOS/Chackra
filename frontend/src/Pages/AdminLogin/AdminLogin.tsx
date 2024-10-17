import { Link } from "react-router-dom"
import AdminLoginForm from "../../Components/AdminLoginForm/AdminLoginForm"

interface Props {
}

const AdminLogin:React.FC<Props> = (Props): JSX.Element => {
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
            <AdminLoginForm/>
            
        </div>
    </div>
  )
}

export default AdminLogin