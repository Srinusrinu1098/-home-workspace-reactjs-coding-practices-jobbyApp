import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/" style={{textDecoration: 'none', color: '#ffffff'}}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-image"
        />
      </Link>

      <div className="nav-items">
        <Link to="/" style={{textDecoration: 'none', color: '#ffffff'}}>
          <IoMdHome />
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none', color: '#ffffff'}}>
          <BsFillBriefcaseFill />
        </Link>

        <FiLogOut onClick={logout} style={{cursor: 'pointer'}} />
      </div>

      <div className="home-and-job">
        <Link to="/" style={{textDecoration: 'none'}}>
          <h1 className="home-el">Home</h1>
        </Link>
        <Link to="/jobs" style={{textDecoration: 'none'}}>
          <h1 className="job-el">Jobs</h1>
        </Link>
      </div>

      <button type="button" className="button-el" onClick={logout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
